import { useState, useEffect } from 'react';
import { pgAPI } from '../../services/api';

export default function OwnerPhotos() {
  const [pgs, setPGs] = useState([]);
  const [selectedListing, setSelectedListing] = useState('');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    pgAPI.getMyPGs().then(res => setPGs(res.data || [])).catch(() => {});
  }, []);

  const loadPhotos = (pgId) => {
    setSelectedListing(pgId);
    if (!pgId) { setPhotos([]); return; }
    const pg = pgs.find(p => String(p.id) === String(pgId));
    if (pg) setPhotos((pg.images || []).map((url, i) => ({ id: i + 1, url, isPrimary: i === 0 })));
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Photos</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Manage photos for your PG listings</p>

      <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Select Property</label>
        <select value={selectedListing} onChange={e => loadPhotos(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none' }}>
          <option value="">Choose a property...</option>
          {pgs.map(pg => <option key={pg.id} value={pg.id}>{pg.name}</option>)}
        </select>
      </div>

      {selectedListing && (
        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Current Photos ({photos.length})</h2>
          {photos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
              <i className="fas fa-images" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
              <p style={{ margin: 0 }}>No photos yet. Add photos via Edit PG.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {photos.map(photo => (
                <div key={photo.id} style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img src={photo.url} alt="PG" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {photo.isPrimary && (
                    <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: '#2563eb', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>Primary</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
