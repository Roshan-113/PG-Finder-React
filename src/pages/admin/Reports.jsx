import React from 'react';
import { TrendingUp, Download, Calendar, BarChart3 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

// Improved reporting system with analytics - Day 3// Improved reporting system with analytics - Day 3
export function Reports() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">View detailed reports and analytics</p>
          </div>
          <Button>
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Revenue Growth</div>
                <div className="text-2xl font-bold text-green-600">+24%</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-green-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-600">New Listings</div>
                <div className="text-2xl font-bold">+45</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-purple-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Bookings</div>
                <div className="text-2xl font-bold">234</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-amber-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-600">User Growth</div>
                <div className="text-2xl font-bold text-green-600">+18%</div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="mb-4">Top Performing PGs</h3>
            <div className="space-y-3">
              {[
                { name: 'Sunrise PG', revenue: '₹2.5L', growth: '+15%' },
                { name: 'Green Valley', revenue: '₹2.2L', growth: '+12%' },
                { name: 'Urban Nest', revenue: '₹1.8L', growth: '+8%' }
              ].map((pg, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">{pg.name}</div>
                    <div className="text-sm text-gray-600">{pg.revenue}</div>
                  </div>
                  <div className="text-green-600 font-semibold">{pg.growth}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">User Activity</h3>
            <div className="space-y-3">
              {[
                { label: 'New Registrations', value: '234', change: '+12%' },
                { label: 'Active Users', value: '1,234', change: '+8%' },
                { label: 'Inquiries', value: '456', change: '+15%' }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.value}</div>
                  </div>
                  <div className="text-green-600 font-semibold">{stat.change}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
