import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pgAPI, bookingAPI } from '../../services/api';

export default function BookingForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pg, setPG] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');

  const [form, setForm] = useState({
    moveInDate: '',
    duration: '1',
    fullName: user.name || user.fullName || '',
    phone: user.phone || '',
    specialRequests: ''
  });

  useEffect(() => {
    if (!id) return;
    pgAPI.getById(id)
      .then(res => setPG(res.data))
      .catch(() => setApiError('PG not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // phone: digits only
    if (name === 'phone') {
      setForm(p => ({ ...p, phone: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setForm(p => ({ ...p, [name]: value }));
    }
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.moveInDate) {
      e.moveInDate = 'Please select a move-in date';
    } else {
      const sel = new Date(form.moveInDate);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (sel < today) e.moveInDate = 'Move-in date cannot be in the past';
    }
    const dur = parseInt(form.duration);
    if (!dur || dur < 1 || dur > 12) e.duration = 'Duration must be between 1 and 12 months';
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone.trim())) e.phone = 'Phone number must be exactly 10 digits';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.id) { navigate('/login'); return; }
    if (!validate()) {
      // scroll to first error
      const first = document.querySelector('[data-error="true"]');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitting(true);
    setApiError('');
    try {
      const res = await bookingAPI.create({
        pgId: id,
        moveInDate: form.moveInDate,
        duration: parseInt(form.duration) || 1,
        specialRequests: form.specialRequests
      });
      navigate('/tenant/payment', { state: { bookingId: res.bookingId } });
    } catch (err) {
      setApiError(err.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}></i>
      Loading...
    </div>
  );
  if (!pg) return <div style={{ padding: '4rem', textAlign: 'center', color: '#dc2626' }}>PG not found</div>;

  const rent = parseFloat(pg.rentPerMonth || 0);
  const deposit = parseFloat(pg.securityDeposit || 0);
  const dur = Math.max(1, parseInt(form.duration) || 1);
  const totalRent = rent * dur;
  const total = totalRent + deposit;
  const fmt = n => parseFloat(n || 0).toLocaleString('en-IN');

  const inp = (name) => ({
    width: '100%', padding: '0.5rem 1rem', border: `1px solid ${errors[name] ? '#ef4444' : '#d1d5db'}`,
    borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  });
  const lbl = { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' };
  const errTxt = (name) => errors[name] ? (
    <span data-error="true" style={{ color: '#dc2626', fontSize: '0.8125rem', marginTop: '0.25rem', display: 'block' }}>{errors[name]}</span>
  ) : null;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.875rem', fontWeight: 700, color: '#111827' }}>Complete Your Booking</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Fill in the details below to book your stay</p>

      {apiError && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.5rem', padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#dc2626' }}>
          <i className="fas fa-exclamation-circle" style={{ marginRight: '0.5rem' }}></i>{apiError}
        </div>
      )}

      <form id="bookingForm" onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Property Details */}
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Property Details</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.5rem', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>🏠</div>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontWeight: 700, fontSize: '1.125rem', color: '#111827' }}>{pg.name}</h3>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#6b7280' }}>{pg.address}, {pg.city}</p>
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111827' }}>₹{fmt(rent)}/month</p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <h2 style={{ margin: '0 0 1.25rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Booking Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={lbl}>Move-in Date *</label>
                  <input type="date" name="moveInDate" value={form.moveInDate} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    style={inp('moveInDate')}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = errors.moveInDate ? '#ef4444' : '#d1d5db'} />
                  {errTxt('moveInDate')}
                </div>
                <div>
                  <label style={lbl}>Duration (Months) *</label>
                  <input type="number" name="duration" value={form.duration} onChange={handleChange}
                    min="1" max="12"
                    style={inp('duration')}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = errors.duration ? '#ef4444' : '#d1d5db'} />
                  {errTxt('duration')}
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <h2 style={{ margin: '0 0 1.25rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Personal Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={lbl}>Full Name *</label>
                  <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                    style={inp('fullName')}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = errors.fullName ? '#ef4444' : '#d1d5db'} />
                  {errTxt('fullName')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={lbl}>Email *</label>
                    <input type="email" value={user.email || ''} readOnly
                      style={{ ...inp('email'), background: '#f9fafb', cursor: 'not-allowed', color: '#6b7280' }} />
                  </div>
                  <div>
                    <label style={lbl}>Phone Number *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="10-digit number" maxLength={10}
                      style={inp('phone')}
                      onFocus={e => e.target.style.borderColor = '#2563eb'}
                      onBlur={e => e.target.style.borderColor = errors.phone ? '#ef4444' : '#d1d5db'} />
                    {errTxt('phone')}
                  </div>
                </div>
                <div>
                  <label style={lbl}>Special Requests (Optional)</label>
                  <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange}
                    rows={3} placeholder="Any special requirements or requests..."
                    style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#d1d5db'} />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={submitting}
              style={{ width: '100%', padding: '0.875rem', background: submitting ? '#93c5fd' : '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1.125rem', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 2px 8px rgba(37,99,235,0.3)', transition: 'background 0.2s' }}
              onMouseOver={e => { if (!submitting) e.currentTarget.style.background = '#1d4ed8'; }}
              onMouseOut={e => { if (!submitting) e.currentTarget.style.background = '#2563eb'; }}>
              <i className="fas fa-check-circle"></i>
              {submitting ? 'Submitting...' : 'Confirm Booking'}
            </button>
          </div>

          {/* RIGHT — Summary */}
          <div>
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', position: 'sticky', top: '1.5rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Booking Summary</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                {[
                  ['Monthly Rent', `₹${fmt(rent)}`],
                  ['Security Deposit', `₹${fmt(deposit)}`],
                  ['Duration', `${dur} month${dur > 1 ? 's' : ''}`],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#6b7280' }}>{k}</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#111827', fontSize: '1.125rem' }}>Total Amount</span>
                  <span style={{ fontWeight: 700, fontSize: '1.5rem', color: '#111827' }}>₹{fmt(total)}</span>
                </div>
              </div>

              <div style={{ background: '#eff6ff', borderRadius: '0.5rem', padding: '0.75rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#374151', margin: 0, lineHeight: 1.5 }}>
                  <strong>Note:</strong> Your booking will be confirmed after submission. The owner will contact you for payment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
