import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const reviews = [
  { initials: 'RK', bg: 'linear-gradient(135deg,#3b82f6,#2563eb)', name: 'Rahul Kumar', date: 'Jan 15, 2026', pg: 'Sunrise PG for Men', rating: 4.5, text: 'Great place with excellent facilities. The rooms are spacious and well-maintained. Owner is very cooperative and responsive to any issues. The location is convenient with easy access to public transport.', scores: [5,4,5,4] },
  { initials: 'PS', bg: 'linear-gradient(135deg,#ec4899,#db2777)', name: 'Priya Singh', date: 'Jan 20, 2026', pg: 'Green Valley Girls Hostel', rating: 5, text: 'Very safe and clean environment. Perfect for working women. The security measures are excellent and the staff is very helpful. Highly recommend!', scores: [5,4,5,5] },
  { initials: 'AV', bg: 'linear-gradient(135deg,#10b981,#059669)', name: 'Amit Verma', date: 'Jan 18, 2026', pg: 'Tech Park Residency', rating: 4, text: 'Good PG near IT parks. Rooms are decent and amenities are as promised. WiFi speed could be better but overall a good place to stay.', scores: [4,4,4,4] },
];

export default function Reviews() {
  const navigate = useNavigate();
  const [ratingFilter, setRatingFilter] = useState('');

  const filtered = ratingFilter ? reviews.filter(r => Math.floor(r.rating) === parseInt(ratingFilter)) : reviews;

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '2rem 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>Verified PG Reviews</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>Honest reviews from real tenants to help you make informed decisions</p>
        </div>
      </div>

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
          {/* Sidebar */}
          <div>
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', position: 'sticky', top: '1rem' }}>
              <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>Overall Rating</h3>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>4.6</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                  {[1,2,3,4].map(i => <i key={i} className="fas fa-star" style={{ color: '#f59e0b', fontSize: '1.125rem' }}></i>)}
                  <i className="fas fa-star-half-alt" style={{ color: '#f59e0b', fontSize: '1.125rem' }}></i>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>5 verified reviews</p>
              </div>
              {/* Rating bars */}
              {[[5,60,3],[4,40,2],[3,0,0],[2,0,0],[1,0,0]].map(([star,pct,cnt]) => (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#374151', width: '2rem' }}>{star} ★</span>
                  <div style={{ flex: 1, height: '0.5rem', background: '#e5e7eb', borderRadius: '0.25rem', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: '#f59e0b', width: `${pct}%` }}></div>
                  </div>
                  <span style={{ color: '#6b7280', width: '1.5rem', textAlign: 'right' }}>{cnt}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '0.75rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>Filters</h4>
                <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  <option value="">All Ratings</option>
                  {[5,4,3,2,1].map(s => <option key={s} value={s}>{s} Stars</option>)}
                </select>
                <button onClick={() => setRatingFilter('')} style={{ width: '100%', padding: '0.5rem', border: '1px solid #2563eb', background: 'white', color: '#2563eb', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main */}
          <div>
            {/* Write Review Banner */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>Share Your Experience</h3>
                <button onClick={() => navigate('/tenant/write-review')} style={{ padding: '0.625rem 1.25rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                  Write a Review
                </button>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Help others by writing an honest review of your PG</p>
            </div>

            {/* Review Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {filtered.map((r, i) => (
                <div key={i} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.125rem', flexShrink: 0 }}>{r.initials}</div>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>{r.name}</h4>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>{r.date}</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <span style={{ padding: '0.125rem 0.5rem', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 500, borderRadius: '0.25rem' }}>
                            <i className="fas fa-check-circle" style={{ fontSize: '0.625rem' }}></i> Verified Tenant
                          </span>
                          <span style={{ padding: '0.125rem 0.5rem', background: '#e0e7ff', color: '#3730a3', fontSize: '0.75rem', fontWeight: 500, borderRadius: '0.25rem' }}>{r.pg}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <i className="fas fa-star" style={{ color: '#f59e0b', fontSize: '1rem' }}></i>
                      <span style={{ fontWeight: 600, fontSize: '1.125rem', color: '#1f2937' }}>{r.rating}</span>
                    </div>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', color: '#374151', lineHeight: 1.6, fontSize: '0.875rem' }}>{r.text}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.375rem' }}>
                    {['Cleanliness','Food','Safety','Value for Money'].map((label, j) => (
                      <div key={label}>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>{label}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <i className="fas fa-star" style={{ color: '#f59e0b', fontSize: '0.875rem' }}></i>
                          <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1f2937' }}>{r.scores[j]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
