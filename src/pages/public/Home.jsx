import { Search, Users, Home as HomeIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Enhanced home page with better UI - Day 7
export function Home({ onNavigate }) {
  return (
    <div>
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Find Your Perfect PG & Roommate</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Discover verified PG accommodations and compatible roommates
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button size="lg" onClick={() => onNavigate('find-pg')}>
            <Search size={20} style={{ marginRight: '0.5rem' }} />
            Browse PG Listings
          </Button>
          <Button size="lg" variant="outline" onClick={() => onNavigate('find-roommate')}>
            <Users size={20} style={{ marginRight: '0.5rem' }} />
            Find Roommates
          </Button>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Choose PG Finder?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            { icon: Search, title: 'Smart Search', desc: 'Find PGs with advanced filters' },
            { icon: Users, title: 'Roommate Matching', desc: 'Connect with compatible roommates' },
            { icon: HomeIcon, title: 'Verified Listings', desc: '100% verified properties' }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <Icon size={48} style={{ margin: '0 auto 1rem', color: '#667eea' }} />
                <h3>{feature.title}</h3>
                <p style={{ color: '#6b7280' }}>{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
