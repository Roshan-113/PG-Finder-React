import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../../services/api';

const statusStyle = {
  confirmed: { background: '#dcfce7', color: '#15803d' },
  pending:   { background: '#dbeafe', color: '#1d4ed8' },
  cancelled: { background: '#fee2e2', color: '#b91c1c' },
  completed: { background: '#f3f4f6', color: '#374151' },
  rejected:  { background: '#fee2e2', color: '#b91c1c' },
};

export default function TenantBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    bookingAPI.getMyBookings()
      .then(r => setBookings(r.data || []))
      .catch(e => setError(e.message || 'Failed to load bookings'))
      .finally(() => setLoading(false));
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await bookingAPI.cancel(id);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    } catch (e) { alert(e.message || 'Failed to cancel booking'); }
  };

  const fmt = (n) => parseFloat(n || 0).toLocaleString('en-IN');
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem 0' }}>My Bookings</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>View and manage all your PG bookings</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}></i>
            Loading bookings...
          </div>
        ) : error ? (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.5rem', padding: '1rem', color: '#dc2626' }}>{error}</div>
        ) : bookings.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {bookings.map(b => {
              const ss = statusStyle[b.status] || statusStyle.pending;
              const pgTitle = b.pg?.name || 'PG Booking';
              const pgAddress = [b.pg?.address, b.pg?.city].filter(Boolean).join(', ');
              const ownerName = b.pg?.owner?.fullName || '';
              const ownerPhone = b.pg?.owner?.phone || '';
              return (
                <div key={b.id} style={{ background: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                  <div style={{ padding: '1.5rem' }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>{pgTitle}</h3>
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, ...ss }}>
                            {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                          </span>
                        </div>
                        {pgAddress && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                            <i className="fas fa-map-marker-alt"></i><span>{pgAddress}</span>
                          </div>
                        )}
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Booking ID: #BK{b.id}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>₹{fmt(b.rentAmount)}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</div>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', padding: '1rem 0', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
                      {[
                        ['Booking Date', fmtDate(b.bookingDate)],
                        ['Move-in Date', fmtDate(b.moveInDate)],
                        ['Security Deposit', `₹${fmt(b.depositAmount)}`],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>{label}</div>
                          <div style={{ fontWeight: 600, color: '#111827' }}>{val}</div>
                        </div>
                      ))}
                      <div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Payment Status</div>
                        <div style={{ fontWeight: 600, color: b.paymentStatus === 'completed' ? '#16a34a' : '#d97706', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <i className={`fas fa-${b.paymentStatus === 'completed' ? 'check-circle' : 'clock'}`}></i>
                          {b.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                        </div>
                      </div>
                    </div>

                    {/* Special requests */}
                    {b.specialRequests && (
                      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#eff6ff', borderRadius: '0.5rem' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e3a8a', marginBottom: '0.25rem' }}>Special Requests</div>
                        <div style={{ fontSize: '0.875rem', color: '#374151' }}>{b.specialRequests}</div>
                      </div>
                    )}

                    {/* Owner details */}
                    {ownerName && (
                      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>Owner Details</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: '#374151' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <i className="fas fa-user"></i><span>{ownerName}</span>
                          </div>
                          {ownerPhone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <i className="fas fa-phone"></i><span>{ownerPhone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {b.status === 'confirmed' && (
                        <button onClick={() => navigate('/tenant/booking-confirmation', { state: { bookingId: b.id } })}
                          style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem' }}
                          onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
                          onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
                          <i className="fas fa-eye" style={{ marginRight: '0.375rem' }}></i>View Details
                        </button>
                      )}
                      {b.status === 'confirmed' && (
                        <button onClick={() => navigate('/tenant/write-review', { state: { pgId: b.pgId, bookingId: b.id } })}
                          style={{ padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem' }}
                          onMouseOver={e => e.currentTarget.style.background = '#059669'}
                          onMouseOut={e => e.currentTarget.style.background = '#10b981'}>
                          <i className="fas fa-star" style={{ marginRight: '0.375rem' }}></i>Write Review
                        </button>
                      )}
                      {b.status === 'pending' && b.paymentStatus === 'pending' && (
                        <button onClick={() => navigate('/tenant/payment', { state: { bookingId: b.id } })}
                          style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem' }}
                          onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
                          onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
                          <i className="fas fa-credit-card" style={{ marginRight: '0.375rem' }}></i>Complete Payment
                        </button>
                      )}
                      {b.status !== 'cancelled' && b.status !== 'completed' && b.status !== 'rejected' && (
                        <button onClick={() => cancelBooking(b.id)}
                          style={{ padding: '0.5rem 1rem', background: 'white', color: '#dc2626', border: '1px solid #dc2626', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem' }}
                          onMouseOver={e => e.currentTarget.style.background = '#fef2f2'}
                          onMouseOut={e => e.currentTarget.style.background = 'white'}>
                          <i className="fas fa-times-circle" style={{ marginRight: '0.375rem' }}></i>Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: 'white', borderRadius: '0.5rem', padding: '3rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
            <i className="fas fa-calendar-times" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', margin: '0 0 0.5rem 0' }}>No Bookings Yet</h3>
            <p style={{ color: '#6b7280', margin: '0 0 1.5rem 0' }}>You haven't made any bookings yet. Start exploring PGs to find your perfect home!</p>
            <button onClick={() => navigate('/find-pg')}
              style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer' }}
              onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
              onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
              <i className="fas fa-search" style={{ marginRight: '0.5rem' }}></i>Browse PGs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
