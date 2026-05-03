/**
 * SearchBar — input with search icon
 * Props: value, onChange, onSearch (enter key), placeholder, style
 */
export default function SearchBar({ value, onChange, onSearch, placeholder = 'Search...', style = {} }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && onSearch) onSearch(value);
  };

  return (
    <div style={{ position: 'relative', ...style }}>
      <i className="fas fa-search" style={{
        position: 'absolute', left: '0.875rem', top: '50%',
        transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1rem'
      }}></i>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem',
          border: '1px solid #d1d5db', borderRadius: '0.5rem',
          fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.2s'
        }}
        onFocus={e => e.target.style.borderColor = '#2563eb'}
        onBlur={e => e.target.style.borderColor = '#d1d5db'}
      />
    </div>
  );
}
