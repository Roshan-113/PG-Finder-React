import { useNavigate } from 'react-router-dom';

/**
 * PG Card Component
 * pg: { id, name, locality, city, images, rating, reviews, rent, pgType, availableRooms, verified, amenities }
 */
export default function PGCard({ pg }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/pg/${pg.id}`)} style={{
      background: 'white', borderRadius: '0.75rem', overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'box-shadow 0.2s',
      border: '1px solid #f3f4f6'
    }}
      onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
      onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>

      {/* Image */}
      <div style={{ position: 'relative', height: '200px' }}>
        <img src={pg.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop'}
          alt={pg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {pg.verified && (
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: '#2563eb', color: 'white', padding: '0.25rem 0.625rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 600 }}>
            Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>{pg.name}</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          <i className="fas fa-map-marker-alt"></i>
          <span>{pg.locality}, {pg.city}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <i className="fas fa-star" style={{ color: '#fbbf24', fontSize: '0.875rem' }}></i>
          <span style={{ fontWeight: 500, fontSize: '0.875rem', color: '#111827' }}>{pg.rating}</span>
          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>({pg.reviews} reviews)</span>
          <span style={{ marginLeft: 'auto', background: '#dbeafe', color: '#1e40af', padding: '0.125rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500 }}>
            {pg.pgType === 'boys' ? 'Male' : pg.pgType === 'girls' ? 'Female' : 'Unisex'}
          </span>
        </div>

        {/* Amenities */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', color: '#6b7280', fontSize: '0.8125rem' }}>
          {pg.amenities?.slice(0, 4).map(a => (
            <span key={a} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <i className={`fas fa-${a === 'WiFi' ? 'wifi' : a === 'AC' ? 'snowflake' : a === 'Food' ? 'utensils' : a === 'Parking' ? 'car' : 'check'}`}></i>
              {a}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>₹{pg.rent?.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</div>
          </div>
          <button onClick={e => { e.stopPropagation(); navigate(`/pg/${pg.id}`); }} style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
