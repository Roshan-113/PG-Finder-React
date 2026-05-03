/**
 * EmptyState — shown when no data is available
 * Props: icon, title, description, action (optional: { label, onClick })
 */
export default function EmptyState({ icon = 'inbox', title = 'Nothing here', description, action }) {
  return (
    <div style={{
      background: 'white', borderRadius: '1rem', padding: '4rem 2rem',
      textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    }}>
      <i className={`fas fa-${icon}`} style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#374151' }}>{title}</h3>
      {description && <p style={{ margin: '0 0 1.5rem 0', color: '#6b7280', fontSize: '0.9375rem' }}>{description}</p>}
      {action && (
        <button onClick={action.onClick} style={{
          padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white',
          border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9375rem'
        }}>
          {action.label}
        </button>
      )}
    </div>
  );
}
