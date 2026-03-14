import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, Globe, Mail } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

// Improved admin settings panel - Day 4
export function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your platform settings</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <SettingsIcon className="text-blue-600" size={20} />
              </div>
              <h3>General Settings</h3>
            </div>
            <div className="space-y-4">
              <Input label="Platform Name" defaultValue="PG Finder" />
              <Input label="Support Email" defaultValue="support@pgfinder.com" icon={<Mail size={18} />} />
              <Input label="Contact Number" defaultValue="+91 98765 43210" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Bell className="text-green-600" size={20} />
              </div>
              <h3>Notification Settings</h3>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary-600" />
                <span>Email notifications for new listings</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary-600" />
                <span>SMS notifications for inquiries</span>
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lock className="text-purple-600" size={20} />
              </div>
              <h3>Security Settings</h3>
            </div>
            <Button>Change Password</Button>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
