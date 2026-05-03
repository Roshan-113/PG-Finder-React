import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { bookingAPI } from '../../services/api';

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const bookingId = location.state?.bookingId || new URLSearchParams(location.search).get('bookingId');

  useEffect(() => {
    if (bookingId) {
      bookingAPI.getById(bookingId)
        .then(r => setBooking(r.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [bookingId]);

  const fmt = (n) => parseFloat(n || 0).toLocaleString('en-IN');
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';
  const fmtId = (id) => String(id || 0).padStart(6, '0');

  if (loading) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}></i>
      Loading confirmation...
    </div>
  );

  if (!booking) return (
    <div style={{ maxWidth: '480px', margin: '4rem auto', background: 'white', borderRadius: '0.75rem', padding: '3rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <i className="fas fa-exclamation-circle" style={{ fontSize: '3rem', color: '#e2e8f0', marginBottom: '1rem', display: 'block' }}></i>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.5rem 0' }}>Booking Not Found</h3>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>The booking you're looking for doesn't exist or has been removed.</p>
      <button onClick={() => navigate('/tenant/bookings')}
        style={{ padding: '0.625rem 1.75rem', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
        View My Bookings
      </button>
    </div>
  );

  const rentAmount = parseFloat(booking.rentAmount || 0);
  const depositAmount = parseFloat(booking.depositAmount || 0);
  const total = rentAmount + depositAmount;
  const pgName = booking.pg?.name || 'PG';
  const pgAddress = [booking.pg?.address, booking.pg?.city].filter(Boolean).join(', ');
  const tenantName = booking.tenant?.fullName || '';
  const tenantEmail = booking.tenant?.email || '';
  const tenantPhone = booking.tenant?.phone || '';
  const ownerName = booking.pg?.owner?.fullName || '';
  const ownerPhone = booking.pg?.owner?.phone || '';

  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh', padding: '2rem 1rem' }}>
      {/* Success Banner */}
      <div style={{ maxWidth: '780px', margin: '0 auto 1.25rem auto', background: 'linear-gradient(135deg,#10b981,#059669)', borderRadius: '0.625rem', padding: '1.125rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
        <i className="fas fa-check-circle" style={{ fontSize: '2rem', flexShrink: 0 }}></i>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.125rem' }}>Booking Confirmed!</div>
          <div style={{ fontSize: '0.8125rem', opacity: 0.9 }}>Your booking for <strong>{pgName}</strong> is confirmed. Download your receipt below.</div>
        </div>
        {booking?.pgId && (
          <button onClick={() => navigate(`/find-roommate?pgId=${booking.pgId}&pgName=${encodeURIComponent(booking.pg?.name || 'Your PG')}`)}
            style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.5)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.4375rem', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}>
            <i className="fas fa-users" style={{ marginRight: '0.375rem' }}></i>Find Roommates
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ maxWidth: '780px', margin: '0 auto 1rem auto', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/tenant/bookings')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'white', color: '#374151', border: '1.5px solid #e2e8f0', borderRadius: '0.4375rem', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}
          onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
          onMouseOut={e => e.currentTarget.style.background = 'white'}>
          <i className="fas fa-arrow-left"></i> My Bookings
        </button>
        {booking?.pgId && (
          <button onClick={() => navigate(`/find-roommate?pgId=${booking.pgId}&pgName=${encodeURIComponent(booking.pg?.name || 'Your PG')}`)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '0.4375rem', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}
            onMouseOver={e => e.currentTarget.style.background = '#7c3aed'}
            onMouseOut={e => e.currentTarget.style.background = '#8b5cf6'}>
            <i className="fas fa-users"></i> Find Roommates in Your PG
          </button>
        )}
        <button onClick={() => navigate('/tenant/write-review', { state: { pgId: booking.pgId, bookingId: booking.id } })}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.4375rem', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}
          onMouseOver={e => e.currentTarget.style.background = '#059669'}
          onMouseOut={e => e.currentTarget.style.background = '#10b981'}>
          <i className="fas fa-star"></i> Write Review
        </button>
        <button onClick={() => window.print()}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.4375rem', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}
          onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
          onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
          <i className="fas fa-download"></i> Download Receipt
        </button>
      </div>

      {/* Receipt */}
      <div id="receiptContent" style={{ maxWidth: '780px', margin: '0 auto', background: 'white', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', borderRadius: '0.5rem', overflow: 'hidden', fontFamily: "'Segoe UI',Arial,sans-serif" }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.75rem 2.25rem 1.125rem 2.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/logo.png" alt="PG Finder" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
            <div>
              <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px' }}>PG Finder</div>
              <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '1px' }}>Your Home Away From Home</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.375rem', fontWeight: 900, color: '#1e293b', letterSpacing: '3px', lineHeight: 1 }}>RECEIPT</div>
            <div style={{ marginTop: '0.375rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3125rem', background: '#dcfce7', color: '#15803d', fontSize: '0.6875rem', fontWeight: 700, padding: '0.1875rem 0.625rem', borderRadius: '9999px', letterSpacing: '0.5px' }}>
                <i className="fas fa-check-circle"></i> BOOKING CONFIRMED
              </span>
            </div>
          </div>
        </div>

        {/* Color bar */}
        <div style={{ height: '10px', background: 'linear-gradient(90deg,#0ea5e9 70%,#1e293b 100%)' }}></div>

        {/* Meta */}
        <div style={{ display: 'flex', gap: '1.5rem', padding: '1.375rem 2.25rem 1.125rem 2.25rem' }}>
          {[
            {
              label: 'Tenant',
              rows: [['Name', tenantName], ['Email', tenantEmail], ['Phone', tenantPhone || 'N/A'], ['Address', pgAddress]]
            },
            {
              label: 'Receipt Info',
              rows: [['Receipt No', `#BK${fmtId(booking.id)}`], ['Date', fmtDate(booking.bookingDate)], ['Move-in', fmtDate(booking.moveInDate)], ['Status', booking.status]]
            }
          ].map(box => (
            <div key={box.label} style={{ flex: 1, border: '1.5px dashed #cbd5e1', borderRadius: '0.375rem', padding: '0.875rem 1.125rem' }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.375rem' }}>{box.label}</div>
              {box.rows.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', marginBottom: '0.3125rem' }}>
                  <span style={{ color: '#64748b', minWidth: '70px' }}>{k}</span>
                  <span style={{ fontWeight: 600, color: k === 'Status' ? '#15803d' : '#1e293b' }}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ padding: '0 2.25rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ background: '#1e293b', color: 'white' }}>
                {['Description', 'Details', 'Rate', 'Total'].map((h, i) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: i === 3 ? 'right' : i > 0 ? 'center' : 'left', fontWeight: 700, letterSpacing: '0.5px', fontSize: '0.75rem', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: pgName, desc: 'Monthly Rent — PG Accommodation', detail: '1 Month', rate: `₹${fmt(rentAmount)}`, total: `₹${fmt(rentAmount)}` },
                { name: 'Security Deposit', desc: 'Refundable at end of stay', detail: 'One-time', rate: `₹${fmt(depositAmount)}`, total: `₹${fmt(depositAmount)}` },
                ...(ownerName ? [{ name: 'Owner Contact', desc: `${ownerName}${ownerPhone ? ' | ' + ownerPhone : ''}`, detail: '—', rate: '—', total: '—' }] : []),
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 1 ? '#f0f9ff' : 'white' }}>
                  <td style={{ padding: '0.8125rem 1rem' }}>
                    <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.125rem' }}>{row.name}</div>
                    <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>{row.desc}</div>
                  </td>
                  <td style={{ padding: '0.8125rem 1rem', textAlign: 'center', color: '#374151' }}>{row.detail}</td>
                  <td style={{ padding: '0.8125rem 1rem', textAlign: 'center', color: '#374151' }}>{row.rate}</td>
                  <td style={{ padding: '0.8125rem 1rem', textAlign: 'right', fontWeight: 600, color: '#1e293b' }}>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', padding: '1.125rem 2.25rem 1.5rem 2.25rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, paddingRight: '1.5rem' }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.375rem' }}>Note</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.6 }}>
              {booking.specialRequests || 'Please carry a valid government ID and address proof on move-in day. Contact the owner to confirm move-in time.'}
            </div>
          </div>
          <div style={{ width: '280px', flexShrink: 0 }}>
            {[
              ['Subtotal', `₹${fmt(total)}`],
              ['GST / Tax', '₹0'],
              ['Platform Fee', '₹0'],
              ['Total', `₹${fmt(total)}`],
              ['Paid', `₹${fmt(total)}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4375rem 0', borderBottom: '1px solid #e2e8f0', fontSize: '0.8125rem' }}>
                <span style={{ color: '#64748b', fontWeight: 500 }}>{k}</span>
                <span style={{ fontWeight: 600, color: k === 'Paid' ? '#15803d' : '#1e293b', minWidth: '90px', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0.75rem', marginTop: '0.375rem', background: '#f0f9ff', borderRadius: '0.375rem', border: '1.5px solid #bae6fd' }}>
              <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9375rem' }}>Total Due</span>
              <span style={{ fontWeight: 900, color: '#0ea5e9', fontSize: '1.25rem' }}>₹0</span>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div style={{ padding: '0 2.25rem 1rem 2.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Terms & Conditions</div>
            <div style={{ fontSize: '0.6875rem', color: '#94a3b8', maxWidth: '320px', lineHeight: 1.5 }}>Security deposit is refundable subject to property condition. Cancellation policy applies as per booking agreement.</div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>Thank you for your business.</div>
        </div>

        {/* Footer */}
        <div style={{ background: '#1e293b', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2.25rem', padding: '0.875rem 2.25rem', fontSize: '0.75rem' }}>
          {[['globe', 'www.pgfinder.com'], ['envelope', 'support@pgfinder.com'], ['phone', '+91 1234567890']].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.4375rem' }}>
              <i className={`fas fa-${icon}`} style={{ color: '#0ea5e9', fontSize: '0.8125rem' }}></i>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
