import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pgAPI } from '../../services/api';

export default function OwnerListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pgAPI.getMyPGs()
      .then(res => setListings(res.data || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, []);

  const deleteListing = async (id) => {
    if (!window.confirm('Delete this listing? This cannot be undone.')) return;
    try {
      await pgAPI.delete(id);
      setListings(prev => prev.filter(l => l.id !== id));
    } catch (err) { alert(err.message || 'Failed to delete'); }
  };

  const totalRooms = listings.reduce((s, l) => s + (l.totalRooms || 0), 0);
  const availableRooms = listings.reduce((s, l) => s + (l.availableRooms || 0), 0);
  const occupancyRate = totalRooms > 0 ? Math.round(((totalRooms - availableRooms) / totalRooms) * 100) : 0;
  const avgRating = listings.length > 0 ? (listings.reduce((s, l) => s + parseFloat(l.averageRating || 0), 0) / listings.length).toFixed(1) : '0.0';

  const statusBadge = (status) => {
    const map = { approved: ['#d1fae5','#065f46'], pending: ['#fef3c7','#92400e'], rejected: ['#fee2e2','#991b1b'], inactive: ['#f3f4f6','#374151'] };
    const [bg, color] = map[status] || map.inactive;
    return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: bg, color }}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 700, color: '#111827' }}>My Listings</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Manage all your PG properties</p>
        </div>
        <button onClick={() => navigate('/owner/add-pg')}
          style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="fas fa-plus"></i> Add New PG
        </button>
      </div>

      {/* Pending approval notice */}
      {!loading && listings.some(l => l.status === 'pending') && (
        <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '0.75rem', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <i className="fas fa-clock" style={{ color: '#d97706', fontSize: '1.25rem', flexShrink: 0 }}></i>
          <div>
            <strong style={{ color: '#92400e', fontSize: '0.9375rem' }}>Pending Admin Approval</strong>
            <p style={{ margin: '0.125rem 0 0 0', color: '#92400e', fontSize: '0.875rem' }}>
              Your PG listing(s) are under review. They will appear to tenants only after admin approves them. This usually takes 24 hours.
            </p>
          </div>
        </div>
      )}

      {/* Rejected notice */}
      {!loading && listings.some(l => l.status === 'rejected') && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.75rem', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <i className="fas fa-exclamation-circle" style={{ color: '#dc2626', fontSize: '1.25rem', flexShrink: 0 }}></i>
          <div>
            <strong style={{ color: '#991b1b', fontSize: '0.9375rem' }}>Listing Rejected</strong>
            <p style={{ margin: '0.125rem 0 0 0', color: '#991b1b', fontSize: '0.875rem' }}>
              One or more listings were rejected by admin. Please edit and resubmit with correct information.
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Properties', value: loading ? '...' : listings.length, icon: 'home', color: '#2563eb', bg: '#eff6ff' },
          { label: 'Total Rooms', value: loading ? '...' : totalRooms, icon: 'door-open', color: '#10b981', bg: '#f0fdf4' },
          { label: 'Occupancy Rate', value: loading ? '...' : `${occupancyRate}%`, icon: 'chart-pie', color: '#f59e0b', bg: '#fef3c7' },
          { label: 'Avg Rating', value: loading ? '...' : avgRating, icon: 'star', color: '#eab308', bg: '#fef9c3' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className={`fas fa-${s.icon}`} style={{ color: s.color, fontSize: '1.25rem' }}></i>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827' }}>{s.value}</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Listings */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
          Loading listings...
        </div>
      ) : listings.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '4rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
          <i className="fas fa-home" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>No Listings Yet</h3>
          <p style={{ color: '#6b7280', margin: '0 0 1.5rem 0' }}>Add your first PG listing to start receiving bookings</p>
          <button onClick={() => navigate('/owner/add-pg')}
            style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
            <i className="fas fa-plus" style={{ marginRight: '0.5rem' }}></i>Add Your First PG
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {listings.map(pg => {
            const img = (pg.images || [])[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600';
            const rent = parseFloat(pg.rentPerMonth || pg.rent_per_month || 0);
            return (
              <div key={pg.id} style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', transition: 'box-shadow 0.2s' }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                {/* Image */}
                <div style={{ width: '280px', flexShrink: 0 }}>
                  <img src={img} alt={pg.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '200px' }} />
                </div>
                {/* Content */}
                <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>{pg.name}</h3>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                          <i className="fas fa-map-marker-alt" style={{ marginRight: '0.25rem' }}></i>
                          {pg.address}, {pg.city}
                        </p>
                      </div>
                      {statusBadge(pg.status)}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', padding: '1rem 0', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6', marginBottom: '1rem' }}>
                      {[
                        { label: 'Rent/Month', value: `₹${rent.toLocaleString('en-IN')}` },
                        { label: 'Total Rooms', value: pg.totalRooms || 0 },
                        { label: 'Available', value: pg.availableRooms || 0 },
                        { label: 'Rating', value: parseFloat(pg.averageRating || 0) > 0 ? `${parseFloat(pg.averageRating).toFixed(1)} ⭐` : 'No ratings' },
                      ].map(item => (
                        <div key={item.label}>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>{item.label}</div>
                          <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>{item.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Amenities */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {(pg.amenities || []).slice(0, 5).map(a => (
                        <span key={a} style={{ padding: '0.25rem 0.625rem', background: '#eff6ff', color: '#1e40af', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 500 }}>{a}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <button onClick={() => navigate(`/owner/view-listing/${pg.id}`)}
                      style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <i className="fas fa-eye"></i> View
                    </button>
                    <button onClick={() => navigate(`/owner/edit-pg/${pg.id}`)}
                      style={{ padding: '0.5rem 1rem', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button onClick={() => navigate(`/owner/manage-rooms?pgId=${pg.id}`)}
                      style={{ padding: '0.5rem 1rem', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <i className="fas fa-door-open"></i> Rooms
                    </button>
                    <button onClick={() => deleteListing(pg.id)}
                      style={{ padding: '0.5rem 1rem', background: 'white', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <i className="fas fa-trash"></i> Delete
                    </button>
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
