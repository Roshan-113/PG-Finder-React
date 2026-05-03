import { useState, useEffect } from 'react';
import { inquiryAPI } from '../../services/api';

export default function OwnerInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    inquiryAPI.getOwner()
      .then(res => setInquiries(res.data || []))
      .catch(() => setInquiries([]))
      .finally(() => setLoading(false));
  }, []);

  const sendReply = async (id) => {
    const reply = replyText[id];
    if (!reply?.trim()) return;
    try {
      await inquiryAPI.reply(id, reply);
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, reply, status: 'replied' } : i));
      setReplyText(prev => ({ ...prev, [id]: '' }));
    } catch (err) { alert(err.message); }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Inquiries</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Manage tenant inquiries about your PGs</p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Loading...</div>
      ) : inquiries.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '3rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
          <i className="fas fa-envelope-open" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>No Inquiries Yet</h3>
          <p style={{ color: '#6b7280', margin: 0 }}>Tenant inquiries will appear here</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {inquiries.map(inq => (
            <div key={inq.id} style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontWeight: 700, color: '#111827' }}>{inq.pg?.name || 'PG'}</h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                    From: {inq.tenant?.fullName} • {inq.tenant?.email}
                  </p>
                </div>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: inq.status === 'replied' ? '#d1fae5' : '#fef3c7', color: inq.status === 'replied' ? '#065f46' : '#92400e' }}>
                  {inq.status}
                </span>
              </div>

              <div style={{ background: '#f9fafb', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                <p style={{ margin: 0, color: '#374151', fontSize: '0.875rem' }}>{inq.message}</p>
              </div>

              {inq.reply ? (
                <div style={{ background: '#eff6ff', borderRadius: '0.5rem', padding: '1rem', borderLeft: '3px solid #2563eb' }}>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', fontWeight: 600, color: '#2563eb' }}>Your Reply:</p>
                  <p style={{ margin: 0, color: '#374151', fontSize: '0.875rem' }}>{inq.reply}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <input value={replyText[inq.id] || ''} onChange={e => setReplyText(prev => ({ ...prev, [inq.id]: e.target.value }))}
                    placeholder="Type your reply..." style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none' }} />
                  <button onClick={() => sendReply(inq.id)} style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
