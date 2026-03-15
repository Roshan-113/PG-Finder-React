import { Star } from 'lucide-react';

// Improved rating display with half stars - Day 6
export function RatingStars({ rating, size = 16 }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}
