/**
 * Badge Component
 * variants: primary | secondary | success | warning | danger | blue | green | yellow | red | purple
 */
const variantStyles = {
  primary:   { background: '#dbeafe', color: '#1e40af' },
  secondary: { background: '#f3f4f6', color: '#374151' },
  success:   { background: '#d1fae5', color: '#065f46' },
  warning:   { background: '#fef3c7', color: '#92400e' },
  danger:    { background: '#fee2e2', color: '#991b1b' },
  blue:      { background: '#dbeafe', color: '#1e40af' },
  green:     { background: '#d1fae5', color: '#065f46' },
  yellow:    { background: '#fef3c7', color: '#92400e' },
  red:       { background: '#fee2e2', color: '#991b1b' },
  purple:    { background: '#ede9fe', color: '#5b21b6' },
};

export default function Badge({ children, variant = 'primary', style = {} }) {
  const vs = variantStyles[variant] || variantStyles.primary;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '0.25rem 0.75rem', borderRadius: '9999px',
      fontSize: '0.75rem', fontWeight: 600,
      ...vs, ...style
    }}>
      {children}
    </span>
  );
}
