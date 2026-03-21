// Enhanced formatters with localization - Day 9
export const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN');
};

export const formatPhoneNumber = (phone) => {
  return phone.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');
};
