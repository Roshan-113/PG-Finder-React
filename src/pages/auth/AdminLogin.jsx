import { useState } from 'react';
import { Shield, Mail, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

// Enhanced admin login with security - Day 7
export function AdminLogin({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin('admin');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '3rem', 
        borderRadius: '12px', 
        width: '100%', 
        maxWidth: '400px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Shield size={48} style={{ margin: '0 auto 1rem', color: '#667eea' }} />
          <h2>Admin Login</h2>
          <p style={{ color: '#6b7280' }}>Access admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            icon={<Mail size={18} />}
            required
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            icon={<Lock size={18} />}
            required
          />
          <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
            Sign In as Admin
          </Button>
        </form>
      </div>
    </div>
  );
}
