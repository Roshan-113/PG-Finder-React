import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Building2, Plus, DoorOpen, FileText, 
  MessageCircle, Star, Image, DollarSign, Bell, Search, 
  User, Settings, LogOut, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

// Enhanced owner layout with quick actions - Day 11
export function OwnerLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/owner/dashboard' },
    { icon: Building2, label: 'My Listings', path: '/owner/listings' },
    { icon: Plus, label: 'Add New PG', path: '/owner/add-pg' },
    { icon: DoorOpen, label: 'Manage Rooms', path: '/owner/manage-rooms' },
    { icon: FileText, label: 'Bookings', path: '/owner/bookings' },
    { icon: MessageCircle, label: 'Inquiries', path: '/owner/inquiries' },
    { icon: Star, label: 'Reviews', path: '/owner/reviews' },
    { icon: Image, label: 'Photos', path: '/owner/photos' },
    { icon: DollarSign, label: 'Earnings', path: '/owner/earnings' }
  ];

  return (
    <div className="bg-gray-50">
      <div className="flex">
        {/* Sidebar - Green theme for Owner */}
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
                <div className="text-xs opacity-80">Owner Panel</div>
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
                  placeholder="Search your properties..."
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

                {/* Profile Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md"
                      style={{ background: 'linear-gradient(to bottom right, #3b82f6, #14b8a6)' }}
                    >
                      O
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">Owner User</div>
                      <div className="text-xs text-gray-500">owner@pgfinder.com</div>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => {
                          navigate('/owner/profile');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User size={16} />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/owner/settings');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
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
