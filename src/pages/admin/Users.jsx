import React, { useState } from 'react';
import { Users, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

// Improved user management with advanced filtering - Day 1
export function UsersPage() {
  const [users] = useState([
    { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', role: 'Tenant', status: 'Active', joined: 'Jan 15, 2026' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', role: 'Owner', status: 'Active', joined: 'Jan 10, 2026' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', role: 'Tenant', status: 'Inactive', joined: 'Dec 20, 2025' }
  ]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage all platform users</p>
        </div>
        
        <Card className="p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users..."
                icon={<Search size={18} />}
              />
            </div>
            <Button variant="outline">
              <Filter size={18} className="mr-2" />
              Filter
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant="info">{user.role}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.status === 'Active' ? 'success' : 'default'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.joined}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
