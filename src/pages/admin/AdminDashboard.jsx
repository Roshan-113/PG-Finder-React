import { Users, Building2, CheckCircle, TrendingUp, TrendingDown, DollarSign, UserCheck, Calendar, Flag, Star, Activity } from 'lucide-react';

// Enhanced admin analytics with real-time monitoring - Day 1
export function AdminDashboard() {
  // Top Stats
  const stats = [
    { label: 'Total Users', value: '12,458', change: '+12.5%', trend: 'up', icon: Users, color: '#3b82f6' },
    { label: 'Total PG Listings', value: '1,847', change: '+8.2%', trend: 'up', icon: Building2, color: '#10b981' },
    { label: 'Active Owners', value: '456', change: '+15.3%', trend: 'up', icon: UserCheck, color: '#8b5cf6' },
    { label: 'Pending Approvals', value: '34', change: '-5.1%', trend: 'down', icon: CheckCircle, color: '#f59e0b' },
    { label: 'Total Bookings', value: '3,245', change: '+18.7%', trend: 'up', icon: Calendar, color: '#06b6d4' },
    { label: 'Revenue This Month', value: '₹24.5L', change: '+22.3%', trend: 'up', icon: DollarSign, color: '#ec4899' }
  ];

  // Monthly PG Registrations
  const monthlyRegistrations = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 61 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 67 }
  ];

  // Booking Trends
  const bookingTrends = [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 145 },
    { month: 'Mar', value: 132 },
    { month: 'Apr', value: 168 },
    { month: 'May', value: 155 },
    { month: 'Jun', value: 189 }
  ];

  // Revenue Data
  const revenueData = [
    { month: 'Jan', value: 18.5 },
    { month: 'Feb', value: 21.2 },
    { month: 'Mar', value: 19.8 },
    { month: 'Apr', value: 23.4 },
    { month: 'May', value: 22.1 },
    { month: 'Jun', value: 24.5 }
  ];

  // Category Pie Chart Data
  const categoryData = [
    { label: 'Boys PG', percentage: 45, color: '#3b82f6' },
    { label: 'Girls PG', percentage: 35, color: '#ec4899' },
    { label: 'Co-living', percentage: 20, color: '#8b5cf6' }
  ];

  // Recent PG Listings
  const recentListings = [
    { name: 'Sunrise PG for Men', owner: 'Rajesh Kumar', location: 'Koramangala', date: '2 hours ago', status: 'Active' },
    { name: 'Green Valley Girls Hostel', owner: 'Priya Sharma', location: 'HSR Layout', date: '5 hours ago', status: 'Pending' },
    { name: 'Urban Nest Co-living', owner: 'Amit Patel', location: 'Indiranagar', date: '1 day ago', status: 'Active' },
    { name: 'Comfort Stay PG', owner: 'Sneha Reddy', location: 'Whitefield', date: '2 days ago', status: 'Active' }
  ];

  // Latest User Registrations
  const recentUsers = [
    { name: 'Rahul Verma', email: 'rahul@example.com', type: 'Tenant', date: '1 hour ago' },
    { name: 'Anjali Singh', email: 'anjali@example.com', type: 'Owner', date: '3 hours ago' },
    { name: 'Vikram Joshi', email: 'vikram@example.com', type: 'Tenant', date: '6 hours ago' },
    { name: 'Pooja Gupta', email: 'pooja@example.com', type: 'Tenant', date: '1 day ago' }
  ];

  // Pending Approvals
  const pendingApprovals = [
    { owner: 'Suresh Babu', pg: 'Elite PG', location: 'Marathahalli', submitted: '2 days ago' },
    { owner: 'Kavita Nair', pg: 'Royal Residency', location: 'BTM Layout', submitted: '3 days ago' },
    { owner: 'Deepak Rao', pg: 'Premium Stay', location: 'Electronic City', submitted: '4 days ago' }
  ];

  // Recent Bookings
  const recentBookings = [
    { tenant: 'Arjun Mehta', pg: 'Sunrise PG', room: 'Room 101', amount: '₹8,500', date: '1 hour ago' },
    { tenant: 'Neha Kapoor', pg: 'Green Valley', room: 'Room 205', amount: '₹9,200', date: '4 hours ago' },
    { tenant: 'Karan Malhotra', pg: 'Urban Nest', room: 'Room 302', amount: '₹12,000', date: '1 day ago' }
  ];

  // Flagged Reviews
  const flaggedReviews = [
    { user: 'Anonymous', pg: 'Comfort Stay', reason: 'Inappropriate language', date: '2 hours ago' },
    { user: 'Ravi Kumar', pg: 'Elite PG', reason: 'Spam content', date: '1 day ago' }
  ];

  // Activity Log
  const activityLog = [
    { action: 'New PG added', detail: 'Sunrise PG for Men by Rajesh Kumar', time: '2 hours ago', icon: Building2, color: '#10b981' },
    { action: 'Owner approved', detail: 'Priya Sharma verified successfully', time: '5 hours ago', icon: CheckCircle, color: '#3b82f6' },
    { action: 'Booking created', detail: 'Arjun Mehta booked Room 101', time: '1 day ago', icon: Calendar, color: '#8b5cf6' },
    { action: 'Review flagged', detail: 'Inappropriate content reported', time: '2 days ago', icon: Flag, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: stat.color }}
                >
                  <Icon className="text-white" size={24} />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <TrendIcon size={12} />
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Monthly PG Registrations */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly PG Registrations</h3>
          <div className="h-64 flex items-end justify-between gap-4">
            {monthlyRegistrations.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full relative group">
                  <div 
                    style={{ 
                      height: `${item.value * 3}px`,
                      backgroundColor: '#3b82f6'
                    }}
                    className="w-full rounded-t-lg hover:opacity-80 transition-all cursor-pointer"
                  ></div>
                </div>
                <span className="text-xs text-gray-600 font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Booking Trend</h3>
          <div className="h-64 flex items-end justify-between gap-4">
            {bookingTrends.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full relative group">
                  <div 
                    style={{ 
                      height: `${item.value * 1.2}px`,
                      backgroundColor: '#10b981'
                    }}
                    className="w-full rounded-t-lg hover:opacity-80 transition-all cursor-pointer"
                  ></div>
                </div>
                <span className="text-xs text-gray-600 font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue (in Lakhs)</h3>
          <div className="h-64 flex items-end justify-between gap-4">
            {revenueData.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full relative group">
                  <div 
                    style={{ 
                      height: `${item.value * 8}px`,
                      background: 'linear-gradient(to top, #8b5cf6, #a78bfa)'
                    }}
                    className="w-full rounded-t-lg hover:opacity-80 transition-all cursor-pointer"
                  ></div>
                </div>
                <span className="text-xs text-gray-600 font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">PG Categories</h3>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="#f3f4f6" strokeWidth="32" fill="none" />
                {categoryData.map((item, index) => {
                  const prevPercentage = categoryData.slice(0, index).reduce((sum, d) => sum + d.percentage, 0);
                  const circumference = 2 * Math.PI * 80;
                  const offset = (prevPercentage / 100) * circumference;
                  const dashArray = `${(item.percentage / 100) * circumference} ${circumference}`;
                  
                  return (
                    <circle 
                      key={index}
                      cx="96" cy="96" r="80" 
                      stroke={item.color}
                      strokeWidth="32" 
                      fill="none"
                      strokeDasharray={dashArray}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
            <div className="ml-8 space-y-3">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent PG Listings */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent PG Listings</h3>
          <div className="space-y-3">
            {recentListings.map((listing, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{listing.name}</div>
                  <div className="text-xs text-gray-500">{listing.owner} • {listing.location}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-semibold px-2 py-1 rounded ${
                    listing.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {listing.status}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{listing.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest User Registrations */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Latest User Registrations</h3>
          <div className="space-y-3">
            {recentUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-semibold px-2 py-1 rounded ${
                    user.type === 'Owner' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.type}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{user.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Owner Approvals */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Pending Owner Approvals</h3>
          <div className="space-y-3">
            {pendingApprovals.map((approval, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{approval.owner}</div>
                  <div className="text-xs text-gray-500">{approval.pg} • {approval.location}</div>
                </div>
                <div className="text-right">
                  <button className="text-xs font-semibold px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Review
                  </button>
                  <div className="text-xs text-gray-500 mt-1">{approval.submitted}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {recentBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{booking.tenant}</div>
                  <div className="text-xs text-gray-500">{booking.pg} • {booking.room}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{booking.amount}</div>
                  <div className="text-xs text-gray-500">{booking.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flagged Reviews & Activity Panel */}
      <div className="grid grid-cols-2 gap-6">
        {/* Flagged Reviews */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Flagged Reviews</h3>
          <div className="space-y-3">
            {flaggedReviews.map((review, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{review.user}</div>
                  <div className="text-xs text-gray-500">{review.pg} • {review.reason}</div>
                </div>
                <div className="text-right">
                  <button className="text-xs font-semibold px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Review
                  </button>
                  <div className="text-xs text-gray-500 mt-1">{review.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Panel */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activityLog.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: activity.color + '20' }}
                  >
                    <Icon size={18} style={{ color: activity.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-xs text-gray-500">{activity.detail}</div>
                    <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
