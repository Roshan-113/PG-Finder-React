import { MapPin, DollarSign, MessageCircle, UserCheck, Calendar, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CompatibilityMeter } from './CompatibilityMeter';

export function RoommateCard({ profile, currentUserPreferences }) {
  const [showFullBio, setShowFullBio] = useState(false);

  const calculateCompatibility = () => {
    if (!currentUserPreferences) return 0;
    let score = 0;
    const maxScore = 100;
    
    // Budget compatibility (30 points)
    const budgetDiff = Math.abs(currentUserPreferences.budget - profile.budget);
    score += Math.max(0, 30 - (budgetDiff / 1000) * 5);
    
    // Lifestyle match (40 points)
    const commonLifestyle = profile.lifestyle.filter(l => 
      currentUserPreferences.lifestyle?.includes(l)
    ).length;
    score += (commonLifestyle / Math.max(profile.lifestyle.length, 1)) * 40;
    
    // Location match (30 points)
    if (profile.location === currentUserPreferences.location) score += 30;
    
    return Math.min(Math.round(score), maxScore);
  };

  const compatibility = calculateCompatibility();
  const truncatedBio = profile.bio?.length > 100 ? profile.bio.substring(0, 100) + '...' : profile.bio;

  return (
    <Card hover>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <img 
            src={profile.image} 
            alt={profile.name}
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #e5e7eb' }}
          />
          {profile.verified && (
            <div style={{ 
              position: 'absolute', 
              bottom: '0', 
              right: '0', 
              background: '#10b981', 
              borderRadius: '50%', 
              padding: '4px',
              border: '2px solid white'
            }}>
              <UserCheck size={14} color="white" />
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h4 style={{ marginBottom: '4px' }}>{profile.name}, {profile.age}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>
                <Briefcase size={14} />
                <span>{profile.occupation}</span>
              </div>
            </div>
            {profile.verified && <Badge variant="success">Verified</Badge>}
          </div>
        </div>
      </div>

      {currentUserPreferences && (
        <div style={{ marginBottom: '1rem' }}>
          <CompatibilityMeter score={compatibility} />
        </div>
      )}
      
      <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <MapPin size={16} className="text-gray-500" />
          <span>{profile.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <DollarSign size={16} className="text-gray-500" />
          <span>Budget: ₹{profile.budget?.toLocaleString()}/month</span>
        </div>
        {profile.moveInDate && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <Calendar size={16} className="text-gray-500" />
            <span>Available from: {profile.moveInDate}</span>
          </div>
        )}
      </div>
      
      {profile.bio && (
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.5' }}>
            {showFullBio ? profile.bio : truncatedBio}
          </p>
          {profile.bio.length > 100 && (
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              style={{ 
                fontSize: '0.875rem', 
                color: '#2563eb', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                padding: '0',
                marginTop: '4px'
              }}
            >
              {showFullBio ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {profile.lifestyle?.slice(0, 4).map((tag) => (
          <Badge key={tag} variant="outline" style={{ fontSize: '0.75rem' }}>
            {tag}
          </Badge>
        ))}
        {profile.lifestyle?.length > 4 && (
          <Badge variant="outline" style={{ fontSize: '0.75rem' }}>
            +{profile.lifestyle.length - 4}
          </Badge>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button style={{ flex: 1 }} variant="primary">
          <MessageCircle size={16} style={{ marginRight: '4px' }} />
          Connect
        </Button>
        <Button variant="outline">View Profile</Button>
      </div>
    </Card>
  );
}
