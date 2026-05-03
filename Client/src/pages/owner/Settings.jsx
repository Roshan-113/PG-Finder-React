import { useState } from 'react';
import { profileAPI } from '../../services/api';

export default function OwnerSettings() {
  const [activeMenu, setActiveMenu] = useState('account');
  const [notifications, setNotifications] = useState({ email: true, sms: true, marketing: false });
  const [pwd, setPwd] = useState({ current: '', new: '', confirm: '' });
  const [pwdMsg, setPwdMsg] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!pwd.current || !pwd.new || !pwd.confirm) { setPwdMsg({ type: 'error', text: 'Please fill all fields' }); return; }
    if (pwd.new.length < 8) { setPwdMsg({ type: 'error', text: 'New password must be at least 8 characters' }); return; }
    if (pwd.new !== pwd.confirm) { setPwdMsg({ type: 'error', text: 'Passwords do not match' }); return; }

    setSaving(true);
    try {
      await profileAPI.changePassword({ currentPassword: pwd.current, newPassword: pwd.new });
      setPwdMsg({ type: 'success', text: 'Password updated successfully!' });
      setPwd({ current: '', new: '', confirm: '' });
    } catch (err) {
      setPwdMsg({ type: 'error', text: err.message || 'Failed to update password' });
    } finally {
      setSaving(false);
    }
  };

  const inp = { width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' };
  const lbl = { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' };

  const menus = [
    { id: 'account', icon: 'user', label: 'Account' },
    { id: 'notifications', icon: 'bell', label: 'Notifications' },
    { id: 'security', icon: 'shield-alt', label: 'Security' },
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem' }}>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Settings</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Manage your account preferences</p>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem' }}>
        {/* Sidebar */}
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          {menus.map(m => (
            <button key={m.id} onClick={() => setActiveMenu(m.id)}
              style={{ width: '100%', padding: '0.875rem 1rem', background: activeMenu === m.id ? '#eff6ff' : 'transparent', color: activeMenu === m.id ? '#2563eb' : '#374151', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: activeMenu === m.id ? 600 : 400, fontSize: '0.875rem', textAlign: 'left', marginBottom: '0.25rem' }}>
              <i className={'fas fa-' + m.icon}></i> {m.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {activeMenu === 'account' && (
            <div>
              <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Account Settings</h2>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Update your profile information from the Profile page.</p>
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
                <i className="fas fa-info-circle" style={{ color: '#2563eb', marginRight: '0.5rem' }}></i>
                Go to <strong>Profile</strong> to update your name, phone, and other details.
              </div>
            </div>
          )}

          {activeMenu === 'notifications' && (
            <div>
              <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Notification Preferences</h2>
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive booking and inquiry updates via email' },
                { key: 'sms', label: 'SMS Notifications', desc: 'Get instant alerts on your phone' },
                { key: 'marketing', label: 'Marketing Emails', desc: 'Receive tips and platform updates' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.desc}</div>
                  </div>
                  <button onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key] }))}
                    style={{ width: '3rem', height: '1.5rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', background: notifications[item.key] ? '#2563eb' : '#d1d5db', position: 'relative', transition: 'background 0.2s' }}>
                    <span style={{ position: 'absolute', top: '2px', left: notifications[item.key] ? 'calc(100% - 22px)' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', display: 'block' }}></span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeMenu === 'security' && (
            <div>
              <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Change Password</h2>
              {pwdMsg.text && (
                <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', background: pwdMsg.type === 'success' ? '#d1fae5' : '#fee2e2', color: pwdMsg.type === 'success' ? '#065f46' : '#dc2626', border: '1px solid ' + (pwdMsg.type === 'success' ? '#6ee7b7' : '#fca5a5') }}>
                  {pwdMsg.text}
                </div>
              )}
              <form onSubmit={handlePasswordSubmit}>
                {[
                  { key: 'current', label: 'Current Password' },
                  { key: 'new', label: 'New Password' },
                  { key: 'confirm', label: 'Confirm New Password' },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: '1.25rem' }}>
                    <label style={lbl}>{f.label}</label>
                    <input type="password" value={pwd[f.key]} onChange={e => setPwd(p => ({ ...p, [f.key]: e.target.value }))} style={inp} />
                  </div>
                ))}
                <button type="submit" disabled={saving}
                  style={{ padding: '0.875rem 2rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                  {saving ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
