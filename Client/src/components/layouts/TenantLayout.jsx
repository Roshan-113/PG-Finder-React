import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const tenantNav = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/find-pg', icon: 'search', label: 'Search PG' },
  { path: '/find-roommate', icon: 'users', label: 'Roommate Finder' },
  { path: '/tenant/saved-pgs', icon: 'heart', label: 'Saved PGs' },
  { path: '/tenant/bookings', icon: 'calendar-check', label: 'My Bookings' },
  { path: '/tenant/messages', icon: 'comment-dots', label: 'Messages' },
];

const footerCols = [
  { title: 'Company', links: [['About Us', '/about'], ['Contact Us', '/contact'], ['Careers', '/careers'], ['Blog', '/blog']] },
  { title: 'Support', links: [['Help Center', '/help-center'], ['Safety Tips', '/safety'], ['FAQs', '/faq'], ['Contact Us', '/contact']] },
];

export default function TenantLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
  const userName = user.name || user.fullName || 'Tenant';
  const userInitial = userName[0]?.toUpperCase() || 'T';

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname === path || location.pathname.startsWith(path);

  useEffect(() => {
    const handler = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top Nav ── */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>

            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <img src="/logo.png" alt="PG Finder" style={{ height: '40px', width: '40px', objectFit: 'contain', borderRadius: '8px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', lineHeight: 1.2 }}>PG Finder</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.2 }}>Smart PG Discovery</div>
              </div>
            </Link>

            {/* Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {tenantNav.map(item => (
                <Link key={item.path} to={item.path} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  color: isActive(item.path) ? '#2563eb' : '#374151',
                  textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s',
                  fontWeight: isActive(item.path) ? 600 : 400,
                }}
                  onMouseOver={e => { if (!isActive(item.path)) e.currentTarget.style.color = '#2563eb'; }}
                  onMouseOut={e => { if (!isActive(item.path)) e.currentTarget.style.color = '#374151'; }}>
                  <i className={`fas fa-${item.icon}`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right — Bell + Profile Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

              {/* Bell */}
              <button onClick={() => navigate('/tenant/notifications')} style={{ position: 'relative', padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '0.5rem' }}
                onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                <i className="fas fa-bell" style={{ color: '#6b7280', fontSize: '1.25rem' }}></i>
              </button>

              {/* Profile Dropdown */}
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem' }}
                  onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>{userInitial}</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', lineHeight: 1.2 }}>{userName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.2 }}>Tenant</div>
                  </div>
                  <i className="fas fa-chevron-down" style={{ color: '#6b7280', fontSize: '0.75rem', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}></i>
                </button>

                {dropdownOpen && (
                  <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 0.5rem)', width: '14rem', background: 'white', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', overflow: 'hidden', zIndex: 1000 }}>
                    <Link to="/tenant/profile" onClick={() => setDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', textDecoration: 'none', color: '#374151', fontSize: '0.875rem' }}
                      onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
                      onMouseOut={e => e.currentTarget.style.background = 'white'}>
                      <i className="fas fa-user" style={{ color: '#6b7280' }}></i>
                      <span>My Profile</span>
                    </Link>
                    <Link to="/tenant/help-center" onClick={() => setDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', textDecoration: 'none', color: '#374151', fontSize: '0.875rem' }}
                      onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
                      onMouseOut={e => e.currentTarget.style.background = 'white'}>
                      <i className="fas fa-question-circle" style={{ color: '#6b7280' }}></i>
                      <span>Help Center</span>
                    </Link>
                    <div style={{ height: '1px', background: '#e5e7eb' }}></div>
                    <button onClick={() => { setDropdownOpen(false); navigate('/logout'); }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '0.875rem' }}
                      onMouseOver={e => e.currentTarget.style.background = '#fef2f2'}
                      onMouseOut={e => e.currentTarget.style.background = 'none'}>
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Content ── */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* ── Footer ── */}
      <footer style={{ background: '#111827', color: '#d1d5db', paddingTop: '3rem', paddingBottom: '1.5rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '46px', height: '46px', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1.5px solid rgba(255,255,255,0.3)' }}>
                  <img src="/logo.png" alt="PG Finder" style={{ height: '36px', width: '36px', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>PG Finder</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1rem', lineHeight: 1.5 }}>
                Find your perfect PG accommodation and compatible roommates with ease. Safe, verified, and hassle-free.
              </p>
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                {['facebook', 'twitter', 'instagram', 'linkedin'].map(s => (
                  <a key={s} href="#" style={{ width: '2.25rem', height: '2.25rem', background: '#1f2937', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.background = '#3b82f6'}
                    onMouseOut={e => e.currentTarget.style.background = '#1f2937'}>
                    <i className={`fab fa-${s}`} style={{ fontSize: '1.125rem', color: '#9ca3af' }}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Company + Support */}
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1rem', fontSize: '1rem', margin: '0 0 1rem 0' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {col.links.map(([label, path]) => (
                    <li key={label}>
                      <Link to={path} style={{ fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseOver={e => e.target.style.color = '#60a5fa'}
                        onMouseOut={e => e.target.style.color = '#9ca3af'}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div>
              <h4 style={{ color: 'white', fontWeight: 600, fontSize: '1rem', margin: '0 0 1rem 0' }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[['envelope', 'support@pgfinder.com'], ['phone', '+91 98765 43210'], ['map-marker-alt', 'Bangalore, India']].map(([icon, text]) => (
                  <li key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                    <i className={`fas fa-${icon}`} style={{ color: '#3b82f6', fontSize: '1rem' }}></i>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div style={{ borderTop: '1px solid #374151', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>© 2026 PG Finder. All rights reserved.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map(t => (
                <a key={t} href="#" style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={e => e.target.style.color = '#60a5fa'}
                  onMouseOut={e => e.target.style.color = '#6b7280'}>
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
