import React, { useState } from 'react';
import { Star, CheckCircle, Filter, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { reviews } from '../../data/mockData';

// Enhanced reviews with filtering and sorting - Day 8export function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredReviews = reviews.filter(review => {
    const ratingMatch = selectedRating === 'all' || Math.floor(review.rating) === parseInt(selectedRating);
    const searchMatch = searchQuery === '' || 
      review.pgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchQuery.toLowerCase());
    return ratingMatch && searchMatch;
  });
  
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => Math.floor(r.rating) === rating).length
  }));
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="mb-2">Verified PG Reviews</h2>
          <p className="text-gray-600">Honest reviews from real tenants to help you make informed decisions</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Stats & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Overall Rating */}
            <Card className="p-6">
              <h4 className="mb-4">Overall Rating</h4>
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {avgRating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={`${
                        star <= Math.round(avgRating)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{reviews.length} verified reviews</p>
              </div>
              
              <div className="mt-6 space-y-2">
                {ratingDistribution.map(({ rating, count }) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-8">{rating} ★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(count / reviews.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Filters */}
            <Card className="p-6">
              <h4 className="mb-4">Filters</h4>
              
              <div className="space-y-4">
                <Select
                  label="Rating"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Ratings' },
                    { value: '5', label: '5 Stars' },
                    { value: '4', label: '4 Stars' },
                    { value: '3', label: '3 Stars' },
                    { value: '2', label: '2 Stars' },
                    { value: '1', label: '1 Star' }
                  ]}
                />
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedRating('all');
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Reviews List */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <Card className="p-4 mb-6">
              <Input
                placeholder="Search by PG name or reviewer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={18} />}
              />
            </Card>
            
            {/* Write Review CTA */}
            <Card className="p-6 mb-6 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="mb-2">Share Your Experience</h4>
                  <p className="text-gray-700">
                    Help others by writing an honest review of your PG
                  </p>
                </div>
                <Button>Write a Review</Button>
              </div>
            </Card>
            
            {/* Reviews */}
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="p-6">
                  {/* Review Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-gray-900">{review.userName}</div>
                          <div className="text-sm text-gray-600">{review.date}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-amber-500 fill-amber-500" size={18} />
                          <span className="font-semibold text-lg">{review.rating}</span>
                        </div>
                      </div>
                      {review.verified && (
                        <Badge variant="verified">
                          <CheckCircle size={12} className="mr-1" />
                          Verified Tenant
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* PG Name */}
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700">Reviewed: </span>
                    <span className="text-sm font-semibold text-primary-700">{review.pgName}</span>
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                  
                  {/* Category Ratings */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    {Object.entries(review.ratings).map(([category, rating]) => (
                      <div key={category}>
                        <div className="text-xs text-gray-600 capitalize mb-1">{category}</div>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-amber-500 fill-amber-500" />
                          <span className="text-sm font-semibold">{rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredReviews.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-gray-600">No reviews found matching your filters.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





