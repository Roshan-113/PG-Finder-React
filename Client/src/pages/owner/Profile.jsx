import { useState, useEffect } from 'react';
import { profileAPI } from '../../services/api';

export default function OwnerProfile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [form, setForm] = useState({ fullName: '', phone: '', about: '' });

  useEffect(() => {
    profileAPI.get()
      .then(res => {
        setUser(res.data);
        setForm({ fullName: res.data.fullName || '', phone: res.data.phone || '', about: '' });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      await profileAPI.update({ fullName: form.fullName, phone: form.phone });
      const stored = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
      localStorage.setItem('pgfinder_user', JSON.stringify({ ...stored, name: form.fullName }));
      setMsg({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  const inp = { width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' };
  const lbl = { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>My Profile</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Manage your personal information</p>

      {msg.text && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', background: msg.type === 'success' ? '#d1fae5' : '#fee2e2', color: msg.type === 'success' ? '#065f46' : '#dc2626', border: `1px solid ${msg.type === 'success' ? '#6ee7b7' : '#fca5a5'}` }}>
          {msg.text}
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', fontWeight: 700, flexShrink: 0 }}>
            {(user.fullName || 'O')[0].toUpperCase()}
          </div>
          <div>
            <h2 style={{ margin: '0 0 0.25rem 0', fontWeight: 700, color: '#111827', fontSize: '1.25rem' }}>{user.fullName}</h2>
            <p style={{ margin: '0 0 0.25rem 0', color: '#6b7280', fontSize: '0.875rem' }}>{user.email}</p>
            <span style={{ padding: '0.25rem 0.75rem', background: '#eff6ff', color: '#2563eb', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>PG Owner</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={lbl}>Full Name</label>
              <input value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))} style={inp} />
            </div>
            <div>
              <label style={lbl}>Phone Number</label>
              <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} style={inp} />
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={lbl}>Email Address</label>
            <input value={user.email || ''} disabled style={{ ...inp, background: '#f9fafb', color: '#6b7280' }} />
          </div>
          <button type="submit" disabled={saving}
            style={{ padding: '0.875rem 2rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
