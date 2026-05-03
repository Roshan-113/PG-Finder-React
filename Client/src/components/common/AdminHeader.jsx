import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const notifications = [
  { title: 'New owner verification pending', time: '2 minutes ago' },
  { title: 'Report flagged for review', time: '15 minutes ago' },
  { title: 'New listing submitted', time: '1 hour ago' },
];

export default function AdminHeader({ userName = 'Admin User', userEmail = 'admin@pgfinder.com' }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/admin/users?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header style={{ background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 30 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem' }}>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: '36rem', position: 'relative' }}>
          <i className="fas fa-search" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.125rem' }}></i>
          <input type="text" placeholder="Search users, listings, reports..." value={search}
            onChange={e => setSearch(e.target.value)} onKeyUp={handleSearch}
            style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none', fontSize: '0.875rem', boxSizing: 'border-box' }} />
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
          {/* Notifications */}
          <button onClick={() => setNotifOpen(!notifOpen)} style={{ position: 'relative', padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '0.5rem' }}>
            <i className="fas fa-bell" style={{ fontSize: '1.25rem', color: '#6b7280' }}></i>
            <span style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', width: '0.5rem', height: '0.5rem', background: '#ef4444', borderRadius: '50%' }}></span>
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div style={{ position: 'absolute', right: '3rem', top: '3rem', width: '320px', background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, border: '1px solid #e5e7eb' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontWeight: 600, fontSize: '1rem', color: '#111827', margin: 0 }}>Notifications</h3>
              </div>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {notifications.map((n, i) => (
                  <div key={i} style={{ padding: '0.75rem 1rem', borderBottom: i < notifications.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer' }}
                    onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                    onMouseOut={e => e.currentTarget.style.background = 'white'}>
                    <div style={{ fontSize: '0.875rem', color: '#111827', fontWeight: 500 }}>{n.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{n.time}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                <a href="/admin/settings" style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}>View All Activity</a>
              </div>
            </div>
          )}

          {/* Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(to bottom right, #3b82f6, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>A</div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827' }}>{userName}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{userEmail}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
