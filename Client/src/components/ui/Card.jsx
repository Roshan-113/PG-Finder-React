/**
 * Card Component
 * hover: true/false — adds hover shadow effect
 */
export default function Card({ children, hover = false, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: 'white', borderRadius: '1rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #f3f4f6',
      cursor: hover ? 'pointer' : 'default',
      transition: hover ? 'box-shadow 0.2s' : 'none',
      ...style
    }}
      onMouseOver={hover ? e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)' : undefined}
      onMouseOut={hover ? e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)' : undefined}>
      {children}
    </div>
  );
}
