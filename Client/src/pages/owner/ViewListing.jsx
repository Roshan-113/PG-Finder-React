import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { pgAPI } from '../../services/api';

export default function ViewListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pgAPI.getById(id)
      .then(res => {
        const pg = res.data;
        if (pg) setListing({
          listingId: pg.id, title: pg.name, description: pg.description,
          address: pg.address, city: pg.city, state: pg.state, pincode: pg.pincode,
          pgType: pg.pgType || pg.pg_type, totalRooms: pg.totalRooms || pg.total_rooms,
          availableRooms: pg.availableRooms || pg.available_rooms,
          rentPerMonth: pg.rent_per_month || pg.rentPerMonth,
          securityDeposit: pg.security_deposit || pg.securityDeposit,
          foodIncluded: pg.food_included, wifiAvailable: pg.wifi_available,
          acAvailable: pg.ac_available, laundryAvailable: pg.laundry_available,
          parkingAvailable: pg.parking_available, verified: pg.status === 'approved',
          active: true, photos: pg.images || [],
          ownerName: pg.owner?.fullName, ownerPhone: pg.owner?.phone,
          averageRating: pg.averageRating || pg.average_rating || 0,
          reviewCount: pg.totalReviews || pg.total_reviews || 0
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={styles.container}><p>Loading...</p></div>;
  }

  if (!listing) {
    return <div style={styles.container}><p>Loading...</p></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/owner/listings')} style={styles.backBtn}>
          <i className="fas fa-arrow-left"></i>
          <span>Back to Listings</span>
        </button>
        <div style={styles.headerContent}>
          <h1 style={styles.h1}>{listing.title}</h1>
          <div style={styles.headerActions}>
            <button onClick={() => navigate(`/owner/edit-pg/${listing.listingId}`)} style={styles.btnPrimary}>
              <i className="fas fa-edit"></i> Edit Listing
            </button>
            <button onClick={() => navigate('/owner/photos')} style={styles.btnSecondary}>
              <i className="fas fa-images"></i> Manage Photos
            </button>
          </div>
        </div>
      </div>

      {/* Photos */}
      {listing.photos && listing.photos.length > 0 && (
        <div style={styles.photosGrid}>
          {listing.photos.slice(0, 4).map((photo, index) => (
            <img key={index} src={photo} alt={listing.title} style={styles.photo} />
          ))}
        </div>
      )}

      {/* Details Grid */}
      <div style={styles.detailsGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Basic Information</h3>
          <div style={styles.detailRow}>
            <span style={styles.label}>Address:</span>
            <span style={styles.value}>{listing.address}, {listing.city}, {listing.state} - {listing.pincode}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>PG Type:</span>
            <span style={styles.value}>{listing.pgType === 'boys' ? 'Boys PG' : listing.pgType === 'girls' ? 'Girls PG' : 'Co-living'}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Total Rooms:</span>
            <span style={styles.value}>{listing.totalRooms}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Available Rooms:</span>
            <span style={styles.value}>{listing.availableRooms}</span>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Pricing</h3>
          <div style={styles.detailRow}>
            <span style={styles.label}>Rent per Month:</span>
            <span style={styles.value}>₹{listing.rentPerMonth.toLocaleString('en-IN')}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Security Deposit:</span>
            <span style={styles.value}>₹{listing.securityDeposit.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Amenities</h3>
          <div style={styles.amenitiesList}>
            {listing.wifiAvailable && <span style={styles.amenity}><i className="fas fa-wifi"></i> WiFi</span>}
            {listing.acAvailable && <span style={styles.amenity}><i className="fas fa-snowflake"></i> AC</span>}
            {listing.laundryAvailable && <span style={styles.amenity}><i className="fas fa-tshirt"></i> Laundry</span>}
            {listing.foodIncluded && <span style={styles.amenity}><i className="fas fa-utensils"></i> Food</span>}
            {listing.parkingAvailable && <span style={styles.amenity}><i className="fas fa-car"></i> Parking</span>}
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Status</h3>
          <div style={styles.detailRow}>
            <span style={styles.label}>Verified:</span>
            <span style={styles.value}>{listing.verified ? 'Yes' : 'No'}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Active:</span>
            <span style={styles.value}>{listing.active ? 'Yes' : 'No'}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Average Rating:</span>
            <span style={styles.value}>{listing.averageRating > 0 ? listing.averageRating : 'No ratings yet'}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Total Reviews:</span>
            <span style={styles.value}>{listing.reviewCount}</span>
          </div>
        </div>
      </div>

      {listing.description && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Description</h3>
          <p style={styles.description}>{listing.description}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' },
  header: { marginBottom: '2rem' },
  backBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', background: 'none', border: 'none', fontSize: '0.875rem', marginBottom: '1rem', cursor: 'pointer' },
  headerContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  h1: { margin: 0, fontSize: '2rem', fontWeight: 700, color: '#111827' },
  headerActions: { display: 'flex', gap: '0.75rem' },
  btnPrimary: { padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600, color: 'white', background: '#2563eb', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  btnSecondary: { padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600, color: '#374151', background: 'white', border: '1px solid #d1d5db', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  photosGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' },
  photo: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.75rem' },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' },
  card: { background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  cardTitle: { margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' },
  detailRow: { display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' },
  label: { color: '#6b7280', fontSize: '0.875rem' },
  value: { color: '#111827', fontWeight: 600, fontSize: '0.875rem' },
  amenitiesList: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem' },
  amenity: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#f0f9ff', color: '#1e40af', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500 },
  description: { margin: 0, color: '#4b5563', lineHeight: 1.6 }
};
