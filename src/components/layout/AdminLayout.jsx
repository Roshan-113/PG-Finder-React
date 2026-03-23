import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, BarChart3, Building, Users, ShieldCheck, 
  FileText, Star, Flag, DollarSign, MessageCircle, Bell, Settings, LogOut, Search
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

// Enhanced admin layout with breadcrumbs - Day 11export function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Building, label: 'PG Listings', path: '/admin/listings' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: ShieldCheck, label: 'Owner Verification', path: '/admin/approvals' },
    { icon: Star, label: 'Reviews Moderation', path: '/admin/reviews' },
    { icon: Flag, label: 'Reports & Flags', path: '/admin/reports' },
    { icon: Settings, label: 'System Settings', path: '/admin/settings' }
  ];

  return (
    <div className="bg-gray-50">
      <div className="flex">
        {/* Sidebar - Blue theme */}
        <aside 
          className="fixed left-0 top-0 flex flex-col"
          style={{ 
            width: '240px', 
            height: '100vh',
            background: 'linear-gradient(to bottom, #3b82f6, #2563eb)'
          }}
        >
          {/* Logo */}
          <div className="p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <div className="font-bold text-xl">PG Finder</div>
                <div className="text-xs opacity-80">Admin Panel</div>
              </div>
            </div>
          </div>

          {/* Navigation - Scrollable */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  style={{
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? '#2563eb' : '#ffffff'
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-sm font-medium transition-all ${
                    isActive ? 'shadow-md' : 'hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button at Bottom */}
          <div className="p-4">
            <button
              onClick={logout}
              style={{ backgroundColor: '#ffffff', color: '#2563eb' }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main 
          className="flex-1 min-h-screen"
          style={{ marginLeft: '240px' }}
        >
          {/* Top Header with Search and Profile */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-8 py-4">
              {/* Search Bar */}
              <div className="flex-1 max-w-xl relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Right Side - Notifications & Profile */}
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md"
                    style={{ background: 'linear-gradient(to bottom right, #3b82f6, #14b8a6)' }}
                  >
                    A
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Admin User</div>
                    <div className="text-xs text-gray-500">admin@pgfinder.com</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
