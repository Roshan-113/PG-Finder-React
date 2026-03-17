import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Home, User, Phone, Mail, Upload, MessageSquare, IndianRupee, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

// Enhanced booking flow with better validation - Day 5// Enhanced booking flow with better validation - Day 5
export function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  let pgData = location.state?.pgData;
  
  // If no pgData in state, try to get from sessionStorage
  if (!pgData) {
    const storedPG = sessionStorage.getItem('selectedPG');
    if (storedPG) {
      pgData = JSON.parse(storedPG);
    }
  }

  const [formData, setFormData] = useState({
    checkInDate: '',
    duration: 1,
    roomType: '',
    name: '',
    email: '',
    phone: '',
    idProof: null,
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Check authentication
    const user = localStorage.getItem('user');
    if (!user) {
      // Save PG data and redirect to login
      if (pgData) {
        sessionStorage.setItem('selectedPG', JSON.stringify(pgData));
      }
      navigate('/login', { state: { returnTo: '/booking' } });
      return;
    }

    // Check if PG data exists (from route state or sessionStorage)
    let currentPGData = pgData;
    if (!currentPGData) {
      const storedPG = sessionStorage.getItem('selectedPG');
      if (storedPG) {
        currentPGData = JSON.parse(storedPG);
      } else {
        navigate('/find-pg');
        return;
      }
    }

    // Pre-fill user data
    try {
      const userData = JSON.parse(user);
      setFormData(prev => ({
        ...prev,
        name: userData.name || '',
        email: userData.email || ''
      }));
    } catch (e) {
      console.error('Error parsing user data:', e);
    }
  }, [navigate]);

  useEffect(() => {
    // Calculate total cost
    if (pgData && formData.duration && pgData.price) {
      // Parse price if it's a string with commas
      const priceValue = typeof pgData.price === 'string' 
        ? parseFloat(pgData.price.replace(/,/g, '')) 
        : pgData.price;
      
      const cost = priceValue * formData.duration;
      setTotalCost(cost);
    }
  }, [pgData, formData.duration]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.checkInDate) newErrors.checkInDate = 'Check-in date is required';
    if (!formData.duration || formData.duration < 1) newErrors.duration = 'Duration must be at least 1 month';
    if (!formData.roomType) newErrors.roomType = 'Please select a room type';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create booking data
    const bookingData = {
      id: `BK${Date.now()}`,
      pgId: pgData.id,
      pgName: pgData.name,
      pgLocation: pgData.location,
      ...formData,
      totalCost,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString()
    };

    // Navigate to payment page
    navigate('/payment', { state: { bookingData } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, idProof: file });
    }
  };

  if (!pgData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Fill in the details below to book your stay</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              {/* PG Details Summary */}
              <div className="pb-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏠</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{pgData.name}</h3>
                    <p className="text-sm text-gray-600">{pgData.location}</p>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      ₹{typeof pgData.price === 'string' ? pgData.price : pgData.price?.toLocaleString() || '0'}/month
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="date"
                        value={formData.checkInDate}
                        onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (Months) *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Type *
                    </label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select room type</option>
                      <option value="single">Single Occupancy</option>
                      <option value="double">Double Sharing</option>
                      <option value="triple">Triple Sharing</option>
                    </select>
                    {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      icon={<User size={18} className="text-gray-500" />}
                      error={errors.name}
                    />
                  </div>

                  <div>
                    <Input
                      label="Email *"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      icon={<Mail size={18} className="text-gray-500" />}
                      error={errors.email}
                    />
                  </div>

                  <div>
                    <Input
                      label="Phone Number *"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      icon={<Phone size={18} className="text-gray-500" />}
                      error={errors.phone}
                      placeholder="10-digit number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID Proof (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                        <Upload size={18} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {formData.idProof ? formData.idProof.name : 'Upload Aadhar/PAN/Passport'}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      rows="3"
                      placeholder="Any special requirements or requests..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <Button type="submit" className="w-full" size="lg">
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly Rent</span>
                  <span className="font-semibold">
                    ₹{typeof pgData.price === 'string' ? pgData.price : pgData.price?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{formData.duration} month(s)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Room Type</span>
                  <span className="font-semibold capitalize">{formData.roomType || '-'}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{totalCost > 0 ? totalCost.toLocaleString() : '0'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your booking will be confirmed after successful payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
