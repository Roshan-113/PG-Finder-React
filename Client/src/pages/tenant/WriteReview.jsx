import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { reviewAPI, bookingAPI } from '../../services/api';

export default function WriteReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedBookingId = location.state?.bookingId;

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(preselectedBookingId || '');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingAPI.getMyBookings()
      .then(res => {
        const eligible = (res.data || []).filter(b => b.status === 'confirmed' || b.status === 'completed');
        setBookings(eligible);
        if (!selectedBooking && eligible.length > 0) setSelectedBooking(String(eligible[0].id));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!rating) errs.rating = 'Please select a rating';
    if (reviewText.trim().length < 20) errs.review = 'Please write at least 20 characters';
    if (!selectedBooking) errs.booking = 'Please select a booking';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const booking = bookings.find(b => String(b.id) === String(selectedBooking));
    if (!booking) return;

    setSubmitting(true);
    try {
      await reviewAPI.create({
        pgId: booking.pgId || booking.pg?.id,
        bookingId: booking.id,
        rating,
        comment: reviewText
      });
      alert('Review submitted! It will appear after admin approval.');
      navigate('/tenant/bookings');
    } catch (err) {
      alert(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
      Loading...
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>Write a Review</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Share your experience to help others make better decisions</p>

      <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Select Booking */}
          {bookings.length > 0 ? (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
                Select Booking <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select value={selectedBooking} onChange={e => setSelectedBooking(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: `1px solid ${errors.booking ? '#ef4444' : '#d1d5db'}`, borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none' }}>
                <option value="">-- Select a booking --</option>
                {bookings.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.pg?.name || `Booking #${b.id}`} — {b.moveInDate ? new Date(b.moveInDate).toLocaleDateString('en-IN') : ''}
                  </option>
                ))}
              </select>
              {errors.booking && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.booking}</div>}
            </div>
          ) : (
            <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem', color: '#92400e', fontSize: '0.875rem' }}>
              <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
              You need a confirmed or completed booking to write a review.
              <button type="button" onClick={() => navigate('/find-pg')} style={{ marginLeft: '0.5rem', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                Find a PG
              </button>
            </div>
          )}

          {/* Rating */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '1rem' }}>
              Overall Rating <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '2rem' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <i key={star}
                  className={`${(hovered || rating) >= star ? 'fas' : 'far'} fa-star`}
                  style={{ color: (hovered || rating) >= star ? '#f59e0b' : '#d1d5db', cursor: 'pointer', transition: 'color 0.2s' }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                ></i>
              ))}
              {rating > 0 && (
                <span style={{ fontSize: '1rem', color: '#6b7280', alignSelf: 'center', marginLeft: '0.5rem' }}>
                  {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                </span>
              )}
            </div>
            {errors.rating && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.rating}</div>}
          </div>

          {/* Review Text */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
              Your Review <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} rows="6"
              placeholder="Share your experience about the PG, facilities, cleanliness, food quality, owner behavior, etc."
              style={{ width: '100%', padding: '0.75rem', border: `1px solid ${errors.review ? '#ef4444' : '#d1d5db'}`, borderRadius: '0.5rem', fontSize: '0.9375rem', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = '#2563eb'}
              onBlur={e => e.target.style.borderColor = errors.review ? '#ef4444' : '#d1d5db'}
            ></textarea>
            <div style={{ color: reviewText.length >= 20 ? '#16a34a' : '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {reviewText.length >= 20 ? <><i className="fas fa-check" style={{ marginRight: '0.25rem' }}></i>Minimum length met</> : `Minimum 20 characters (${reviewText.length} typed)`}
            </div>
            {errors.review && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.review}</div>}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={submitting || bookings.length === 0}
              style={{ flex: 1, padding: '0.875rem', background: (submitting || bookings.length === 0) ? '#93c5fd' : '#2563eb', color: 'white', fontWeight: 600, border: 'none', borderRadius: '0.5rem', cursor: (submitting || bookings.length === 0) ? 'not-allowed' : 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {submitting ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</> : <><i className="fas fa-paper-plane"></i> Submit Review</>}
            </button>
            <button type="button" onClick={() => navigate('/tenant/bookings')}
              style={{ flex: 1, padding: '0.875rem', background: 'white', color: '#374151', fontWeight: 600, border: '1px solid #d1d5db', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
