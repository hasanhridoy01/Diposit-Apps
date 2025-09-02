import React, { useState } from "react";
import { Sidebar } from "../Layout/Sidebar";
import { BottomNavigation } from "../Layout/BottomNavigation";
import { DashboardOverview } from "./DashboardOverview";
import { MemberManagement } from "./MemberManagement";
import { DepositForm } from "./DepositForm";
import { DepositManagement } from "./DepositManagement";
import { Settings } from "./Settings";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      // case 'members':
      //   return user?.role === 'admin' ? <MemberManagement /> : <DashboardOverview />;
      // case 'deposits':
      //   return user?.role === 'admin' ? <DepositManagement /> : <DashboardOverview />;
      case "members":
        return <MemberManagement />;
      case "deposits":
        return <DepositManagement />;
      case "deposit":
        return <DepositForm />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col flex-1">
        <main className="flex-1 p-4 pb-20 md:p-6 lg:p-8 md:pb-8">
          {renderContent()}
        </main>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
