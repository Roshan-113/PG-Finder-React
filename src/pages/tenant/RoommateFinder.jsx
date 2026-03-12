import React, { useState } from 'react';
import { Users, MapPin, DollarSign, CheckCircle, MessageCircle, Filter, Heart } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { roommateProfiles } from '../../data/mockData';

// Improved roommate matching algorithm - Day 2

export function RoommateFinder({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('find');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedLifestyle, setSelectedLifestyle] = useState([]);
  
  const tabs = [
    { id: 'find', label: 'Find Roommate', icon: Users },
    { id: 'post', label: 'Post Requirement', icon: MessageCircle },
    { id: 'replace', label: 'Replace Roommate', icon: CheckCircle }
  ];
  
  const lifestyleOptions = ['Non-smoker', 'Vegetarian', 'Early Bird', 'Night Owl', 'Pet Lover', 'Fitness Enthusiast'];
  
  const toggleLifestyle = (option) => {
    setSelectedLifestyle(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };
  
  const filteredRoommates = roommateProfiles.filter(profile => {
    const genderMatch = selectedGender === 'all' || profile.gender.toLowerCase() === selectedGender;
    const lifestyleMatch = selectedLifestyle.length === 0 ||
      selectedLifestyle.some(option => profile.lifestyle.includes(option));
    return genderMatch && lifestyleMatch;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="mb-2">Find Your Perfect Roommate</h2>
          <p className="text-gray-600">Connect with compatible roommates based on lifestyle and preferences</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id )}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'find' && (
          <div className="flex gap-6">
            {/* Filters */}
            <aside className="w-80 flex-shrink-0">
              <Card className="p-6 sticky top-24">
                <h4 className="mb-4">Filters</h4>
                
                <div className="mb-6">
                  <Select
                    label="Gender"
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    options={[
                      { value: 'all', label: 'All' },
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' }
                    ]}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Lifestyle Preferences
                  </label>
                  <div className="space-y-2">
                    {lifestyleOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedLifestyle.includes(option)}
                          onChange={() => toggleLifestyle(option)}
                          className="w-4 h-4 accent-primary-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedGender('all');
                    setSelectedLifestyle([]);
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            </aside>
            
            {/* Roommate Profiles */}
            <div className="flex-1">
              <div className="mb-4 text-gray-600">
                {filteredRoommates.length} roommates found
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRoommates.map((profile) => (
                  <Card key={profile.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex gap-4 mb-4">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4>{profile.name}</h4>
                          <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <Heart size={20} />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{profile.occupation}, {profile.age}</div>
                        {profile.verified && (
                          <Badge variant="verified" className="text-xs">
                            <CheckCircle size={12} className="mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <DollarSign size={16} className="text-gray-400" />
                        <span>Budget: ₹{profile.budget}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">{profile.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.lifestyle.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="default" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg mb-4">
                      <span className="text-sm font-medium text-gray-700">Compatibility Score</span>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-primary-700">{profile.compatibility}%</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <MessageCircle size={16} className="mr-2" />
                        Connect
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'post' && (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <h3 className="mb-6">Post Your Roommate Requirement</h3>
              
              <div className="space-y-5">
                <Input label="Your Name" placeholder="Enter your name" />
                
                <Input label="Current Location" placeholder="City or locality" icon={<MapPin size={18} />} />
                
                <Select
                  label="Gender Preference"
                  options={[
                    { value: 'any', label: 'Any' },
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' }
                  ]}
                />
                
                <Input label="Budget Range" placeholder="e.g., 8000-10000" icon={<DollarSign size={18} />} />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About You
                  </label>
                  <textarea
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    rows={4}
                    placeholder="Tell potential roommates about yourself, your lifestyle, and preferences..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Lifestyle Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {lifestyleOptions.map((option) => (
                      <button
                        key={option}
                        className="px-4 py-2 rounded-full text-sm border border-gray-300 hover:border-primary-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  Post Requirement
                </Button>
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'replace' && (
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 mb-6 bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="mb-2 text-primary-900">Unique Roommate Replacement Service</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Need to replace your roommate without shifting PG? Our unique mutual approval system helps you find a compatible replacement while keeping your PG owner informed. Both parties must approve before the replacement is finalized.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-8">
              <h3 className="mb-6">Replace Your Current Roommate</h3>
              
              <div className="space-y-5">
                <Input label="Current PG Name" placeholder="Enter your PG name" />
                
                <Input label="Room Number" placeholder="e.g., Room 201" />
                
                <Select
                  label="Reason for Replacement"
                  options={[
                    { value: '', label: 'Select reason' },
                    { value: 'leaving', label: 'Roommate is leaving' },
                    { value: 'compatibility', label: 'Compatibility issues' },
                    { value: 'personal', label: 'Personal reasons' },
                    { value: 'other', label: 'Other' }
                  ]}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requirements for New Roommate
                  </label>
                  <textarea
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    rows={4}
                    placeholder="Describe what you're looking for in a new roommate..."
                  />
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="text-amber-900 mb-2">How it works:</h4>
                  <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
                    <li>Submit your replacement request</li>
                    <li>We'll show you compatible matches</li>
                    <li>Both you and the new roommate must approve</li>
                    <li>PG owner gets notified for final approval</li>
                    <li>Smooth transition without shifting PG!</li>
                  </ol>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => alert('Roommate replacement request submitted! You will be shown compatible matches soon.')}
                >
                  Submit Replacement Request
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}





