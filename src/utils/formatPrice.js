/**
 * Format price in Indian Rupee format
 * Enhanced with decimal support - Day 9
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Format price with custom symbol
 * @param {number} price - Price to format
 * @param {string} symbol - Currency symbol (default: ₹)
 * @returns {string} Formatted price string
 */
export function formatPriceWithSymbol(price, symbol = '₹') {
  return `${symbol}${price.toLocaleString('en-IN')}`;
}

/**
 * Parse price string to number
 * @param {string} priceString - Price string to parse
 * @returns {number} Parsed price
 */
export function parsePrice(priceString) {
  return parseInt(priceString.replace(/[^0-9]/g, ''), 10) || 0;
}
