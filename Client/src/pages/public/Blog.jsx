import { useState } from 'react';

const posts = [
  { id: 1, title: '10 Essential Tips for First-Time PG Seekers', tag: 'PG Tips', tagColor: '#16a34a', date: 'April 5, 2026', read: '5 min read', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', excerpt: 'Moving to a new city and looking for your first PG? Here are the essential tips you need to know to find the perfect accommodation that fits your budget and lifestyle.', featured: true },
  { id: 2, title: 'How to Choose the Right PG Location', tag: 'PG Tips', tagColor: '#16a34a', date: 'Apr 3, 2026', read: '4 min', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop', excerpt: 'Location is everything when it comes to choosing a PG. Learn how to evaluate neighborhoods effectively.' },
  { id: 3, title: 'Finding Compatible Roommates: A Complete Guide', tag: 'Roommate Guide', tagColor: '#7c3aed', date: 'Apr 1, 2026', read: '6 min', img: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=600&h=400&fit=crop', excerpt: 'Discover the secrets to finding roommates who match your lifestyle and make your PG experience enjoyable.' },
  { id: 4, title: 'Best Areas for PG in Bangalore 2026', tag: 'City Guides', tagColor: '#ea580c', date: 'Mar 28, 2026', read: '8 min', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop', excerpt: 'Explore the top neighborhoods in Bangalore for PG accommodations, from Koramangala to HSR Layout.' },
  { id: 5, title: 'Safety Checklist Before Moving to a PG', tag: 'Safety Tips', tagColor: '#dc2626', date: 'Mar 25, 2026', read: '5 min', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop', excerpt: 'Essential safety measures to verify before finalizing your PG accommodation. Your security matters!' },
  { id: 6, title: 'Budget-Friendly PG Options: Save Money Without Compromise', tag: 'PG Tips', tagColor: '#16a34a', date: 'Mar 22, 2026', read: '7 min', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', excerpt: 'Learn how to find affordable PG accommodations that don\'t compromise on quality and comfort.' },
  { id: 7, title: 'How to Attract Quality Tenants to Your PG', tag: 'For Owners', tagColor: '#0284c7', date: 'Mar 20, 2026', read: '6 min', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', excerpt: 'Tips for PG owners on creating attractive listings and finding reliable, long-term tenants.' },
  { id: 8, title: 'Dealing with Roommate Conflicts: A Practical Guide', tag: 'Roommate Guide', tagColor: '#7c3aed', date: 'Mar 18, 2026', read: '5 min', img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop', excerpt: 'Learn effective strategies to resolve conflicts and maintain harmony with your roommates.' },
  { id: 9, title: 'Essential Amenities to Look for in a PG', tag: 'PG Tips', tagColor: '#16a34a', date: 'Mar 15, 2026', read: '4 min', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop', excerpt: 'From WiFi to laundry facilities, here are the must-have amenities for a comfortable PG stay.' },
  { id: 10, title: 'Mumbai PG Guide: Top Localities for Working Professionals', tag: 'City Guides', tagColor: '#ea580c', date: 'Mar 12, 2026', read: '7 min', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop', excerpt: 'Discover the best areas in Mumbai for PG accommodations near major IT hubs and business districts.' },
];

const categories = ['All Posts', 'PG Tips', 'Roommate Guide', 'City Guides', 'Safety Tips', 'For Owners'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = posts[0];
  const grid = posts.slice(1).filter(p => activeCategory === 'All Posts' || p.tag === activeCategory);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) { setEmailErr('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailErr('Enter a valid email'); return; }
    setEmailErr('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', padding: '4.5rem 1.5rem 3.5rem', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '2.625rem', fontWeight: 800, margin: '0 0 0.75rem 0', letterSpacing: '-0.5px' }}>PG Finder Blog</h1>
        <p style={{ fontSize: '1.125rem', color: '#bfdbfe', maxWidth: '520px', margin: '0 auto' }}>Tips, guides, and insights for finding your perfect PG accommodation</p>
      </div>

      {/* Categories */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 1.5rem', display: 'flex', justifyContent: 'center', gap: '0.25rem', overflowX: 'auto' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{ padding: '1rem 1.25rem', border: 'none', background: 'none', fontSize: '0.875rem', fontWeight: activeCategory === cat ? 600 : 500, color: activeCategory === cat ? '#2563eb' : '#64748b', cursor: 'pointer', borderBottom: `3px solid ${activeCategory === cat ? '#2563eb' : 'transparent'}`, whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Featured */}
        {activeCategory === 'All Posts' && (
          <div style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: '3rem', border: '1px solid #e2e8f0' }}>
            <div style={{ position: 'relative', minHeight: '320px' }}>
              <img src={featured.img} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#2563eb', color: 'white', padding: '0.3125rem 0.875rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>Featured</span>
            </div>
            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.8125rem', marginBottom: '1rem' }}>
                <span><i className="far fa-calendar" style={{ marginRight: '0.3125rem' }}></i>{featured.date}</span>
                <span><i className="far fa-clock" style={{ marginRight: '0.3125rem' }}></i>{featured.read}</span>
              </div>
              <h2 style={{ fontSize: '1.625rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.3, marginBottom: '0.875rem' }}>{featured.title}</h2>
              <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.9375rem' }}>{featured.excerpt}</p>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
                onMouseOver={e => e.currentTarget.style.gap = '0.75rem'}
                onMouseOut={e => e.currentTarget.style.gap = '0.5rem'}>
                Read More <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        )}

        {/* Grid */}
        <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>
          {activeCategory === 'All Posts' ? 'Latest Posts' : activeCategory}
        </h2>
        {grid.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '1rem', padding: '3rem', textAlign: 'center', color: '#9ca3af', marginBottom: '3rem' }}>
            <i className="fas fa-newspaper" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
            <p style={{ margin: 0 }}>No posts in this category yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            {grid.map(post => (
              <article key={post.id}
                style={{ background: 'white', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e2e8f0', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer' }}
                onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'} />
                  <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.6875rem', fontWeight: 600, color: 'white', background: post.tagColor }}>
                    {post.tag}
                  </span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.8125rem', marginBottom: '0.625rem' }}>
                    <span><i className="far fa-calendar" style={{ marginRight: '0.25rem' }}></i>{post.date}</span>
                    <span><i className="far fa-clock" style={{ marginRight: '0.25rem' }}></i>{post.read}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: '0.625rem' }}>{post.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginBottom: '0.875rem' }}>{post.excerpt}</p>
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#2563eb', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                    Read More <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem' }}>
          {[{ label: <i className="fas fa-chevron-left"></i>, disabled: true }, { label: '1', active: true }, { label: '2' }, { label: '3' }, { label: <i className="fas fa-chevron-right"></i> }].map((btn, i) => (
            <button key={i} disabled={btn.disabled}
              style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', background: btn.active ? '#2563eb' : 'white', color: btn.active ? 'white' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: btn.disabled ? 'not-allowed' : 'pointer', fontSize: '0.875rem', fontWeight: 500, opacity: btn.disabled ? 0.4 : 1, transition: 'all 0.2s' }}
              onMouseOver={e => { if (!btn.disabled && !btn.active) { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.color = '#2563eb'; } }}
              onMouseOut={e => { if (!btn.disabled && !btn.active) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; } }}>
              {btn.label}
            </button>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', borderRadius: '1.25rem', padding: '3.5rem 2.5rem', textAlign: 'center', color: 'white' }}>
          <i className="fas fa-envelope" style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.9, display: 'block' }}></i>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.625rem 0' }}>Subscribe to Our Newsletter</h3>
          <p style={{ color: '#bfdbfe', fontSize: '1rem', margin: '0 0 1.75rem auto', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Get the latest tips, guides, and updates delivered straight to your inbox. Stay informed about PG trends and best practices.
          </p>
          {subscribed ? (
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '0.625rem', padding: '1rem', maxWidth: '440px', margin: '0 auto', fontSize: '1rem', fontWeight: 600 }}>
              <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }}></i>Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.75rem', maxWidth: '440px', margin: '0 auto', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailErr(''); }}
                  placeholder="Enter your email address"
                  style={{ flex: 1, padding: '0.875rem 1.125rem', borderRadius: '0.625rem', border: emailErr ? '2px solid #fca5a5' : 'none', fontSize: '0.9375rem', outline: 'none' }} />
                <button type="submit"
                  style={{ padding: '0.875rem 1.5rem', background: 'white', color: '#2563eb', border: 'none', borderRadius: '0.625rem', fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
                  onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  Subscribe
                </button>
              </div>
              {emailErr && <div style={{ color: '#fca5a5', fontSize: '0.8125rem', textAlign: 'left' }}>{emailErr}</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
