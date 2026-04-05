import { useParams, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Home, Users, DollarSign, Star, Edit, ArrowLeft, Wifi, Wind, UtensilsCrossed, Car, Shield, Dumbbell, Tv } from 'lucide-react';

export function PGDetails() {
  try {
    const { id } = useParams();
    const navigate = useNavigate();

    // Demo data
    const pgData = {
      name: 'Sunrise PG for Men',
      location: 'Koramangala, Bangalore',
      address: '123, 4th Main Road, Koramangala 5th Block, Bangalore - 560034',
      totalRooms: 10,
      occupied: 8,
      available: 2,
      rent: 12000,
      rating: 4.5,
      reviews: 45,
      gender: 'male',
      amenities: ['WiFi', 'AC', 'Laundry', 'Meals'],
      description: 'A premium PG accommodation for men with modern amenities and excellent connectivity to major tech hubs. Located in the heart of Koramangala with easy access to restaurants, shopping centers, and public transport.',
      ownerName: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'sunrisepg@example.com'
    };

    const getAmenityIcon = (amenity) => {
      switch (amenity) {
        case 'WiFi': return <Wifi size={16} />;
        case 'AC': return <Wind size={16} />;
        case 'Laundry': return <Home size={16} />;
        case 'Meals': return <UtensilsCrossed size={16} />;
        case 'Parking': return <Car size={16} />;
        case 'Security': return <Shield size={16} />;
        case 'Gym': return <Dumbbell size={16} />;
        case 'TV': return <Tv size={16} />;
        default: return <Home size={16} />;
      }
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pgData.name}</h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <MapPin size={16} />
                {pgData.location}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/owner/edit-pg/${id}`)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
            >
              <Edit size={20} />
              Edit PG
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="text-blue-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Rooms</div>
                <div className="text-2xl font-bold text-gray-900">{pgData.totalRooms}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="text-green-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Occupied</div>
                <div className="text-2xl font-bold text-gray-900">{pgData.occupied}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Home className="text-purple-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Available</div>
                <div className="text-2xl font-bold text-gray-900">{pgData.available}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <DollarSign className="text-amber-600" size={24} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Rent/Month</div>
                <div className="text-2xl font-bold text-gray-900">₹{pgData.rent.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* About */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About this PG</h3>
            <p className="text-gray-600 leading-relaxed">{pgData.description}</p>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {pgData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Owner Name</div>
                <div className="font-medium text-gray-900">{pgData.ownerName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Phone</div>
                <div className="font-medium text-gray-900">{pgData.phone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <div className="font-medium text-gray-900">{pgData.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Full Address</div>
                <div className="font-medium text-gray-900">{pgData.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <Star className="text-amber-500" size={32} />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{pgData.rating} <span className="text-lg text-gray-500">/ 5</span></div>
              <div className="text-gray-600">Based on {pgData.reviews} reviews</div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6 text-red-600">
        <h1 className="text-xl font-bold mb-2">Error loading PG Details</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
