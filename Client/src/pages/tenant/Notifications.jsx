import { useState, useEffect } from 'react';
import { notificationAPI } from '../../services/api';

const typeIcon = {
  message:  { icon: 'comment',       color: '#2563eb', bg: '#dbeafe' },
  booking:  { icon: 'check-circle',  color: '#16a34a', bg: '#dcfce7' },
  review:   { icon: 'star',          color: '#f59e0b', bg: '#fef3c7' },
  price:    { icon: 'heart',         color: '#6366f1', bg: '#ede9fe' },
  default:  { icon: 'bell',          color: '#2563eb', bg: '#dbeafe' },
};

export default function TenantNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationAPI.getAll()
      .then(r => setNotifications(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const markRead = async (id) => {
    await notificationAPI.markRead(id).catch(() => {});
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const unread = notifications.filter(n => !n.isRead).length;
  const fmtDate = (d) => d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-bell" style={{ color: 'white', fontSize: '1.5rem' }}></i>
          </div>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111827', margin: 0 }}>Notifications</h1>
            <p style={{ color: '#6b7280', margin: 0 }}>{unread} unread notification{unread !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}></i>
          Loading...
        </div>
      ) : notifications.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '3rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
          <i className="fas fa-bell-slash" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', margin: '0 0 0.5rem 0' }}>No Notifications</h3>
          <p style={{ color: '#6b7280', margin: 0 }}>You're all caught up! Check back later for updates.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {notifications.map(n => {
            const t = typeIcon[n.notificationType] || typeIcon.default;
            return (
              <div key={n.id} style={{ background: n.isRead ? 'white' : '#eff6ff', border: `1px solid ${n.isRead ? '#e5e7eb' : '#bfdbfe'}`, borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: n.isRead ? '#f3f4f6' : t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`fas fa-${t.icon}`} style={{ color: t.color, fontSize: '1.25rem' }}></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontWeight: 600, color: '#111827', margin: 0, fontSize: '0.9375rem' }}>{n.title}</h3>
                      {!n.isRead && (
                        <span style={{ padding: '0.125rem 0.5rem', background: '#2563eb', color: 'white', fontSize: '0.75rem', borderRadius: '9999px', flexShrink: 0, marginLeft: '0.5rem' }}>New</span>
                      )}
                    </div>
                    <p style={{ color: '#374151', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>{n.message}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{fmtDate(n.createdAt || n.created_at)}</span>
                      {!n.isRead && (
                        <button onClick={() => markRead(n.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                          <i className="fas fa-check-circle" style={{ fontSize: '1rem' }}></i> Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
