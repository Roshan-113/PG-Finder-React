export default function AdminTestPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Test Page</h1>
      <p style={styles.headerP}>Admin testing and debugging area</p>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>System Information</h3>
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.label}>Environment:</span>
            <span style={styles.value}>Development</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Version:</span>
            <span style={styles.value}>1.0.0</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Database:</span>
            <span style={styles.value}>Connected</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Cache:</span>
            <span style={styles.value}>Active</span>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Quick Actions</h3>
        <div style={styles.buttonGrid}>
          <button onClick={() => alert('Cache cleared!')} style={styles.btn}>Clear Cache</button>
          <button onClick={() => alert('Database optimized!')} style={styles.btn}>Optimize Database</button>
          <button onClick={() => alert('Logs exported!')} style={styles.btn}>Export Logs</button>
          <button onClick={() => alert('Backup created!')} style={styles.btn}>Create Backup</button>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Test Console</h3>
        <textarea placeholder="Enter test commands..." rows="10" style={styles.textarea}></textarea>
        <button onClick={() => alert('Command executed!')} style={styles.btnPrimary}>Execute</button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem' },
  h1: { margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' },
  headerP: { margin: '0 0 2rem 0', color: '#6b7280' },
  card: { background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' },
  cardTitle: { margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' },
  infoItem: { display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem' },
  label: { fontSize: '0.875rem', color: '#6b7280' },
  value: { fontSize: '0.875rem', fontWeight: 600, color: '#111827' },
  buttonGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' },
  btn: { padding: '0.75rem 1rem', background: '#f3f4f6', color: '#374151', borderRadius: '0.5rem', fontWeight: 500, border: 'none', cursor: 'pointer' },
  textarea: { width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', fontFamily: 'monospace', marginBottom: '1rem', resize: 'vertical' },
  btnPrimary: { padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', borderRadius: '0.5rem', fontWeight: 600, border: 'none', cursor: 'pointer' }
};
