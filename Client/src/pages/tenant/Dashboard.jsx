import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI, notificationAPI } from '../../services/api';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function TenantDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      bookingAPI.getMyBookings().then(r => r.data || []).catch(() => []),
      notificationAPI.getAll().then(r => r.data || []).catch(() => []),
    ]).then(([b, n]) => {
      setBookings(b);
      setNotifications(n);
    }).finally(() => setLoading(false));
  }, []);

  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
  const unreadNotifs = notifications.filter(n => !n.isRead).length;

  const statCards = [
    { label: 'Active Bookings', value: loading ? '...' : activeBookings, icon: 'calendar-check', color: '#2563eb' },
    { label: 'Total Bookings', value: loading ? '...' : bookings.length, icon: 'calendar', color: '#7c3aed' },
    { label: 'Completed', value: loading ? '...' : bookings.filter(b => b.status === 'completed').length, icon: 'check-circle', color: '#059669' },
    { label: 'Notifications', value: loading ? '...' : unreadNotifs, icon: 'bell', color: '#d97706' },
  ];

  const quickActions = [
    { label: 'Search PG', icon: 'search', path: '/find-pg', color: '#2563eb' },
    { label: 'My Bookings', icon: 'calendar', path: '/tenant/bookings', color: '#7c3aed' },
    { label: 'Messages', icon: 'envelope', path: '/tenant/messages', color: '#059669' },
    { label: 'Write Review', icon: 'star', path: '/tenant/write-review', color: '#d97706' },
    { label: 'Notifications', icon: 'bell', path: '/tenant/notifications', color: '#0891b2' },
    { label: 'Help Center', icon: 'question-circle', path: '/tenant/help-center', color: '#6b7280' },
  ];

  const statusVariant = { confirmed: 'success', pending: 'warning', cancelled: 'danger', completed: 'default' };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.75rem', fontWeight: 700, color: '#111827' }}>
            Welcome back, {user.name || user.fullName || 'Tenant'}!
          </h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Here's what's happening with your PG search</p>
        </div>
        <Button icon="search" onClick={() => navigate('/find-pg')}>Find PG</Button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Recent Bookings */}
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111827' }}>Recent Bookings</h3>
            <button onClick={() => navigate('/tenant/bookings')} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 500 }}>View All</button>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>Loading...
              </div>
            ) : bookings.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                <i className="fas fa-calendar" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
                No bookings yet.{' '}
                <button onClick={() => navigate('/find-pg')} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Find a PG</button>
              </div>
            ) : bookings.slice(0, 4).map(b => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1.5rem', borderBottom: '1px solid #f9fafb' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fas fa-home" style={{ color: '#2563eb' }}></i>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {b.pg?.name || 'PG Booking'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{b.pg?.city || ''}</div>
                </div>
                <Badge variant={statusVariant[b.status] || 'default'}>
                  {b.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {quickActions.map((a, i) => (
              <button key={i} onClick={() => navigate(a.path)}
                style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.25rem 0.75rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = '#2563eb'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#e5e7eb'; }}>
                <i className={`fas fa-${a.icon}`} style={{ fontSize: '1.5rem', color: a.color }}></i>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', textAlign: 'center' }}>{a.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Notifications */}
      {notifications.filter(n => !n.isRead).length > 0 && (
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
              Unread Notifications
              <span style={{ marginLeft: '0.5rem', background: '#2563eb', color: 'white', fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>{unreadNotifs}</span>
            </h3>
            <button onClick={() => navigate('/tenant/notifications')} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 500 }}>View All</button>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            {notifications.filter(n => !n.isRead).slice(0, 3).map(n => (
              <div key={n.id} style={{ display: 'flex', alignItems: 'start', gap: '1rem', padding: '0.875rem 1.5rem', borderBottom: '1px solid #f9fafb' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fas fa-bell" style={{ color: '#2563eb', fontSize: '0.875rem' }}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{n.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{n.message}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
