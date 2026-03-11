import { useState } from 'react';
import { Search, MapPin, DollarSign, Users, Filter } from 'lucide-react';

// Improved search filters and location-based results - Day 1
export function SearchPG() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    roomType: '',
    gender: ''
  });

  const pgs = [
    { id: 1, name: 'Sunrise PG for Men', location: 'Koramangala', price: 12000, type: 'Single', rating: 4.5 },
    { id: 2, name: 'Green Valley Girls Hostel', location: 'HSR Layout', price: 10000, type: 'Double', rating: 4.8 },
    { id: 3, name: 'Urban Nest Co-living', location: 'Indiranagar', price: 15000, type: 'Single', rating: 4.6 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Search PG</h1>
          <p className="text-gray-600 mt-1">Find your perfect PG accommodation</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by location, PG name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Locations</option>
              <option>Koramangala</option>
              <option>HSR Layout</option>
              <option>Indiranagar</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Price Range</option>
              <option>Under ₹10,000</option>
              <option>₹10,000 - ₹15,000</option>
              <option>Above ₹15,000</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Room Type</option>
              <option>Single</option>
              <option>Double</option>
              <option>Triple</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Co-ed</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {pgs.map((pg) => (
            <div key={pg.id} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                    {pg.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pg.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {pg.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        {pg.type} Sharing
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">₹{pg.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">per month</div>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
