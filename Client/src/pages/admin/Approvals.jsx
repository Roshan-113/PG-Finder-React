import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

export default function AdminApprovals() {
  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ msg: '', type: '' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3500);
  };

  useEffect(() => {
    adminAPI.getPendingPGs()
      .then(res => setPGs(res.data || []))
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  }, []);

  const approve = async (id, name) => {
    try {
      await adminAPI.approvePG(id);
      setPGs(prev => prev.filter(p => p.id !== id));
      showToast('"' + name + '" approved successfully');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const reject = async (id, name) => {
    if (!window.confirm('Reject "' + name + '"?')) return;
    try {
      await adminAPI.rejectPG(id);
      setPGs(prev => prev.filter(p => p.id !== id));
      showToast('"' + name + '" rejected');
    } catch (err) { showToast(err.message, 'error'); }
  };

  return (
    <div>
      {toast.msg && (
        <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, padding: '0.875rem 1.25rem', borderRadius: '0.75rem', background: toast.type === 'error' ? '#fee2e2' : '#d1fae5', color: toast.type === 'error' ? '#991b1b' : '#065f46', border: '1px solid ' + (toast.type === 'error' ? '#fca5a5' : '#6ee7b7'), boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: 500 }}>
          <i className={'fas fa-' + (toast.type === 'error' ? 'exclamation-circle' : 'check-circle')} style={{ marginRight: '0.5rem' }}></i>{toast.msg}
        </div>
      )}

      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 700, color: '#111827' }}>Owner Verification</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Review and approve pending PG listings</p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Loading...</div>
      ) : pgs.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '1rem', padding: '4rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <i className="fas fa-check-circle" style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>All Caught Up!</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>No pending approvals at this time</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['Owner','Contact','Document / PG','Submitted','Actions'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pgs.map(pg => (
                <tr key={pg.id} style={{ borderBottom: '1px solid #f3f4f6' }}
                  onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                  onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{pg.owner ? pg.owner.fullName : '-'}</div>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.8125rem' }}>
                    <div style={{ color: '#4b5563' }}>{pg.owner ? pg.owner.email : '-'}</div>
                    <div style={{ color: '#6b7280' }}>{pg.owner ? (pg.owner.phone || '-') : '-'}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{pg.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>{pg.city}, {pg.state}</div>
                    <span style={{ padding: '0.125rem 0.5rem', background: '#f3f4f6', color: '#374151', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 500 }}>{pg.pgType}</span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    {new Date(pg.createdAt || pg.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <a href={'/pg/' + pg.id} target="_blank" rel="noopener noreferrer"
                        style={{ padding: '0.375rem 0.625rem', background: '#dbeafe', color: '#1e40af', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.75rem' }}>
                        <i className="fas fa-eye"></i>
                      </a>
                      <button onClick={() => approve(pg.id, pg.name)}
                        style={{ padding: '0.375rem 0.625rem', background: '#d1fae5', color: '#065f46', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem' }}>
                        <i className="fas fa-check"></i>
                      </button>
                      <button onClick={() => reject(pg.id, pg.name)}
                        style={{ padding: '0.375rem 0.625rem', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem' }}>
                        <i className="fas fa-times"></i>
                      </button>
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
