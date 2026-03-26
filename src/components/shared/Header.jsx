import { Building2, Bell, User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Enhanced header with real-time notifications - Day 14
export function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Building2 className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900">PG Finder</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </button>
            <button onClick={() => navigate('/find-pg')} className="text-gray-700 hover:text-blue-600 font-medium">
              Find PG
            </button>
            <button onClick={() => navigate('/find-roommate')} className="text-gray-700 hover:text-blue-600 font-medium">
              Find Roommate
            </button>
            <button onClick={() => navigate('/reviews')} className="text-gray-700 hover:text-blue-600 font-medium">
              Reviews
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={() => navigate('/login')} className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
