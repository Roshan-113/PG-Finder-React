import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Users, Star, User, Menu, X, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';

// Enhanced navigation with mobile menu - Day 11
export function Navigation({ onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const currentPath = location.pathname;
  
  const navItems = [
    { id: '/', label: 'Home', icon: Home, path: '/' },
    { id: 'find-pg', label: 'Find PG', icon: Search, path: '/find-pg' },
    { id: 'find-roommate', label: 'Find Roommate', icon: Users, path: '/find-roommate' },
    { id: 'reviews', label: 'Reviews', icon: Star, path: '/reviews' }
  ];
  
  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Building2 className="text-white" size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-tight">PG Finder</span>
              <span className="text-[10px] text-gray-500 leading-tight">Smart PG Discovery</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPath === item.path
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
            >
              <User size={18} className="mr-2" />
              Login
            </Button>
            <Button onClick={() => navigate('/register')}>Get Started</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPath === item.path
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}>
                  Login
                </Button>
                <Button onClick={() => {
                  navigate('/register');
                  setMobileMenuOpen(false);
                }}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
