import React from "react";
import {
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  ExternalLink,
} from "lucide-react";

export function DashboardOverview() {

  // const stats = user?.role === 'admin' ? [
  //   { label: 'Total Members', value: '24', icon: Users, color: 'bg-primary' },
  //   { label: 'Total Deposits', value: '৳45,230', icon: DollarSign, color: 'bg-success' },
  //   { label: 'Pending Requests', value: '8', icon: Clock, color: 'bg-warning' },
  //   { label: 'Growth Rate', value: '+12%', icon: TrendingUp, color: 'bg-accent' },
  // ] : [
  //   { label: 'Account Balance', value: '৳2,450', icon: DollarSign, color: 'bg-success' },
  //   { label: 'Total Deposits', value: '৳8,750', icon: TrendingUp, color: 'bg-primary' },
  //   { label: 'Pending Requests', value: '2', icon: Clock, color: 'bg-warning' },
  //   // { label: 'Member Since', value: '2024', icon: Users, color: 'bg-accent' },
  //   { label: 'Total Members', value: '12', icon: Users, color: 'bg-accent' },
  // ];

  const stats = [
    {
      label: "Account Balance",
      value: "৳2,450",
      icon: DollarSign,
      color: "bg-success",
    },
    {
      label: "Total Deposits",
      value: "৳8,750",
      icon: TrendingUp,
      color: "bg-primary",
    },
    { label: "Pending Requests", value: "2", icon: Clock, color: "bg-warning" },
    { label: "Total Members", value: "12", icon: Users, color: "bg-accent" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Welcome back,
            <br />
            {/* {user?.full_name} */}
            <span className="text-blue-700">Fahim Arman Hridi!</span>
          </h1>
          <p className="mt-1 text-gray-600">
            {/* {user?.role === 'admin' ? 'Manage your platform efficiently' : 'Track your deposits and account activity'} */}
            Manage your platform efficiently
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          {/* <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            user?.role === 'admin' 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {user?.role === 'admin' ? 'Administrator' : 'Member'}
          </span> */}
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
            Member
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 transition-shadow duration-200 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* {user?.role === "admin" ? (
            <>
              <button className="flex items-center p-4 transition-colors duration-200 rounded-lg bg-blue-50 hover:bg-blue-100">
                <Users className="w-5 h-5 mr-3 text-blue-600" />
                <span className="font-medium text-blue-700">
                  Add New Member
                </span>
              </button>
              <button className="flex items-center p-4 transition-colors duration-200 rounded-lg bg-green-50 hover:bg-green-100">
                <DollarSign className="w-5 h-5 mr-3 text-green-600" />
                <span className="font-medium text-green-700">
                  Review Deposits
                </span>
              </button>
            </>
          ) : (
            <>
              <button className="flex items-center p-4 transition-colors duration-200 rounded-lg bg-green-50 hover:bg-green-100">
                <DollarSign className="w-5 h-5 mr-3 text-green-600" />
                <span className="font-medium text-green-700">Make Deposit</span>
              </button>
              <button className="flex items-center p-4 transition-colors duration-200 rounded-lg bg-blue-50 hover:bg-blue-100">
                <TrendingUp className="w-5 h-5 mr-3 text-blue-600" />
                <span className="font-medium text-blue-700">View History</span>
              </button>
            </>
          )} */}
          <>
            <button className="flex items-center p-4 transition-colors duration-200 rounded-lg bg-blue-50 hover:bg-blue-100">
              <Users className="w-5 h-5 mr-3 text-blue-600" />
              <span className="font-medium text-blue-700">Add New Member</span>
            </button>
            <button className="flex items-center p-4 transition-colors duration-200 rounded-lg bg-green-50 hover:bg-green-100">
              <DollarSign className="w-5 h-5 mr-3 text-green-600" />
              <span className="font-medium text-green-700">
                Review Deposits
              </span>
            </button>
          </>
          <button
            onClick={() => window.open("https://example.com", "_blank")}
            className="flex items-center p-4 transition-colors duration-200 rounded-lg bg-purple-50 hover:bg-purple-100"
          >
            <ExternalLink className="w-5 h-5 mr-3 text-purple-600" />
            <span className="font-medium text-purple-700">Visit Website</span>
          </button>
        </div>
      </div>
    </div>
  );
}
