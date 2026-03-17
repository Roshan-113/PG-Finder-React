import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, Clock, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

// Enhanced inquiry management with tracking - Day 4// Enhanced inquiry management system - Day 4
export function InquiriesPage() {
  // Sample inquiries data
  const [inquiries] = useState([
    {
      id: 1,
      name: 'Rahul Kumar',
      email: 'rahul@example.com',
      phone: '+91 98765 43210',
      pgName: 'Sunrise PG',
      message: 'Hi, I am interested in a single room. Is it available?',
      date: '2 hours ago',
      status: 'New'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43211',
      pgName: 'Green Valley',
      message: 'Looking for a room from next month. Can I visit the property?',
      date: '5 hours ago',
      status: 'Replied'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 98765 43212',
      pgName: 'Urban Nest',
      message: 'What are the food timings? Is parking available?',
      date: '1 day ago',
      status: 'New'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      email: 'sneha@example.com',
      phone: '+91 98765 43213',
      pgName: 'Green Valley',
      message: 'Thank you for the information. I will visit tomorrow.',
      date: '2 days ago',
      status: 'Closed'
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h2>Inquiries & Requests</h2>
            <p className="text-gray-600 mt-1">Manage all customer inquiries and requests</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-sm text-gray-600 mb-1">Total Inquiries</div>
              <div className="text-2xl font-bold">{inquiries.length}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600 mb-1">New</div>
              <div className="text-2xl font-bold text-green-600">
                {inquiries.filter(i => i.status === 'New').length}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600 mb-1">Replied</div>
              <div className="text-2xl font-bold text-blue-600">
                {inquiries.filter(i => i.status === 'Replied').length}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600 mb-1">Closed</div>
              <div className="text-2xl font-bold text-gray-600">
                {inquiries.filter(i => i.status === 'Closed').length}
              </div>
            </Card>
          </div>

          {/* Inquiries List */}
          <Card className="p-6">
            <h3 className="mb-4">All Inquiries</h3>
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div 
                  key={inquiry.id} 
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  {/* Inquiry Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-lg">
                        {inquiry.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{inquiry.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={14} />
                          <span>{inquiry.date}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        inquiry.status === 'New' ? 'success' : 
                        inquiry.status === 'Replied' ? 'info' : 
                        'default'
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </div>

              {/* Property Name */}
              <div className="mb-3">
                <span className="text-sm text-gray-600">Interested in: </span>
                <span className="text-sm font-semibold text-primary-700">{inquiry.pgName}</span>
              </div>

              {/* Message */}
              <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-sm">{inquiry.message}</p>
              </div>

              {/* Contact Info */}
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  <span>{inquiry.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={14} />
                  <span>{inquiry.phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {inquiry.status !== 'Closed' && (
                  <>
                    <Button size="sm">
                      <MessageCircle size={16} className="mr-1" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone size={16} className="mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="text-green-600">
                      <CheckCircle size={16} className="mr-1" />
                      Mark as Closed
                    </Button>
                  </>
                )}
                {inquiry.status === 'Closed' && (
                  <span className="text-sm text-gray-500 italic">This inquiry has been closed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
