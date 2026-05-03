import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ownerNav = [
  { path: '/owner/dashboard', icon: 'home', label: 'Dashboard' },
  { path: '/owner/listings', icon: 'building', label: 'My Listings' },
  { path: '/owner/add-pg', icon: 'plus', label: 'Add New PG' },
  { path: '/owner/manage-rooms', icon: 'door-open', label: 'Manage Rooms' },
  { path: '/owner/bookings', icon: 'calendar-check', label: 'Bookings' },
  { path: '/owner/inquiries', icon: 'comment-dots', label: 'Inquiries' },
  { path: '/owner/reviews', icon: 'star', label: 'Reviews' },
  { path: '/owner/photos', icon: 'images', label: 'Photos' },
  { path: '/owner/documents', icon: 'file-alt', label: 'Documents' },
  { path: '/owner/earnings', icon: 'dollar-sign', label: 'Earnings' },
];

export default function OwnerLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Read real user from localStorage
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
  const userName = user.name || user.fullName || 'Owner';
  const userEmail = user.email || 'owner@pgfinder.com';
  const userInitial = userName[0]?.toUpperCase() || 'O';

  const isActive = (path) => location.pathname === path;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Owner Panel</div>
            </div>
          </div>
        </div>

        {/* Nav — scrollable */}
        <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          {ownerNav.map(item => (
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

        {/* No logout button here — JSP owner layout doesn't have one in sidebar */}
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, marginLeft: '240px', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <header style={{ background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem' }}>

            {/* Search */}
            <div style={{ flex: 1, maxWidth: '36rem', position: 'relative' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.125rem' }}></i>
              <input type="text" placeholder="Search your properties..." value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none', boxSizing: 'border-box', fontSize: '0.875rem' }} />
            </div>

            {/* Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

              {/* Bell */}
              <Link to="/owner/notifications" style={{ position: 'relative', padding: '0.5rem', textDecoration: 'none', borderRadius: '0.5rem' }}>
                <i className="fas fa-bell" style={{ fontSize: '1.25rem', color: '#6b7280' }}></i>
                <span style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', width: '0.5rem', height: '0.5rem', background: '#ef4444', borderRadius: '50%' }}></span>
              </Link>

              {/* Profile Dropdown */}
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '0.5rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(to bottom right, #3b82f6, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>{userInitial}</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827' }}>{userName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{userEmail}</div>
                  </div>
                  <i className="fas fa-chevron-down" style={{ fontSize: '0.75rem', color: '#9ca3af', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}></i>
                </button>

                {dropdownOpen && (
                  <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 0.5rem)', background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.12)', minWidth: '180px', zIndex: 1000, overflow: 'hidden' }}>
                    <Link to="/owner/profile" onClick={() => setDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', textDecoration: 'none', color: '#374151', fontSize: '0.875rem' }}
                      onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                      onMouseOut={e => e.currentTarget.style.background = 'white'}>
                      <i className="fas fa-user" style={{ color: '#6b7280' }}></i> My Profile
                    </Link>
                    <Link to="/owner/settings" onClick={() => setDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', textDecoration: 'none', color: '#374151', fontSize: '0.875rem' }}
                      onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                      onMouseOut={e => e.currentTarget.style.background = 'white'}>
                      <i className="fas fa-cog" style={{ color: '#6b7280' }}></i> Settings
                    </Link>
                    <div style={{ borderTop: '1px solid #e5e7eb' }}></div>
                    <button onClick={() => { localStorage.removeItem('pgfinder_user'); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontSize: '0.875rem' }}
                      onMouseOver={e => e.currentTarget.style.background = '#fef2f2'}
                      onMouseOut={e => e.currentTarget.style.background = 'none'}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                )}
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
