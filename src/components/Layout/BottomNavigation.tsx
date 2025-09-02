import React from "react";
import { Home, Users, DollarSign, Settings, ExternalLink } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {

  // const menuItems = [
  //   { id: 'dashboard', label: 'Home', icon: Home },
  //   ...(user?.role === 'admin' ? [
  //     { id: 'members', label: 'Members', icon: Users },
  //     { id: 'deposits', label: 'Deposits', icon: DollarSign },
  //   ] : [
  //     { id: 'deposit', label: 'Deposit', icon: DollarSign },
  //   ]),
  //   { id: 'settings', label: 'Settings', icon: Settings },
  // ];

  const menuItems = [
    { id: "dashboard", label: "Home", icon: Home },

    // { id: "members", label: "Members", icon: Users },
    // { id: "deposits", label: "Deposits", icon: DollarSign },

    { id: "deposit", label: "Deposit", icon: DollarSign },

    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon
                className={`h-5 w-5 mb-1 ${
                  activeTab === item.id ? "text-blue-600" : ""
                }`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => window.open("https://example.com", "_blank")}
          className="flex flex-col items-center px-3 py-2 transition-all duration-200 rounded-lg text-base-content/70 hover:text-base-content"
        >
          <ExternalLink className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">Website</span>
        </button>
      </div>
    </div>
  );
}
