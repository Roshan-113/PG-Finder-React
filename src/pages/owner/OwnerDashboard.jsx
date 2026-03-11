import { Building2, DoorOpen, TrendingUp, DollarSign, Star, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Improved dashboard analytics and real-time stats - Day 1
export function OwnerDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Listings', value: '3', change: '+1 this month', icon: Building2, color: '#10b981' },
    { label: 'Total Rooms', value: '28', change: '4 available', icon: DoorOpen, color: '#3b82f6' },
    { label: 'Occupancy Rate', value: '85%', change: '+5% this month', icon: TrendingUp, color: '#8b5cf6' },
    { label: 'Monthly Revenue', value: '₹2.4L', change: '+12% increase', icon: DollarSign, color: '#f59e0b' }
  ];

  const recentInquiries = [
    { name: 'Rahul Kumar', pg: 'Sunrise PG', time: '2 hours ago', status: 'New' },
    { name: 'Priya Sharma', pg: 'Green Valley', time: '5 hours ago', status: 'Replied' },
    { name: 'Amit Patel', pg: 'Urban Nest', time: '1 day ago', status: 'New' }
  ];

  const topPerforming = [
    { name: 'Sunrise PG for Men', location: 'Koramangala', rating: 4.5, occupied: '8/10' },
    { name: 'Green Valley Girls Hostel', location: 'HSR Layout', rating: 4.8, occupied: '14/15' },
    { name: 'Urban Nest Co-living', location: 'Indiranagar', rating: 4.6, occupied: '6/8' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Owner!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your properties</p>
        </div>
        <button 
          onClick={() => navigate('/owner/add-pg')}
          style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
          className="flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
        >
          <Plus size={20} />
          <span>Add New PG</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: stat.color }}
              >
                <Icon className="text-white" size={20} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="text-xs text-green-600 font-medium">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Inquiries</h3>
            <button 
              onClick={() => navigate('/owner/inquiries')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="p-6 space-y-4">
            {recentInquiries.map((inquiry, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <div className="font-semibold text-gray-900">{inquiry.name}</div>
                  <div className="text-sm text-gray-600">{inquiry.pg} • {inquiry.time}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  inquiry.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {inquiry.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing PGs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Top Performing</h3>
            <button 
              onClick={() => navigate('/owner/listings')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="p-6 space-y-4">
            {topPerforming.map((pg, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{pg.name}</div>
                  <div className="text-sm text-gray-600">{pg.location}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="text-orange-500 fill-orange-500" size={14} />
                    <span className="font-semibold text-sm">{pg.rating}</span>
                  </div>
                  <div className="text-xs text-gray-600">{pg.occupied} occupied</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
