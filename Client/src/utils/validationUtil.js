/**
 * Validation Utility - JavaScript version matching Java ValidationUtil
 * Provides client-side validation for forms
 */

// Email pattern: alphanumeric + special chars @ domain.extension
const EMAIL_PATTERN = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Phone pattern: Indian mobile numbers (10 digits starting with 6-9)
const PHONE_PATTERN = /^[6-9]\d{9}$/;

// Password pattern: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

// Pincode pattern: 6 digits
const PINCODE_PATTERN = /^\d{6}$/;

// Numeric pattern: only numbers
const NUMERIC_PATTERN = /^\d+$/;

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = (email) => {
  return email != null && EMAIL_PATTERN.test(email);
};

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidPhone = (phone) => {
  return phone != null && PHONE_PATTERN.test(phone);
};

/**
 * Validate password strength
 * Must contain: 1 uppercase, 1 lowercase, 1 number, 1 special char, min 8 chars
 * @param {string} password - Password to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidPassword = (password) => {
  return password != null && PASSWORD_PATTERN.test(password);
};

/**
 * Check if string is not empty
 * @param {string} str - String to check
 * @returns {boolean} - True if not empty, false otherwise
 */
export const isNotEmpty = (str) => {
  return str != null && str.trim().length > 0;
};

/**
 * Validate pincode (6 digits)
 * @param {string} pincode - Pincode to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidPincode = (pincode) => {
  return pincode != null && PINCODE_PATTERN.test(pincode);
};

/**
 * Check if string contains only numbers
 * @param {string} str - String to check
 * @returns {boolean} - True if numeric, false otherwise
 */
export const isNumeric = (str) => {
  return str != null && NUMERIC_PATTERN.test(str);
};

/**
 * Validate number range
 * @param {number} value - Value to check
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} - True if in range, false otherwise
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validate minimum length
 * @param {string} str - String to check
 * @param {number} minLength - Minimum length required
 * @returns {boolean} - True if meets minimum, false otherwise
 */
export const hasMinLength = (str, minLength) => {
  return str != null && str.length >= minLength;
};

/**
 * Validate maximum length
 * @param {string} str - String to check
 * @param {number} maxLength - Maximum length allowed
 * @returns {boolean} - True if within maximum, false otherwise
 */
export const hasMaxLength = (str, maxLength) => {
  return str != null && str.length <= maxLength;
};

/**
 * Get validation error message for email
 * @param {string} email - Email to validate
 * @returns {string|null} - Error message or null if valid
 */
export const getEmailError = (email) => {
  if (!isNotEmpty(email)) return 'Email is required';
  if (!isValidEmail(email)) return 'Invalid email format';
  return null;
};

/**
 * Get validation error message for phone
 * @param {string} phone - Phone to validate
 * @returns {string|null} - Error message or null if valid
 */
export const getPhoneError = (phone) => {
  if (!isNotEmpty(phone)) return 'Phone number is required';
  if (!isValidPhone(phone)) return 'Invalid phone number. Must be 10 digits starting with 6-9';
  return null;
};

/**
 * Get validation error message for password
 * @param {string} password - Password to validate
 * @returns {string|null} - Error message or null if valid
 */
export const getPasswordError = (password) => {
  if (!isNotEmpty(password)) return 'Password is required';
  if (!hasMinLength(password, 8)) return 'Password must be at least 8 characters';
  if (!isValidPassword(password)) {
    return 'Password must contain uppercase, lowercase, number and special character (@#$%^&+=)';
  }
  return null;
};

/**
 * Get validation error message for required field
 * @param {string} value - Value to check
 * @param {string} fieldName - Name of the field
 * @returns {string|null} - Error message or null if valid
 */
export const getRequiredError = (value, fieldName) => {
  if (!isNotEmpty(value)) return `${fieldName} is required`;
  return null;
};

/**
 * Validate form data object
 * @param {object} data - Form data to validate
 * @param {object} rules - Validation rules
 * @returns {object} - Object with errors (empty if valid)
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];
    
    if (rule.required && !isNotEmpty(value)) {
      errors[field] = `${rule.label || field} is required`;
      return;
    }
    
    if (rule.email && !isValidEmail(value)) {
      errors[field] = 'Invalid email format';
      return;
    }
    
    if (rule.phone && !isValidPhone(value)) {
      errors[field] = 'Invalid phone number';
      return;
    }
    
    if (rule.password && !isValidPassword(value)) {
      errors[field] = 'Password must contain uppercase, lowercase, number and special character';
      return;
    }
    
    if (rule.minLength && !hasMinLength(value, rule.minLength)) {
      errors[field] = `Minimum ${rule.minLength} characters required`;
      return;
    }
    
    if (rule.maxLength && !hasMaxLength(value, rule.maxLength)) {
      errors[field] = `Maximum ${rule.maxLength} characters allowed`;
      return;
    }
    
    if (rule.numeric && !isNumeric(value)) {
      errors[field] = 'Must be a number';
      return;
    }
    
    if (rule.pincode && !isValidPincode(value)) {
      errors[field] = 'Invalid pincode (6 digits required)';
      return;
    }
  });
  
  return errors;
};

// Export all validation functions
export default {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isNotEmpty,
  isValidPincode,
  isNumeric,
  isInRange,
  hasMinLength,
  hasMaxLength,
  getEmailError,
  getPhoneError,
  getPasswordError,
  getRequiredError,
  validateForm
};
