import React from "react";
import {
  Home,
  Users,
  DollarSign,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {

  // const menuItems = [
  //   { id: "dashboard", label: "Dashboard", icon: Home },
  //   ...(user?.role === "admin"
  //     ? [
  //         { id: "members", label: "Members", icon: Users },
  //         { id: "deposits", label: "Deposits", icon: DollarSign },
  //       ]
  //     : [{ id: "deposit", label: "Deposit", icon: DollarSign }]),
  //   { id: "settings", label: "Settings", icon: Settings },
  // ];

  const menuItems = [
    { id: "dashboard", label: "Home", icon: Home },

    // { id: "members", label: "Members", icon: Users },
    { id: "deposits", label: "Deposits", icon: DollarSign },

    // { id: "deposit", label: "Deposit", icon: DollarSign },

    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="hidden shadow-lg md:flex md:w-64 md:flex-col bg-base-100">
      <div className="flex flex-col flex-1">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">DashBoard</h1>
          <p className="mt-1 text-sm text-gray-500">
            {/* {user?.role === "admin" ? "Admin Panel" : "Member Portal"} */}
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => window.open("https://example.com", "_blank")}
            className="flex items-center w-full px-4 py-3 text-left text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-50 hover:text-gray-900"
          >
            <ExternalLink className="w-5 h-5 mr-3" />
            Visit Website
          </button>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="p-3 mb-3 rounded-lg bg-gray-50">
            <p className="text-sm font-medium text-gray-800">
              Zahid Hasan Hridoy
              {/* {user?.full_name} */}
            </p>
            <p className="text-xs text-gray-500">
              Hridoy@gmail.com
              {/* {user?.email} */}
            </p>
          </div>
          <button
            // onClick={signOut}
            className="flex items-center w-full px-4 py-2 transition-colors duration-200 rounded-lg text-error hover:bg-error/10"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
