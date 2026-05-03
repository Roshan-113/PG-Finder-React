import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: '#111827', color: '#d1d5db', paddingTop: '3.5rem', paddingBottom: 0, fontFamily: "'Segoe UI', sans-serif" }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2.5rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
            <img src="/logo.png" alt="PG Finder" style={{ height: '2.25rem', width: '2.25rem', objectFit: 'contain', borderRadius: '0.5rem' }} />
            <span style={{ fontSize: '1.375rem', fontWeight: 700, color: 'white' }}>PG Finder</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1.25rem', lineHeight: 1.7, maxWidth: '260px' }}>
            Your trusted platform for finding the perfect PG accommodation across India.
          </p>
          <div style={{ display: 'flex', gap: '0.625rem' }}>
            {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map(icon => (
              <a key={icon} href="#"
                style={{ width: '2.375rem', height: '2.375rem', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = '#2563eb'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                <i className={`fab fa-${icon}`} style={{ color: '#9ca3af', fontSize: '0.875rem' }}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Company</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[['About Us', '/about'], ['Contact Us', '/contact'], ['Careers', '/careers'], ['Blog', '/blog']].map(([label, path]) => (
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

        {/* Support */}
        <div>
          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Support</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[['Help Center', '/help-center'], ['Safety Tips', '/safety'], ['FAQs', '/faq'], ['Contact Us', '/contact']].map(([label, path]) => (
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

        {/* Contact */}
        <div>
          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Contact</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[['envelope', 'support@pgfinder.com'], ['phone', '+91 98765 43210'], ['map-marker-alt', 'Bangalore, India']].map(([icon, text]) => (
              <li key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                <i className={`fas fa-${icon}`} style={{ color: '#60a5fa', fontSize: '0.8125rem', width: '1rem', flexShrink: 0 }}></i>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding: '1.25rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: 0 }}>© 2026 PG Finder. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          {[['Terms of Service', '/terms-of-service'], ['Privacy Policy', '/privacy'], ['Cookie Policy', '/cookie-policy']].map(([label, path]) => (
            <Link key={label} to={path} style={{ fontSize: '0.8125rem', color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={e => e.target.style.color = '#60a5fa'}
              onMouseOut={e => e.target.style.color = '#6b7280'}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
