import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { pgAPI } from '../../services/api';

export default function FindPG() {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const [maxRent, setMaxRent] = useState(parseInt(urlParams.get('maxRent')) || 50000);
  const [gender, setGender] = useState(urlParams.get('pgType') || '');
  const [sharing, setSharing] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [allPGs, setAllPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter] = useState(urlParams.get('city') || '');

  useEffect(() => {
    const params = {};
    if (cityFilter) params.city = cityFilter;
    if (gender && gender !== 'all') params.pgType = gender;
    pgAPI.getAll({ ...params, limit: 100 })
      .then(res => setAllPGs(res.data || []))
      .catch(() => setAllPGs([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleAmenity = (a) => setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const filtered = allPGs.filter(pg => {
    const rent = parseFloat(pg.rent_per_month || pg.rentPerMonth || 0);
    if (rent > maxRent) return false;
    if (gender && pg.pgType !== gender && pg.pg_type !== gender) return false;
    return true;
  });

  const clearFilters = () => { setMaxRent(50000); setGender(''); setSharing(''); setAmenities([]); };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1f2937', margin: '0 0 0.5rem 0' }}>Available PG Accommodations</h1>
        <p style={{ color: '#6b7280', margin: '0 0 1rem 0' }}>{filtered.length} properties found</p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => setShowFilters(!showFilters)} style={{ padding: '0.625rem 1.25rem', background: 'white', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-sliders-h"></i> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button onClick={() => alert('Map view coming soon!')} style={{ padding: '0.625rem 1.25rem', background: 'white', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-map"></i> Map View
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Sidebar */}
        {showFilters && (
          <aside style={{ width: '280px', flexShrink: 0 }}>
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1f2937', margin: '0 0 1.25rem 0' }}>Filters</h3>

              {/* Rent Range */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.75rem' }}>Rent Range</label>
                <input type="range" min="0" max="50000" value={maxRent} step="1000" onChange={e => setMaxRent(parseInt(e.target.value))} style={{ width: '100%' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  <span>₹5000</span><span>₹{maxRent.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Gender */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.75rem' }}>Gender Preference</label>
                <select value={gender} onChange={e => setGender(e.target.value)} style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                  <option value="">All</option>
                  <option value="boys">Male</option>
                  <option value="girls">Female</option>
                </select>
              </div>

              {/* Sharing */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.75rem' }}>Sharing Type</label>
                <select value={sharing} onChange={e => setSharing(e.target.value)} style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                  <option value="">All Types</option>
                  <option value="single">Single Room</option>
                  <option value="double">Double Sharing</option>
                  <option value="triple">Triple Sharing</option>
                </select>
              </div>

              {/* Amenities */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#374151', display: 'block', marginBottom: '0.75rem' }}>Amenities</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {['wifi', 'ac', 'food', 'parking', 'laundry'].map(a => (
                    <label key={a} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>
                      <input type="checkbox" checked={amenities.includes(a)} onChange={() => toggleAmenity(a)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                      {a.charAt(0).toUpperCase() + a.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={clearFilters} style={{ width: '100%', padding: '0.625rem', background: 'white', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer' }}>
                Clear All Filters
              </button>
            </div>
          </aside>
        )}

        {/* Listings */}
        <main style={{ flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
              Loading PG listings...
            </div>
          ) : filtered.length > 0 ? filtered.map(pg => {
            const rent = parseFloat(pg.rent_per_month || pg.rentPerMonth || pg.rent || 0);
            const pgType = pg.pgType || pg.pg_type || '';
            const images = pg.images || [];
            const imgSrc = images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800';
            const city = pg.city || '';
            const address = pg.address || '';
            const rating = parseFloat(pg.averageRating || pg.average_rating || 0).toFixed(1);
            const totalReviews = pg.totalReviews || pg.total_reviews || 0;
            const availableRooms = pg.availableRooms || pg.available_rooms || 0;
            return (
            <div key={pg.id} style={{ background: 'white', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', marginBottom: '1.5rem', transition: 'box-shadow 0.2s' }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>
              <div style={{ width: '280px', height: '200px', position: 'relative', flexShrink: 0 }}>
                <img src={imgSrc} alt={pg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {pg.status === 'approved' && <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#2563eb', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>Verified</div>}
              </div>
              <div style={{ flex: 1, padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>{pg.name}</h3>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>₹{rent.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>per month</div>
                  </div>
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <i className="fas fa-map-marker-alt"></i> {address}, {city}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>
                    <i className="fas fa-star" style={{ color: '#fbbf24' }}></i> {rating}
                    <span style={{ color: '#6b7280', fontWeight: 400 }}>({totalReviews} reviews)</span>
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 500, background: '#dbeafe', color: '#1e40af' }}>
                    {pgType === 'boys' ? 'Male' : pgType === 'girls' ? 'Female' : pgType || 'Unisex'}
                  </span>
                  {availableRooms > 0 && <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 500, background: '#d1fae5', color: '#065f46' }}>{availableRooms} rooms available</span>}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  <button onClick={() => navigate(`/pg/${pg.id}`)} style={{ flex: 1, padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <i className="fas fa-eye"></i> View Details
                  </button>
                  <button onClick={() => {
                    const u = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
                    if (!u.id) { navigate('/login'); return; }
                    navigate(`/pg/${pg.id}`);
                  }} style={{ flex: 1, padding: '0.75rem 1.5rem', background: 'white', color: '#2563eb', border: '2px solid #2563eb', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                    Contact Owner
                  </button>
                </div>
              </div>
            </div>
          )}) : (
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '3.75rem 1.5rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <i className="fas fa-search" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', margin: '0 0 0.5rem 0' }}>No PG Found</h3>
              <p style={{ color: '#6b7280', margin: '0 0 1.5rem 0' }}>Try adjusting your search filters or browse all listings</p>
              <button onClick={clearFilters} style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>Clear Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
