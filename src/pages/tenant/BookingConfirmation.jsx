import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Download, Home, Eye, Mail, Phone, MapPin, Calendar, IndianRupee } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Enhanced confirmation with receipt download - Day 6
export function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  useEffect(() => {
    if (!bookingData) {
      navigate('/find-pg');
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const handleDownloadReceipt = () => {
    // Mock download functionality
    alert('Receipt download functionality will be implemented with backend integration');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your booking has been successfully confirmed. We've sent a confirmation email to {bookingData.email}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
              <span className="text-sm font-medium">Booking ID:</span>
              <span className="text-lg font-bold">{bookingData.id}</span>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Details</h2>
          
          <div className="space-y-6">
            {/* PG Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Property Information</h3>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl">🏠</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{bookingData.pgName}</h4>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <MapPin size={16} />
                    <span className="text-sm">{bookingData.pgLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Stay Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="text-blue-600" size={20} />
                  <div>
                    <div className="text-sm text-gray-600">Check-in Date</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(bookingData.checkInDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="text-blue-600" size={20} />
                  <div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold text-gray-900">{bookingData.duration} month(s)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Home className="text-blue-600" size={20} />
                  <div>
                    <div className="text-sm text-gray-600">Room Type</div>
                    <div className="font-semibold text-gray-900 capitalize">{bookingData.roomType}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <IndianRupee className="text-blue-600" size={20} />
                  <div>
                    <div className="text-sm text-gray-600">Total Amount Paid</div>
                    <div className="font-semibold text-gray-900">₹{bookingData.totalCost.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Guest Details</h3>
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-24">Name:</span>
                  <span className="font-medium text-gray-900">{bookingData.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600 w-24">Email:</span>
                  <span className="font-medium text-gray-900">{bookingData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600 w-24">Phone:</span>
                  <span className="font-medium text-gray-900">{bookingData.phone}</span>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {bookingData.specialRequests && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Special Requests</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{bookingData.specialRequests}</p>
                </div>
              </div>
            )}

            {/* Payment Status */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Payment Information</h3>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Payment Status</div>
                    <div className="font-semibold text-green-700">Paid Successfully</div>
                  </div>
                  <div className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                    Confirmed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">What's Next?</h2>
          <ul className="space-y-3 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>You will receive a confirmation email with all booking details</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>The PG owner will contact you within 24 hours to confirm your check-in</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>You can view and manage your booking anytime from "My Bookings"</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download Receipt
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/tenant/bookings')}
            className="flex items-center justify-center gap-2"
          >
            <Eye size={18} />
            View Booking
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
