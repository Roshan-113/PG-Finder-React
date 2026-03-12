import { useState } from 'react';
import { Heart, MapPin, Star, IndianRupee, Trash2, Eye, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Enhanced saved PGs with better organization - Day 2
export function SavedPGs() {
  const navigate = useNavigate();
  const [savedPGs, setSavedPGs] = useState([
    { 
      id: 1, 
      name: 'Sunshine PG', 
      location: 'Koramangala, Bangalore', 
      price: '8,500', 
      rating: 4.5, 
      reviews: 45,
      image: '🏠',
      amenities: ['WiFi', 'AC', 'Food'],
      savedDate: '2 days ago'
    },
    { 
      id: 2, 
      name: 'Green Valley Hostel', 
      location: 'HSR Layout, Bangalore', 
      price: '7,200', 
      rating: 4.3, 
      reviews: 32,
      image: '🏡',
      amenities: ['WiFi', 'Laundry', 'Parking'],
      savedDate: '5 days ago'
    },
    { 
      id: 3, 
      name: 'Urban Stay PG', 
      location: 'Indiranagar, Bangalore', 
      price: '9,000', 
      rating: 4.7, 
      reviews: 67,
      image: '🏢',
      amenities: ['WiFi', 'AC', 'Gym'],
      savedDate: '1 week ago'
    },
    { 
      id: 4, 
      name: 'City Center PG', 
      location: 'MG Road, Bangalore', 
      price: '10,500', 
      rating: 4.6, 
      reviews: 89,
      image: '🏨',
      amenities: ['WiFi', 'AC', 'Food', 'Gym'],
      savedDate: '2 weeks ago'
    },
    { 
      id: 5, 
      name: 'Lake View Hostel', 
      location: 'Bellandur, Bangalore', 
      price: '7,800', 
      rating: 4.4, 
      reviews: 54,
      image: '🏘️',
      amenities: ['WiFi', 'Food', 'Parking'],
      savedDate: '3 weeks ago'
    }
  ]);

  const handleRemove = (id) => {
    setSavedPGs(savedPGs.filter(pg => pg.id !== id));
  };

  const handleViewDetails = (pg) => {
    navigate('/pg-details', { state: { pg } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved PGs</h1>
          <p className="text-gray-600">You have {savedPGs.length} saved PGs</p>
        </div>

        {/* Saved PGs Grid */}
        {savedPGs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPGs.map((pg) => (
              <div key={pg.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-6xl">
                  {pg.image}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{pg.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin size={14} />
                        <span>{pg.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(pg.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove from saved"
                    >
                      <Heart size={20} fill="currentColor" />
                    </button>
                  </div>

                  {/* Rating & Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star size={16} fill="currentColor" />
                      <span className="font-semibold">{pg.rating}</span>
                      <span className="text-sm text-gray-500">({pg.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xl font-bold text-gray-900">
                      <IndianRupee size={18} />
                      <span>{pg.price}</span>
                      <span className="text-sm text-gray-500 font-normal">/mo</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pg.amenities.map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Saved Date */}
                  <p className="text-xs text-gray-500 mb-4">Saved {pg.savedDate}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(pg)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                    <button
                      className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Share"
                    >
                      <Share2 size={16} />
                    </button>
                    <button
                      onClick={() => handleRemove(pg.id)}
                      className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved PGs</h3>
            <p className="text-gray-600 mb-6">Start saving PGs to view them here</p>
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
