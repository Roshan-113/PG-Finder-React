/**
 * Login Form - JavaScript Validation Only (No HTML5 validation)
 * Matches Java validation pattern
 */

import { useState } from 'react';
import { useFormValidation, validationRules } from '../../hooks/useFormValidation';

export default function LoginForm({ onSubmit, userType = 'tenant' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm
  } = useFormValidation({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // JavaScript validation (no HTML5)
    const isValid = validateForm({
      email: validationRules.email,
      password: {
        required: true,
        label: 'Password'
      }
    });

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Email Field - NO HTML5 validation */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Email
        </label>
        <input
          type="text"  {/* Changed from type="email" to avoid HTML5 validation */}
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="name@company.com"
          style={{
            width: '100%',
            padding: '12px',
            border: `2px solid ${errors.email && touched.email ? '#dc2626' : '#e5e7eb'}`,
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          autoComplete="email"
        />
        {errors.email && touched.email && (
          <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
            {errors.email}
          </div>
        )}
      </div>

      {/* Password Field - NO HTML5 validation */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="••••••••"
          style={{
            width: '100%',
            padding: '12px',
            border: `2px solid ${errors.password && touched.password ? '#dc2626' : '#e5e7eb'}`,
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          autoComplete="current-password"
        />
        {errors.password && touched.password && (
          <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
            {errors.password}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: isSubmitting ? '#9ca3af' : '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s'
        }}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
