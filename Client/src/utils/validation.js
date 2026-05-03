// Validation Utility Functions for React

// Validation patterns
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/,
  number: /^\d+$/,
  decimal: /^\d+(\.\d{1,2})?$/,
  pincode: /^\d{6}$/
};

// Validation functions
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }
  if (!patterns.email.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  return { isValid: true, error: '' };
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return { isValid: false, error: 'Phone number is required' };
  }
  if (!patterns.phone.test(phone.trim())) {
    return { isValid: false, error: 'Phone must be 10 digits starting with 6-9' };
  }
  return { isValid: true, error: '' };
};

export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  if (!patterns.password.test(password)) {
    return { isValid: false, error: 'Password must include uppercase, lowercase, number and special character' };
  }
  return { isValid: true, error: '' };
};

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Name is required' };
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  return { isValid: true, error: '' };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  return { isValid: true, error: '' };
};

export const validatePincode = (pincode) => {
  if (!pincode || !pincode.trim()) {
    return { isValid: false, error: 'Pincode is required' };
  }
  if (!patterns.pincode.test(pincode.trim())) {
    return { isValid: false, error: 'Pincode must be 6 digits' };
  }
  return { isValid: true, error: '' };
};

export const validateRent = (rent) => {
  if (!rent) {
    return { isValid: false, error: 'Rent is required' };
  }
  const rentValue = parseFloat(rent);
  if (isNaN(rentValue) || rentValue < 1000) {
    return { isValid: false, error: 'Rent must be at least ₹1,000' };
  }
  if (rentValue > 100000) {
    return { isValid: false, error: 'Rent cannot exceed ₹1,00,000' };
  }
  return { isValid: true, error: '' };
};

export const validateNumber = (value, min, max, fieldName = 'Value') => {
  if (!value) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  const numValue = parseInt(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: `${fieldName} must be a number` };
  }
  if (min !== undefined && numValue < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` };
  }
  if (max !== undefined && numValue > max) {
    return { isValid: false, error: `${fieldName} cannot exceed ${max}` };
  }
  return { isValid: true, error: '' };
};

export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true, error: '' };
};

export const validateMinLength = (value, minLength, fieldName = 'Field') => {
  if (!value || value.trim().length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  return { isValid: true, error: '' };
};

export const validateMaxLength = (value, maxLength, fieldName = 'Field') => {
  if (value && value.trim().length > maxLength) {
    return { isValid: false, error: `${fieldName} must not exceed ${maxLength} characters` };
  }
  return { isValid: true, error: '' };
};

export const validateDateRange = (startDate, endDate) => {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return { isValid: false, error: 'End date must be after start date' };
    }
  }
  return { isValid: true, error: '' };
};

export const validateMoveInDate = (moveInDate) => {
  if (!moveInDate) {
    return { isValid: false, error: 'Please select move-in date' };
  }
  const selectedDate = new Date(moveInDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return { isValid: false, error: 'Move-in date cannot be in the past' };
  }
  return { isValid: true, error: '' };
};

// File validation
export const validatePhotoUpload = (files) => {
  if (!files || files.length === 0) {
    return { isValid: false, error: 'Please select at least one photo' };
  }
  
  const maxFiles = 10;
  if (files.length > maxFiles) {
    return { isValid: false, error: `You can upload maximum ${maxFiles} photos at once` };
  }
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Only JPG, PNG, and WebP images are allowed' };
    }
    
    if (file.size > maxSize) {
      return { isValid: false, error: `Each photo must be less than 5MB. File "${file.name}" is too large.` };
    }
  }
  
  return { isValid: true, error: '' };
};

export const validateDocumentUpload = (files) => {
  if (!files || files.length === 0) {
    return { isValid: false, error: 'Please select a document' };
  }
  
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Only PDF, JPG, and PNG files are allowed' };
    }
    
    if (file.size > maxSize) {
      return { isValid: false, error: `File "${file.name}" is too large. Maximum size is 10MB.` };
    }
  }
  
  return { isValid: true, error: '' };
};

// Form validation
export const validateLoginForm = (formData) => {
  const errors = {};
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  if (!formData.password) {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error;
  }
  
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }
  
  const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePGListingForm = (formData) => {
  const errors = {};
  
  const nameValidation = validateMinLength(formData.pgName, 3, 'PG name');
  if (!nameValidation.isValid) {
    errors.pgName = nameValidation.error;
  }
  
  const addressValidation = validateMinLength(formData.address, 10, 'Address');
  if (!addressValidation.isValid) {
    errors.address = addressValidation.error;
  }
  
  const cityValidation = validateRequired(formData.city, 'City');
  if (!cityValidation.isValid) {
    errors.city = cityValidation.error;
  }
  
  const pincodeValidation = validatePincode(formData.pincode);
  if (!pincodeValidation.isValid) {
    errors.pincode = pincodeValidation.error;
  }
  
  const rentValidation = validateRent(formData.rent);
  if (!rentValidation.isValid) {
    errors.rent = rentValidation.error;
  }
  
  const roomsValidation = validateNumber(formData.totalRooms, 1, 100, 'Total rooms');
  if (!roomsValidation.isValid) {
    errors.totalRooms = roomsValidation.error;
  }
  
  const phoneValidation = validatePhone(formData.contactNumber);
  if (!phoneValidation.isValid) {
    errors.contactNumber = phoneValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSearchForm = (formData) => {
  const errors = {};
  
  if (formData.minRent && formData.maxRent) {
    const min = parseFloat(formData.minRent);
    const max = parseFloat(formData.maxRent);
    
    if (min > max) {
      errors.maxRent = 'Max rent must be greater than min rent';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateBookingForm = (formData) => {
  const errors = {};
  
  const moveInDateValidation = validateMoveInDate(formData.moveInDate);
  if (!moveInDateValidation.isValid) {
    errors.moveInDate = moveInDateValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateContactForm = (formData) => {
  const errors = {};
  
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  const subjectValidation = validateMinLength(formData.subject, 5, 'Subject');
  if (!subjectValidation.isValid) {
    errors.subject = subjectValidation.error;
  }
  
  const messageValidation = validateMinLength(formData.message, 10, 'Message');
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Password strength checker
export const checkPasswordStrength = (password) => {
  if (!password) return { strength: 'none', score: 0 };
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[@#$%^&+=]/.test(password)) score++;
  
  if (score <= 2) return { strength: 'weak', score };
  if (score <= 4) return { strength: 'medium', score };
  return { strength: 'strong', score };
};

// Utility functions
export const confirmAction = (message) => {
  return window.confirm(message);
};

export const showAlert = (message) => {
  window.alert(message);
};

export default {
  patterns,
  validateEmail,
  validatePhone,
  validatePassword,
  validateName,
  validateConfirmPassword,
  validatePincode,
  validateRent,
  validateNumber,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateDateRange,
  validateMoveInDate,
  validatePhotoUpload,
  validateDocumentUpload,
  validateLoginForm,
  validateRegistrationForm,
  validatePGListingForm,
  validateSearchForm,
  validateBookingForm,
  validateContactForm,
  checkPasswordStrength,
  confirmAction,
  showAlert
};
