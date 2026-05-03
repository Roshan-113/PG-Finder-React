/**
 * Tabs — tab switcher
 * Props: tabs [{ id, label, icon }], active, onChange
 */
export default function Tabs({ tabs = [], active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '2px solid #e5e7eb', marginBottom: '1.5rem' }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onChange(tab.id)} style={{
          padding: '0.875rem 1.25rem', background: 'none', border: 'none',
          borderBottom: `3px solid ${active === tab.id ? '#2563eb' : 'transparent'}`,
          color: active === tab.id ? '#2563eb' : '#6b7280',
          fontWeight: 600, cursor: 'pointer', fontSize: '0.9375rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          transition: 'all 0.2s', marginBottom: '-2px'
        }}>
          {tab.icon && <i className={`fas fa-${tab.icon}`}></i>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
