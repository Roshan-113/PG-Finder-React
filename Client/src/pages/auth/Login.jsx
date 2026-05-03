import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormValidation, validationRules } from '../../hooks/useFormValidation';
import { authAPI } from '../../services/api';

const LeftPanel = ({ subtitle }) => (
  <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white' }}>
    <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/back.jpg')", backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}></div>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(59,130,246,0.92) 0%, rgba(37,99,235,0.88) 50%, rgba(29,78,216,0.92) 100%)' }}></div>
    <div style={{ position: 'relative', zIndex: 10, padding: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <div style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1.5px solid rgba(255,255,255,0.3)' }}>
          <img src="/logo.png" alt="PG Finder" style={{ height: '40px', width: '40px', objectFit: 'contain' }} />
        </div>
        <div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>PG Finder</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.95 }}>{subtitle}</div>
        </div>
      </div>
      {[
        { icon: 'shield-alt', title: '100% Verified Listings', desc: 'All PG accommodations are verified for your safety and peace of mind.' },
        { icon: 'users', title: 'Smart Roommate Matching', desc: 'Find compatible roommates based on your lifestyle and preferences.' },
        { icon: 'check-circle', title: 'Hassle-Free Experience', desc: 'Easy booking process with transparent pricing and instant confirmations.' },
      ].map((f, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: '3rem', height: '3rem', background: 'rgba(255,255,255,0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className={`fas fa-${f.icon}`} style={{ fontSize: '1.5rem' }}></i>
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>{f.title}</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.95, lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
    <div style={{ position: 'relative', zIndex: 10, padding: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }}>
        {[['1000+', 'Verified PGs'], ['5000+', 'Happy Tenants'], ['95%', 'Success Rate']].map(([v, l], i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{v}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.95 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Reusable error message component
const ErrMsg = ({ msg }) => msg ? <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{msg}</div> : null;

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('tenant');
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, validateForm, hasError } = useFormValidation({
    email: '', password: '', remember: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = validateForm({
      email:    validationRules.email,
      password: { required: true, label: 'Password' }
    });
    if (!ok) return;

    setLoading(true);
    setApiError('');
    try {
      const res = await authAPI.login({ email: values.email, password: values.password, userType });
      if (res.success) {
        const userData = { ...res.user, role: res.user.userType || userType, token: res.token };
        setUser(userData);
        localStorage.setItem('pgfinder_user', JSON.stringify(userData));
        if (res.user.userType === 'admin') navigate('/admin/dashboard');
        else if (res.user.userType === 'owner') navigate('/owner/dashboard');
        else navigate('/');
      }
    } catch (err) {
      setApiError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const borderColor = (f) => hasError(f) ? '#dc2626' : '#d1d5db';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <LeftPanel subtitle="Your 24/7 PG Discovery Partner" />
      <div style={{ flex: 1, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '450px' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 'bold', color: '#1a1a1a' }}>Welcome Back!</h1>
            <p style={{ margin: 0, color: '#666' }}>Sign in to continue to PG Finder</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* User Type */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#333', marginBottom: '0.75rem' }}>I am a</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[['tenant','users','Tenant'],['owner','building','PG Owner']].map(([type,icon,label]) => (
                  <button key={type} type="button" onClick={() => setUserType(type)}
                    style={{ padding: '1rem', border: `2px solid ${userType===type?'#2563eb':'#e5e7eb'}`, background: userType===type?'#eff6ff':'white', borderRadius: '0.5rem', cursor: 'pointer' }}>
                    <i className={`fas fa-${icon}`} style={{ fontSize: '1.25rem', color: userType===type?'#2563eb':'#9ca3af', display: 'block', marginBottom: '0.5rem' }}></i>
                    <div style={{ fontWeight: 600, color: userType===type?'#1e40af':'#6b7280', fontSize: '0.875rem' }}>{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#333', marginBottom: '0.5rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-envelope" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                <input type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}
                  placeholder="your@email.com"
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', border: `1px solid ${borderColor('email')}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <ErrMsg msg={hasError('email') && errors.email} />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#333', marginBottom: '0.5rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                <input type={showPassword?'text':'password'} name="password" value={values.password} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Enter your password"
                  style={{ width: '100%', padding: '0.875rem 3rem 0.875rem 2.75rem', border: `1px solid ${borderColor('password')}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }} />
                <i className={`fas fa-${showPassword?'eye-slash':'eye'}`} onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', cursor: 'pointer' }}></i>
              </div>
              <ErrMsg msg={hasError('password') && errors.password} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#666' }}>
                <input type="checkbox" name="remember" checked={values.remember} onChange={handleChange} style={{ width: '1rem', height: '1rem' }} />
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" onClick={e => { e.preventDefault(); navigate('/forgot-password'); }} style={{ fontSize: '0.875rem', color: '#2563eb', textDecoration: 'none' }}>Forgot password?</a>
            </div>

            <button type="submit" style={{ width: '100%', padding: '0.875rem', background: '#2563eb', color: 'white', fontWeight: 600, borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1rem', marginBottom: '1.5rem' }}>
              {loading ? 'Signing in...' : <><span>Sign In</span> <i className="fas fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i></>}
            </button>

            {apiError && (
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.875rem' }}>
                <i className="fas fa-exclamation-circle" style={{ marginRight: '0.5rem' }}></i>{apiError}
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Or continue with</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button type="button" onClick={() => {
                  const googleAuthUrl = `${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:5000'}/api/auth/google?userType=${userType}`;
                  window.location.href = googleAuthUrl;
                }}
                style={{ padding: '0.75rem', border: '1px solid #d1d5db', background: 'white', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                <i className="fab fa-google" style={{ fontSize: '1.125rem', color: '#ea4335' }}></i> Google
              </button>
              <button type="button" onClick={() => alert('Facebook login coming soon!')}
                style={{ padding: '0.75rem', border: '1px solid #d1d5db', background: 'white', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                <i className="fab fa-facebook" style={{ fontSize: '1.125rem', color: '#1877f2' }}></i> Facebook
              </button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#666', fontSize: '0.875rem' }}>Don't have an account? </span>
              <a href="/register" onClick={e => { e.preventDefault(); navigate('/register'); }} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}>Sign up now</a>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <a href="/admin/login" onClick={e => { e.preventDefault(); navigate('/admin/login'); }} style={{ color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none' }}>
                <i className="fas fa-shield-alt"></i> Admin Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
