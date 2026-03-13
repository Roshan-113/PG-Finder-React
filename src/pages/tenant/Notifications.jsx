import React, { useState } from 'react';
import { Bell, CheckCircle, MessageCircle, Home, Users, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

// Improved notification center with categories - Day 3
export function Notifications() {
  const [notifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New message from PG Owner',
      message: 'Rajesh Kumar replied to your inquiry about Sunrise PG',
      time: '5 minutes ago',
      read: false,
      icon: MessageCircle
    },
    {
      id: 2,
      type: 'roommate',
      title: 'Roommate Match Found',
      message: 'Amit Sharma (92% match) is interested in connecting with you',
      time: '1 hour ago',
      read: false,
      icon: Users
    },
    {
      id: 3,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your booking for Green Valley PG has been confirmed',
      time: '2 hours ago',
      read: true,
      icon: Home
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Rent Payment Due',
      message: 'Your rent payment is due in 3 days',
      time: '1 day ago',
      read: true,
      icon: Clock
    }
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <Bell className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-gray-600">{unreadCount} unread notifications</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card 
                key={notification.id} 
                className={`p-5 ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !notification.read ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                    <Icon size={20} className={!notification.read ? 'text-primary-600' : 'text-gray-600'} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="info" className="text-xs">New</Badge>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{notification.time}</span>
                      {!notification.read && (
                        <Button variant="ghost" size="sm">
                          <CheckCircle size={16} className="mr-1" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        {notifications.length === 0 && (
          <Card className="p-12 text-center">
            <Bell size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
