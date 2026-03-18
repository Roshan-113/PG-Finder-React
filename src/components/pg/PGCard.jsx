import { MapPin, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// Enhanced PG card with better visuals - Day 6
export function PGCard({ pg, onViewDetails }) {
  return (
    <Card hover>
      <img 
        src={pg.image} 
        alt={pg.name}
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
      />
      <div style={{ padding: '1rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>{pg.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6b7280' }}>
          <MapPin size={16} />
          <span>{pg.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Star size={16} className="text-amber-500 fill-amber-500" />
          <span>{pg.rating}</span>
          <span style={{ color: '#6b7280' }}>({pg.reviews} reviews)</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{pg.rent}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>per month</div>
          </div>
          <Button onClick={() => onViewDetails(pg)}>View Details</Button>
        </div>
      </div>
    </Card>
  );
}
