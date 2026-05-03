import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileAPI } from '../../services/api';

export default function TenantSettings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({ email: true, sms: true, push: true });
  const [pwd, setPwd] = useState({ current: '', new: '', confirm: '' });
  const [pwdMsg, setPwdMsg] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);
  const [showPwdForm, setShowPwdForm] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!pwd.current || !pwd.new || !pwd.confirm) { setPwdMsg({ type: 'error', text: 'Please fill all fields' }); return; }
    if (pwd.new !== pwd.confirm) { setPwdMsg({ type: 'error', text: 'Passwords do not match' }); return; }
    if (pwd.new.length < 6) { setPwdMsg({ type: 'error', text: 'Password must be at least 6 characters' }); return; }
    setSaving(true);
    try {
      await profileAPI.changePassword({ currentPassword: pwd.current, newPassword: pwd.new });
      setPwdMsg({ type: 'success', text: 'Password updated successfully!' });
      setPwd({ current: '', new: '', confirm: '' });
    } catch (err) {
      setPwdMsg({ type: 'error', text: err.message || 'Failed to update password' });
    } finally { setSaving(false); }
  };

  const Toggle = ({ checked, onChange }) => (
    <button onClick={onChange} style={{ position: 'relative', width: '2.75rem', height: '1.5rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', background: checked ? '#2563eb' : '#d1d5db', transition: 'background 0.2s', flexShrink: 0 }}>
      <span style={{ position: 'absolute', top: '2px', left: checked ? 'calc(100% - 22px)' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', display: 'block' }}></span>
    </button>
  );

  return (
    <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111827', margin: '0 0 2rem 0' }}>Settings</h1>

      {/* Notifications */}
      <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <i className="fas fa-bell" style={{ color: '#374151' }}></i>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>Notifications</h2>
        </div>
        {[
          { key: 'email', label: 'Email notifications', desc: 'Receive updates via email' },
          { key: 'sms', label: 'SMS notifications', desc: 'Receive updates via SMS' },
          { key: 'push', label: 'Push notifications', desc: 'Receive push notifications' },
        ].map(item => (
          <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '0.5rem', marginBottom: '0.25rem' }}
            onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <div>
              <div style={{ fontWeight: 500, color: '#111827' }}>{item.label}</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.desc}</div>
            </div>
            <Toggle checked={notifications[item.key]} onChange={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key] }))} />
          </div>
        ))}
      </div>

      {/* Security */}
      <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <i className="fas fa-lock" style={{ color: '#374151' }}></i>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>Security</h2>
        </div>

        {!showPwdForm ? (
          <button onClick={() => setShowPwdForm(true)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <i className="fas fa-key"></i><span>Change Password</span>
            </div>
            <i className="fas fa-chevron-right"></i>
          </button>
        ) : (
          <div>
            {pwdMsg.text && (
              <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', background: pwdMsg.type === 'success' ? '#dcfce7' : '#fee2e2', color: pwdMsg.type === 'success' ? '#166534' : '#991b1b', border: `1px solid ${pwdMsg.type === 'success' ? '#86efac' : '#fca5a5'}` }}>
                <i className={`fas fa-${pwdMsg.type === 'success' ? 'check-circle' : 'exclamation-circle'}`} style={{ marginRight: '0.5rem' }}></i>{pwdMsg.text}
              </div>
            )}
            <form onSubmit={handlePasswordSubmit}>
              {[
                { key: 'current', label: 'Current Password' },
                { key: 'new', label: 'New Password' },
                { key: 'confirm', label: 'Confirm Password' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>{f.label}</label>
                  <input type="password" value={pwd[f.key]} onChange={e => setPwd(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="submit" disabled={saving}
                  style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}
                  onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
                  onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
                  {saving ? 'Updating...' : 'Update Password'}
                </button>
                <button type="button" onClick={() => { setShowPwdForm(false); setPwdMsg({ type: '', text: '' }); }}
                  style={{ padding: '0.75rem 1.5rem', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
