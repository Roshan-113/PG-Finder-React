import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../../services/api';

export default function RoommateReplacement() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    bookingAPI.getMyBookings()
      .then(r => {
        const active = (r.data || []).find(b => b.status === 'confirmed' || b.status === 'pending');
        setBooking(active || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) { setError('Please select a reason'); return; }
    setError('');
    alert('Your replacement request has been submitted! We will find compatible roommates for you.');
    navigate('/find-roommate' + (booking?.pgId ? `?pgId=${booking.pgId}&pgName=${encodeURIComponent(booking.pg?.name || '')}` : ''));
  };

  const fmt = (n) => parseFloat(n || 0).toLocaleString('en-IN');

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Back */}
        <button onClick={() => navigate('/find-roommate')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, marginBottom: '1.5rem', fontSize: '0.9375rem' }}
          onMouseOver={e => e.currentTarget.style.color = '#111827'}
          onMouseOut={e => e.currentTarget.style.color = '#6b7280'}>
          <i className="fas fa-arrow-left"></i> Back to Roommate Finder
        </button>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', background: 'linear-gradient(135deg,#a855f7,#9333ea)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-sync-alt" style={{ color: 'white', fontSize: '1.25rem' }}></i>
            </div>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Replace Roommate</h1>
              <p style={{ color: '#6b7280', margin: 0 }}>Find a new roommate without shifting PG</p>
            </div>
          </div>

          {/* Info Banner */}
          <div style={{ background: '#faf5ff', border: '1px solid #d8b4fe', borderRadius: '0.75rem', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', background: '#ede9fe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fas fa-sync-alt" style={{ color: '#7c3aed', fontSize: '1rem' }}></i>
              </div>
              <div>
                <h3 style={{ fontWeight: 600, color: '#581c87', margin: '0 0 0.25rem 0' }}>Unique Roommate Replacement Feature</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b21a8', margin: 0 }}>
                  Our smart matching system finds compatible replacements while you stay in your current PG. Both parties and the PG owner approve the transition for a seamless experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {[['1', 'Current Details', true], ['2', 'Find Match', false], ['3', 'Confirm', false]].map(([num, label, active], i) => (
              <div key={num} style={{ display: 'flex', alignItems: 'center', gap: i < 2 ? '1rem' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, background: active ? '#4f46e5' : '#e5e7eb', color: active ? 'white' : '#6b7280' }}>{num}</div>
                  <span style={{ color: active ? '#111827' : '#6b7280', fontWeight: active ? 500 : 400, fontSize: '0.875rem' }}>{label}</span>
                </div>
                {i < 2 && <div style={{ width: '4rem', height: '2px', background: '#e5e7eb' }}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', margin: '0 0 1.5rem 0' }}>Current Room Details</h2>

            {/* Current PG */}
            {loading ? (
              <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', color: '#9ca3af' }}>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>Loading your booking...
              </div>
            ) : booking ? (
              <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <div style={{ width: '3rem', height: '3rem', background: '#e0e7ff', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-home" style={{ color: '#4f46e5', fontSize: '1.25rem' }}></i>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, color: '#111827', margin: '0 0 0.5rem 0' }}>{booking.pg?.name || 'Your PG'}</h3>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {booking.pg?.city && <span>📍 {booking.pg.city}</span>}
                      {booking.room?.roomType && <span>🏠 {booking.room.roomType} Sharing</span>}
                      <span>💰 ₹{fmt(booking.rentAmount)}/month</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <i className="fas fa-info-circle" style={{ color: '#d97706', fontSize: '1.25rem' }}></i>
                  <div>
                    <p style={{ fontWeight: 600, color: '#92400e', margin: '0 0 0.25rem 0' }}>No Active Booking Found</p>
                    <p style={{ fontSize: '0.875rem', color: '#78350f', margin: 0 }}>You need an active booking to use the roommate replacement feature.</p>
                  </div>
                </div>
                <button onClick={() => navigate('/find-pg')}
                  style={{ marginTop: '0.75rem', padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem' }}>
                  Find a PG
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              {error && (
                <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.875rem' }}>
                  {error}
                </div>
              )}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>
                  Reason for Replacement <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select value={reason} onChange={e => setReason(e.target.value)}
                  style={{ width: '100%', padding: '0.625rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', marginBottom: '0.75rem' }}>
                  <option value="">Select a reason</option>
                  <option value="lifestyle">Lifestyle mismatch</option>
                  <option value="relocation">Roommate relocating</option>
                  <option value="schedule">Different work schedules</option>
                  <option value="personal">Personal reasons</option>
                  <option value="other">Other</option>
                </select>
                <textarea value={details} onChange={e => setDetails(e.target.value)} rows="3"
                  placeholder="Additional details (optional)"
                  style={{ width: '100%', padding: '0.625rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" disabled={!booking}
                  style={{ flex: 1, padding: '0.75rem 1.5rem', background: booking ? '#4f46e5' : '#d1d5db', color: 'white', borderRadius: '0.5rem', fontWeight: 500, border: 'none', cursor: booking ? 'pointer' : 'not-allowed', fontSize: '0.9375rem' }}
                  onMouseOver={e => { if (booking) e.currentTarget.style.background = '#4338ca'; }}
                  onMouseOut={e => { if (booking) e.currentTarget.style.background = '#4f46e5'; }}>
                  <i className="fas fa-users" style={{ marginRight: '0.5rem' }}></i>Find Compatible Roommates
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
