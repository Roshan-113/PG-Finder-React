import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormValidation, validationRules } from '../../hooks/useFormValidation';
import { authAPI } from '../../services/api';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    values, errors, touched,
    handleChange, handleBlur, validateForm, hasError
  } = useFormValidation({
    email: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm({ email: validationRules.email });
    if (!isValid) return;

    setLoading(true);
    try {
      await authAPI.forgotPassword(values.email);
      setStep(2);
    } catch (err) {
      // Always show step 2 for security (don't reveal if email exists)
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '448px' }}>

        {step === 1 ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '50%', background: '#2563eb', marginBottom: '1rem' }}>
                <i className="fas fa-lock" style={{ color: 'white', fontSize: '2rem' }}></i>
              </div>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Forgot Password?</h2>
              <p style={{ margin: 0, color: '#6b7280' }}>No worries, we'll send you reset instructions</p>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '2rem' }}>
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <i className="fas fa-envelope" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.25rem' }}></i>
                    <input 
                      type="text" 
                      name="email"
                      value={values.email} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your email"
                      style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: `1px solid ${hasError('email') ? '#dc2626' : '#d1d5db'}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  {hasError('email') && (
                    <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</div>
                  )}
                </div>
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', borderRadius: '0.5rem', fontWeight: 500, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <a href="/login" onClick={e => { e.preventDefault(); navigate('/login'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}>
                  <i className="fas fa-arrow-left" style={{ fontSize: '1rem' }}></i> Back to Login
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '50%', background: '#dcfce7', marginBottom: '1rem' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '2rem', color: '#16a34a' }}></i>
              </div>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Check Your Email</h2>
              <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>We've sent password reset instructions to</p>
              <p style={{ margin: 0, color: '#2563eb', fontWeight: 500 }}>{values.email}</p>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '2rem' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#111827' }}>What's next?</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.875rem', color: '#374151' }}>
                  {['Check your email inbox (and spam folder)', 'Click the reset password link in the email', 'Create a new password for your account'].map((s, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#2563eb' }}>{i + 1}.</span><span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                Didn't receive the email?{' '}
                <button onClick={() => setStep(1)} style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Try again</button>
              </p>
              <button onClick={() => navigate('/login')} style={{ width: '100%', padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', borderRadius: '0.5rem', fontWeight: 500, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                Back to Login
              </button>
            </div>
          </>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Need help? <Link to="/contact" style={{ color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}>Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
