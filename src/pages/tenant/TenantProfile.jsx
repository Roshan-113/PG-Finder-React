import { User, Mail, Phone } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

// Enhanced tenant profile management - Day 4
export function TenantProfile() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>My Profile</h1>
      
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            backgroundColor: '#dbeafe', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={48} style={{ color: '#3b82f6' }} />
          </div>
          <div>
            <h2>John Doe</h2>
            <p style={{ color: '#6b7280' }}>Tenant</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <Input label="Full Name" defaultValue="John Doe" icon={<User size={18} />} />
          <Input label="Email" type="email" defaultValue="john@example.com" icon={<Mail size={18} />} />
          <Input label="Phone" defaultValue="+91 98765 43210" icon={<Phone size={18} />} />
          
          <Button style={{ marginTop: '1rem' }}>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}
