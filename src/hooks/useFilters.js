import { useState, useCallback } from 'react';

// Enhanced filters hook with persistence - Day 10
export function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);
  
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);
  
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);
  
  const applyFilters = useCallback((data) => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'all') return true;
        return item[key] === value;
      });
    });
  }, [filters]);
  
  return {
    filters,
    updateFilter,
    resetFilters,
    applyFilters
  };
}
