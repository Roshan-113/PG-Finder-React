import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, Home, Users, RefreshCw, CheckCircle, Clock, Bell, MessageCircle } from 'lucide-react';

// Improved roommate replacement matching - Day 6
export function RoommateReplacement({ onNavigate }) {
  const [step, setStep] = useState(1);
  const [replacementReason, setReplacementReason] = useState('');
  const [selectedRoommate, setSelectedRoommate] = useState(null);

  const currentRoom = {
    pgName: 'Green Valley PG',
    location: 'Koramangala, Bangalore',
    roomType: 'Double Sharing',
    rent: 12000,
    currentRoommate: {
      name: 'Rahul Kumar',
      occupation: 'Software Engineer',
      duration: '6 months'
    }
  };

  const suggestedRoommates = [
    {
      id: 1,
      name: 'Amit Sharma',
      age: 26,
      image: 'https://images.unsplash.com/photo-1718179804654-7c3720b78e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzc0MDQzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      occupation: 'Product Manager',
      company: 'Tech Solutions',
      compatibility: 92,
      lifestyle: ['Early Bird', 'Non-Smoker', 'Vegetarian', 'Clean'],
      budget: '11,000 - 13,000',
      verified: true,
      availability: 'Immediate'
    },
    {
      id: 2,
      name: 'Vikram Patel',
      age: 25,
      image: 'https://images.unsplash.com/photo-1718179804654-7c3720b78e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZSUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzc0MDQzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      occupation: 'Data Analyst',
      company: 'Analytics Corp',
      compatibility: 88,
      lifestyle: ['Flexible', 'Non-Smoker', 'Non-Vegetarian', 'Organized'],
      budget: '12,000 - 14,000',
      verified: true,
      availability: 'Within 1 week'
    },
    {
      id: 3,
      name: 'Suresh Reddy',
      age: 27,
      image: 'https://images.unsplash.com/photo-1718179804654-7c3720b78e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzc0MDQzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      occupation: 'Marketing Manager',
      company: 'Brand Studio',
      compatibility: 85,
      lifestyle: ['Night Owl', 'Non-Smoker', 'Vegetarian', 'Social'],
      budget: '11,500 - 13,500',
      verified: true,
      availability: 'Within 2 weeks'
    }
  ];

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    return 'text-amber-600 bg-amber-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('find-roommate')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Roommate Finder
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Replace Roommate</h1>
              <p className="text-gray-600">Find a new roommate without shifting PG</p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-1">Unique Roommate Replacement Feature</h3>
                <p className="text-sm text-purple-700">
                  Our smart matching system finds compatible replacements while you stay in your current PG. 
                  Both parties and the PG owner approve the transition for a seamless experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              {/* Step 1 */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <span className={`hidden sm:inline ${step >= 1 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  Current Details
                </span>
              </div>
              
              <div className="w-16 h-0.5 bg-gray-300"></div>
              
              {/* Step 2 */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className={`hidden sm:inline ${step >= 2 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  Find Match
                </span>
              </div>
              
              <div className="w-16 h-0.5 bg-gray-300"></div>
              
              {/* Step 3 */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className={`hidden sm:inline ${step >= 3 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  Confirm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Current Room Details */}
        {step === 1 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Room Details</h2>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{currentRoom.pgName}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📍 {currentRoom.location}</p>
                      <p>🏠 {currentRoom.roomType}</p>
                      <p>💰 ₹{currentRoom.rent.toLocaleString()}/month</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Current Roommate</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Name: {currentRoom.currentRoommate.name}</p>
                      <p>Occupation: {currentRoom.currentRoommate.occupation}</p>
                      <p>Living together for: {currentRoom.currentRoommate.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Replacement <span className="text-red-500">*</span>
                </label>
                <select
                  value={replacementReason}
                  onChange={(e) => setReplacementReason(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                >
                  <option value="">Select a reason</option>
                  <option value="lifestyle">Lifestyle mismatch</option>
                  <option value="relocation">Roommate relocating</option>
                  <option value="schedule">Different work schedules</option>
                  <option value="personal">Personal reasons</option>
                  <option value="other">Other</option>
                </select>
                
                <textarea
                  rows={3}
                  placeholder="Additional details (optional)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <Button 
                  variant="primary" 
                  className="flex-1"
                  disabled={!replacementReason}
                  onClick={() => setStep(2)}
                >
                  Find Compatible Roommates
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Suggested Roommates */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Suggested Compatible Roommates
              </h2>
              <p className="text-gray-600">
                Based on your preferences and current PG, we found {suggestedRoommates.length} highly compatible matches
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedRoommates.map((roommate) => (
                <Card 
                  key={roommate.id} 
                  hover 
                  className={`overflow-hidden ${selectedRoommate === roommate.id ? 'ring-2 ring-indigo-600' : ''}`}
                >
                  <div className="relative">
                    <img
                      src={roommate.image}
                      alt={roommate.name}
                      className="w-full h-48 object-cover"
                    />
                    {roommate.verified && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="verified">
                          <CheckCircle size={12} className="mr-1" />
                          Verified
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getCompatibilityColor(roommate.compatibility)}`}>
                        {roommate.compatibility}% Match
                      </div>
                    </div>
                    {selectedRoommate === roommate.id && (
                      <div className="absolute inset-0 bg-indigo-600/10 flex items-center justify-center">
                        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {roommate.name}, {roommate.age}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{roommate.occupation}</p>
                    <p className="text-sm text-gray-500 mb-3">{roommate.company}</p>

                    <div className="mb-3">
                      <div className="text-sm text-gray-600">Budget: <span className="font-medium">₹{roommate.budget}</span></div>
                      <div className="text-sm text-gray-600">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Available: <span className="font-medium">{roommate.availability}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Lifestyle</p>
                      <div className="flex flex-wrap gap-1.5">
                        {roommate.lifestyle.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant={selectedRoommate === roommate.id ? "primary" : "outline"} 
                        className="flex-1"
                        onClick={() => setSelectedRoommate(roommate.id)}
                      >
                        {selectedRoommate === roommate.id ? 'Selected' : 'Select'}
                      </Button>
                      <Button variant="ghost" onClick={() => {}}>
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-4 mt-8 max-w-3xl mx-auto">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                variant="primary" 
                className="flex-1"
                disabled={!selectedRoommate}
                onClick={() => setStep(3)}
              >
                Continue to Confirmation
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation & Approval Flow */}
        {step === 3 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Mutual Approval Process</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-green-900 mb-1">Step 1: Your Approval - Pending</h4>
                    <p className="text-sm text-green-700">
                      Review and confirm your selection of the new roommate
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Step 2: Roommate's Approval - Waiting</h4>
                    <p className="text-sm text-gray-600">
                      Selected roommate will be notified and needs to accept
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Step 3: PG Owner Notification - Waiting</h4>
                    <p className="text-sm text-gray-600">
                      PG owner will be informed about the roommate change request
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Step 4: Final Approval - Waiting</h4>
                    <p className="text-sm text-gray-600">
                      Once all parties approve, the transition will be scheduled
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>✓ New roommate receives notification</li>
                  <li>✓ Both parties can chat and coordinate move-in</li>
                  <li>✓ PG owner facilitates the smooth transition</li>
                  <li>✓ You stay in your current room - no shifting needed!</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button variant="primary" className="flex-1">
                  Confirm & Send Request
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}






