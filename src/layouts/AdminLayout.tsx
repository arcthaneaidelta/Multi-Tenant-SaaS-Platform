import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { DemoBanner } from '../components/common/DemoBanner';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#222B28] flex flex-col">
      <DemoBanner />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Super Admin Sidebar */}
        <AdminSidebar />

        {/* Super Admin Main Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
          <AdminHeader />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-16">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
