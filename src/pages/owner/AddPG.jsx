import { useState } from 'react';
import { Building2, DollarSign, Save, Upload, X } from 'lucide-react';

// Enhanced form with image upload and validation
export function AddPG() {
  const [formData, setFormData] = useState({
    pgName: '',
    location: '',
    address: '',
    totalRooms: '',
    rentPerMonth: '',
    gender: '',
    amenities: [],
    description: '',
    images: []
  });

  const [errors, setErrors] = useState({});

  const amenitiesList = ['WiFi', 'AC', 'Laundry', 'Meals', 'Parking', 'Security', 'Gym', 'TV'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pgName.trim()) newErrors.pgName = 'PG name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.totalRooms || formData.totalRooms < 1) newErrors.totalRooms = 'Valid room count required';
    if (!formData.rentPerMonth || formData.rentPerMonth < 1000) newErrors.rentPerMonth = 'Valid rent amount required';
    if (!formData.gender) newErrors.gender = 'Gender preference is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData({...formData, images: [...formData.images, ...imageUrls]});
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({...formData, images: newImages});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('PG listing saved successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New PG</h1>
        <p className="text-gray-600 mt-1">Fill in the details to list your PG property</p>
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

        {/* Images Upload */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Upload size={20} className="text-blue-600" />
            Property Images *
          </h3>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            <span>Save PG Listing</span>
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
