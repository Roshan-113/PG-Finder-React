import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { savedPGAPI } from '../../services/api';

export default function SavedPGs() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    savedPGAPI.getAll()
      .then(r => setSaved(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const remove = async (pgId) => {
    if (!window.confirm('Remove this PG from your saved list?')) return;
    await savedPGAPI.remove(pgId).catch(() => {});
    setSaved(prev => prev.filter(s => (s.pgId || s.pg?.id) !== pgId));
  };

  const fmt = (n) => parseFloat(n || 0).toLocaleString('en-IN');

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem 0' }}>Saved PGs</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            {saved.length === 0 ? 'You have no saved PGs' : `You have ${saved.length} saved PG${saved.length > 1 ? 's' : ''}`}
          </p>
        </div>
        <button onClick={() => navigate('/find-pg')}
          style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem' }}
          onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
          onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
          <i className="fas fa-search" style={{ marginRight: '0.5rem' }}></i>Browse More PGs
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}></i>
          Loading...
        </div>
      ) : saved.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '3rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
          <i className="fas fa-heart" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', margin: '0 0 0.5rem 0' }}>No Saved PGs</h3>
          <p style={{ color: '#6b7280', margin: '0 0 1.5rem 0' }}>Start saving your favorite PGs to view them here!</p>
          <button onClick={() => navigate('/find-pg')}
            style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer' }}
            onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
            onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
            <i className="fas fa-search" style={{ marginRight: '0.5rem' }}></i>Browse PGs
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {saved.map(s => {
            const pg = s.pg || {};
            const pgId = s.pgId || pg.id;
            const img = (pg.images || [])[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop';
            const rent = parseFloat(pg.rentPerMonth || pg.rent_per_month || 0);
            const rating = parseFloat(pg.averageRating || 0);
            return (
              <div key={s.id} style={{ background: 'white', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'box-shadow 0.2s' }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'}>
                <div style={{ position: 'relative', height: '12rem' }}>
                  <img src={img} alt={pg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={() => remove(pgId)}
                    style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', width: '2.5rem', height: '2.5rem', background: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                    <i className="fas fa-heart" style={{ color: '#e11d48' }}></i>
                  </button>
                  {pg.status === 'approved' && (
                    <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', padding: '0.25rem 0.5rem', background: '#2563eb', color: 'white', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>
                      <i className="fas fa-check-circle" style={{ marginRight: '0.25rem' }}></i>Verified
                    </div>
                  )}
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#111827', margin: '0 0 0.25rem 0' }}>{pg.name || 'PG'}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    <i className="fas fa-map-marker-alt" style={{ fontSize: '0.75rem' }}></i>{pg.city || ''}
                  </div>
                  {rating > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                      <i className="fas fa-star" style={{ color: '#f59e0b', fontSize: '0.875rem' }}></i>
                      <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{rating.toFixed(1)}</span>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>({pg.totalReviews || 0})</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    {pg.wifiAvailable && <span style={{ padding: '0.125rem 0.5rem', background: '#eff6ff', color: '#1d4ed8', borderRadius: '0.25rem', fontSize: '0.75rem' }}>WiFi</span>}
                    {pg.acAvailable && <span style={{ padding: '0.125rem 0.5rem', background: '#eff6ff', color: '#1d4ed8', borderRadius: '0.25rem', fontSize: '0.75rem' }}>AC</span>}
                    {pg.foodIncluded && <span style={{ padding: '0.125rem 0.5rem', background: '#eff6ff', color: '#1d4ed8', borderRadius: '0.25rem', fontSize: '0.75rem' }}>Food</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>₹{fmt(rent)}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>/month</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => navigate(`/pg/${pgId}`)}
                        style={{ padding: '0.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                        onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
                        onMouseOut={e => e.currentTarget.style.background = '#2563eb'}
                        title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button onClick={() => remove(pgId)}
                        style={{ padding: '0.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                        onMouseOver={e => e.currentTarget.style.background = '#dc2626'}
                        onMouseOut={e => e.currentTarget.style.background = '#ef4444'}
                        title="Remove">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
