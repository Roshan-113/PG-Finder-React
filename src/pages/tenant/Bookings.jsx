import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, IndianRupee, Eye, X, Home, Clock, CheckCircle } from 'lucide-react';

// Enhanced booking management with status tracking - Day 1
export function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    try {
      let storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      
      if (storedBookings.length === 0) {
        const demoBookings = [
          {
            id: 'DEMO_BK001',
            pgName: 'Sunshine PG',
            pgLocation: 'Koramangala, Bangalore',
            checkInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 3,
            roomType: 'double',
            totalCost: 25500,
            status: 'confirmed',
            paymentStatus: 'paid'
          },
          {
            id: 'DEMO_BK002',
            pgName: 'Green Valley Hostel',
            pgLocation: 'HSR Layout, Bangalore',
            checkInDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 6,
            roomType: 'single',
            totalCost: 43200,
            status: 'confirmed',
            paymentStatus: 'paid'
          },
          {
            id: 'DEMO_BK003',
            pgName: 'Urban Stay PG',
            pgLocation: 'Indiranagar, Bangalore',
            checkInDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 2,
            roomType: 'triple',
            totalCost: 14400,
            status: 'completed',
            paymentStatus: 'paid'
          }
        ];
        storedBookings = demoBookings;
      }
      
      setBookings(storedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
    }
  };

  const clearAllBookings = () => {
    if (confirm('Clear all bookings?')) {
      localStorage.removeItem('userBookings');
      setBookings([]);
    }
  };

  const handleCancelBooking = (bookingId) => {
    if (confirm('Cancel this booking?')) {
      const updatedBookings = bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      );
      setBookings(updatedBookings);
      if (!bookingId.startsWith('DEMO_')) {
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      }
    }
  };

  const getStatusBadge = (booking) => {
    try {
      const checkInDate = new Date(booking.checkInDate);
      const today = new Date();
      const isUpcoming = checkInDate >= today;
      
      if (booking.status === 'cancelled') {
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">Cancelled</span>;
      }
      if (booking.status === 'completed') {
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">Completed</span>;
      }
      if (isUpcoming) {
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">Upcoming</span>;
      }
      return <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">Completed</span>;
    } catch (error) {
      return <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">Status Unknown</span>;
    }
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'N/A';
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Date not available';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  const getRoomTypeDisplay = (roomType) => {
    if (!roomType) return 'Not specified';
    return roomType.charAt(0).toUpperCase() + roomType.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
              <p className="text-gray-600">View and manage all your bookings</p>
            </div>
            {bookings.length > 0 && (
              <button
                onClick={clearAllBookings}
                className="text-sm text-red-600 hover:text-red-700 underline"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => {
              try {
                const checkInDate = booking.checkInDate ? new Date(booking.checkInDate) : null;
                const isUpcoming = checkInDate && checkInDate >= new Date();
                const isCancelled = booking.status === 'cancelled';
                const isCompleted = booking.status === 'completed' || (!isUpcoming && !isCancelled);
                
                return (
                  <div key={booking.id || Math.random()} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl bg-blue-50 p-2 rounded-lg">🏠</div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{booking.pgName || 'PG Name Not Available'}</h3>
                          <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <MapPin size={16} />
                            <span className="text-sm">{booking.pgLocation || 'Location not specified'}</span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(booking)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-blue-600" size={18} />
                        <div>
                          <div className="text-xs text-gray-500">Check-in</div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(booking.checkInDate)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="text-blue-600" size={18} />
                        <div>
                          <div className="text-xs text-gray-500">Duration</div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.duration ? `${booking.duration} month${booking.duration > 1 ? 's' : ''}` : 'Not specified'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Home className="text-blue-600" size={18} />
                        <div>
                          <div className="text-xs text-gray-500">Room Type</div>
                          <div className="text-sm font-medium text-gray-900 capitalize">
                            {getRoomTypeDisplay(booking.roomType)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <IndianRupee className="text-blue-600" size={18} />
                        <div>
                          <div className="text-xs text-gray-500">Total Paid</div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(booking.totalCost)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {booking.paymentStatus === 'paid' && (
                      <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
                        <CheckCircle size={16} />
                        <span>Payment Confirmed</span>
                      </div>
                    )}

                    {booking.paymentStatus === 'pending' && (
                      <div className="flex items-center gap-2 text-yellow-600 text-sm mb-4">
                        <Clock size={16} />
                        <span>Payment Pending</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => alert('View booking details - Feature coming soon!')}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm transition-colors"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                      {isUpcoming && !isCancelled && !isCompleted && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm transition-colors"
                        >
                          <X size={16} />
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                );
              } catch (error) {
                console.error('Error rendering booking:', error);
                return null;
              }
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 mb-6">Start exploring PGs and make your first booking!</p>
            <button
              onClick={() => navigate('/find-pg')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search PGs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}