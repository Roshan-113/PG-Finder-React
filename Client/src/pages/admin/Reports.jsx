import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

const statusMap = {
  pending:       { bg: '#fef3c7', color: '#92400e', label: 'Pending' },
  investigating: { bg: '#dbeafe', color: '#1e40af', label: 'Investigating' },
  resolved:      { bg: '#d1fae5', color: '#065f46', label: 'Resolved' },
  dismissed:     { bg: '#f3f4f6', color: '#374151', label: 'Dismissed' },
};

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [updates, setUpdates] = useState({});
  const [saving, setSaving] = useState({});

  useEffect(() => {
    setLoading(true);
    adminAPI.getReports(filter !== 'all' ? { status: filter } : {})
      .then(res => setReports(res.data || []))
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, [filter]);

  const handleUpdate = async (reportId, e) => {
    e.preventDefault();
    const { status, adminNotes } = updates[reportId] || {};
    if (!status) { alert('Please select a status'); return; }
    setSaving(prev => ({ ...prev, [reportId]: true }));
    try {
      await adminAPI.updateReport(reportId, { status, adminNotes: adminNotes || '' });
      setReports(prev => prev.map(r => r.id === reportId ? { ...r, status, adminNotes } : r));
      setUpdates(prev => { const n = { ...prev }; delete n[reportId]; return n; });
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(prev => ({ ...prev, [reportId]: false }));
    }
  };

  const setUpdate = (id, field, value) => {
    setUpdates(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.875rem', fontWeight: 700, color: '#111827' }}>Reports & Flags</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Manage user reports and content flags</p>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', background: 'white', cursor: 'pointer' }}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Loading...</div>
      ) : reports.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '1rem', padding: '4rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <i className="fas fa-flag" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>No Reports</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>No reports match the selected filter</p>
        </div>
      ) : reports.map(r => {
        const s = statusMap[r.status] || statusMap.pending;
        return (
          <div key={r.id} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ margin: 0, fontWeight: 700, color: '#111827' }}>Report #{r.id}</h3>
                  <span style={{ padding: '0.125rem 0.5rem', background: '#f3f4f6', color: '#374151', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 500 }}>{r.reportedEntityType}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                  By: {r.reporter?.fullName || 'Unknown'} &bull; {r.reason}
                </p>
              </div>
              <span style={{ padding: '0.25rem 0.75rem', background: s.bg, color: s.color, borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
            {r.description && <p style={{ margin: '0 0 1rem 0', color: '#374151', fontSize: '0.875rem', background: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem' }}>{r.description}</p>}
            {r.adminNotes && <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '0.8125rem' }}>Admin notes: {r.adminNotes}</p>}
            <form onSubmit={(e) => handleUpdate(r.id, e)} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <select value={updates[r.id]?.status || ''} onChange={e => setUpdate(r.id, 'status', e.target.value)}
                style={{ padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', flex: '0 0 auto' }}>
                <option value="">Update Status</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
              <input placeholder="Admin notes (optional)" value={updates[r.id]?.adminNotes || ''}
                onChange={e => setUpdate(r.id, 'adminNotes', e.target.value)}
                style={{ padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', flex: 1, minWidth: '200px' }} />
              <button type="submit" disabled={saving[r.id]}
                style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {saving[r.id] ? 'Saving...' : 'Update'}
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
}
