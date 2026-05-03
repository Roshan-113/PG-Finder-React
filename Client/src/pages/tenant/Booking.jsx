import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { bookingAPI, pgAPI } from '../../services/api';

export default function TenantBooking() {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const location = useLocation();
  const pgIdFromState = location.state?.pgId;
  const pgId = paramId || pgIdFromState;

  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
  const [values, setValues] = useState({
    moveInDate: '', duration: 1, specialRequests: '',
    fullName: user.name || user.fullName || '',
    email: user.email || '',
    phone: user.phone || '',
    alternatePhone: '',
    idType: 'aadhar',
    idNumber: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!pgId) { setLoading(false); return; }
    pgAPI.getById(pgId)
      .then(res => setPg(res.data))
      .catch(() => setError('Failed to load PG details'))
      .finally(() => setLoading(false));
  }, [pgId]);

  const validate = () => {
    const e = {};
    if (!values.fullName.trim()) e.fullName = 'Full name is required';
    if (!values.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Enter a valid email';
    if (!values.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(values.phone)) e.phone = 'Enter a valid phone number';
    if (!values.idNumber.trim()) e.idNumber = 'ID number is required';
    if (!values.moveInDate) e.moveInDate = 'Move-in date is required';
    else if (new Date(values.moveInDate) < new Date()) e.moveInDate = 'Move-in date must be in the future';
    if (!values.duration || values.duration < 1) e.duration = 'Duration must be at least 1 month';
    if (values.duration > 12) e.duration = 'Duration cannot exceed 12 months';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!pgId) { setError('No PG selected'); return; }
    setSubmitting(true);
    setError('');
    try {
      const res = await bookingAPI.create({ pgId, moveInDate: values.moveInDate, duration: parseInt(values.duration), specialRequests: values.specialRequests });
      const bookingId = res.bookingId || res.data?.id;
      navigate('/tenant/payment', { state: { bookingId } });
    } catch (err) {
      setError(err.message || 'Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inp = (name) => ({
    width: '100%', padding: '0.75rem', border: `1px solid ${errors[name] ? '#ef4444' : '#d1d5db'}`,
    borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box'
  });
  const lbl = { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' };

  if (loading) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
      Loading PG details...
    </div>
  );

  if (!pgId || (!pg && !loading)) return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <i className="fas fa-exclamation-circle" style={{ fontSize: '3rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>No PG selected. Please browse PGs first.</p>
      <button onClick={() => navigate('/find-pg')} style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
        Browse PGs
      </button>
    </div>
  );

  const rent = parseFloat(pg?.rentPerMonth || 0);
  const deposit = parseFloat(pg?.securityDeposit || 0);
  const dur = parseInt(values.duration) || 1;
  const totalRent = rent * dur;
  const totalAmount = totalRent + deposit;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.875rem', fontWeight: 700, color: '#111827' }}>Complete Your Booking</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Fill in the details below to book your stay</p>

      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.5rem', padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem' }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* PG Info */}
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Property Details</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={(pg?.images || [])[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200'}
                  alt={pg?.name} style={{ width: '5rem', height: '5rem', borderRadius: '0.5rem', objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>{pg?.name}</h3>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
                    <i className="fas fa-map-marker-alt" style={{ marginRight: '0.25rem' }}></i>{pg?.address}, {pg?.city}
                  </p>
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#2563eb' }}>₹{rent.toLocaleString('en-IN')}/month</p>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h2 style={{ margin: '0 0 1.25rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Personal Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={lbl}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" name="fullName" value={values.fullName} onChange={handleChange} placeholder="Enter your full name" style={inp('fullName')} />
                  {errors.fullName && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{errors.fullName}</p>}
                </div>
                <div>
                  <label style={lbl}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="your@email.com" style={inp('email')} />
                  {errors.email && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{errors.email}</p>}
                </div>
                <div>
                  <label style={lbl}>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="tel" name="phone" value={values.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inp('phone')} />
                  {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={lbl}>Alternate Phone (Optional)</label>
                  <input type="tel" name="alternatePhone" value={values.alternatePhone} onChange={handleChange} placeholder="+91 98765 43210" style={inp('alternatePhone')} />
                </div>
                <div>
                  <label style={lbl}>ID Proof Type <span style={{ color: '#ef4444' }}>*</span></label>
                  <select name="idType" value={values.idType} onChange={handleChange} style={{ ...inp('idType'), background: 'white' }}>
                    <option value="aadhar">Aadhar Card</option>
                    <option value="pan">PAN Card</option>
                    <option value="passport">Passport</option>
                    <option value="driving">Driving License</option>
                    <option value="voter">Voter ID</option>
                  </select>
                </div>
                <div>
                  <label style={lbl}>ID Number <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" name="idNumber" value={values.idNumber} onChange={handleChange} placeholder="Enter ID number" style={inp('idNumber')} />
                  {errors.idNumber && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{errors.idNumber}</p>}
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h2 style={{ margin: '0 0 1.25rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Booking Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={lbl}>Move-in Date <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="date" name="moveInDate" value={values.moveInDate} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]} style={inp('moveInDate')} />
                  {errors.moveInDate && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{errors.moveInDate}</p>}
                </div>
                <div>
                  <label style={lbl}>Duration (Months) <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="number" name="duration" value={values.duration} onChange={handleChange}
                    min="1" max="12" style={inp('duration')} />
                  {errors.duration && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{errors.duration}</p>}
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h2 style={{ margin: '0 0 1.25rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Special Requests</h2>
              <label style={lbl}>Additional Notes (Optional)</label>
              <textarea name="specialRequests" value={values.specialRequests} onChange={handleChange} rows="3"
                placeholder="Any special requirements or requests..."
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" disabled={submitting}
              style={{ width: '100%', padding: '0.875rem', background: submitting ? '#93c5fd' : '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {submitting ? <><i className="fas fa-spinner fa-spin"></i> Creating Booking...</> : <><i className="fas fa-arrow-right"></i> Proceed to Payment</>}
            </button>
          </div>

          {/* Right - Summary */}
          <div>
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'sticky', top: '1rem' }}>
              <h2 style={{ margin: '0 0 1.25rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Booking Summary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
                {[
                  ['Monthly Rent', `₹${rent.toLocaleString('en-IN')}`],
                  ['Duration', `${dur} month(s)`],
                  ['Total Rent', `₹${totalRent.toLocaleString('en-IN')}`],
                  ['Security Deposit', `₹${deposit.toLocaleString('en-IN')}`],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#6b7280' }}>{k}</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 700, color: '#111827' }}>Total Amount</span>
                <span style={{ fontWeight: 700, fontSize: '1.5rem', color: '#2563eb' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '0.75rem', fontSize: '0.75rem', color: '#1e40af' }}>
                <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
                Payment via Razorpay (UPI, Cards, Net Banking). Booking confirmed instantly after payment.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
