import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roommateAPI } from '../../services/api';

export default function RoommateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
  const isLoggedIn = !!user.id;

  useEffect(() => {
    roommateAPI.getById(id)
      .then(r => setProfile(r.data))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSendMessage = () => {
    if (!isLoggedIn) {
      if (window.confirm('You need to login to send messages. Login now?')) navigate('/login');
      return;
    }
    navigate('/tenant/messages', { state: { openUserId: profile.userId, openUserName: profile.name } });
  };

  const handleBookPG = () => {
    if (!isLoggedIn) {
      if (window.confirm('You need to login to book. Login now?')) navigate('/login');
      return;
    }
    navigate(`/booking/form/${profile.pgId}`, { state: { pgId: profile.pgId } });
  };

  if (loading) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}></i>
      Loading profile...
    </div>
  );

  if (!profile) return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '2rem 0' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem' }}>
        <button onClick={() => navigate('/find-roommate')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          <i className="fas fa-arrow-left"></i> Back to Roommate Finder
        </button>
        <div style={{ background: 'white', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <i className="fas fa-user-slash" style={{ fontSize: '3rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ color: '#374151', margin: '0 0 0.5rem 0' }}>Profile Not Found</h3>
          <p style={{ color: '#6b7280', margin: '0 0 1.5rem 0' }}>This roommate profile doesn't exist or is no longer available.</p>
          <button onClick={() => navigate('/find-roommate')}
            style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
            Browse Roommates
          </button>
        </div>
      </div>
    </div>
  );

  const fmt = (n) => parseFloat(n || 0).toLocaleString('en-IN');

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '2rem 0' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem' }}>
        <button onClick={() => navigate('/find-roommate')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginBottom: '1.5rem', textDecoration: 'none' }}
          onMouseOver={e => e.currentTarget.style.color = '#111827'}
          onMouseOut={e => e.currentTarget.style.color = '#6b7280'}>
          <i className="fas fa-arrow-left"></i> Back to Roommate Finder
        </button>

        <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {/* Profile Header */}
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #e5e7eb', flexWrap: 'wrap' }}>
            {profile.profileImage ? (
              <img src={profile.profileImage} alt={profile.name}
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #dbeafe', flexShrink: 0 }} />
            ) : (
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                {(profile.name || 'U')[0].toUpperCase()}
              </div>
            )}

            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>{profile.name}</h1>
                  {profile.verified && (
                    <span style={{ background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                      <i className="fas fa-check-circle" style={{ marginRight: '0.25rem' }}></i>Verified Tenant
                    </span>
                  )}
                </div>
                <div style={{ background: '#f0f9ff', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center', minWidth: '90px' }}>
                  <div style={{ color: '#0369a1', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Match</div>
                  <div style={{ color: '#0369a1', fontSize: '1.75rem', fontWeight: 700 }}>90%</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {profile.city && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#2563eb', width: '14px' }}></i>
                    <span>{profile.city}</span>
                  </div>
                )}
                {profile.pgName && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    <i className="fas fa-home" style={{ color: '#2563eb', width: '14px' }}></i>
                    <span><strong>PG:</strong> {profile.pgName}
                      {profile.roomNumber && <> &bull; <strong>Room:</strong> {profile.roomNumber}</>}
                    </span>
                  </div>
                )}
                {profile.rentPerMonth && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    <i className="fas fa-rupee-sign" style={{ color: '#2563eb', width: '14px' }}></i>
                    <span>₹{fmt(profile.rentPerMonth)}/month</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={handleSendMessage}
                  style={{ padding: '0.75rem 2rem', background: '#2563eb', color: 'white', fontWeight: 600, border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9375rem' }}
                  onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
                  onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
                  <i className="fas fa-comment" style={{ marginRight: '0.5rem' }}></i>Send Message
                </button>
                {profile.availableRooms > 0 && (
                  <button onClick={handleBookPG}
                    style={{ padding: '0.75rem 2rem', background: '#10b981', color: 'white', fontWeight: 600, border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9375rem' }}
                    onMouseOver={e => e.currentTarget.style.background = '#059669'}
                    onMouseOut={e => e.currentTarget.style.background = '#10b981'}>
                    <i className="fas fa-door-open" style={{ marginRight: '0.5rem' }}></i>
                    Book This PG ({profile.availableRooms} seat{profile.availableRooms !== 1 ? 's' : ''} available)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* PG Available Seats Banner */}
          {profile.availableRooms > 0 && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <i className="fas fa-door-open" style={{ color: '#16a34a', fontSize: '1.25rem' }}></i>
                <div>
                  <div style={{ fontWeight: 600, color: '#15803d' }}>{profile.availableRooms} seat{profile.availableRooms !== 1 ? 's' : ''} available in {profile.pgName}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#16a34a' }}>You can join the same PG as this roommate!</div>
                </div>
              </div>
              <button onClick={handleBookPG}
                style={{ padding: '0.5rem 1.25rem', background: '#16a34a', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', whiteSpace: 'nowrap' }}
                onMouseOver={e => e.currentTarget.style.background = '#15803d'}
                onMouseOut={e => e.currentTarget.style.background = '#16a34a'}>
                Book Now
              </button>
            </div>
          )}

          {/* About */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>About</h2>
            <p style={{ color: '#6b7280', lineHeight: 1.7, margin: 0 }}>
              Hi! I'm {profile.name}, currently staying at {profile.pgName || 'a PG'} in {profile.city || 'Bangalore'}.
              I'm looking for a compatible roommate who values cleanliness and mutual respect.
              Feel free to message me to know more!
            </p>
          </div>

          {/* Lifestyle */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Lifestyle Preferences</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.75rem' }}>
              {[
                { icon: 'smoking-ban', color: '#22c55e', label: 'Non-Smoker' },
                { icon: 'broom', color: '#3b82f6', label: 'Clean & Organized' },
                { icon: 'moon', color: '#8b5cf6', label: 'Respectful Hours' },
                { icon: 'handshake', color: '#f59e0b', label: 'Friendly' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                  <i className={`fas fa-${item.icon}`} style={{ color: item.color, fontSize: '1.125rem' }}></i>
                  <span style={{ color: '#374151', fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Looking For */}
          <div>
            <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Looking For</h2>
            <div style={{ background: '#f0f9ff', borderRadius: '0.75rem', padding: '1.25rem' }}>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#374151', lineHeight: 1.9 }}>
                <li>Respectful and responsible roommate</li>
                <li>Someone who values cleanliness</li>
                <li>Prefers a quiet, peaceful environment</li>
                <li>Shares similar lifestyle habits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
