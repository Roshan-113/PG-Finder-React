import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#f9fafb' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', color: 'white', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 1rem 0', fontSize: '3rem', fontWeight: 'bold' }}>About PG Finder</h1>
          <p style={{ margin: 0, fontSize: '1.25rem', opacity: 0.9 }}>Making PG accommodation search simple, safe, and hassle-free</p>
        </div>
      </div>

      {/* Mission */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>Our Mission</h2>
            <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '1.125rem', lineHeight: 1.75 }}>
              We're on a mission to revolutionize the way people find and book PG accommodations. Our platform connects tenants with verified PG owners, making the entire process transparent, secure, and efficient.
            </p>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '1.125rem', lineHeight: 1.75 }}>
              Whether you're a student, working professional, or someone looking for a comfortable stay, PG Finder helps you discover your perfect home away from home.
            </p>
          </div>
          <div style={{ background: '#eff6ff', borderRadius: '1rem', padding: '3rem', textAlign: 'center' }}>
            <i className="fas fa-home" style={{ fontSize: '5rem', color: '#2563eb', marginBottom: '1rem', display: 'block' }}></i>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>10,000+ Happy Tenants</h3>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: 'white', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ margin: '0 0 3rem 0', fontSize: '2rem', fontWeight: 'bold', color: '#111827', textAlign: 'center' }}>Why Choose PG Finder?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }}>
            {[
              { icon: 'shield-alt', color: '#2563eb', bg: '#eff6ff', title: 'Verified Listings', desc: 'All PG listings are verified for authenticity and safety' },
              { icon: 'users', color: '#10b981', bg: '#f0fdf4', title: 'Roommate Matching', desc: 'Find compatible roommates based on lifestyle preferences' },
              { icon: 'lock', color: '#f59e0b', bg: '#fef3c7', title: 'Secure Payments', desc: 'Safe and encrypted payment processing' },
            ].map((f, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <i className={`fas fa-${f.icon}`} style={{ color: f.color, fontSize: '1.5rem' }}></i>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>{f.title}</h3>
                <p style={{ margin: 0, color: '#6b7280' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <h2 style={{ margin: '0 0 3rem 0', fontSize: '2rem', fontWeight: 'bold', color: '#111827', textAlign: 'center' }}>Our Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '2rem' }}>
          {[
            { icon: 'heart', color: '#ef4444', title: 'Customer First', desc: "We prioritize our users' needs and strive to provide the best experience possible." },
            { icon: 'check-circle', color: '#10b981', title: 'Trust & Transparency', desc: 'We believe in honest communication and transparent processes.' },
            { icon: 'lightbulb', color: '#f59e0b', title: 'Innovation', desc: 'We continuously improve our platform with new features and technologies.' },
            { icon: 'handshake', color: '#2563eb', title: 'Community', desc: 'We build a supportive community of tenants, owners, and roommates.' },
          ].map((v, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>
                <i className={`fas fa-${v.icon}`} style={{ color: v.color, marginRight: '0.5rem' }}></i>{v.title}
              </h3>
              <p style={{ margin: 0, color: '#6b7280' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', color: 'white', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '2rem', fontWeight: 'bold' }}>Ready to Find Your Perfect PG?</h2>
          <p style={{ margin: '0 0 2rem 0', fontSize: '1.125rem', opacity: 0.9 }}>Join thousands of happy tenants who found their home with us</p>
          <button onClick={() => navigate('/find-pg')} style={{ padding: '1rem 2rem', background: 'white', color: '#2563eb', fontWeight: 600, borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1.125rem' }}>
            Start Searching
          </button>
        </div>
      </div>
    </div>
  );
}
