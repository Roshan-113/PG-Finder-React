import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ msg: '', type: '' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3500);
  };

  useEffect(() => {
    adminAPI.getPendingReviews()
      .then(res => setReviews(res.data || []))
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  }, []);

  const approve = async (id) => {
    try {
      await adminAPI.approveReview(id);
      setReviews(prev => prev.map(r => r.id === id ? { ...r, isApproved: true } : r));
      showToast('Review approved');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const stars = (rating) => (
    <div style={{ display: 'flex', gap: '0.125rem' }}>
      {[1,2,3,4,5].map(s => (
        <i key={s} className="fas fa-star" style={{ color: s <= rating ? '#fbbf24' : '#d1d5db', fontSize: '0.875rem' }}></i>
      ))}
    </div>
  );

  return (
    <div>
      {toast.msg && (
        <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, padding: '0.875rem 1.25rem', borderRadius: '0.75rem', background: toast.type === 'error' ? '#fee2e2' : '#d1fae5', color: toast.type === 'error' ? '#991b1b' : '#065f46', border: '1px solid ' + (toast.type === 'error' ? '#fca5a5' : '#6ee7b7'), boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: 500 }}>
          <i className={'fas fa-' + (toast.type === 'error' ? 'exclamation-circle' : 'check-circle')} style={{ marginRight: '0.5rem' }}></i>{toast.msg}
        </div>
      )}

      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 700, color: '#111827' }}>Reviews Moderation</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Manage user reviews</p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Loading...</div>
      ) : reviews.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '1rem', padding: '4rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <i className="fas fa-star" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>No Pending Reviews</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>All reviews have been moderated</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['Listing','Reviewer','Rating','Review','Status','Actions'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f3f4f6' }}
                  onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                  onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827', fontWeight: 500 }}>{r.pg ? r.pg.name : '-'}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{r.tenant ? r.tenant.fullName : '-'}</td>
                  <td style={{ padding: '1rem' }}>{stars(r.rating)}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', maxWidth: '300px' }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.comment}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: r.isApproved ? '#d1fae5' : '#fee2e2', color: r.isApproved ? '#065f46' : '#991b1b' }}>
                      {r.isApproved ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      {!r.isApproved && (
                        <button onClick={() => approve(r.id)}
                          style={{ padding: '0.375rem 0.625rem', background: '#d1fae5', color: '#065f46', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem' }} title="Approve">
                          <i className="fas fa-check"></i>
                        </button>
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
