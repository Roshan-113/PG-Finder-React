import { useState, useEffect } from 'react';
import { notificationAPI } from '../../services/api';

const typeConfig = {
  booking: { icon: 'calendar-check', color: '#2563eb', bg: '#dbeafe' },
  review:  { icon: 'star',           color: '#f59e0b', bg: '#fef3c7' },
  inquiry: { icon: 'envelope',       color: '#10b981', bg: '#d1fae5' },
  default: { icon: 'bell',           color: '#2563eb', bg: '#dbeafe' },
};

export default function OwnerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationAPI.getAll()
      .then(res => setNotifications(res.data || []))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  const markRead = async (id) => {
    await notificationAPI.markRead(id).catch(() => {});
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllRead = async () => {
    await notificationAPI.markAllRead().catch(() => {});
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unread = notifications.filter(n => !n.isRead).length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Notifications</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>{unread} unread</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} style={{ padding: '0.5rem 1rem', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem' }}>
            Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Loading...</div>
      ) : notifications.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '3rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
          <i className="fas fa-bell-slash" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>No Notifications</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>You are all caught up!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {notifications.map(n => {
            const t = typeConfig[n.notificationType] || typeConfig.default;
            return (
              <div key={n.id} style={{ background: n.isRead ? 'white' : '#eff6ff', border: '1px solid ' + (n.isRead ? '#e5e7eb' : '#bfdbfe'), borderRadius: '0.75rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: n.isRead ? '#f3f4f6' : t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={'fas fa-' + t.icon} style={{ color: t.color, fontSize: '1.125rem' }}></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontWeight: 600, color: '#111827', margin: 0, fontSize: '0.9375rem' }}>{n.title}</h3>
                      {!n.isRead && <span style={{ padding: '0.125rem 0.5rem', background: '#2563eb', color: 'white', fontSize: '0.75rem', borderRadius: '9999px', marginLeft: '0.5rem' }}>New</span>}
                    </div>
                    <p style={{ color: '#374151', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>{n.message}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{new Date(n.createdAt || n.created_at).toLocaleString('en-IN')}</span>
                      {!n.isRead && (
                        <button onClick={() => markRead(n.id)} style={{ fontSize: '0.875rem', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Mark as read</button>
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
