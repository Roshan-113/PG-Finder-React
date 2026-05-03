import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

const statusMap = {
  open:     { bg: '#d1fae5', color: '#065f46', label: 'Open' },
  replied:  { bg: '#dbeafe', color: '#1e40af', label: 'Replied' },
  closed:   { bg: '#f3f4f6', color: '#374151', label: 'Closed' },
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    adminAPI.getInquiries(filter !== 'all' ? { status: filter } : {})
      .then(res => setInquiries(res.data || []))
      .catch(() => setInquiries([]))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.875rem', fontWeight: 700, color: '#111827' }}>Inquiries</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>All tenant inquiries on the platform</p>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', background: 'white', cursor: 'pointer' }}>
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="replied">Replied</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Loading...</div>
      ) : inquiries.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '4rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <i className="fas fa-envelope-open" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>No Inquiries</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>No inquiries have been submitted yet</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['Tenant', 'PG', 'Message', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inquiries.map(inq => {
                const s = statusMap[inq.status] || statusMap.open;
                return (
                  <tr key={inq.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{inq.tenant?.fullName || '-'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{inq.tenant?.email}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontSize: '0.875rem', color: '#374151' }}>{inq.pg?.name || '-'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{inq.pg?.city}</div>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', maxWidth: '280px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inq.message}</div>
                      {inq.reply && <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>Reply: {inq.reply}</div>}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: s.bg, color: s.color }}>{s.label}</span>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                      {new Date(inq.createdAt || inq.created_at).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


