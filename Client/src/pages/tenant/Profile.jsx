import { useState, useEffect } from 'react';
import { profileAPI } from '../../services/api';

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [pwdMsg, setPwdMsg] = useState({ type: '', text: '' });
  const [form, setForm] = useState({ name: '', phone: '' });
  const [pwd, setPwd] = useState({ current: '', new: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [pwdErrors, setPwdErrors] = useState({});

  useEffect(() => {
    profileAPI.get()
      .then(r => {
        setUser(r.data);
        setForm({ name: r.data.fullName || '', phone: r.data.phone || '' });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const validateProfile = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (form.phone && !/^\d{10}$/.test(form.phone.trim())) e.phone = 'Phone must be 10 digits';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePwd = () => {
    const e = {};
    if (!pwd.current) e.current = 'Current password is required';
    if (!pwd.new) e.new = 'New password is required';
    else if (pwd.new.length < 6) e.new = 'Password must be at least 6 characters';
    if (!pwd.confirm) e.confirm = 'Please confirm your password';
    else if (pwd.new !== pwd.confirm) e.confirm = 'Passwords do not match';
    setPwdErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;
    setSaving(true);
    setProfileMsg({ type: '', text: '' });
    try {
      const r = await profileAPI.update({ fullName: form.name, phone: form.phone });
      setUser(r.data);
      const stored = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');
      localStorage.setItem('pgfinder_user', JSON.stringify({ ...stored, name: form.name, fullName: form.name }));
      setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally { setSaving(false); }
  };

  const handlePwdSubmit = async (e) => {
    e.preventDefault();
    if (!validatePwd()) return;
    setChangingPwd(true);
    setPwdMsg({ type: '', text: '' });
    try {
      await profileAPI.changePassword({ currentPassword: pwd.current, newPassword: pwd.new });
      setPwdMsg({ type: 'success', text: 'Password changed successfully!' });
      setPwd({ current: '', new: '', confirm: '' });
    } catch (err) {
      setPwdMsg({ type: 'error', text: err.message || 'Failed to change password' });
    } finally { setChangingPwd(false); }
  };

  const inp = (name, hasErr) => ({
    width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: `1px solid ${hasErr ? '#ef4444' : '#d1d5db'}`,
    borderRadius: '0.5rem', boxSizing: 'border-box', fontSize: '0.875rem', outline: 'none'
  });
  const lbl = { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' };
  const iconStyle = { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '1.125rem' };
  const errTxt = { color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' };
  const msgBox = (msg) => msg.text ? (
    <div style={{ padding: '1rem', background: msg.type === 'success' ? '#dcfce7' : '#fee2e2', border: `1px solid ${msg.type === 'success' ? '#86efac' : '#fca5a5'}`, borderRadius: '0.5rem', marginBottom: '1.5rem', color: msg.type === 'success' ? '#166534' : '#991b1b' }}>
      <i className={`fas fa-${msg.type === 'success' ? 'check-circle' : 'exclamation-circle'}`} style={{ marginRight: '0.5rem' }}></i>{msg.text}
    </div>
  ) : null;

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>Loading...</div>;

  const initial = (user.fullName || 'T')[0].toUpperCase();

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 700 }}>My Profile</h1>

      {/* Profile Card */}
      <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
        {msgBox(profileMsg)}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ width: '100px', height: '100px', background: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '3rem', color: '#3b82f6', fontWeight: 600 }}>{initial}</span>
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>{user.fullName || 'Tenant'}</h2>
            <p style={{ color: '#6b7280', margin: '0 0 0.25rem 0' }}>Tenant Account</p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} noValidate>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={lbl}>Full Name *</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-user" style={iconStyle}></i>
                <input type="text" value={form.name} onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
                  style={inp('name', errors.name)} />
              </div>
              {errors.name && <p style={errTxt}>{errors.name}</p>}
            </div>
            <div>
              <label style={lbl}>Email</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-envelope" style={iconStyle}></i>
                <input type="email" value={user.email || ''} readOnly
                  style={{ ...inp('email', false), background: '#f9fafb', cursor: 'not-allowed' }} />
              </div>
              <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem' }}>Email cannot be changed</p>
            </div>
            <div>
              <label style={lbl}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-phone" style={iconStyle}></i>
                <input type="tel" value={form.phone} maxLength={10}
                  onChange={e => { setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g, '') })); setErrors(p => ({ ...p, phone: '' })); }}
                  placeholder="Enter 10-digit phone number" style={inp('phone', errors.phone)} />
              </div>
              {errors.phone && <p style={errTxt}>{errors.phone}</p>}
            </div>
            <button type="submit" disabled={saving}
              style={{ marginTop: '0.5rem', padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', fontWeight: 600, borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.9375rem' }}
              onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
              onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
              <i className="fas fa-save" style={{ marginRight: '0.5rem' }}></i>{saving ? 'Saving...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>

      {/* Change Password Card */}
      <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Change Password</h3>
        {msgBox(pwdMsg)}
        <form onSubmit={handlePwdSubmit} noValidate>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { key: 'current', label: 'Current Password *', placeholder: 'Enter current password' },
              { key: 'new', label: 'New Password *', placeholder: 'Enter new password', hint: 'Minimum 6 characters' },
              { key: 'confirm', label: 'Confirm New Password *', placeholder: 'Confirm new password' },
            ].map(f => (
              <div key={f.key}>
                <label style={lbl}>{f.label}</label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-lock" style={iconStyle}></i>
                  <input type="password" value={pwd[f.key]} placeholder={f.placeholder}
                    onChange={e => { setPwd(p => ({ ...p, [f.key]: e.target.value })); setPwdErrors(p => ({ ...p, [f.key]: '' })); }}
                    style={inp(f.key, pwdErrors[f.key])} />
                </div>
                {f.hint && <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem' }}>{f.hint}</p>}
                {pwdErrors[f.key] && <p style={errTxt}>{pwdErrors[f.key]}</p>}
              </div>
            ))}
            <button type="submit" disabled={changingPwd}
              style={{ marginTop: '0.5rem', padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', fontWeight: 600, borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.9375rem' }}
              onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
              onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
              <i className="fas fa-key" style={{ marginRight: '0.5rem' }}></i>{changingPwd ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
