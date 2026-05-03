import { useState } from 'react';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';

export default function TestValidation() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm
  } = useFormValidation({
    email: '',
    phone: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = validateForm({
      name: validationRules.name,
      email: validationRules.email,
      phone: validationRules.phone,
      password: validationRules.password
    });

    if (isValid) {
      alert('✅ All validations passed!\n\n' + JSON.stringify(values, null, 2));
    } else {
      alert('❌ Validation failed. Please check the errors.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h1 style={{ marginBottom: '1rem', color: '#111827' }}>Validation Test Page</h1>
      <p style={{ marginBottom: '2rem', color: '#6b7280' }}>Test the JavaScript validation (NO HTML5 validation)</p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
            Name (min 2 chars)
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your name"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `2px solid ${hasError('name') ? '#dc2626' : '#d1d5db'}`,
              borderRadius: '0.5rem',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {hasError('name') && (
            <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              ❌ {errors.name}
            </div>
          )}
          {!hasError('name') && values.name && (
            <div style={{ color: '#16a34a', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              ✅ Valid name
            </div>
          )}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
            Email (must be valid format)
          </label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="your@email.com"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `2px solid ${hasError('email') ? '#dc2626' : '#d1d5db'}`,
              borderRadius: '0.5rem',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {hasError('email') && (
            <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              ❌ {errors.email}
            </div>
          )}
          {!hasError('email') && values.email && (
            <div style={{ color: '#16a34a', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              ✅ Valid email
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
            Phone (10 digits, starts with 6-9)
          </label>
          <input
            type="text"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="9876543210"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `2px solid ${hasError('phone') ? '#dc2626' : '#d1d5db'}`,
              borderRadius: '0.5rem',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {hasError('phone') && (
            <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              ❌ {errors.phone}
            </div>
          )}
          {!hasError('phone') && values.phone && (
            <div style={{ color: '#16a34a', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              ✅ Valid phone
            </div>
          )}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
            Password (8+ chars, uppercase, lowercase, number, special char)
          </label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password123!"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `2px solid ${hasError('password') ? '#dc2626' : '#d1d5db'}`,
              borderRadius: '0.5rem',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {hasError('password') && (
            <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              ❌ {errors.password}
            </div>
          )}
          {!hasError('password') && values.password && (
            <div style={{ color: '#16a34a', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              ✅ Valid password
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '1rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Test Validation
        </button>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Test Cases:</h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <li>Name: Try "A" (too short) vs "John Doe" (valid)</li>
          <li>Email: Try "invalid" vs "test@example.com"</li>
          <li>Phone: Try "1234567890" (wrong start) vs "9876543210" (valid)</li>
          <li>Password: Try "weak" vs "Strong123!" (valid)</li>
        </ul>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#eff6ff', borderRadius: '0.5rem', border: '1px solid #bfdbfe' }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#1e40af' }}>
          <strong>Note:</strong> This form has <code>noValidate</code> attribute. All validation is done via JavaScript, matching Java patterns exactly.
        </p>
      </div>
    </div>
  );
}
