import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { pgAPI } from '../../services/api';

export default function SearchPG() {
  const navigate = useNavigate();
  const location = useLocation();
  const cityParam = new URLSearchParams(location.search).get('city') || '';

  const [query, setQuery] = useState('');
  const [city, setCity] = useState(cityParam);
  const [priceRange, setPriceRange] = useState('');
  const [gender, setGender] = useState('');
  const [allPGs, setAllPGs] = useState([]);
  const [loading, setLoading] = useState(false);

  const doSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (query) params.q = query;
      if (city) params.city = city;
      if (gender === 'male') params.pgType = 'boys';
      else if (gender === 'female') params.pgType = 'girls';
      const res = await pgAPI.search(params);
      let results = res.data || [];
      if (priceRange === 'under10k') results = results.filter(p => parseFloat(p.rentPerMonth || 0) < 10000);
      else if (priceRange === '10k-15k') results = results.filter(p => { const r = parseFloat(p.rentPerMonth || 0); return r >= 10000 && r <= 15000; });
      else if (priceRange === 'above15k') results = results.filter(p => parseFloat(p.rentPerMonth || 0) > 15000);
      setAllPGs(results);
    } catch { setAllPGs([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { doSearch(); }, []);

  const inp = { padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none', fontSize: '0.875rem' };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>Search PG</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Find your perfect PG accommodation</p>
        </div>

        {/* Search Bar */}
        <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
              <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && doSearch()}
                placeholder="Search by location, PG name..."
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none', boxSizing: 'border-box', fontSize: '0.9375rem' }}
                onFocus={e => e.target.style.borderColor = '#2563eb'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'} />
            </div>
            <button onClick={doSearch}
              style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', borderRadius: '0.5rem', fontWeight: 500, border: 'none', cursor: 'pointer' }}
              onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
              onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
              Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <i className="fas fa-filter" style={{ color: '#374151' }}></i>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Filters</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
            <select value={city} onChange={e => setCity(e.target.value)} style={inp}>
              <option value="">All Locations</option>
              {['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={priceRange} onChange={e => setPriceRange(e.target.value)} style={inp}>
              <option value="">Price Range</option>
              <option value="under10k">Under ₹10,000</option>
              <option value="10k-15k">₹10,000 - ₹15,000</option>
              <option value="above15k">Above ₹15,000</option>
            </select>
            <select value={gender} onChange={e => setGender(e.target.value)} style={inp}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="coed">Co-ed</option>
            </select>
            <button onClick={doSearch}
              style={{ ...inp, background: '#f3f4f6', color: '#374151', cursor: 'pointer', fontWeight: 500 }}
              onMouseOver={e => e.currentTarget.style.background = '#e5e7eb'}
              onMouseOut={e => e.currentTarget.style.background = '#f3f4f6'}>
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
            Searching...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>{allPGs.length} PG{allPGs.length !== 1 ? 's' : ''} found</p>
            {allPGs.map(pg => {
              const rent = parseFloat(pg.rentPerMonth || 0);
              const img = (pg.images || [])[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400';
              const rating = parseFloat(pg.averageRating || 0).toFixed(1);
              const amenities = pg.amenities || [];
              return (
                <div key={pg.id}
                  style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                  onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
                  onClick={() => navigate(`/pg/${pg.id}`)}>
                  <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <img src={img} alt={pg.name} style={{ width: '6rem', height: '6rem', borderRadius: '0.5rem', objectFit: 'cover', flexShrink: 0 }} />
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.5rem 0' }}>{pg.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: '#6b7280', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <i className="fas fa-map-marker-alt"></i><span>{pg.city}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <i className="fas fa-users"></i>
                            <span>{pg.pgType === 'boys' ? 'Male' : pg.pgType === 'girls' ? 'Female' : 'Co-ed'}</span>
                          </div>
                          {parseFloat(rating) > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <i className="fas fa-star" style={{ color: '#fbbf24' }}></i>
                              <span>{rating} ({pg.totalReviews || 0} reviews)</span>
                            </div>
                          )}
                          {pg.availableRooms > 0 && (
                            <span style={{ padding: '0.125rem 0.5rem', background: '#d1fae5', color: '#065f46', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>
                              {pg.availableRooms} rooms available
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                          {amenities.slice(0, 4).map(a => (
                            <span key={a} style={{ padding: '0.125rem 0.5rem', background: '#eff6ff', color: '#1e40af', borderRadius: '0.25rem', fontSize: '0.75rem' }}>{a}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1rem' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>₹{rent.toLocaleString('en-IN')}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                        <button onClick={e => { e.stopPropagation(); navigate(`/pg/${pg.id}`); }}
                          style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', borderRadius: '0.5rem', fontWeight: 500, border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                          onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
                          onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
                          View Details
                        </button>
                        {pg.availableRooms > 0 && (
                          <button onClick={e => { e.stopPropagation(); navigate(`/booking/form/${pg.id}`); }}
                            style={{ padding: '0.5rem 1rem', background: '#10b981', color: 'white', borderRadius: '0.5rem', fontWeight: 500, border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                            onMouseOver={e => e.currentTarget.style.background = '#059669'}
                            onMouseOut={e => e.currentTarget.style.background = '#10b981'}>
                            Book Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {allPGs.length === 0 && (
              <div style={{ background: 'white', borderRadius: '0.5rem', padding: '3rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <i className="fas fa-search" style={{ fontSize: '3rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
                <h3 style={{ color: '#111827', margin: '0 0 0.5rem 0' }}>No PGs Found</h3>
                <p style={{ color: '#6b7280', margin: '0 0 1rem 0' }}>Try adjusting your search filters</p>
                <button onClick={() => { setQuery(''); setCity(''); setPriceRange(''); setGender(''); doSearch(); }}
                  style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500 }}
                  onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
                  onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
