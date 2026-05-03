import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/find-pg', icon: 'search', label: 'Search PG' },
  { path: '/find-roommate', icon: 'users', label: 'Roommate Finder' },
  { path: '/tenant/saved-pgs', icon: 'heart', label: 'Saved PGs' },
  { path: '/tenant/bookings', icon: 'calendar-check', label: 'My Bookings' },
  { path: '/tenant/messages', icon: 'comment-dots', label: 'Messages' },
];

export default function NavigationAuthenticated({ userName = 'Tenant', userRole = 'tenant' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <img src="/logo.png" alt="PG Finder" style={{ height: '40px', width: '40px', objectFit: 'contain', flexShrink: 0, borderRadius: '8px' }} />
            <div>
              <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', lineHeight: 1.2 }}>PG Finder</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.2 }}>Smart PG Discovery</div>
            </div>
          </Link>

          {/* Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                color: isActive(link.path) ? '#2563eb' : '#374151',
                textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s',
                fontWeight: isActive(link.path) ? 600 : 400,
              }}>
                <i className={`fas fa-${link.icon}`}></i>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Bell */}
            <button onClick={() => navigate('/tenant/notifications')} style={{ position: 'relative', padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '0.5rem' }}>
              <i className="fas fa-bell" style={{ color: '#6b7280', fontSize: '1.25rem' }}></i>
            </button>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem' }}>
                <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', lineHeight: 1.2 }}>{userName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.2, textTransform: 'capitalize' }}>{userRole}</div>
                </div>
                <i className="fas fa-chevron-down" style={{ color: '#6b7280', fontSize: '0.75rem', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}></i>
              </button>

              {dropdownOpen && (
                <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 0.5rem)', width: '14rem', background: 'white', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', overflow: 'hidden', zIndex: 1000 }}>
                  <Link to="/tenant/profile" onClick={() => setDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', textDecoration: 'none', color: '#374151', fontSize: '0.875rem' }}>
                    <i className="fas fa-user" style={{ color: '#6b7280' }}></i> My Profile
                  </Link>
                  <Link to="/tenant/help-center" onClick={() => setDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', textDecoration: 'none', color: '#374151', fontSize: '0.875rem' }}>
                    <i className="fas fa-question-circle" style={{ color: '#6b7280' }}></i> Help Center
                  </Link>
                  <div style={{ height: '1px', background: '#e5e7eb' }}></div>
                  <button onClick={() => { setDropdownOpen(false); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '0.875rem' }}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
