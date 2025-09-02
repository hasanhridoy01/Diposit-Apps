import React, { useState } from 'react';
import { User, Mail, Lock, Bell, Globe } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Settings() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Settings</h1>
        <p className="mt-1 text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800">Profile Information</h2>
                
                <div className="flex items-center mb-6 space-x-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{user?.full_name}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                      user?.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user?.role === 'admin' ? 'Administrator' : 'Member'}
                    </span>
                  </div>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-base-content/80">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user?.full_name}
                        className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-base-content/80">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800">Security Settings</h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-base-200">
                    <div>
                      <p className="font-medium text-gray-800">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-base-200">
                    <div>
                      <p className="font-medium text-gray-800">Deposit Updates</p>
                      <p className="text-sm text-gray-600">Get notified about deposit status changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-base-content">Preferences</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Language</label>
                    <select className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="en">English</option>
                      <option value="bn">বাংলা</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Currency</label>
                    <select className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="BDT">Bangladeshi Taka (৳)</option>
                      <option value="USD">US Dollar ($)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};