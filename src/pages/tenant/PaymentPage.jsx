import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield, CreditCard } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Enhanced payment processing with security - Day 5// Improved payment processing with security - Day 5
export function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const [processing, setProcessing] = useState(false);

  if (!bookingData) {
    navigate('/find-pg');
    return null;
  }

  const handleRazorpayPayment = async () => {
    setProcessing(true);

    // Simulate Razorpay payment processing
    setTimeout(() => {
      // Update booking data with payment info
      const completedBooking = {
        ...bookingData,
        paymentStatus: 'paid',
        status: 'confirmed',
        paymentMethod: 'razorpay',
        paymentId: `rzp_${Date.now()}`,
        paidAt: new Date().toISOString()
      };

      // Save to localStorage (mock database)
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings.push(completedBooking);
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));

      setProcessing(false);
      navigate('/booking-confirmation', { state: { bookingData: completedBooking } });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Booking</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
          <p className="text-gray-600">Choose your preferred payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Razorpay Payment Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Razorpay Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="text-white" size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Pay with Razorpay</h2>
                  <p className="text-sm text-gray-600">Secure payment gateway</p>
                </div>
              </div>

              {/* Payment Methods Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Accepted Payment Methods</h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Credit/Debit Cards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>UPI (GPay, PhonePe, Paytm)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Net Banking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Wallets</span>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Secure Payment</h4>
                    <p className="text-sm text-gray-600">256-bit SSL encryption for all transactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">PCI DSS Compliant</h4>
                    <p className="text-sm text-gray-600">Your card details are never stored on our servers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Instant Confirmation</h4>
                    <p className="text-sm text-gray-600">Get booking confirmation immediately after payment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> You will be redirected to Razorpay's secure payment page. Please complete the payment within 15 minutes to confirm your booking.
              </p>
            </div>

            {/* Pay Button */}
            <Button
              onClick={handleRazorpayPayment}
              disabled={processing}
              className="w-full"
              size="lg"
            >
              {processing ? 'Processing Payment...' : `Proceed to Pay ₹${bookingData.totalCost.toLocaleString()}`}
            </Button>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center">
              By proceeding, you agree to our Terms & Conditions and Cancellation Policy
            </p>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900">{bookingData.pgName}</h3>
                  <p className="text-sm text-gray-600">{bookingData.pgLocation}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in</span>
                    <span className="font-medium">{new Date(bookingData.checkInDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{bookingData.duration} month(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Type</span>
                    <span className="font-medium capitalize">{bookingData.roomType}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{bookingData.totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600">
                  By proceeding with payment, you agree to our Terms & Conditions and Cancellation Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
