/**
 * StatCard — dashboard stat card with icon, value, label
 * Props: label, value, icon, color, trend (optional: { value, up })
 */
export default function StatCard({ label, value, icon, color = '#2563eb', trend, style = {} }) {
  return (
    <div style={{
      background: 'white', borderRadius: '1rem', padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      ...style
    }}>
      <div>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>{label}</p>
        <p style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', margin: 0 }}>{value}</p>
        {trend && (
          <p style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0', color: trend.up ? '#10b981' : '#ef4444' }}>
            <i className={`fas fa-arrow-${trend.up ? 'up' : 'down'}`} style={{ marginRight: '0.25rem' }}></i>
            {trend.value}
          </p>
        )}
      </div>
      <div style={{
        width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${color}20`
      }}>
        <i className={`fas fa-${icon}`} style={{ fontSize: '1.5rem', color }}></i>
      </div>
    </div>
  );
}
