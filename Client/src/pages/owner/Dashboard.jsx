import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI, pgAPI, inquiryAPI } from '../../services/api';

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
  const [bookings, setBookings] = useState([]);
  const [pgs, setPGs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      bookingAPI.getOwnerBookings().then(r => setBookings(r.data || [])).catch(() => {}),
      pgAPI.getMyPGs().then(r => setPGs(r.data || [])).catch(() => {}),
      inquiryAPI.getOwner().then(r => setInquiries(r.data || [])).catch(() => {})
    ]).finally(() => setLoading(false));
  }, []);

  const activeBookings = bookings.filter(b => b.status === 'confirmed').length;
  const totalEarnings = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((s, b) => s + parseFloat(b.totalAmount || b.rentAmount || 0), 0);

  const statCards = [
    { label: 'Total Listings', value: loading ? '...' : pgs.length, icon: 'home', bg: '#eff6ff', color: '#2563eb' },
    { label: 'Active Bookings', value: loading ? '...' : activeBookings, icon: 'calendar-check', bg: '#f0fdf4', color: '#10b981' },
    { label: 'Total Earnings', value: loading ? '...' : `₹${totalEarnings.toLocaleString('en-IN')}`, icon: 'rupee-sign', bg: '#fef3c7', color: '#f59e0b' },
    { label: 'Total Bookings', value: loading ? '...' : bookings.length, icon: 'calendar', bg: '#fce7f3', color: '#ec4899' },
    { label: 'Pending Inquiries', value: loading ? '...' : inquiries.filter(i => i.status === 'open').length, icon: 'envelope', bg: '#ede9fe', color: '#8b5cf6' },
    { label: 'My PGs', value: loading ? '...' : pgs.length, icon: 'building', bg: '#fef9c3', color: '#eab308' },
  ];

  const quickActions = [
    { label: 'Add New PG', icon: 'plus-circle', path: '/owner/add-pg' },
    { label: 'Manage Listings', icon: 'list', path: '/owner/listings' },
    { label: 'View Bookings', icon: 'calendar-check', path: '/owner/bookings' },
    { label: 'Check Inquiries', icon: 'envelope', path: '/owner/inquiries' },
  ];

  const statusBadge = (status) => {
    const map = { confirmed: { bg: '#d1fae5', color: '#065f46' }, pending: { bg: '#fef3c7', color: '#92400e' }, cancelled: { bg: '#fee2e2', color: '#991b1b' } };
    const s = map[status] || { bg: '#f3f4f6', color: '#374151' };
    return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: s.bg, color: s.color }}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>;
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Owner Dashboard</h1>
        <p style={{ margin: 0, color: '#6b7280' }}>Welcome back! Here's your business overview</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              <i className={`fas fa-${s.icon}`} style={{ color: s.color }}></i>
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.75rem', fontWeight: 700, color: '#111827' }}>{s.value}</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Recent Bookings</h2>
          <a href="/owner/bookings" onClick={e => { e.preventDefault(); navigate('/owner/bookings'); }} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>View All</a>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>Loading...</div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>No bookings yet</div>
        ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['Booking ID', 'Tenant', 'PG', 'Move-in Date', 'Amount', 'Status', 'Payment'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>#BK{b.id}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                    <div style={{ fontWeight: 600, color: '#111827' }}>{b.tenant?.fullName || 'Tenant'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{b.tenant?.phone || ''}</div>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>{b.pg?.name || '-'}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>{b.moveInDate ? new Date(b.moveInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>₹{parseFloat(b.rentAmount || 0).toLocaleString('en-IN')}</td>
                  <td style={{ padding: '1rem' }}>{statusBadge(b.status)}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: b.paymentStatus === 'completed' ? '#d1fae5' : '#fef3c7', color: b.paymentStatus === 'completed' ? '#065f46' : '#92400e' }}>
                      {b.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {quickActions.map((a, i) => (
            <a key={i} href={a.path} onClick={e => { e.preventDefault(); navigate(a.path); }} style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#111827', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#111827'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <i className={`fas fa-${a.icon}`} style={{ fontSize: '2rem' }}></i>
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{a.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
