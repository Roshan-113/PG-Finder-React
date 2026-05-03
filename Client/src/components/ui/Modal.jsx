/**
 * Modal — overlay dialog
 * Props: open, onClose, title, children, size (sm|md|lg)
 */
const sizes = { sm: '400px', md: '560px', lg: '720px' };

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: '1rem'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'white', borderRadius: '1rem', width: '100%',
        maxWidth: sizes[size] || sizes.md, maxHeight: '90vh',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '1.25rem', padding: '0.25rem', borderRadius: '0.375rem' }}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        {/* Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
