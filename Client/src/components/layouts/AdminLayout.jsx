import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';

const adminNav = [
  { path: '/admin/dashboard', icon: 'home', label: 'Dashboard' },
  { path: '/admin/listings', icon: 'building', label: 'PG Listings' },
  { path: '/admin/users', icon: 'users', label: 'User Management' },
  { path: '/admin/approvals', icon: 'shield-alt', label: 'Owner Verification' },
  { path: '/admin/reviews', icon: 'star', label: 'Reviews Moderation' },
  { path: '/admin/reports', icon: 'flag', label: 'Reports & Flags' },
  { path: '/admin/settings', icon: 'cog', label: 'System Settings' },
];

const notifications = [
  { title: 'New owner verification pending', time: '2 minutes ago' },
  { title: 'Report flagged for review', time: '15 minutes ago' },
  { title: 'New listing submitted', time: '1 hour ago' },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Close notif dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/admin/users?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: '240px', height: '100vh', background: 'linear-gradient(to bottom, #3b82f6, #2563eb)', position: 'fixed', left: 0, top: 0, display: 'flex', flexDirection: 'column', zIndex: 40 }}>

        {/* Logo */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white' }}>
            <div style={{ width: '46px', height: '46px', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1.5px solid rgba(255,255,255,0.3)' }}>
              <img src="/logo.png" alt="PG Finder" style={{ height: '36px', width: '36px', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>PG Finder</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          {adminNav.map(item => (
            <Link key={item.path} to={item.path} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '0.25rem',
              fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s',
              background: isActive(item.path) ? 'white' : 'transparent',
              color: isActive(item.path) ? '#2563eb' : 'white',
              boxShadow: isActive(item.path) ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
            }}
              onMouseOver={e => { if (!isActive(item.path)) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseOut={e => { if (!isActive(item.path)) e.currentTarget.style.background = 'transparent'; }}>
              <i className={`fas fa-${item.icon}`} style={{ fontSize: '1.125rem', width: '1.125rem' }}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '1rem', flexShrink: 0 }}>
          <button onClick={async () => {
            try { await authAPI.logout(); } catch(_) {}
            localStorage.removeItem('pgfinder_user');
            navigate('/admin/login');
          }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'white', color: '#2563eb', borderRadius: '0.5rem', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, marginLeft: '240px', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <header style={{ background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem' }}>

            {/* Search */}
            <div style={{ flex: 1, maxWidth: '36rem', position: 'relative' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.125rem' }}></i>
              <input type="text" placeholder="Search users, listings, reports..." value={search}
                onChange={e => setSearch(e.target.value)} onKeyUp={handleSearch}
                style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none', boxSizing: 'border-box', fontSize: '0.875rem' }} />
            </div>

            {/* Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

              {/* Notification Bell + Dropdown */}
              <div ref={notifRef} style={{ position: 'relative' }}>
                <button onClick={() => setNotifOpen(!notifOpen)} style={{ position: 'relative', padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '0.5rem' }}>
                  <i className="fas fa-bell" style={{ fontSize: '1.25rem', color: '#6b7280' }}></i>
                  <span style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', width: '0.5rem', height: '0.5rem', background: '#ef4444', borderRadius: '50%' }}></span>
                </button>

                {notifOpen && (
                  <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 0.5rem)', width: '320px', background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb' }}>
                      <h3 style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: '#111827' }}>Notifications</h3>
                    </div>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      {notifications.map((n, i) => (
                        <div key={i} style={{ padding: '0.75rem 1.25rem', borderBottom: i < notifications.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer' }}
                          onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                          onMouseOut={e => e.currentTarget.style.background = 'white'}>
                          <div style={{ fontSize: '0.875rem', color: '#111827', fontWeight: 500 }}>{n.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{n.time}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                      <Link to="/admin/settings" style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}>View All Activity</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(to bottom right, #3b82f6, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>A</div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827' }}>Admin User</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>admin@pgfinder.com</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ flex: 1, padding: '2rem' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
