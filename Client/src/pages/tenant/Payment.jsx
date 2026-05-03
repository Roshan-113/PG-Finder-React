import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { paymentAPI, bookingAPI } from '../../services/api';

const loadRazorpay = () => new Promise(resolve => {
  if (window.Razorpay) return resolve(true);
  const s = document.createElement('script');
  s.src = 'https://checkout.razorpay.com/v1/checkout.js';
  s.onload = () => resolve(true);
  s.onerror = () => resolve(false);
  document.body.appendChild(s);
});

export default function TenantPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
  const bookingId = location.state?.bookingId;

  useEffect(() => {
    if (bookingId) {
      bookingAPI.getById(bookingId)
        .then(r => setBooking(r.data))
        .catch(() => {})
        .finally(() => setFetching(false));
    } else setFetching(false);
  }, [bookingId]);

  const fmt = (n) => parseFloat(n || 0).toLocaleString('en-IN');
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

  const handlePayment = async () => {
    if (!booking) { alert('No booking found'); return; }
    setLoading(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) { alert('Razorpay failed to load. Check internet connection.'); setLoading(false); return; }
      const orderRes = await paymentAPI.createOrder(booking.id);
      const { order } = orderRes;
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'PG Finder',
        description: `Booking for ${booking.pg?.name || 'PG'}`,
        image: '/logo.png',
        order_id: order.id,
        handler: async (response) => {
          try {
            await paymentAPI.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.id
            });
            navigate('/tenant/booking-confirmation', { state: { bookingId: booking.id } });
          } catch (err) {
            alert('Payment verification failed: ' + err.message);
            setLoading(false);
          }
        },
        prefill: { name: user.name || user.fullName || '', email: user.email || '', contact: user.phone || '' },
        theme: { color: '#3b82f6' },
        modal: { ondismiss: () => setLoading(false) }
      };
      new window.Razorpay(options).open();
    } catch (err) {
      alert(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  if (fetching) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}></i>
      Loading payment details...
    </div>
  );

  const rentAmount = parseFloat(booking?.rentAmount || 0);
  const depositAmount = parseFloat(booking?.depositAmount || 0);
  const total = rentAmount + depositAmount;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <a onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.9375rem', textDecoration: 'none' }}
        onMouseOver={e => e.currentTarget.style.color = '#111827'}
        onMouseOut={e => e.currentTarget.style.color = '#6b7280'}>
        <i className="fas fa-arrow-left"></i><span>Back to Bookings</span>
      </a>

      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem 0' }}>Complete Payment</h1>
      <p style={{ color: '#6b7280', margin: '0 0 2rem 0' }}>Choose your preferred payment method</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem' }}>
        {/* Left */}
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem 0' }}>Pay with Razorpay</h2>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 1.5rem 0' }}>Secure payment gateway</p>

          <h3 style={{ fontWeight: 700, color: '#111827', margin: '0 0 1rem 0' }}>Accepted Payment Methods</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem', color: '#374151', marginBottom: '1.5rem' }}>
            {['Credit/Debit Cards', 'UPI (GPay, PhonePe, Paytm)', 'Net Banking', 'Wallets'].map(m => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-check" style={{ color: '#10b981', fontSize: '0.75rem' }}></i>{m}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { icon: 'shield-alt', title: 'Secure Payment', sub: '256-bit SSL encryption for all transactions' },
              { icon: 'check-circle', title: 'PCI DSS Compliant', sub: "Your card details are never stored on our servers" },
              { icon: 'bolt', title: 'Instant Confirmation', sub: 'Get booking confirmation immediately after payment' },
            ].map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <i className={`fas fa-${f.icon}`} style={{ color: '#10b981', marginTop: '0.125rem', flexShrink: 0 }}></i>
                <div>
                  <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>{f.title}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0 }}>
              <strong>Note:</strong> You will be redirected to Razorpay's secure payment page. Please complete the payment within 15 minutes to confirm your booking.
            </p>
          </div>

          <button onClick={handlePayment} disabled={loading || !booking}
            style={{ width: '100%', padding: '0.875rem', background: loading ? '#93c5fd' : '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1.125rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'opacity 0.2s' }}
            onMouseOver={e => { if (!loading) e.currentTarget.style.opacity = '0.9'; }}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            {loading ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>Processing...</> : `Proceed to Pay ₹${fmt(total)}`}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280', marginTop: '1rem' }}>
            By proceeding, you agree to our Terms & Conditions and Cancellation Policy.
          </p>
        </div>

        {/* Right - Order Summary */}
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'sticky', top: '1rem', alignSelf: 'start' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 1rem 0' }}>Order Summary</h2>
          {booking?.pg && (
            <>
              <h3 style={{ fontWeight: 700, color: '#111827', margin: '0 0 0.25rem 0' }}>{booking.pg.name}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 1rem 0' }}>{[booking.pg.address, booking.pg.city].filter(Boolean).join(', ')}</p>
            </>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
            {[
              ['Rent Amount', `₹${fmt(rentAmount)}`],
              ['Security Deposit', `₹${fmt(depositAmount)}`],
              ['Move-in Date', fmtDate(booking?.moveInDate)],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#6b7280' }}>{k}</span>
                <span style={{ fontWeight: 600, color: '#111827' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 700, color: '#111827' }}>Total Amount</span>
            <span style={{ fontWeight: 700, fontSize: '1.5rem', color: '#111827' }}>₹{fmt(total)}</span>
          </div>
          <div style={{ background: '#eff6ff', borderRadius: '0.5rem', padding: '0.75rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#374151', margin: 0 }}>By proceeding with payment, you agree to our Terms & Conditions and Cancellation Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
