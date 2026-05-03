import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormValidation, validationRules } from '../../hooks/useFormValidation';
import { authAPI } from '../../services/api';

const LeftPanel = () => (
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
          <div style={{ fontSize: '0.875rem', opacity: 0.95 }}>Join Our Growing Community</div>
        </div>
      </div>
      {[
        { icon: 'shield-alt', title: '100% Verified Listings', desc: 'All PG accommodations are verified for your safety and peace of mind.' },
        { icon: 'users', title: 'Smart Roommate Matching', desc: 'Find compatible roommates based on your lifestyle and preferences.' },
        { icon: 'check-circle', title: 'Hassle-Free Experience', desc: 'Easy booking process with transparent pricing and instant confirmations.' },
      ].map((f, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: '3rem', height: '3rem', background: 'rgba(255,255,255,0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backdropFilter: 'blur(10px)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <i className={`fas fa-${f.icon}`} style={{ fontSize: '1.5rem' }}></i>
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>{f.title}</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.95, lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
    <div style={{ position: 'relative', zIndex: 10, padding: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }}>
        {[['1000+', 'Verified PGs'], ['5000+', 'Happy Tenants'], ['95%', 'Success Rate']].map(([v, l], i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{v}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.95 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('tenant');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    values, errors, touched,
    handleChange, handleBlur, validateForm, hasError
  } = useFormValidation({
    name: '', email: '', phone: '', password: '', confirmPassword: '', terms: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm({
      name: validationRules.name,
      email: validationRules.email,
      phone: validationRules.phone,
      password: validationRules.password,
      confirmPassword: validationRules.confirmPassword('password')
    });
    if (!isValid) return;
    if (!values.terms) { setApiError('Please accept the Terms of Service and Privacy Policy'); return; }

    setLoading(true);
    setApiError('');
    try {
      const res = await authAPI.register({
        name: values.name, email: values.email, phone: values.phone,
        password: values.password, confirmPassword: values.confirmPassword, userType
      });
      if (res.success) {
        setApiSuccess('Registration successful! Please login.');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", margin: 0 }}>
      <LeftPanel />

      {/* Right Side */}
      <div style={{ flex: 1, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '450px' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 'bold', color: '#1a1a1a' }}>Create Account</h1>
            <p style={{ margin: 0, color: '#666', fontSize: '1rem' }}>Join thousands finding their perfect stay</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* User Type */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#333', marginBottom: '0.75rem' }}>I am a</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[['tenant', 'users', 'Tenant'], ['owner', 'building', 'PG Owner']].map(([type, icon, label]) => (
                  <button key={type} type="button" onClick={() => setUserType(type)}
                    style={{ padding: '1rem', border: `2px solid ${userType === type ? '#2563eb' : '#e5e7eb'}`, background: userType === type ? '#eff6ff' : 'white', borderRadius: '0.5rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <i className={`fas fa-${icon}`} style={{ fontSize: '1.25rem', color: userType === type ? '#2563eb' : '#9ca3af', display: 'block', marginBottom: '0.5rem' }}></i>
                    <div style={{ fontWeight: 600, color: userType === type ? '#1e40af' : '#6b7280', fontSize: '0.875rem' }}>{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#333', marginBottom: '0.5rem' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-user" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                <input 
                  type="text" 
                  name="name"
                  value={values.name} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', border: `1px solid ${hasError('name') ? '#dc2626' : '#d1d5db'}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'} />
              </div>
              {hasError('name') && (
                <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#333', marginBottom: '0.5rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-envelope" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                <input 
                  type="text" 
                  name="email"
                  value={values.email} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your@email.com"
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', border: `1px solid ${hasError('email') ? '#dc2626' : '#d1d5db'}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'} />
              </div>
              {hasError('email') && (
                <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</div>
              )}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#333', marginBottom: '0.5rem' }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-phone" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                <input 
                  type="text" 
                  name="phone"
                  value={values.phone} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', border: `1px solid ${hasError('phone') ? '#dc2626' : '#d1d5db'}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'} />
              </div>
              {hasError('phone') && (
                <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.phone}</div>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#333', marginBottom: '0.5rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                <input 
                  type={showPwd ? 'text' : 'password'} 
                  name="password"
                  value={values.password} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Create a password"
                  style={{ width: '100%', padding: '0.875rem 3rem 0.875rem 2.75rem', border: `1px solid ${hasError('password') ? '#dc2626' : '#d1d5db'}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'} />
                <i className={`fas fa-${showPwd ? 'eye-slash' : 'eye'}`} onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', cursor: 'pointer' }}></i>
              </div>
              {hasError('password') && (
                <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.password}</div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#333', marginBottom: '0.5rem' }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                <input 
                  type={showConfirm ? 'text' : 'password'} 
                  name="confirmPassword"
                  value={values.confirmPassword} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  style={{ width: '100%', padding: '0.875rem 3rem 0.875rem 2.75rem', border: `1px solid ${hasError('confirmPassword') ? '#dc2626' : '#d1d5db'}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'} />
                <i className={`fas fa-${showConfirm ? 'eye-slash' : 'eye'}`} onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', cursor: 'pointer' }}></i>
              </div>
              {hasError('confirmPassword') && (
                <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.confirmPassword}</div>
              )}
            </div>

            {/* Terms */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#666' }}>
                <input 
                  type="checkbox" 
                  name="terms"
                  checked={values.terms} 
                  onChange={handleChange}
                  style={{ width: '1rem', height: '1rem', marginTop: '0.125rem' }} />
                <span>I agree to the <a href="/terms-of-service" style={{ color: '#2563eb', textDecoration: 'none' }}>Terms of Service</a> and <a href="/privacy" style={{ color: '#2563eb', textDecoration: 'none' }}>Privacy Policy</a></span>
              </label>
            </div>

            <button type="submit" style={{ width: '100%', padding: '0.875rem', background: '#2563eb', color: 'white', fontWeight: 600, borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1rem', marginBottom: '1.5rem', transition: 'background 0.2s' }}
              onMouseOver={e => e.target.style.background = '#1d4ed8'} onMouseOut={e => e.target.style.background = '#2563eb'}>
              {loading ? 'Creating Account...' : <><span>Create Account</span> <i className="fas fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i></>}
            </button>

            {apiError && (
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.875rem' }}>
                <i className="fas fa-exclamation-circle" style={{ marginRight: '0.5rem' }}></i>{apiError}
              </div>
            )}
            {apiSuccess && (
              <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#065f46', fontSize: '0.875rem' }}>
                <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }}></i>{apiSuccess}
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Or sign up with</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[['google', '#ea4335', 'Google'], ['facebook', '#1877f2', 'Facebook']].map(([icon, color, label]) => (
                <button key={icon} type="button" style={{ padding: '0.75rem', border: '1px solid #d1d5db', background: 'white', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}
                  onMouseOver={e => e.currentTarget.style.background = '#f9fafb'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <i className={`fab fa-${icon}`} style={{ fontSize: '1.125rem', color }}></i> {label}
                </button>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#666', fontSize: '0.875rem' }}>Already have an account? </span>
              <a href="/login" onClick={e => { e.preventDefault(); navigate('/login'); }} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}>Sign In</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
