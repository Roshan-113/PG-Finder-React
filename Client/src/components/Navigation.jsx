import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ isAuthenticated = false, userRole = null }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem'
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <img src="/logo.png" alt="PG Finder" style={{ height: '2.5rem', width: '2.5rem', objectFit: 'contain', borderRadius: '0.5rem' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', lineHeight: 1.2, letterSpacing: '-0.01em' }}>PG Finder</span>
              <span style={{ fontSize: '0.7rem', color: '#6b7280', lineHeight: 1.2 }}>Smart PG Discovery</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.25rem'
          }} className="desktop-nav">
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.2s',
              backgroundColor: isActive('/') ? '#eff6ff' : 'transparent',
              color: isActive('/') ? '#1d4ed8' : '#374151',
              textDecoration: 'none'
            }}>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
            <Link to="/find-pg" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.2s',
              backgroundColor: isActive('/find-pg') ? '#eff6ff' : 'transparent',
              color: isActive('/find-pg') ? '#1d4ed8' : '#374151',
              textDecoration: 'none'
            }}>
              <i className="fas fa-search"></i>
              <span>Find PG</span>
            </Link>
            <Link to="/find-roommate" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.2s',
              backgroundColor: isActive('/find-roommate') ? '#eff6ff' : 'transparent',
              color: isActive('/find-roommate') ? '#1d4ed8' : '#374151',
              textDecoration: 'none'
            }}>
              <i className="fas fa-users"></i>
              <span>Find Roommate</span>
            </Link>
            <Link to="/reviews" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.2s',
              backgroundColor: isActive('/reviews') ? '#eff6ff' : 'transparent',
              color: isActive('/reviews') ? '#1d4ed8' : '#374151',
              textDecoration: 'none'
            }}>
              <i className="fas fa-star"></i>
              <span>Reviews</span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.75rem'
          }} className="desktop-nav">
            {isAuthenticated ? (
              <>
                {/* Show Dashboard link only for Owner and Admin, NOT for Tenant */}
                {(userRole === 'owner' || userRole === 'admin') && (
                  <Link to={
                    userRole === 'owner' ? '/owner/dashboard' : '/admin/dashboard'
                  } style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s',
                    color: '#374151',
                    textDecoration: 'none'
                  }} onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                     onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                    <i className="fas fa-tachometer-alt" style={{ marginRight: '0.5rem' }}></i>
                    Dashboard
                  </Link>
                )}
                <Link to="/logout" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  textDecoration: 'none'
                }}>
                  <i className="fas fa-sign-out-alt" style={{ marginRight: '0.5rem' }}></i>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  color: '#374151',
                  textDecoration: 'none'
                }} onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                   onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                  <i className="fas fa-user" style={{ marginRight: '0.5rem' }}></i>
                  Login
                </Link>
                <Link to="/register" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  textDecoration: 'none'
                }}>
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'block',
              color: '#374151',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            className="mobile-menu-btn"
          >
            <i className="fas fa-bars" style={{ fontSize: '24px' }}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            borderTop: '1px solid #e5e7eb'
          }} className="mobile-menu">
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: isActive('/') ? '#eff6ff' : 'transparent',
              color: isActive('/') ? '#1d4ed8' : '#374151',
              textDecoration: 'none'
            }}>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
            <Link to="/find-pg" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: isActive('/find-pg') ? '#eff6ff' : 'transparent',
              color: isActive('/find-pg') ? '#1d4ed8' : '#374151',
              textDecoration: 'none'
            }}>
              <i className="fas fa-search"></i>
              <span>Find PG</span>
            </Link>
            <Link to="/find-roommate" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: isActive('/find-roommate') ? '#eff6ff' : 'transparent',
              color: isActive('/find-roommate') ? '#1d4ed8' : '#374151',
              textDecoration: 'none'
            }}>
              <i className="fas fa-users"></i>
              <span>Find Roommate</span>
            </Link>
            <Link to="/reviews" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: isActive('/reviews') ? '#eff6ff' : 'transparent',
              color: isActive('/reviews') ? '#1d4ed8' : '#374151',
              textDecoration: 'none'
            }}>
              <i className="fas fa-star"></i>
              <span>Reviews</span>
            </Link>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginTop: '1rem'
            }}>
              {isAuthenticated ? (
                <>
                  {/* Show Dashboard link only for Owner and Admin, NOT for Tenant */}
                  {(userRole === 'owner' || userRole === 'admin') && (
                    <Link to={
                      userRole === 'owner' ? '/owner/dashboard' : '/admin/dashboard'
                    } style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.5rem 1rem',
                      fontSize: '1rem',
                      fontWeight: 500,
                      borderRadius: '0.5rem',
                      border: '2px solid #2563eb',
                      color: '#2563eb',
                      backgroundColor: 'transparent',
                      textDecoration: 'none'
                    }}>
                      <i className="fas fa-tachometer-alt" style={{ marginRight: '0.5rem' }}></i>
                      Dashboard
                    </Link>
                  )}
                  <Link to="/logout" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    textDecoration: 'none'
                  }}>
                    <i className="fas fa-sign-out-alt" style={{ marginRight: '0.5rem' }}></i>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    borderRadius: '0.5rem',
                    border: '2px solid #2563eb',
                    color: '#2563eb',
                    backgroundColor: 'transparent',
                    textDecoration: 'none'
                  }}>
                    Login
                  </Link>
                  <Link to="/register" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    textDecoration: 'none'
                  }}>
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
