/**
 * Alert — success/error/warning/info message
 * Props: type (success|error|warning|info), message, onClose
 */
const types = {
  success: { bg: '#f0fdf4', border: '#86efac', color: '#166534', icon: 'check-circle' },
  error:   { bg: '#fef2f2', border: '#fecaca', color: '#991b1b', icon: 'exclamation-circle' },
  warning: { bg: '#fffbeb', border: '#fde68a', color: '#92400e', icon: 'exclamation-triangle' },
  info:    { bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af', icon: 'info-circle' },
};

export default function Alert({ type = 'info', message, onClose }) {
  if (!message) return null;
  const t = types[type] || types.info;

  return (
    <div style={{
      background: t.bg, border: `1px solid ${t.border}`, borderRadius: '0.5rem',
      padding: '1rem 1.25rem', marginBottom: '1.5rem',
      display: 'flex', alignItems: 'center', gap: '0.75rem'
    }}>
      <i className={`fas fa-${t.icon}`} style={{ color: t.color, fontSize: '1.25rem', flexShrink: 0 }}></i>
      <span style={{ color: t.color, fontSize: '0.875rem', flex: 1 }}>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.color, fontSize: '1rem', padding: '0.125rem' }}>
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  );
}
