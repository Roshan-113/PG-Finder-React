/**
 * Form Validation Hook
 * - Errors show in RED on submit (all fields)
 * - Errors show in RED on blur (individual field)
 * - Errors clear as user types
 */

import { useState, useCallback } from 'react';
import {
  isValidEmail, isValidPhone, isValidPassword,
  isNotEmpty, isValidPincode, isNumeric, hasMinLength
} from '../utils/validationUtil';

export const useFormValidation = (initialValues = {}) => {
  const [values, setValues]     = useState(initialValues);
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const _validate = useCallback((name, value, rules) => {
    if (!rules) return null;
    const v = value ?? '';
    if (rules.required && !isNotEmpty(String(v))) return `${rules.label || name} is required`;
    if (!v && v !== 0) return null;
    if (rules.email    && !isValidEmail(v))   return 'Please enter a valid email address';
    if (rules.phone    && !isValidPhone(v))   return 'Phone must be 10 digits starting with 6-9';
    if (rules.password) {
      if (!hasMinLength(v, 8))    return 'Password must be at least 8 characters';
      if (!isValidPassword(v))    return 'Password must include uppercase, lowercase, number and special character (@#$%^&+=)';
    }
    if (rules.pincode  && !isValidPincode(v)) return 'Invalid pincode (6 digits required)';
    if (rules.numeric  && !isNumeric(String(v))) return 'Must be a number';
    if (rules.minLength && !hasMinLength(String(v), rules.minLength)) return `Minimum ${rules.minLength} characters required`;
    if (rules.maxLength && String(v).length > rules.maxLength) return `Maximum ${rules.maxLength} characters allowed`;
    if (rules.custom && typeof rules.custom === 'function') return rules.custom(v, values);
    return null;
  }, [values]);

  /** Call on submit — marks ALL fields touched so errors show immediately */
  const validateForm = useCallback((rules) => {
    const newErrors  = {};
    const newTouched = {};
    let valid = true;
    Object.keys(rules).forEach(field => {
      newTouched[field] = true;
      const err = _validate(field, values[field], rules[field]);
      if (err) { newErrors[field] = err; valid = false; }
    });
    setTouched(prev => ({ ...prev, ...newTouched }));
    setErrors(newErrors);
    return valid;
  }, [values, _validate]);

  const resetForm      = useCallback(() => { setValues(initialValues); setErrors({}); setTouched({}); }, [initialValues]);
  const setFieldValue  = useCallback((n, v) => setValues(p => ({ ...p, [n]: v })), []);
  const setFieldError  = useCallback((n, e) => setErrors(p => ({ ...p, [n]: e })), []);

  /** Convenience: true when field has error AND has been touched */
  const hasError = (name) => !!(errors[name] && touched[name]);

  return {
    values, errors, touched,
    handleChange, handleBlur,
    validateForm, resetForm,
    setFieldValue, setFieldError, setValues, setErrors, setTouched,
    hasError
  };
};

// ── Preset rules ─────────────────────────────────────────────────────────────
export const validationRules = {
  email:    { required: true, email: true,    label: 'Email' },
  password: { required: true, password: true, label: 'Password' },
  confirmPassword: (field = 'password') => ({
    required: true, label: 'Confirm Password',
    custom: (v, vals) => v !== vals[field] ? 'Passwords do not match' : null
  }),
  name:        { required: true, minLength: 2,  label: 'Name' },
  phone:       { required: true, phone: true,   label: 'Phone' },
  pgName:      { required: true, minLength: 3, maxLength: 200, label: 'PG Name' },
  description: { required: true, minLength: 10, maxLength: 1000, label: 'Description' },
  address:     { required: true, minLength: 10, label: 'Address' },
  city:        { required: true, minLength: 2,  label: 'City' },
  state:       { required: true, label: 'State' },
  pincode:     { required: true, pincode: true, label: 'Pincode' },
  rent: {
    required: true, numeric: true, label: 'Rent',
    custom: v => { const n = Number(v); if (n <= 0) return 'Rent must be greater than 0'; if (n > 1000000) return 'Rent seems too high'; return null; }
  },
  deposit: {
    required: true, numeric: true, label: 'Security Deposit',
    custom: v => Number(v) < 0 ? 'Deposit cannot be negative' : null
  },
  moveInDate: {
    required: true, label: 'Move-in Date',
    custom: v => { const d = new Date(v), t = new Date(); t.setHours(0,0,0,0); return d < t ? 'Move-in date cannot be in the past' : null; }
  },
  duration: {
    required: true, numeric: true, label: 'Duration',
    custom: v => { const n = Number(v); if (n < 1) return 'Duration must be at least 1 month'; if (n > 24) return 'Duration cannot exceed 24 months'; return null; }
  },
  rating:  { required: true, label: 'Rating',  custom: v => { const n = Number(v); return (n < 1 || n > 5) ? 'Rating must be between 1 and 5' : null; } },
  comment: { required: true, minLength: 10, maxLength: 500,  label: 'Comment' },
  message: { required: true, minLength: 10, maxLength: 1000, label: 'Message' },
  subject: { required: true, minLength: 5,  maxLength: 200,  label: 'Subject' }
};

export default useFormValidation;
