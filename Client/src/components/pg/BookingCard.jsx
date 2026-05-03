/**
 * BookingCard — displays a booking summary card
 * Props: booking { id, pgName, locality, city, checkInDate, rent, status, roomNumber, occupancyType }
 *        onCancel, onViewDetails
 */
const statusStyles = {
  confirmed: { bg: '#d1fae5', color: '#065f46' },
  active:    { bg: '#dbeafe', color: '#1e40af' },
  pending:   { bg: '#fef3c7', color: '#92400e' },
  cancelled: { bg: '#fee2e2', color: '#991b1b' },
  completed: { bg: '#f3f4f6', color: '#374151' },
};

export default function BookingCard({ booking: b, onCancel, onViewDetails }) {
  const ss = statusStyles[b.status] || statusStyles.pending;

  return (
    <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>{b.pgName}</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <i className="fas fa-map-marker-alt"></i>{b.locality}, {b.city}
          </p>
        </div>
        <span style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: ss.bg, color: ss.color }}>
          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        {[
          { icon: 'calendar', label: 'Check-in', value: new Date(b.checkInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
          { icon: 'rupee-sign', label: 'Monthly Rent', value: `₹${b.rent?.toLocaleString('en-IN')}` },
          { icon: 'door-open', label: 'Room', value: b.roomNumber || 'TBD' },
        ].map(item => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <i className={`fas fa-${item.icon}`} style={{ color: '#2563eb', marginBottom: '0.25rem', display: 'block' }}></i>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.label}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {onViewDetails && (
          <button onClick={onViewDetails} style={{ flex: 1, padding: '0.625rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
            View Details
          </button>
        )}
        {onCancel && b.status === 'pending' && (
          <button onClick={onCancel} style={{ flex: 1, padding: '0.625rem', background: 'white', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
