import React from 'react';

// Enhanced badge component with more variants - Day 9
export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    success: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    info: 'bg-primary-100 text-primary-700 border-primary-200',
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    verified: 'bg-blue-100 text-blue-700 border-blue-200'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}




