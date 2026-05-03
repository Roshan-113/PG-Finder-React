/**
 * RoommateCard — displays a roommate profile card
 * Props: roommate { id, name, age, gender, profession, city, locality, budget, preferences, image, verified }
 *        onConnect, onViewProfile, compatibility
 */
export default function RoommateCard({ roommate: rm, onConnect, onViewProfile, compatibility }) {
  return (
    <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'box-shadow 0.2s' }}
      onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
      onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>

      {/* Avatar + Name */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1rem' }}>
        {rm.image ? (
          <img src={rm.image} alt={rm.name} style={{ width: '5rem', height: '5rem', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.75rem', border: '3px solid #dbeafe' }} />
        ) : (
          <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>
            {rm.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>{rm.name}</h3>
        <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.875rem' }}>{rm.profession}, {rm.age}</p>
        {rm.verified && (
          <span style={{ background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
            <i className="fas fa-check-circle" style={{ marginRight: '0.25rem' }}></i>Verified
          </span>
        )}
      </div>

      {/* Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
        <i className="fas fa-map-marker-alt" style={{ color: '#2563eb' }}></i>
        <span>{rm.locality}, {rm.city}</span>
      </div>

      {/* Budget */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
        <i className="fas fa-rupee-sign" style={{ color: '#2563eb' }}></i>
        <span>Budget: ₹{rm.budget}</span>
      </div>

      {/* Preferences */}
      {rm.preferences && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {[rm.preferences.foodHabits, rm.preferences.smoking === 'No' ? 'Non-Smoker' : 'Smoker', rm.preferences.sleepSchedule].filter(Boolean).map(p => (
            <span key={p} style={{ background: '#f3f4f6', color: '#374151', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem' }}>{p}</span>
          ))}
        </div>
      )}

      {/* Compatibility */}
      {compatibility && (
        <div style={{ background: '#f0f9ff', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#0369a1', fontSize: '0.875rem', fontWeight: 600 }}>Compatibility</span>
            <span style={{ color: '#0369a1', fontSize: '1.25rem', fontWeight: 700 }}>{compatibility}%</span>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <button onClick={onViewProfile} style={{ padding: '0.75rem', background: 'white', color: '#2563eb', fontWeight: 600, border: '2px solid #2563eb', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
          <i className="fas fa-user" style={{ marginRight: '0.375rem' }}></i>View Profile
        </button>
        <button onClick={onConnect} style={{ padding: '0.75rem', background: '#2563eb', color: 'white', fontWeight: 600, border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
          <i className="fas fa-comment" style={{ marginRight: '0.375rem' }}></i>Chat
        </button>
      </div>
    </div>
  );
}
