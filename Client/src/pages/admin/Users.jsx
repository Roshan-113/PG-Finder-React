import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

const REASONS = [
  'Violation of terms and conditions',
  'Fraudulent activity detected',
  'Multiple complaints received',
  'Suspicious account behavior',
  'Non-payment of dues',
  'Requested by user',
  'Duplicate account',
  'Spam or abusive content',
];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState({ msg: '', type: '' });
  const [modal, setModal] = useState(null); // { id, name }
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [saving, setSaving] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3500);
  };

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (roleFilter !== 'all') params.role = roleFilter;
    if (statusFilter !== 'all') params.status = statusFilter;
    adminAPI.getUsers(params)
      .then(res => setUsers(res.data || []))
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  }, [roleFilter, statusFilter]);

  const handleDeactivate = async (e) => {
    e.preventDefault();
    const finalReason = reason === 'custom' ? customReason.trim() : reason;
    if (!finalReason) { alert('Please select or enter a reason'); return; }
    setSaving(true);
    try {
      await adminAPI.toggleUser(modal.id);
      setUsers(prev => prev.map(u => u.id === modal.id ? { ...u, isActive: false } : u));
      showToast(`${modal.name} has been deactivated`);
      setModal(null); setReason(''); setCustomReason('');
    } catch (err) { showToast(err.message, 'error'); }
    finally { setSaving(false); }
  };

  const activateUser = async (id, name) => {
    if (!window.confirm(`Activate ${name}?`)) return;
    try {
      await adminAPI.toggleUser(id);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: true } : u));
      showToast(`${name} has been activated`);
    } catch (err) { showToast(err.message, 'error'); }
  };

  const deleteUser = async (id, name) => {
    if (!window.confirm(`Delete ${name} permanently? This cannot be undone.`)) return;
    try {
      await adminAPI.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      showToast(`${name} deleted`);
    } catch (err) { showToast(err.message, 'error'); }
  };

  const roleBadge = (role) => {
    const map = { admin: ['#ede9fe','#7c3aed','user-shield'], owner: ['#dbeafe','#1d4ed8','building'], tenant: ['#d1fae5','#065f46','user'] };
    const [bg, color, icon] = map[role] || ['#f3f4f6','#374151','user'];
    return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: bg, color, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><i className={`fas fa-${icon}`}></i>{role}</span>;
  };

  return (
    <div>
      {/* Toast */}
      {toast.msg && (
        <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, padding: '0.875rem 1.25rem', borderRadius: '0.75rem', background: toast.type === 'error' ? '#fee2e2' : '#d1fae5', color: toast.type === 'error' ? '#991b1b' : '#065f46', border: `1px solid ${toast.type === 'error' ? '#fca5a5' : '#6ee7b7'}`, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className={`fas fa-${toast.type === 'error' ? 'exclamation-circle' : 'check-circle'}`}></i>{toast.msg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.875rem', fontWeight: 700, color: '#111827' }}>User Management</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Manage all platform users and their roles</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
          style={{ padding: '0.625rem 1rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem', flex: '1', minWidth: '160px', outline: 'none' }}>
          <option value="all">All User Types</option>
          <option value="tenant">Tenants</option>
          <option value="owner">Owners</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: '0.625rem 1rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem', flex: '1', minWidth: '160px', outline: 'none' }}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div style={{ marginLeft: 'auto', fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>
          Total Users: <strong style={{ color: '#111827', fontSize: '1.125rem' }}>{users.length}</strong>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>Loading...</div>
      ) : (
        <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                {['ID', 'User', 'Contact', 'Type', 'Status', 'Deactivation Reason', 'Verified', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={9} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                  <i className="fas fa-users" style={{ fontSize: '2.5rem', marginBottom: '0.75rem', display: 'block' }}></i>No users found
                </td></tr>
              ) : users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #f3f4f6' }}
                  onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                  onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#3b82f6', fontSize: '0.875rem' }}>#{u.id}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>
                        {(u.fullName || 'U')[0].toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{u.fullName}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.8125rem' }}>
                    <div style={{ color: '#4b5563', marginBottom: '0.125rem' }}><i className="fas fa-envelope" style={{ color: '#9ca3af', marginRight: '0.375rem' }}></i>{u.email}</div>
                    <div style={{ color: '#6b7280' }}><i className="fas fa-phone" style={{ color: '#9ca3af', marginRight: '0.375rem' }}></i>{u.phone || '-'}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{roleBadge(u.role)}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: u.isActive ? '#d1fae5' : '#fee2e2', color: u.isActive ? '#065f46' : '#991b1b', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <i className={`fas fa-${u.isActive ? 'check-circle' : 'ban'}`}></i>{u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', maxWidth: '200px' }}>
                    {!u.isActive ? (
                      <span style={{ fontSize: '0.8125rem', color: '#ef4444', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }} title="Deactivated">
                        <i className="fas fa-info-circle" style={{ marginRight: '0.25rem' }}></i>Deactivated
                      </span>
                    ) : <span style={{ color: '#d1d5db' }}>—</span>}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    {u.isVerified
                      ? <i className="fas fa-check-circle" style={{ color: '#10b981', fontSize: '1.125rem' }}></i>
                      : <i className="fas fa-times-circle" style={{ color: '#ef4444', fontSize: '1.125rem' }}></i>}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    {new Date(u.createdAt || u.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {u.role !== 'admin' && (
                      <div style={{ display: 'flex', gap: '0.375rem' }}>
                        {u.isActive ? (
                          <button onClick={() => { setModal({ id: u.id, name: u.fullName }); setReason(''); setCustomReason(''); }}
                            style={{ padding: '0.375rem 0.625rem', background: '#fef3c7', color: '#92400e', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem' }} title="Deactivate">
                            <i className="fas fa-ban"></i>
                          </button>
                        ) : (
                          <button onClick={() => activateUser(u.id, u.fullName)}
                            style={{ padding: '0.375rem 0.625rem', background: '#d1fae5', color: '#065f46', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem' }} title="Activate">
                            <i className="fas fa-check"></i>
                          </button>
                        )}
                        <button onClick={() => deleteUser(u.id, u.fullName)}
                          style={{ padding: '0.375rem 0.625rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem' }} title="Delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Deactivate Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', maxWidth: '500px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', animation: 'slideIn 0.2s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '0.75rem', background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                <i className="fas fa-user-slash"></i>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Deactivate User</h3>
            </div>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              You are about to deactivate <strong>{modal.name}</strong>. Please provide a reason for this action.
            </p>
            <form onSubmit={handleDeactivate}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                  <i className="fas fa-clipboard-list" style={{ marginRight: '0.375rem' }}></i>Reason for Deactivation
                </label>
                <select value={reason} onChange={e => setReason(e.target.value)} required
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}>
                  <option value="">— Select a reason —</option>
                  {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                  <option value="custom">✏️ Other (specify custom reason)</option>
                </select>
              </div>
              {reason === 'custom' && (
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Custom Reason</label>
                  <textarea value={customReason} onChange={e => setCustomReason(e.target.value)} required
                    placeholder="Please provide a detailed reason..." rows={3}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setModal(null)}
                  style={{ padding: '0.75rem 1.5rem', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" disabled={saving}
                  style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-ban"></i> {saving ? 'Saving...' : 'Deactivate User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
