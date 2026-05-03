/**
 * Button Component
 * variants: primary | secondary | outline | ghost | danger | success
 * sizes: sm | md | lg
 */
const variants = {
  primary:   { background: '#2563eb', color: 'white', border: 'none' },
  secondary: { background: '#6b7280', color: 'white', border: 'none' },
  outline:   { background: 'transparent', color: '#2563eb', border: '2px solid #2563eb' },
  ghost:     { background: 'transparent', color: '#374151', border: 'none' },
  danger:    { background: '#ef4444', color: 'white', border: 'none' },
  success:   { background: '#10b981', color: 'white', border: 'none' },
};

const sizes = {
  sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
  md: { padding: '0.5rem 1rem',      fontSize: '1rem' },
  lg: { padding: '0.75rem 1.5rem',   fontSize: '1.125rem' },
};

export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled = false, type = 'button', style = {}, icon }) {
  const vs = variants[variant] || variants.primary;
  const sz = sizes[size] || sizes.md;

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
      borderRadius: '0.5rem', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, transition: 'all 0.2s', fontFamily: 'inherit',
      ...vs, ...sz, ...style
    }}>
      {icon && <i className={`fas fa-${icon}`}></i>}
      {children}
    </button>
  );
}
