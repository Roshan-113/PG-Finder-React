import { useState, useEffect } from 'react';
import { pgAPI, reviewAPI } from '../../services/api';

export default function OwnerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all owner PGs then fetch reviews for each
    pgAPI.getMyPGs()
      .then(async res => {
        const pgs = res.data || [];
        const allReviews = [];
        for (const pg of pgs) {
          const r = await reviewAPI.getByPG(pg.id).catch(() => ({ data: [] }));
          (r.data || []).forEach(rev => allReviews.push({ ...rev, pgName: pg.name }));
        }
        setReviews(allReviews);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Reviews</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>What tenants say about your properties</p>
        </div>
        {reviews.length > 0 && (
          <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1rem 1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }}>{avg}</div>
            <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center', margin: '0.25rem 0' }}>
              {[1,2,3,4,5].map(s => <i key={s} className="fas fa-star" style={{ color: s <= avg ? '#fbbf24' : '#d1d5db', fontSize: '0.875rem' }}></i>)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{reviews.length} reviews</div>
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Loading...</div>
      ) : reviews.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <i className="fas fa-star" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>No Reviews Yet</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>Reviews from tenants will appear here</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 700 }}>
                    {(r.tenant?.fullName || 'T')[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontWeight: 700, color: '#111827' }}>{r.tenant?.fullName || 'Tenant'}</h3>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{new Date(r.createdAt || r.created_at).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {[1,2,3,4,5].map(s => <i key={s} className="fas fa-star" style={{ color: s <= r.rating ? '#eab308' : '#d1d5db', fontSize: '1.125rem' }}></i>)}
                  <span style={{ fontWeight: 700, color: '#111827' }}>{r.rating}/5</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: '#f0f9ff', borderRadius: '0.5rem', marginBottom: '0.75rem', fontSize: '0.875rem', color: '#1e40af', fontWeight: 600 }}>
                <i className="fas fa-home"></i> {r.pgName}
              </div>
              <p style={{ margin: 0, color: '#374151', lineHeight: 1.6 }}>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
