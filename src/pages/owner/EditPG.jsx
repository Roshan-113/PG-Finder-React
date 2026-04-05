import { useState } from 'react';
import { Building2, DollarSign, Save, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export function EditPG() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    pgName: 'Sunrise PG for Men',
    location: 'Koramangala, Bangalore',
    address: '123, 4th Main Road, Koramangala 5th Block, Bangalore - 560034',
    totalRooms: '10',
    rentPerMonth: '12000',
    gender: 'male',
    amenities: ['WiFi', 'AC', 'Laundry', 'Meals'],
    description: 'A premium PG accommodation for men with modern amenities and excellent connectivity to major tech hubs.'
  });

  const amenitiesList = ['WiFi', 'AC', 'Laundry', 'Meals', 'Parking', 'Security', 'Gym', 'TV'];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('PG Updated Successfully!');
    navigate(`/owner/pg-details/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit PG</h1>
          <p className="text-gray-600 mt-1">Update your PG property details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm space-y-6">
        {/* Basic Details */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 size={20} className="text-blue-600" />
            Basic Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PG Name *</label>
              <input
                type="text"
                required
                value={formData.pgName}
                onChange={(e) => setFormData({...formData, pgName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter PG name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Koramangala, Bangalore"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter complete address with landmarks"
          />
        </div>

        {/* Room & Pricing */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign size={20} className="text-blue-600" />
            Room & Pricing
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Rooms *</label>
              <input
                type="number"
                required
                value={formData.totalRooms}
                onChange={(e) => setFormData({...formData, totalRooms: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rent per Month *</label>
              <input
                type="number"
                required
                value={formData.rentPerMonth}
                onChange={(e) => setFormData({...formData, rentPerMonth: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12000"
                min="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="coed">Co-ed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Amenities</h3>
          <div className="grid grid-cols-4 gap-4">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({...formData, amenities: [...formData.amenities, amenity]});
                    } else {
                      setFormData({...formData, amenities: formData.amenities.filter(a => a !== amenity)});
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your PG property, nearby facilities, rules, etc..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <button 
            type="submit"
            style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
          >
            <Save size={20} />
            <span>Save Changes</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(`/owner/pg-details/${id}`)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
