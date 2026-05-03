/**
 * Table — reusable data table
 * Props: columns [{ key, label, render }], data [], emptyText
 */
export default function Table({ columns = [], data = [], emptyText = 'No data found' }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{
                padding: '0.75rem 1rem', textAlign: 'left',
                fontSize: '0.75rem', fontWeight: 600, color: '#6b7280',
                textTransform: 'uppercase', letterSpacing: '0.05em'
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.15s' }}
              onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
              onMouseOut={e => e.currentTarget.style.background = 'white'}>
              {columns.map(col => (
                <td key={col.key} style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#111827' }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
