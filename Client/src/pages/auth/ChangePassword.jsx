import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { profileAPI, authAPI } from '../../services/api';

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  // token from URL = password reset flow; no token = logged-in change password
  const token = new URLSearchParams(location.search).get('token');
  const isReset = !!token;

  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const reqs = [
    { id: 'len',     label: 'At least 6 characters',      test: p => p.length >= 6 },
    { id: 'upper',   label: 'Contains uppercase letter',   test: p => /[A-Z]/.test(p) },
    { id: 'lower',   label: 'Contains lowercase letter',   test: p => /[a-z]/.test(p) },
    { id: 'num',     label: 'Contains number',             test: p => /[0-9]/.test(p) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!isReset && !form.currentPassword) errs.currentPassword = 'Current password is required';
    if (!form.newPassword) errs.newPassword = 'New password is required';
    else if (form.newPassword.length < 6) errs.newPassword = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.newPassword !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setApiError('');
    try {
      if (isReset) {
        // Token-based reset from email link
        await authAPI.resetPassword(token, { password: form.newPassword, confirmPassword: form.confirmPassword });
      } else {
        // Logged-in change password
        await profileAPI.changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      }
      setSuccess(true);
      setTimeout(() => navigate(-1), 2500);
    } catch (err) {
      setApiError(err.message || 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inpStyle = (field) => ({
    width: '100%', padding: '0.75rem 3rem 0.75rem 2.5rem',
    border: `1px solid ${errors[field] ? '#fca5a5' : '#d1d5db'}`,
    borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box'
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '50%', background: '#2563eb', marginBottom: '1rem' }}>
            <i className="fas fa-lock" style={{ color: 'white', fontSize: '1.5rem' }}></i>
          </div>
          <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
            {isReset ? 'Reset Password' : 'Change Password'}
          </h2>
          <p style={{ margin: 0, color: '#6b7280' }}>
            {isReset ? 'Enter your new password below' : 'Update your account password'}
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '2rem' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <i className="fas fa-check" style={{ color: '#10b981', fontSize: '1.5rem' }}></i>
              </div>
              <h3 style={{ color: '#111827', margin: '0 0 0.5rem 0' }}>Password {isReset ? 'Reset' : 'Changed'} Successfully!</h3>
              <p style={{ color: '#6b7280', margin: '0 0 1rem 0' }}>Redirecting to login...</p>
              <Link to="/login" style={{ color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}>Go to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {apiError && (
                <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.875rem' }}>
                  <i className="fas fa-exclamation-circle" style={{ marginRight: '0.5rem' }}></i>{apiError}
                </div>
              )}

              {/* Current password — only for logged-in change */}
              {!isReset && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Current Password</label>
                  <div style={{ position: 'relative' }}>
                    <i className="fas fa-lock" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                    <input type={show.current ? 'text' : 'password'} value={form.currentPassword}
                      onChange={e => setForm(p => ({ ...p, currentPassword: e.target.value }))}
                      placeholder="Enter current password"
                      style={inpStyle('currentPassword')} />
                    <i className={`fas fa-${show.current ? 'eye-slash' : 'eye'}`}
                      onClick={() => setShow(p => ({ ...p, current: !p.current }))}
                      style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', cursor: 'pointer' }}></i>
                  </div>
                  {errors.currentPassword && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.currentPassword}</div>}
                </div>
              )}

              {/* New password */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>New Password</label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-lock" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                  <input type={show.new ? 'text' : 'password'} value={form.newPassword}
                    onChange={e => setForm(p => ({ ...p, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                    style={inpStyle('newPassword')} />
                  <i className={`fas fa-${show.new ? 'eye-slash' : 'eye'}`}
                    onClick={() => setShow(p => ({ ...p, new: !p.new }))}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', cursor: 'pointer' }}></i>
                </div>
                {errors.newPassword && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.newPassword}</div>}
              </div>

              {/* Confirm password */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Confirm New Password</label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-lock" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                  <input type={show.confirm ? 'text' : 'password'} value={form.confirmPassword}
                    onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    style={inpStyle('confirmPassword')} />
                  <i className={`fas fa-${show.confirm ? 'eye-slash' : 'eye'}`}
                    onClick={() => setShow(p => ({ ...p, confirm: !p.confirm }))}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', cursor: 'pointer' }}></i>
                </div>
                {errors.confirmPassword && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.confirmPassword}</div>}
              </div>

              {/* Password strength */}
              {form.newPassword && (
                <div style={{ background: '#f9fafb', borderRadius: '0.5rem', padding: '0.875rem', marginBottom: '1.25rem' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', fontWeight: 600, color: '#374151' }}>Password Requirements:</p>
                  {reqs.map(r => (
                    <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <i className={`fas fa-${r.test(form.newPassword) ? 'check-circle' : 'times-circle'}`}
                        style={{ color: r.test(form.newPassword) ? '#10b981' : '#d1d5db', fontSize: '0.875rem' }}></i>
                      <span style={{ fontSize: '0.75rem', color: r.test(form.newPassword) ? '#065f46' : '#6b7280' }}>{r.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '0.875rem', background: loading ? '#93c5fd' : '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem', marginBottom: '0.75rem' }}>
                {loading ? 'Updating...' : isReset ? 'Reset Password' : 'Update Password'}
              </button>

              <button type="button" onClick={() => navigate(isReset ? '/login' : -1)}
                style={{ width: '100%', padding: '0.875rem', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer' }}>
                {isReset ? 'Back to Login' : 'Cancel'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
