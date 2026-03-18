import { MapPin, DollarSign } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// Enhanced roommate card display - Day 6
export function RoommateCard({ profile }) {
  return (
    <Card>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <img 
          src={profile.image} 
          alt={profile.name}
          style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <h4>{profile.name}</h4>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{profile.occupation}, {profile.age}</p>
          {profile.verified && <Badge variant="verified">Verified</Badge>}
        </div>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <MapPin size={16} />
          <span>{profile.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <DollarSign size={16} />
          <span>Budget: ₹{profile.budget}</span>
        </div>
      </div>
      
      <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: '#4b5563' }}>{profile.bio}</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {profile.lifestyle.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      
      <Button style={{ width: '100%' }}>Connect</Button>
    </Card>
  );
}
