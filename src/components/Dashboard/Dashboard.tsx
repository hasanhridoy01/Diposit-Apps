import React, { useState } from 'react';
import { Sidebar } from '../Layout/Sidebar';
import { BottomNavigation } from '../Layout/BottomNavigation';
import { DashboardOverview } from './DashboardOverview';
import { MemberManagement } from './MemberManagement';
import { DepositForm } from './DepositForm';
import { DepositManagement } from './DepositManagement';
import { Settings } from './Settings';
import { useAuth } from '../../hooks/useAuth';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'members':
        return user?.role === 'admin' ? <MemberManagement /> : <DashboardOverview />;
      case 'deposits':
        return user?.role === 'admin' ? <DepositManagement /> : <DashboardOverview />;
      case 'deposit':
        return <DepositForm />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
          {renderContent()}
        </main>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}