import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TenantSidebar } from '../components/tenant/TenantSidebar';
import { TenantHeader } from '../components/tenant/TenantHeader';
import { DemoBanner } from '../components/common/DemoBanner';
import { X } from 'lucide-react';

export const TenantLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#222B28] flex flex-col">
      <DemoBanner />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <TenantSidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-72 bg-[#F0F2EF] h-full shadow-2xl relative flex flex-col justify-between">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-[#78817B] hover:text-[#222B28]"
              >
                <X className="w-5 h-5" />
              </button>
              <TenantSidebar
                collapsed={false}
                onToggleCollapse={() => setMobileOpen(false)}
              />
            </div>
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
          <TenantHeader onToggleMobileMenu={() => setMobileOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-16">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
