import { Star, StarHalf } from 'lucide-react';

// Enhanced rating display with half stars and hover effects
export function RatingStars({ rating, size = 16, showCount = false, reviewCount = 0, interactive = false, onChange }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const handleClick = (index) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[...Array(5)].map((_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalfStar;
          
          return (
            <div
              key={i}
              onClick={() => handleClick(i)}
              style={{ cursor: interactive ? 'pointer' : 'default' }}
            >
              {isHalf ? (
                <StarHalf
                  size={size}
                  className="text-amber-500 fill-amber-500"
                />
              ) : (
                <Star
                  size={size}
                  className={isFilled ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                />
              )}
            </div>
          );
        })}
      </div>
      {showCount && reviewCount > 0 && (
        <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '4px' }}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
