import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState({ msg: '', type: '' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3500);
  };

  useEffect(() => {
    setLoading(true);
    const fn = filter === 'pending' ? adminAPI.getPendingPGs() : adminAPI.getAllPGs(filter !== 'all' ? { status: filter } : {});
    fn.then(res => setListings(res.data || []))
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  }, [filter]);

  const approve = async (id, name) => {
    try {
      await adminAPI.approvePG(id);
      setListings(prev => prev.map(l => l.id === id ? { ...l, status: 'approved' } : l));
      showToast(`"${name}" approved`);
    } catch (err) { showToast(err.message, 'error'); }
  };

  const reject = async (id, name) => {
    if (!window.confirm(`Reject "${name}"?`)) return;
    try {
      await adminAPI.rejectPG(id);
      setListings(prev => prev.map(l => l.id === id ? { ...l, status: 'rejected' } : l));
      showToast(`"${name}" rejected`);
    } catch (err) { showToast(err.message, 'error'); }
  };

  const statusBadge = (status) => {
    const map = { approved: ['#d1fae5','#065f46'], pending: ['#fef3c7','#92400e'], rejected: ['#fee2e2','#991b1b'], inactive: ['#f3f4f6','#374151'] };
    const [bg, color] = map[status] || map.inactive;
    return <span style={{ padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: bg, color }}>{status}</span>;
  };

  return (
    <div>
      {toast.msg && (
        <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, padding: '0.875rem 1.25rem', borderRadius: '0.75rem', background: toast.type === 'error' ? '#fee2e2' : '#d1fae5', color: toast.type === 'error' ? '#991b1b' : '#065f46', border: `1px solid ${toast.type === 'error' ? '#fca5a5' : '#6ee7b7'}`, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: 500 }}>
          <i className={`fas fa-${toast.type === 'error' ? 'exclamation-circle' : 'check-circle'}`} style={{ marginRight: '0.5rem' }}></i>{toast.msg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.875rem', fontWeight: 700, color: '#111827' }}>PG Listings</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Manage all PG listings on the platform</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all','pending','approved','rejected'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              style={{ padding: '0.5rem 1rem', border: '1px solid', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem', background: filter === s ? '#2563eb' : 'white', color: filter === s ? 'white' : '#374151', borderColor: filter === s ? '#2563eb' : '#d1d5db' }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Loading...</div>
      ) : (
        <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['ID','Title','Owner','City','Rent','Status','Actions'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>No listings found</td></tr>
              ) : listings.map(pg => (
                <tr key={pg.id} style={{ borderBottom: '1px solid #f3f4f6' }}
                  onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                  onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>{pg.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{pg.name}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{pg.owner?.fullName || '-'}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{pg.city}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827', fontWeight: 600 }}>
                    ₹{Number(pg.rentPerMonth || pg.rent_per_month || 0).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '1rem' }}>{statusBadge(pg.status)}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      <a href={`/pg/${pg.id}`} target="_blank" rel="noopener noreferrer"
                        style={{ padding: '0.375rem 0.625rem', background: '#dbeafe', color: '#1e40af', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.75rem' }}>
                        <i className="fas fa-eye"></i>
                      </a>
                      {pg.status === 'pending' && (
                        <>
                          <button onClick={() => approve(pg.id, pg.name)}
                            style={{ padding: '0.375rem 0.625rem', background: '#d1fae5', color: '#065f46', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem' }}>
                            <i className="fas fa-check"></i>
                          </button>
                          <button onClick={() => reject(pg.id, pg.name)}
                            style={{ padding: '0.375rem 0.625rem', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem' }}>
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
