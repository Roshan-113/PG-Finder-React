import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

// Enhanced review management with responses - Day 6
export function OwnerReviews() {
  const [reviews] = useState([
    {
      id: 1,
      tenant: 'Rahul Kumar',
      rating: 5,
      comment: 'Excellent PG with all amenities. Owner is very cooperative.',
      date: '2 days ago',
      pgName: 'Sunrise PG',
      helpful: 12
    },
    {
      id: 2,
      tenant: 'Priya Sharma',
      rating: 4,
      comment: 'Good place to stay. Food quality is great. Only issue is parking space.',
      date: '1 week ago',
      pgName: 'Green Valley',
      helpful: 8
    },
    {
      id: 3,
      tenant: 'Amit Patel',
      rating: 5,
      comment: 'Best PG in the area. Clean rooms and friendly environment.',
      date: '2 weeks ago',
      pgName: 'Urban Nest',
      helpful: 15
    }
  ]);

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h1>
          <p className="text-gray-600 mt-2">Manage reviews from your tenants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">Total Reviews</div>
            <div className="text-2xl font-bold">{reviews.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">Average Rating</div>
            <div className="text-2xl font-bold text-amber-600 flex items-center gap-1">
              {avgRating} <Star size={20} className="fill-amber-500 text-amber-500" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">5 Star Reviews</div>
            <div className="text-2xl font-bold text-green-600">
              {reviews.filter(r => r.rating === 5).length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">Response Rate</div>
            <div className="text-2xl font-bold text-blue-600">85%</div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div 
                key={review.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-lg">
                      {review.tenant.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.tenant}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="info">{review.pgName}</Badge>
                </div>

                <p className="text-gray-700 mb-3">{review.comment}</p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                    <ThumbsUp size={16} />
                    <span>{review.helpful} helpful</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                    <MessageCircle size={16} />
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
