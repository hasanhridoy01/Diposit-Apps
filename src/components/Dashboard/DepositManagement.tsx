import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Eye, Calendar, User, X } from 'lucide-react';

interface DepositRequest {
  id: string;
  member_name: string;
  member_email: string;
  amount: number;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  screenshot_url?: string;
}

export function DepositManagement() {
  const [deposits, setDeposits] = useState<DepositRequest[]>([
    {
      id: '1',
      member_name: 'John Doe',
      member_email: 'john@example.com',
      amount: 5000,
      message: 'Monthly subscription payment',
      status: 'pending',
      created_at: '2024-01-22T10:30:00Z',
      screenshot_url: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      member_name: 'Jane Smith',
      member_email: 'jane@example.com',
      amount: 2500,
      message: 'Additional deposit for premium features',
      status: 'approved',
      created_at: '2024-01-21T15:45:00Z',
      screenshot_url: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ]);

  const [selectedDeposit, setSelectedDeposit] = useState<DepositRequest | null>(null);

  const handleStatusUpdate = (depositId: string, newStatus: 'approved' | 'rejected') => {
    setDeposits(deposits.map(deposit => 
      deposit.id === depositId 
        ? { ...deposit, status: newStatus }
        : deposit
    ));
    setSelectedDeposit(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Deposit Management</h1>
        <p className="mt-1 text-gray-600">Review and approve member deposit requests</p>
      </div>

      {/* Deposits Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {deposits.map((deposit) => (
          <div key={deposit.id} className="p-6 transition-shadow duration-200 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{deposit.member_name}</p>
                  <p className="text-xs text-gray-500">{deposit.member_email}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deposit.status)}`}>
                {getStatusIcon(deposit.status)}
                <span className="ml-1 capitalize">{deposit.status}</span>
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Amount:</span>
                <span className="text-lg font-bold text-gray-800">৳{deposit.amount.toLocaleString()}</span>
              </div>

              <div>
                <span className="text-sm text-gray-500">Message:</span>
                <p className="mt-1 text-sm text-gray-800 line-clamp-2">{deposit.message}</p>
              </div>

              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(deposit.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedDeposit(deposit)}
                className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                Review Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deposit Review Modal */}
      {selectedDeposit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Deposit Request Details</h2>
                <button
                  onClick={() => setSelectedDeposit(null)}
                  className="text-gray-400 transition-colors duration-200 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Member Info */}
                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="mb-2 font-medium text-gray-800">Member Information</h3>
                  <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 font-medium">{selectedDeposit.member_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="ml-2 font-medium">{selectedDeposit.member_email}</span>
                    </div>
                  </div>
                </div>

                {/* Deposit Details */}
                <div>
                  <h3 className="mb-3 font-medium text-gray-800">Deposit Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Amount:</span>
                      <span className="text-2xl font-bold text-gray-800">৳{selectedDeposit.amount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Message:</span>
                      <p className="mt-1 text-gray-800">{selectedDeposit.message}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {new Date(selectedDeposit.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Screenshot */}
                {selectedDeposit.screenshot_url && (
                  <div>
                    <h3 className="mb-3 font-medium text-gray-800">Payment Screenshot</h3>
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <img
                        src={selectedDeposit.screenshot_url}
                        alt="Payment screenshot"
                        className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                {selectedDeposit.status === 'pending' && (
                  <div className="flex pt-4 space-x-3 border-t border-gray-200">
                    <button
                      onClick={() => handleStatusUpdate(selectedDeposit.id, 'rejected')}
                      className="flex items-center justify-center flex-1 px-4 py-3 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedDeposit.id, 'approved')}
                      className="flex items-center justify-center flex-1 px-4 py-3 text-white transition-colors duration-200 rounded-lg bg-success hover:bg-success/90"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}