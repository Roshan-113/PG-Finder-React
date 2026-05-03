import { useState, useEffect } from 'react';
import { bookingAPI } from '../../services/api';

export default function OwnerEarnings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingAPI.getOwnerBookings()
      .then(res => setBookings(res.data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const completed = bookings.filter(b => b.paymentStatus === 'completed');
  const pending = bookings.filter(b => b.paymentStatus !== 'completed' && b.status !== 'cancelled');
  const total = completed.reduce((s, b) => s + parseFloat(b.totalAmount || 0), 0);
  const pendingAmt = pending.reduce((s, b) => s + parseFloat(b.rentAmount || 0), 0);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Earnings</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Track your income and transactions</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Earnings', value: `₹${total.toLocaleString('en-IN')}`, icon: 'check-circle', bg: '#d1fae5', color: '#10b981' },
          { label: 'Pending', value: `₹${pendingAmt.toLocaleString('en-IN')}`, icon: 'clock', bg: '#fef3c7', color: '#f59e0b' },
          { label: 'Transactions', value: bookings.length, icon: 'list', bg: '#dbeafe', color: '#2563eb' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              <i className={`fas fa-${s.icon}`} style={{ color: s.color }}></i>
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.75rem', fontWeight: 700, color: '#111827' }}>{loading ? '...' : s.value}</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Transaction History</h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>Loading...</div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>No transactions yet</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb' }}>
                <tr>
                  {['Booking ID', 'Tenant', 'PG', 'Move-in', 'Rent', 'Deposit', 'Total', 'Status'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>#BK{b.id}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>{b.tenant?.fullName || '-'}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>{b.pg?.name || '-'}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{b.moveInDate ? new Date(b.moveInDate).toLocaleDateString('en-IN') : '-'}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>₹{parseFloat(b.rentAmount || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>₹{parseFloat(b.depositAmount || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: 700, color: '#10b981' }}>₹{parseFloat(b.totalAmount || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: b.paymentStatus === 'completed' ? '#d1fae5' : '#fef3c7', color: b.paymentStatus === 'completed' ? '#065f46' : '#92400e' }}>
                        {b.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
