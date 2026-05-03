import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pgAPI } from '../../services/api';

const staticCities = [
  { city: 'Bangalore', state: 'Karnataka' },
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Delhi', state: 'Delhi' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Ahmedabad', state: 'Gujarat' },
];

export default function Cities() {
  const navigate = useNavigate();
  const [cityStats, setCityStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pgAPI.getAll({ limit: 100 })
      .then(r => {
        const pgs = r.data || [];
        const stats = {};
        pgs.forEach(pg => {
          const c = pg.city;
          if (!c) return;
          if (!stats[c]) stats[c] = { total: 0, available: 0, verified: 0 };
          stats[c].total++;
          if (pg.availableRooms > 0) stats[c].available++;
          if (pg.status === 'approved') stats[c].verified++;
        });
        setCityStats(stats);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1.25rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', color: '#2c3e50', margin: '0 0 0.75rem 0' }}>Browse PGs by City</h1>
        <p style={{ color: '#7f8c8d', fontSize: '1rem', margin: 0 }}>Find your perfect PG in cities across India</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}></i>
          Loading cities...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {staticCities.map(c => {
            const s = cityStats[c.city] || { total: 0, available: 0, verified: 0 };
            return (
              <div key={c.city}
                style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2c3e50', marginBottom: '0.25rem' }}>{c.city}</div>
                <div style={{ color: '#7f8c8d', fontSize: '0.875rem', marginBottom: '1rem' }}>{c.state}</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #ecf0f1', marginBottom: '1rem' }}>
                  {[['Total PGs', s.total], ['Available', s.available], ['Verified', s.verified]].map(([label, val]) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#3498db' }}>{val}</div>
                      <div style={{ fontSize: '0.75rem', color: '#95a5a6', marginTop: '0.25rem' }}>{label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => navigate(`/find-pg?city=${c.city}`)}
                    style={{ flex: 1, padding: '0.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.8125rem' }}
                    onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
                    onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
                    <i className="fas fa-search" style={{ marginRight: '0.375rem' }}></i>Browse PGs
                  </button>
                  <button onClick={() => navigate(`/find-roommate?pgName=${encodeURIComponent(c.city)}`)}
                    style={{ flex: 1, padding: '0.5rem', background: 'white', color: '#2563eb', border: '1px solid #2563eb', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.8125rem' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#eff6ff'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'white'; }}>
                    <i className="fas fa-users" style={{ marginRight: '0.375rem' }}></i>Roommates
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
