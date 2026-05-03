import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pgAPI, reviewAPI, savedPGAPI, inquiryAPI } from '../../services/api';

export default function PGDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pg, setPG] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
  const isLoggedIn = !!user.id;

  useEffect(() => {
    Promise.all([
      pgAPI.getById(id).then(r => setPG(r.data)).catch(e => setError(e.message)),
      reviewAPI.getByPG(id).then(r => setReviews(r.data || [])).catch(() => {})
    ]).finally(() => setLoading(false));
  }, [id]);

  // auto-advance photos
  useEffect(() => {
    const t = setInterval(() => setPhotoIndex(i => i + 1), 5000);
    return () => clearInterval(t);
  }, []);

  const changePhoto = (dir) => {
    const len = (pg?.images || []).length;
    if (len <= 1) return;
    setPhotoIndex(i => (i + dir + len) % len);
  };

  const toggleSave = async () => {
    if (!isLoggedIn) { if (window.confirm('Login to save PGs?')) navigate('/login'); return; }
    try { if (saved) { await savedPGAPI.remove(id); setSaved(false); } else { await savedPGAPI.save(id); setSaved(true); } } catch {}
  };

  const bookNow = () => {
    if (!isLoggedIn) { if (window.confirm('Login to book this PG?')) navigate(`/login`); return; }
    navigate(`/booking/form/${id}`);
  };

  const sendInquiry = () => {
    if (!isLoggedIn) { if (window.confirm('Login to send inquiry?')) navigate('/login'); return; }
    navigate('/tenant/messages', { state: { openUserId: pg?.owner?.id, openUserName: pg?.owner?.fullName || 'PG Owner' } });
  };

  const callOwner = () => {
    if (!isLoggedIn) { if (window.confirm('Login to view contact?')) navigate('/login'); return; }
    alert(`Call the owner at ${pg?.owner?.phone || '+91 98765 43210'}`);
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}><i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}></i>Loading...</div>;
  if (error || !pg) return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <p style={{ color: '#dc2626' }}>{error || 'PG not found'}</p>
      <button onClick={() => navigate('/find-pg')} style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', marginTop: '1rem' }}>Browse PGs</button>
    </div>
  );

  const images = pg.images?.length ? pg.images : ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'];
  const realIdx = photoIndex % images.length;
  const rent = parseFloat(pg.rentPerMonth || 0);
  const deposit = parseFloat(pg.securityDeposit || 0);
  const amenities = pg.amenities || [];
  const fmt = n => parseFloat(n || 0).toLocaleString('en-IN');
  const amenityIcon = { WiFi: 'wifi', AC: 'snowflake', Food: 'utensils', Parking: 'car', Laundry: 'tshirt', Gym: 'dumbbell', Security: 'shield-alt', CCTV: 'video' };

  const btn = (onClick, color, children) => (
    <button onClick={onClick}
      style={{ width: '100%', padding: '0.875rem', background: color, color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9375rem', transition: 'opacity 0.2s' }}
      onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
      onMouseOut={e => e.currentTarget.style.opacity = '1'}>
      {children}
    </button>
  );

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1.5rem 0' }}>
        <button onClick={() => navigate('/find-pg')} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <i className="fas fa-arrow-left"></i><span>Back to Listings</span>
        </button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>

          {/* LEFT */}
          <div>
            {/* Carousel */}
            <div style={{ position: 'relative', height: '400px', borderRadius: '1rem', overflow: 'hidden', background: '#f3f4f6', marginBottom: '1.5rem' }}>
              {images.map((img, i) => (
                <img key={i} src={img} alt={pg.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === realIdx ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }} />
              ))}
              {images.length > 1 && <>
                <button onClick={() => changePhoto(-1)} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 5 }}>
                  <i className="fas fa-chevron-left" style={{ color: '#111827', fontSize: '1.25rem' }}></i>
                </button>
                <button onClick={() => changePhoto(1)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 5 }}>
                  <i className="fas fa-chevron-right" style={{ color: '#111827', fontSize: '1.25rem' }}></i>
                </button>
                <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.75)', color: 'white', padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, zIndex: 5 }}>
                  {realIdx + 1} / {images.length}
                </div>
              </>}
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: pg.status === 'approved' ? '#2563eb' : '#6b7280', color: 'white', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600, zIndex: 5 }}>
                <i className="fas fa-check-circle" style={{ marginRight: '0.25rem' }}></i>{pg.status === 'approved' ? 'Verified' : 'Unverified'}
              </div>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 5 }}>
                <button onClick={toggleSave} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <i className={`${saved ? 'fas' : 'far'} fa-heart`} style={{ color: saved ? '#ef4444' : '#374151', fontSize: '1.125rem' }}></i>
                </button>
                <button onClick={() => navigator.share ? navigator.share({ title: pg.name, url: window.location.href }) : alert('Share: ' + window.location.href)}
                  style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <i className="fas fa-share-alt" style={{ color: '#374151', fontSize: '1.125rem' }}></i>
                </button>
              </div>
            </div>

            {/* Title */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div>
                  <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>{pg.name}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                    <i className="fas fa-map-marker-alt"></i><span>{pg.address}, {pg.city}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <i className="fas fa-star" style={{ color: '#fbbf24', fontSize: '1rem' }}></i>
                      <span style={{ fontWeight: 600, color: '#111827' }}>{parseFloat(pg.averageRating || 0) > 0 ? parseFloat(pg.averageRating).toFixed(1) : 'New'}</span>
                      {reviews.length > 0 && <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>({reviews.length} reviews)</span>}
                    </div>
                    <span style={{ background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {pg.pgType === 'boys' ? 'Male' : pg.pgType === 'girls' ? 'Female' : pg.pgType || 'Unisex'}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>₹{fmt(rent)}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-door-open" style={{ color: '#2563eb' }}></i>
                  <span style={{ color: '#374151' }}><strong>{pg.availableRooms || 0} rooms</strong> available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-calendar-check" style={{ color: '#2563eb' }}></i>
                  <span style={{ color: '#374151' }}><strong>Immediate</strong> move-in</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>About This Property</h2>
              <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                {pg.description || 'Spacious PG accommodation with all modern amenities. The property is well-maintained and located in a safe neighborhood.'}
              </p>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Amenities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                {(amenities.length > 0 ? amenities : [
                  pg.wifiAvailable && 'WiFi', pg.acAvailable && 'AC', pg.foodIncluded && 'Food',
                  pg.parkingAvailable && 'Parking', pg.laundryAvailable && 'Laundry', 'Security'
                ].filter(Boolean)).map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fas fa-${amenityIcon[a] || 'check'}`} style={{ color: '#2563eb', fontSize: '1.125rem' }}></i>
                    </div>
                    <span style={{ color: '#374151', fontSize: '0.9375rem' }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>House Rules</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(pg.rules ? pg.rules.split('\n').filter(Boolean) : ['No smoking', 'Curfew at 10 PM', 'ID proof required']).map((rule, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <i className="fas fa-check-circle" style={{ color: '#10b981', fontSize: '1.125rem', flexShrink: 0 }}></i>
                    <span style={{ color: '#4b5563', fontSize: '0.9375rem' }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Reviews</h2>
              {reviews.length === 0 ? (
                <p style={{ color: '#9ca3af' }}>No reviews yet. Be the first to review!</p>
              ) : reviews.map(r => (
                <div key={r.id} style={{ padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, flexShrink: 0 }}>
                      {(r.tenant?.fullName || 'T')[0].toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <h4 style={{ margin: 0, fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>{r.tenant?.fullName || 'Tenant'}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <i className="fas fa-star" style={{ color: '#fbbf24', fontSize: '0.875rem' }}></i>
                          <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{r.rating}</span>
                        </div>
                      </div>
                      <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                        {new Date(r.createdAt || r.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                      <p style={{ margin: 0, color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.5 }}>{r.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem', position: 'sticky', top: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Contact Owner</h3>
              {pg.owner && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1.125rem', flexShrink: 0 }}>
                    {(pg.owner.fullName || 'O')[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#111827' }}>{pg.owner.fullName}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>Property Owner</div>
                  </div>
                </div>
              )}
              {btn(bookNow, '#2563eb', <><i className="fas fa-calendar-check"></i> Book Now</>)}
              {btn(sendInquiry, '#2563eb', <><i className="fas fa-paper-plane"></i> Send Inquiry</>)}
              {btn(callOwner, '#2563eb', <><i className="fas fa-phone"></i> {pg.owner?.phone || '+91 98765 43210'}</>)}
              <button onClick={() => navigate(`/find-roommate?pgId=${id}&pgName=${encodeURIComponent(pg.name || '')}`)}
                style={{ width: '100%', padding: '0.875rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9375rem', transition: 'opacity 0.2s' }}
                onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                <i className="fas fa-users"></i> Find Roommate Here
              </button>
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Quick Info</h4>
                {[['Rent', `₹${fmt(rent)}/mo`], ['Security Deposit', `₹${fmt(deposit)}`], ['Total Rooms', pg.totalRooms || '-'], ['Available', pg.availableRooms || '-'], ['Response Rate', '95%'], ['Response Time', 'Within 2 hours']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem', fontSize: '0.875rem' }}>
                    <span style={{ color: '#6b7280' }}>{k}</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
