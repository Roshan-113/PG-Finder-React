import { Users, Bed } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

// Enhanced room card with availability status - Day 12
export function RoomCard({ room }) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <h4>Room {room.roomNo}</h4>
          <Badge variant="info">{room.type}</Badge>
        </div>
        <Badge variant={room.status === 'Available' ? 'success' : 'default'}>
          {room.status}
        </Badge>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={16} />
          <span>Capacity: {room.capacity}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bed size={16} />
          <span>Occupied: {room.occupied}</span>
        </div>
      </div>
      
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
        ₹{room.rent.toLocaleString()}/month
      </div>
    </Card>
  );
}
