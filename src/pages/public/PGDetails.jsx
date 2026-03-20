import React, { useState } from 'react';
import { MapPin, Star, Phone, Mail, Share2, Heart, CheckCircle, X, Wifi, Wind, Utensils, Car, Shield, ChevronLeft, ChevronRight, Users, DollarSign, Calendar, Shirt, Dumbbell } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { reviews } from '../../data/mockData';

// Enhanced PG details with virtual tour - Day 8const WiFi = Wifi;
const AC = Wind;
const Food = Utensils;
const Parking = Car;
const Security = Shield;
const Laundry = Shirt;
const Gym = Dumbbell;
const XIcon = X;



export function PGDetailsPage({ pgData, onNavigate }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const amenityIcons = {
    WiFi,
    AC,
    Food,
    Parking,
    Security,
    Laundry,
    Gym,
    Housekeeping: CheckCircle
  };
  
  const pgReviews = reviews.filter(r => r.pgName === pgData.name);
  const avgRating = pgReviews.length > 0 ? pgReviews.reduce((acc, r) => acc + r.rating, 0) / pgReviews.length : 0;
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pgData.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + pgData.images.length) % pgData.images.length);
  };
  
  const handleContactSubmit = () => {
    alert(`Thank you ${contactForm.name}! We'll contact you soon.`);
    setShowContactModal(false);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('find-pg')}
          className="mb-4"
        >
          ← Back to Listings
        </Button>
        
        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-6 bg-gray-900 shadow-xl group">
          <img
            src={pgData.images[currentImageIndex]}
            alt={pgData.name}
            className="w-full h-full object-cover cursor-pointer transition-opacity duration-300"
            onClick={() => setShowImageModal(true)}
          />
          
          {pgData.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {pgData.images.length}
              </div>
            </>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-lg ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
              }`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
            >
              <Share2 size={20} />
            </button>
          </div>
          
          {pgData.verified && (
            <Badge variant="verified" className="absolute top-4 left-4 shadow-lg">
              Verified
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Info */}
            <div>
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="mb-2">{pgData.name}</h2>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin size={18} />
                      <span>{pgData.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-amber-500 fill-amber-500" size={18} />
                        <span className="font-semibold text-lg">{pgData.rating}</span>
                        <span>({pgData.reviews} reviews)</span>
                      </div>
                      <Badge variant="info">{pgData.sharingType}</Badge>
                      <Badge variant="default">{pgData.gender}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      ₹{pgData.rent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">per month</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Deposit: ₹{pgData.deposit.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-primary-600" />
                    <span>{pgData.availableRooms} rooms available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-primary-600" />
                    <span>Immediate move-in</span>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Description */}
            <div>
              <Card className="p-6">
                <h3 className="mb-4">About This Property</h3>
                <p className="text-gray-600 leading-relaxed">{pgData.description}</p>
              </Card>
            </div>
            
            {/* Amenities */}
            <div>
              <Card className="p-6">
                <h3 className="mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pgData.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div key={amenity} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {Icon && <Icon size={20} className="text-primary-600" />}
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
            
            {/* Rules */}
            {pgData.rules && (
              <div>
                <Card className="p-6">
                  <h3 className="mb-4">House Rules</h3>
                  <ul className="space-y-2">
                    {pgData.rules.map((rule, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle size={16} className="text-secondary-600 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}
            
            {/* Reviews */}
            {pgReviews.length > 0 && (
              <div>
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3>Reviews</h3>
                    <Button variant="ghost" onClick={() => onNavigate('reviews')}>
                      See All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {pgReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{review.userName}</h4>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="text-amber-500 fill-amber-500" size={16} />
                            <span className="font-semibold">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="mb-4">Contact Owner</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{pgData.ownerName}</h4>
                      <p className="text-sm text-gray-500">Property Owner</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full shadow-lg" 
                    size="lg"
                    onClick={() => {
                      // Prepare PG data with correct price field for booking
                      const bookingPGData = {
                        ...pgData,
                        price: pgData.rent // Map rent to price for booking page
                      };
                      // Navigate to booking page with PG data
                      window.location.href = '/booking';
                      // Store PG data in sessionStorage for booking page
                      sessionStorage.setItem('selectedPG', JSON.stringify(bookingPGData));
                    }}
                  >
                    <Calendar size={18} className="mr-2" />
                    Book Now
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full" 
                    size="lg"
                    onClick={() => setShowContactModal(true)}
                  >
                    <Mail size={18} className="mr-2" />
                    Send Inquiry
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => alert(`Calling ${pgData.ownerPhone}`)}
                  >
                    <Phone size={18} className="mr-2" />
                    {pgData.ownerPhone}
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Info</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-semibold">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-semibold">Within 2 hours</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      {showContactModal && (
        <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="Send Inquiry">
          <div className="space-y-4">
            <Input
              label="Your Name"
              placeholder="Enter your name"
              value={contactForm.name}
              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={contactForm.email}
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              value={contactForm.phone}
              onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Hi, I'm interested in this property..."
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={handleContactSubmit}
              disabled={!contactForm.name || !contactForm.email || !contactForm.phone}
            >
              Send Inquiry
            </Button>
          </div>
        </Modal>
      )}
      
      {/* Image Lightbox Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white"
          >
            <XIcon size={24} />
          </button>
          
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={pgData.images[currentImageIndex]}
              alt={pgData.name}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            
            {pgData.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                  {currentImageIndex + 1} / {pgData.images.length}
                </div>
              </>
            )}
          </div>
          
          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
            {pgData.images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}





