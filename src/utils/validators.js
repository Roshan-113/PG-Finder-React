/**
 * Validate email address
 * Enhanced with better regex - Day 9
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export function validatePhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return phoneRegex.test(cleanPhone);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export function validatePassword(password) {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain a number' };
  }
  return { isValid: true, message: 'Password is strong' };
}

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} True if not empty
 */
export function validateRequired(value) {
  return value !== null && value !== undefined && value !== '';
}
