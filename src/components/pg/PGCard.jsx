import { MapPin, Star, Heart, Share2, Users } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { RatingStars } from '../shared/RatingStars';

export function PGCard({ pg, onViewDetails }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card hover>
      <div style={{ position: 'relative' }}>
        <img 
          src={pg.image} 
          alt={pg.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
        />
        <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
          <button
            onClick={toggleFavorite}
            style={{
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              padding: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Heart size={18} className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'} />
          </button>
          <button
            onClick={handleShare}
            style={{
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              padding: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Share2 size={18} className="text-gray-600" />
          </button>
        </div>
        {pg.availableRooms && (
          <Badge 
            style={{ 
              position: 'absolute', 
              bottom: '12px', 
              left: '12px',
              background: 'rgba(255,255,255,0.95)',
              color: '#059669',
              fontWeight: 'bold'
            }}
          >
            <Users size={14} style={{ marginRight: '4px' }} />
            {pg.availableRooms} rooms available
          </Badge>
        )}
      </div>
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
          <h3 style={{ marginBottom: '0' }}>{pg.name}</h3>
          {pg.gender && (
            <Badge variant={pg.gender === 'female' ? 'pink' : 'blue'}>
              {pg.gender}
            </Badge>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6b7280' }}>
          <MapPin size={16} />
          <span style={{ fontSize: '0.875rem' }}>{pg.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <RatingStars rating={pg.rating} size={16} showCount reviewCount={pg.reviews} />
        </div>
        {pg.amenities && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {pg.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="outline" style={{ fontSize: '0.75rem' }}>
                {amenity}
              </Badge>
            ))}
            {pg.amenities.length > 3 && (
              <Badge variant="outline" style={{ fontSize: '0.75rem' }}>
                +{pg.amenities.length - 3} more
              </Badge>
            )}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>₹{pg.rent.toLocaleString()}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</div>
          </div>
          <Button onClick={() => onViewDetails(pg)}>View Details</Button>
        </div>
      </div>
    </Card>
  );
}
