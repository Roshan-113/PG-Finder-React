import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  { img: 'https://images.unsplash.com/photo-1661258412259-fe5a585c1450?w=1080', label: 'Modern Private Rooms' },
  { img: 'https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=1080', label: 'Comfortable Shared Spaces' },
  { img: 'https://images.unsplash.com/photo-1758523669073-edfbea249144?w=1080', label: 'Premium Living Areas' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [search, setSearch] = useState({ city: '', maxRent: '', pgType: '' });

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.city) params.set('city', search.city);
    if (search.maxRent) params.set('maxRent', search.maxRent);
    if (search.pgType) params.set('pgType', search.pgType);
    navigate('/find-pg' + (params.toString() ? '?' + params.toString() : ''));
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 50%, #1e40af 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        {/* BG Blobs */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '5rem', left: '2.5rem', width: '18rem', height: '18rem', background: 'white', borderRadius: '9999px', filter: 'blur(64px)' }}></div>
          <div style={{ position: 'absolute', bottom: '5rem', right: '2.5rem', width: '24rem', height: '24rem', background: '#93c5fd', borderRadius: '9999px', filter: 'blur(64px)' }}></div>
        </div>

        <div style={{ position: 'relative', maxWidth: '80rem', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <i className="fas fa-clock"></i><span>Available 24/7 Support</span>
              </div>
              <h1 style={{ margin: '0 0 1.5rem 0', fontSize: '2.25rem', fontWeight: 'bold', lineHeight: 1.2 }}>
                Find Your Perfect
                <span style={{ display: 'block', background: 'linear-gradient(to right, #93c5fd, #86efac)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  PG & Roommate
                </span>
              </h1>
              <p style={{ margin: '0 0 2rem 0', fontSize: '1.125rem', color: '#dbeafe', lineHeight: 1.625 }}>
                Discover verified PG accommodations, connect with compatible roommates, and make your stay comfortable with PG Finder.
              </p>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {[['home','1000+','Verified PGs'],['users','5000+','Happy Tenants'],['shield-alt','100%','Safe & Secure'],['chart-line','95%','Success Rate']].map(([icon,val,label]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <i className={`fas fa-${icon}`} style={{ fontSize: '1.25rem', color: '#4ade80', display: 'block', marginBottom: '0.5rem' }}></i>
                    <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{val}</div>
                    <div style={{ fontSize: '0.75rem', color: '#bfdbfe' }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => navigate('/find-pg')} style={{ flex: 1, padding: '0.75rem 1.5rem', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, fontSize: '1.125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-search"></i> Browse PG Listings
                </button>
                <button onClick={() => navigate('/find-roommate')} style={{ flex: 1, padding: '0.75rem 1.5rem', background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '0.5rem', fontWeight: 500, fontSize: '1.125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-users"></i> Find Roommates
                </button>
              </div>
            </div>

            {/* Right - Slider */}
            <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
              <div style={{ aspectRatio: '4/3', position: 'relative' }}>
                {slides.map((s, i) => (
                  <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === slide ? 1 : 0, transition: 'opacity 0.8s ease-in-out' }}>
                    <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}></div>
                    <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
                      <h3 style={{ margin: 0, color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>{s.label}</h3>
                    </div>
                  </div>
                ))}
                {/* Dots */}
                <div style={{ position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setSlide(i)} style={{ height: '0.375rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', background: i === slide ? 'white' : 'rgba(255,255,255,0.5)', width: i === slide ? '2rem' : '0.375rem', transition: 'all 0.3s' }}></button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <div style={{ padding: '1.5rem', maxWidth: '80rem', margin: '3rem auto 4rem', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <form onSubmit={handleSearch} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-map-marker-alt" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#374151', zIndex: 1 }}></i>
                  <select value={search.city} onChange={e => setSearch({...search, city: e.target.value})} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)', color: '#111827', fontSize: '0.875rem' }}>
                    <option value="">Select City</option>
                    {['Bangalore','Mumbai','Delhi','Pune','Hyderabad','Chennai','Kolkata','Ahmedabad'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-rupee-sign" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#374151' }}></i>
                  <input type="number" placeholder="Max budget" value={search.maxRent} onChange={e => setSearch({...search, maxRent: e.target.value})} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)', color: '#111827', fontSize: '0.875rem', boxSizing: 'border-box' }} />
                </div>
                <select value={search.pgType} onChange={e => setSearch({...search, pgType: e.target.value})} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)', color: '#111827', fontSize: '0.875rem' }}>
                  <option value="">Any Gender</option>
                  <option value="boys">Male</option>
                  <option value="girls">Female</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" style={{ flex: 1, padding: '0.875rem', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, fontSize: '1.125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-search"></i> Search PG
                </button>
                <button type="button" onClick={() => navigate('/register')} style={{ flex: 1, padding: '0.875rem', background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '0.5rem', fontWeight: 500, fontSize: '1.125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-home"></i> Post Your Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Why Choose PG Finder?</h2>
            <p style={{ margin: 0, fontSize: '1.125rem', color: '#6b7280', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>We make finding your perfect stay simple, safe, and stress-free with our unique features.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }}>
            {[
              { icon: 'search', title: 'Smart PG Search', desc: 'Find verified PG accommodations with advanced filters and real-time availability.', grad: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
              { icon: 'users', title: 'Roommate Matching', desc: 'Discover compatible roommates based on lifestyle, habits, and preferences.', grad: 'linear-gradient(135deg, #a855f7, #9333ea)' },
              { icon: 'sync-alt', title: 'Easy Roommate Replacement', desc: 'Replace roommates without shifting PG. Unique mutual approval system.', grad: 'linear-gradient(135deg, #22c55e, #16a34a)' },
              { icon: 'star', title: 'Verified Reviews', desc: 'Read honest reviews from real tenants about PG facilities and owners.', grad: 'linear-gradient(135deg, #f59e0b, #d97706)' },
            ].map((f, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem', background: f.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                  <i className={`fas fa-${f.icon}`} style={{ color: 'white', fontSize: '1.625rem' }}></i>
                </div>
                <h4 style={{ margin: '0 0 0.75rem 0', fontWeight: 600, fontSize: '1.125rem', color: '#111827' }}>{f.title}</h4>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.625 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 50%, #1e40af 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '5rem', left: '2.5rem', width: '18rem', height: '18rem', background: 'white', borderRadius: '9999px', filter: 'blur(64px)' }}></div>
          <div style={{ position: 'absolute', bottom: '5rem', right: '2.5rem', width: '24rem', height: '24rem', background: '#93c5fd', borderRadius: '9999px', filter: 'blur(64px)' }}></div>
        </div>
        <div style={{ position: 'relative', maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.875rem', fontWeight: 'bold' }}>How It Works</h2>
            <p style={{ margin: 0, fontSize: '1.125rem', color: '#dbeafe' }}>Get started in three simple steps</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem', maxWidth: '72rem', margin: '0 auto' }}>
            {[['1','search','Search','Browse PGs and roommates in your preferred location'],['2','users','Connect','Chat with owners and potential roommates'],['3','star','Stay & Review','Move in and share your experience with others']].map(([num,icon,title,desc]) => (
              <div key={num} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '1rem', padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: '5rem', height: '5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.875rem', fontWeight: 'bold', margin: '0 auto 1.5rem', color: 'white' }}>{num}</div>
                <i className={`fas fa-${icon}`} style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}></i>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', fontWeight: 600 }}>{title}</h4>
                <p style={{ margin: 0, color: '#dbeafe', lineHeight: 1.625 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #f9fafb 0%, #eff6ff 100%)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>What Our Users Say</h2>
            <p style={{ margin: 0, fontSize: '1.125rem', color: '#6b7280' }}>Real experiences from real tenants</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }}>
            {[
              { img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', name: 'Priya Sharma', role: 'Software Engineer', text: '"Found my perfect PG in just 2 days! The roommate matching feature is amazing. Highly recommended!"' },
              { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', name: 'Rahul Kumar', role: 'MBA Student', text: '"Best platform for finding PG accommodations. All listings are verified and the owners are very responsive."' },
              { img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', name: 'Anjali Desai', role: 'Marketing Manager', text: '"The roommate replacement feature saved me so much hassle. No need to shift PG, just found a new compatible roommate!"' },
            ].map((r, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <img src={r.img} alt={r.name} style={{ width: '4rem', height: '4rem', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 600, color: '#111827' }}>{r.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>{r.role}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(s => <i key={s} className="fas fa-star" style={{ color: '#f59e0b', fontSize: '1.125rem' }}></i>)}
                </div>
                <p style={{ margin: 0, color: '#374151', lineHeight: 1.625 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
