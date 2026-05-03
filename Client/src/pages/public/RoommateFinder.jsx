import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { roommateAPI, bookingAPI } from '../../services/api';

export default function RoommateFinder() {
  const navigate = useNavigate();
  const location = useLocation();
  const pgIdFilter = new URLSearchParams(location.search).get('pgId');
  const pgNameFilter = new URLSearchParams(location.search).get('pgName');

  const [tab, setTab] = useState('find');
  const [gender, setGender] = useState('all');
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myBooking, setMyBooking] = useState(null);
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
  const isLoggedIn = !!user.id;

  useEffect(() => {
    const params = {};
    if (pgIdFilter) params.pgId = pgIdFilter;

    // Fetch roommates from API + also fetch current user's booking for context
    const fetchData = async () => {
      try {
        // Try to get roommates from API
        const r = await roommateAPI.getAll(params);
        const apiRoommates = r.data || [];

        // Also get current user's active booking to build a self-entry if needed
        let booking = null;
        if (isLoggedIn) {
          try {
            const br = await bookingAPI.getMyBookings();
            const bookings = br.data || [];
            booking = bookings.find(b =>
              b.status === 'confirmed' || b.status === 'active' || b.status === 'pending'
            ) || null;
            setMyBooking(booking);
          } catch { /* ignore */ }
        }

        // If API returned data, use it
        if (apiRoommates.length > 0) {
          setRoommates(apiRoommates);
        } else if (booking) {
          // Build a self-entry from the booking so the page isn't empty
          const selfEntry = {
            userId: user.id,
            name: user.name || user.fullName || 'You',
            profileImage: user.profileImage || null,
            city: booking.pg?.city || booking.city || '',
            pgName: booking.pg?.name || booking.pgName || '',
            pgId: booking.pgId || booking.pg?.id,
            roomNumber: booking.room?.roomNumber || booking.roomNumber || '',
            availableRooms: booking.pg?.availableRooms || 0,
            pgType: booking.pg?.pgType || '',
            verified: true,
            isSelf: true,
          };
          // Only show self-entry if it matches the pgId filter (or no filter)
          if (!pgIdFilter || String(selfEntry.pgId) === String(pgIdFilter)) {
            setRoommates([selfEntry]);
          } else {
            setRoommates([]);
          }
        } else {
          setRoommates([]);
        }
      } catch {
        setRoommates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pgIdFilter, isLoggedIn]);

  const filtered = gender === 'all' ? roommates : roommates.filter(r => {
    if (gender === 'male') return r.pgType === 'boys' || r.pgType === 'co-living';
    if (gender === 'female') return r.pgType === 'girls' || r.pgType === 'co-living';
    return true;
  });

  const connectRoommate = (rm) => {
    if (rm.isSelf) return; // can't message yourself
    if (!isLoggedIn) {
      if (window.confirm('You need to login to send a message. Login now?')) navigate('/login');
      return;
    }
    navigate('/tenant/messages', { state: { openUserId: rm.userId, openUserName: rm.name } });
  };

  const viewProfile = (rm) => {
    navigate(`/roommate-profile/${rm.userId}`);
  };

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>Find Your Perfect Roommate</h1>
        <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>Connect with compatible roommates in your PG</p>

        {/* PG Filter Banner */}
        {pgNameFilter && (
          <div style={{ background: 'linear-gradient(135deg,#10b981,#059669)', color: 'white', padding: '1rem 1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <i className="fas fa-home" style={{ fontSize: '1.5rem' }}></i>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>Showing roommates in:</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{decodeURIComponent(pgNameFilter)}</div>
              </div>
            </div>
            <button onClick={() => navigate('/find-roommate')}
              style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
              <i className="fas fa-times" style={{ marginRight: '0.375rem' }}></i>Show All
            </button>
          </div>
        )}

        {/* My Booking Info Banner — shown when user has a booking */}
        {isLoggedIn && myBooking && !pgNameFilter && (
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.75rem', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <i className="fas fa-home" style={{ color: '#2563eb', fontSize: '1.25rem' }}></i>
              <div>
                <div style={{ fontWeight: 600, color: '#1e40af', fontSize: '0.9375rem' }}>Your current PG: {myBooking.pg?.name || myBooking.pgName}</div>
                <div style={{ fontSize: '0.8125rem', color: '#3b82f6' }}>Find roommates staying in the same PG as you</div>
              </div>
            </div>
            <button
              onClick={() => navigate(`/find-roommate?pgId=${myBooking.pgId || myBooking.pg?.id}&pgName=${encodeURIComponent(myBooking.pg?.name || myBooking.pgName || '')}`)}
              style={{ background: '#2563eb', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
              <i className="fas fa-users" style={{ marginRight: '0.375rem' }}></i>My PG Roommates
            </button>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '2px solid #e5e7eb' }}>
          {[{ id: 'find', icon: 'users', label: 'Find Roommate' }, { id: 'post', icon: 'plus-circle', label: 'Post Requirement' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding: '1rem 1.5rem', background: 'none', border: 'none', borderBottom: `3px solid ${tab === t.id ? '#2563eb' : 'transparent'}`, color: tab === t.id ? '#2563eb' : '#6b7280', fontWeight: 600, cursor: 'pointer', fontSize: '0.9375rem', marginBottom: '-2px' }}>
              <i className={`fas fa-${t.icon}`} style={{ marginRight: '0.5rem' }}></i>{t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
          {/* Sidebar */}
          <div>
            <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Filters</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value)}
                  style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none' }}>
                  <option value="all">All</option>
                  <option value="male">Male (Boys PG)</option>
                  <option value="female">Female (Girls PG)</option>
                </select>
              </div>
              <button onClick={() => setGender('all')}
                style={{ width: '100%', padding: '0.75rem', background: 'white', color: '#2563eb', fontWeight: 600, border: '1px solid #2563eb', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                Clear Filters
              </button>
            </div>

            {/* How it works */}
            <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: '1rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>How it works</h3>
              {[
                ['1', 'Book a PG', 'Complete your booking to appear in the list'],
                ['2', 'Get matched', 'Tenants in the same PG can find you'],
                ['3', 'Connect', 'Chat and coordinate with your roommates'],
              ].map(([num, title, desc]) => (
                <div key={num} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', fontWeight: 700, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{num}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{title}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.8125rem' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main */}
          <div>
            {tab === 'find' && (
              <>
                <div style={{ marginBottom: '1.5rem', color: '#6b7280', fontSize: '0.9375rem' }}>
                  <strong style={{ color: '#111827' }}>{filtered.length} roommate{filtered.length !== 1 ? 's' : ''}</strong> found
                  {pgNameFilter && <> in <strong>{decodeURIComponent(pgNameFilter)}</strong></>}
                </div>

                {loading ? (
                  <div style={{ background: 'white', borderRadius: '1rem', padding: '4rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: '2.5rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
                    <p style={{ color: '#6b7280', margin: 0 }}>Loading roommates...</p>
                  </div>
                ) : filtered.length === 0 ? (
                  <div style={{ background: 'white', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <i className="fas fa-users" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
                    <h3 style={{ color: '#374151', margin: '0 0 0.5rem 0' }}>No roommates found</h3>
                    <p style={{ color: '#6b7280', margin: '0 0 1.5rem 0' }}>
                      {pgNameFilter
                        ? `No tenants found in ${decodeURIComponent(pgNameFilter)} yet. Be the first to book!`
                        : isLoggedIn
                          ? 'No tenants with active bookings found yet.'
                          : 'Login to see roommates in your PG.'}
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {pgNameFilter && (
                        <button onClick={() => navigate('/find-roommate')}
                          style={{ padding: '0.75rem 1.5rem', background: 'white', color: '#2563eb', border: '2px solid #2563eb', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                          Browse All Roommates
                        </button>
                      )}
                      {!isLoggedIn && (
                        <button onClick={() => navigate('/login')}
                          style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                          Login to Continue
                        </button>
                      )}
                      {isLoggedIn && !myBooking && (
                        <button onClick={() => navigate('/find-pg')}
                          style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                          <i className="fas fa-search" style={{ marginRight: '0.375rem' }}></i>Find a PG First
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}>
                    {filtered.map(rm => (
                      <div key={rm.userId}
                        style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'box-shadow 0.2s', position: 'relative' }}
                        onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                        onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>

                        {/* Self badge */}
                        {rm.isSelf && (
                          <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: '#dbeafe', color: '#1e40af', fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '9999px' }}>
                            You
                          </div>
                        )}

                        {/* Avatar + Name */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1rem' }}>
                          {rm.profileImage ? (
                            <img src={rm.profileImage} alt={rm.name}
                              style={{ width: '5rem', height: '5rem', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.75rem', border: '3px solid #dbeafe' }} />
                          ) : (
                            <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>
                              {(rm.name || 'U')[0].toUpperCase()}
                            </div>
                          )}
                          <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>{rm.name}</h3>
                          {rm.verified && (
                            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                              <i className="fas fa-check-circle" style={{ marginRight: '0.25rem' }}></i>Verified
                            </span>
                          )}
                        </div>

                        {/* Location */}
                        {rm.city && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                            <i className="fas fa-map-marker-alt" style={{ color: '#2563eb' }}></i>
                            <span>{rm.city}</span>
                          </div>
                        )}

                        {/* PG Info */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', background: '#f0f9ff', padding: '0.625rem 0.75rem', borderRadius: '0.5rem' }}>
                          <i className="fas fa-home" style={{ color: '#0369a1' }}></i>
                          <span style={{ color: '#0369a1', fontSize: '0.875rem', fontWeight: 600, flex: 1 }}>
                            {rm.pgName || 'Looking for PG'}
                          </span>
                          {rm.roomNumber && (
                            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '0.125rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                              Room {rm.roomNumber}
                            </span>
                          )}
                        </div>

                        {/* Available seats */}
                        {rm.availableRooms > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', background: '#f0fdf4', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                            onClick={() => navigate(`/booking/form/${rm.pgId}`, { state: { pgId: rm.pgId } })}>
                            <i className="fas fa-door-open" style={{ color: '#16a34a' }}></i>
                            <span style={{ color: '#16a34a', fontSize: '0.8125rem', fontWeight: 600 }}>
                              {rm.availableRooms} seat{rm.availableRooms !== 1 ? 's' : ''} available — Book this PG
                            </span>
                            <i className="fas fa-arrow-right" style={{ color: '#16a34a', marginLeft: 'auto', fontSize: '0.75rem' }}></i>
                          </div>
                        )}

                        {/* Buttons */}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => viewProfile(rm)}
                            style={{ flex: 1, padding: '0.75rem', background: 'white', color: '#2563eb', fontWeight: 600, border: '2px solid #2563eb', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}
                            onMouseOver={e => e.currentTarget.style.background = '#eff6ff'}
                            onMouseOut={e => e.currentTarget.style.background = 'white'}>
                            <i className="fas fa-user" style={{ marginRight: '0.375rem' }}></i>View Profile
                          </button>
                          {!rm.isSelf && (
                            <button onClick={() => connectRoommate(rm)}
                              style={{ flex: 1, padding: '0.75rem', background: '#2563eb', color: 'white', fontWeight: 600, border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}
                              onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
                              onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
                              <i className="fas fa-comment" style={{ marginRight: '0.375rem' }}></i>Chat
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {tab === 'post' && (
              <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Post Your Roommate Requirement</h2>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Let others know you're looking for a roommate in your PG.</p>
                {isLoggedIn ? (
                  <div style={{ background: '#f0f9ff', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center' }}>
                    <i className="fas fa-info-circle" style={{ color: '#0369a1', fontSize: '2rem', marginBottom: '0.75rem', display: 'block' }}></i>
                    <p style={{ color: '#0369a1', fontWeight: 600, margin: 0 }}>Your profile is automatically visible to other tenants once you have an active booking.</p>
                    {myBooking && (
                      <p style={{ color: '#0369a1', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
                        You are currently listed for <strong>{myBooking.pg?.name || myBooking.pgName}</strong>.
                      </p>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Please login to post your requirement.</p>
                    <button onClick={() => navigate('/login')}
                      style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                      Login Now
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
