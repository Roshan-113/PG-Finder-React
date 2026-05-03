import { useState, useEffect } from 'react';
import { bookingAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function OwnerBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingAPI.getOwnerBookings()
      .then(res => setBookings(res.data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const updateBooking = async (id, action) => {
    const msg = action === 'accept' ? 'Accept this booking?' : 'Reject this booking?';
    if (!window.confirm(msg)) return;
    try {
      const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action })
      });
      const data = await res.json();
      if (data.success) {
        const newStatus = action === 'accept' ? 'confirmed' : 'rejected';
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
        alert(`Booking ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`);
      } else {
        alert(data.message || 'Failed to update booking');
      }
    } catch (err) { alert('An error occurred'); }
  };

  const badge = (status) => {
    const map = {
      confirmed: { bg: '#d1fae5', color: '#065f46', label: 'Confirmed' },
      pending:   { bg: '#fef3c7', color: '#92400e', label: 'Pending' },
      rejected:  { bg: '#fee2e2', color: '#991b1b', label: 'Rejected' },
      cancelled: { bg: '#f3f4f6', color: '#374151', label: 'Cancelled' },
      completed: { bg: '#dbeafe', color: '#1e40af', label: 'Completed' },
    };
    const s = map[status] || map.pending;
    return (
      <span style={{ padding: '0.375rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: s.bg, color: s.color }}>
        {s.label}
      </span>
    );
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Manage Bookings</h1>
        <p style={{ margin: 0, color: '#6b7280' }}>View and manage all your property bookings</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
          Loading bookings...
        </div>
      ) : bookings.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <i className="fas fa-calendar-times" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: '#374151' }}>No Bookings Yet</h3>
          <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>Once tenants book your PG properties, they'll appear here.</p>
          <p style={{ margin: '0 0 1.5rem 0', color: '#2563eb', fontWeight: 600, fontSize: '0.9375rem' }}>
            <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
            Start by adding your first PG listing to receive bookings!
          </p>
          <button onClick={() => navigate('/owner/add-pg')}
            style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-plus-circle"></i> Add Your First PG
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {bookings.map(b => (
            <div key={b.id} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>
                    {b.pg?.name || 'PG Booking'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>#BK{b.id}</p>
                </div>
                {badge(b.status)}
              </div>

              {/* Details Grid - same as Java */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                {/* Tenant */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <i className="fas fa-user" style={{ color: '#2563eb', width: '1.25rem' }}></i>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ color: '#111827' }}>{b.tenant?.fullName || '-'}</strong>
                    <small style={{ color: '#6b7280' }}>{b.tenant?.phone || ''}</small>
                  </div>
                </div>
                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <i className="fas fa-envelope" style={{ color: '#2563eb', width: '1.25rem' }}></i>
                  <span style={{ color: '#374151' }}>{b.tenant?.email || '-'}</span>
                </div>
                {/* Move-in */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <i className="fas fa-calendar" style={{ color: '#2563eb', width: '1.25rem' }}></i>
                  <span style={{ color: '#374151' }}>
                    Move-in: <strong>{b.moveInDate ? new Date(b.moveInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</strong>
                  </span>
                </div>
                {/* Rent */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <i className="fas fa-rupee-sign" style={{ color: '#2563eb', width: '1.25rem' }}></i>
                  <span style={{ color: '#374151' }}>
                    Rent: <strong>₹{parseFloat(b.rentAmount || 0).toLocaleString('en-IN')}/month</strong>
                  </span>
                </div>
                {/* Deposit */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <i className="fas fa-shield-alt" style={{ color: '#2563eb', width: '1.25rem' }}></i>
                  <span style={{ color: '#374151' }}>
                    Deposit: <strong>₹{parseFloat(b.depositAmount || 0).toLocaleString('en-IN')}</strong>
                  </span>
                </div>
                {/* Payment */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <i className="fas fa-credit-card" style={{ color: '#2563eb', width: '1.25rem' }}></i>
                  <span style={{ color: '#374151' }}>
                    Payment:{' '}
                    {b.paymentStatus === 'completed'
                      ? <strong style={{ color: '#10b981' }}>Paid</strong>
                      : <strong style={{ color: '#f59e0b' }}>Pending</strong>
                    }
                  </span>
                </div>
              </div>

              {/* Special Requests */}
              {b.specialRequests && (
                <div style={{ background: '#f0f9ff', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                  <strong style={{ color: '#1e40af', fontSize: '0.875rem', display: 'block', marginBottom: '0.375rem' }}>Special Requests:</strong>
                  <p style={{ margin: 0, color: '#374151', fontSize: '0.875rem' }}>{b.specialRequests}</p>
                </div>
              )}

              {/* Accept / Reject - only for pending */}
              {b.status === 'pending' && (
                <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                  <button onClick={() => updateBooking(b.id, 'accept')}
                    style={{ flex: 1, padding: '0.75rem 1.5rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.background = '#059669'}
                    onMouseOut={e => e.currentTarget.style.background = '#10b981'}>
                    <i className="fas fa-check"></i> Accept
                  </button>
                  <button onClick={() => updateBooking(b.id, 'reject')}
                    style={{ flex: 1, padding: '0.75rem 1.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.background = '#dc2626'}
                    onMouseOut={e => e.currentTarget.style.background = '#ef4444'}>
                    <i className="fas fa-times"></i> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
