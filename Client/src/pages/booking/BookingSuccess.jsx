import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { bookingAPI } from '../../services/api';

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [booking, setBooking] = useState(null);
  const bookingId = state?.bookingId;
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');

  useEffect(() => {
    if (bookingId) {
      bookingAPI.getById(bookingId)
        .then(res => setBooking(res.data))
        .catch(() => {});
    }
  }, [bookingId]);

  const isPaid = booking?.paymentStatus === 'completed';

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Success Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2.5rem', marginBottom: '1.5rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ width: '64px', height: '64px', margin: '0 auto 1.5rem', borderRadius: '50%', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #10b981' }}>
            <i className="fas fa-check" style={{ color: '#10b981', fontSize: '1.75rem' }}></i>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>
            {isPaid ? 'Payment Successful!' : 'Booking Submitted!'}
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            {isPaid
              ? 'Your payment was successful and booking is confirmed!'
              : 'Your booking request has been submitted. The owner will confirm shortly.'}
          </p>
          {bookingId && (
            <p style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: 600 }}>
              Booking ID: #BK{bookingId}
            </p>
          )}
        </div>

        {/* Booking Details */}
        {booking && (
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>Booking Details</h2>

            {/* Property */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.75rem' }}>Property</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#fbbf24', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>🏠</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#111827' }}>{booking.pg?.name || 'PG'}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{booking.pg?.city || ''}</div>
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.75rem' }}>Stay Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { icon: 'calendar', label: 'Move-in Date', value: booking.moveInDate ? new Date(booking.moveInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '-' },
                  { icon: 'clock', label: 'Duration', value: `${booking.durationMonths || 1} month(s)` },
                  { icon: 'rupee-sign', label: 'Rent/Month', value: `₹${parseFloat(booking.rentAmount || 0).toLocaleString('en-IN')}` },
                  { icon: 'rupee-sign', label: 'Total Paid', value: `₹${parseFloat(booking.totalAmount || 0).toLocaleString('en-IN')}` },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      <i className={`fas fa-${item.icon}`}></i><span>{item.label}</span>
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tenant */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.75rem' }}>Tenant Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#6b7280', minWidth: '80px' }}>Name:</span><span style={{ fontWeight: 500 }}>{booking.tenant?.fullName || user.name || '-'}</span></div>
                <div style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#6b7280', minWidth: '80px' }}>Email:</span><span style={{ fontWeight: 500 }}>{booking.tenant?.email || user.email || '-'}</span></div>
              </div>
            </div>

            {/* Payment Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: isPaid ? '#d1fae5' : '#fef3c7', borderRadius: '0.5rem', border: `1px solid ${isPaid ? '#10b981' : '#fcd34d'}` }}>
              <i className={`fas fa-${isPaid ? 'check-circle' : 'clock'}`} style={{ color: isPaid ? '#10b981' : '#f59e0b', fontSize: '1.25rem' }}></i>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: isPaid ? '#065f46' : '#92400e' }}>
                {isPaid ? 'Payment Completed' : 'Payment Pending'}
              </span>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>What's Next?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              'You will receive a confirmation email with all booking details',
              'The PG owner will contact you within 24 hours to confirm your check-in',
              'You can view and manage your bookings anytime from "My Bookings"'
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <i className="fas fa-check-circle" style={{ color: '#10b981', fontSize: '1.125rem', marginTop: '0.125rem', flexShrink: 0 }}></i>
                <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0 }}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => window.print()} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 500, fontSize: '0.875rem', border: '1px solid #2563eb', backgroundColor: 'white', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-download"></i> Download Receipt
          </button>
          <button onClick={() => navigate('/tenant/bookings')} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 500, fontSize: '0.875rem', border: '1px solid #2563eb', backgroundColor: 'white', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-eye"></i> View Bookings
          </button>
          <button onClick={() => navigate('/')} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 500, fontSize: '0.875rem', border: 'none', backgroundColor: '#2563eb', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-home"></i> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
