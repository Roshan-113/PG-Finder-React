import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormValidation, validationRules } from '../../hooks/useFormValidation';
import { authAPI } from '../../services/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    values, errors, touched,
    handleChange, handleBlur, validateForm, hasError
  } = useFormValidation({ email: '', password: '', remember: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm({
      email: validationRules.email,
      password: { required: true, label: 'Password' }
    });
    if (!isValid) return;

    setLoading(true);
    setApiError('');
    try {
      const res = await authAPI.login({ email: values.email, password: values.password, userType: 'admin' });
      if (res.success) {
        const userData = { ...res.user, role: 'admin', token: res.token };
        localStorage.setItem('pgfinder_user', JSON.stringify(userData));
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setApiError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(37,99,235,0.95) 0%, rgba(29,78,216,0.92) 50%, rgba(30,64,175,0.95) 100%)' }}></div>

      {/* Card */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px', margin: '0 1rem' }}>
        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '3rem' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <img src="/logo.png" alt="PG Finder" style={{ height: '56px', width: 'auto', objectFit: 'contain', marginBottom: '1rem' }} />
            <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#1a1a1a' }}>PG FINDER</h1>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3rem', height: '3rem', background: '#eff6ff', borderRadius: '50%', marginBottom: '1rem' }}>
              <i className="fas fa-shield-alt" style={{ fontSize: '1.5rem', color: '#2563eb' }}></i>
            </div>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Admin Login</h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>Access admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-envelope" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.125rem' }}></i>
                <input 
                  type="text" 
                  name="email"
                  value={values.email} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="name@company.com"
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', border: `2px solid ${hasError('email') ? '#dc2626' : '#e5e7eb'}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'} />
              </div>
              {hasError('email') && (
                <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>Password</label>
                <a href="/forgot-password" onClick={e => { e.preventDefault(); navigate('/forgot-password'); }} style={{ fontSize: '0.75rem', color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.125rem' }}></i>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  value={values.password} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  style={{ width: '100%', padding: '0.875rem 3rem 0.875rem 2.75rem', border: `2px solid ${hasError('password') ? '#dc2626' : '#e5e7eb'}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'} />
                <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`} onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', cursor: 'pointer', fontSize: '1.125rem' }}></i>
              </div>
              {hasError('password') && (
                <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.password}</div>
              )}
            </div>

            {/* Remember */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#4b5563' }}>
                <input 
                  type="checkbox" 
                  name="remember"
                  checked={values.remember} 
                  onChange={handleChange}
                  style={{ width: '1.125rem', height: '1.125rem', cursor: 'pointer' }} />
                <span>Remember this device</span>
              </label>
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', fontWeight: 600, borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.3)', marginBottom: '1rem' }}>
              {loading ? 'Signing in...' : <><span>Sign In as Admin</span> <i className="fas fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i></>}
            </button>
            {apiError && (
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.875rem' }}>
                <i className="fas fa-exclamation-circle" style={{ marginRight: '0.5rem' }}></i>{apiError}
              </div>
            )}

            <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Not an admin? </span>
              <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}>Go back to homepage</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
