/**
 * Input — form input with label and error
 * Props: label, id, type, value, onChange, placeholder, error, required, icon
 */
export default function Input({ label, id, type = 'text', value, onChange, placeholder, error, required, icon, style = {} }) {
  return (
    <div style={{ marginBottom: '1.25rem', ...style }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>
          {label}{required && <span style={{ color: '#ef4444', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <i className={`fas fa-${icon}`} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
        )}
        <input
          id={id} type={type} value={value} onChange={onChange}
          placeholder={placeholder} required={required}
          style={{
            width: '100%', padding: icon ? '0.75rem 1rem 0.75rem 2.5rem' : '0.75rem 1rem',
            border: `1px solid ${error ? '#fca5a5' : '#d1d5db'}`, borderRadius: '0.5rem',
            fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s'
          }}
          onFocus={e => e.target.style.borderColor = '#2563eb'}
          onBlur={e => e.target.style.borderColor = error ? '#fca5a5' : '#d1d5db'}
        />
      </div>
      {error && <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>{error}</p>}
    </div>
  );
}
