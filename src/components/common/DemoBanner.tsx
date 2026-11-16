import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ShieldAlert, ArrowLeft, RefreshCw, ChevronDown, Check, Building2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoBanner: React.FC = () => {
  const {
    isImpersonating,
    currentTenant,
    exitImpersonation,
    resetDemoData,
    tenants,
    currentTenantId,
    setTenantId,
  } = useDemo();
  const navigate = useNavigate();
  const [showSwitchDropdown, setShowSwitchDropdown] = useState(false);

  return (
    <>
      {/* Impersonation Banner when Super Admin views as Tenant */}
      {isImpersonating && (
        <div className="bg-[#304F40] text-[#F4F5F1] px-4 py-2 text-xs flex items-center justify-between shadow-sm sticky top-0 z-50 border-b border-[#557C68]/30">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#C49A58] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#B89A68]">
              DEMO ADMIN MODE
            </span>
            <span className="text-[#E7EEE8]/80 hidden sm:inline">|</span>
            <span className="text-[#E7EEE8]">
              Impersonating workspace: <strong className="font-medium text-white">{currentTenant.name}</strong> ({currentTenant.domain})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                exitImpersonation();
                navigate('/admin/tenants');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#557C68] hover:bg-[#648B70] text-white text-[11px] font-medium transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Super Admin
            </button>
          </div>
        </div>
      )}

      {/* Floating Demo Controller / Reset Quick Bar */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E6EAE6] shadow-sm text-xs text-[#222B28]">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#557C68] pr-2 border-r border-[#E6EAE6]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#648B70]" />
          DEMO PLATFORM
        </div>

        {/* Quick Tenant Switcher button */}
        <div className="relative">
          <button
            onClick={() => setShowSwitchDropdown(!showSwitchDropdown)}
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#222B28] hover:text-[#557C68] px-1.5 py-0.5 rounded transition-colors"
          >
            <Building2 className="w-3 h-3 text-[#78817B]" />
            <span className="max-w-[110px] truncate">{currentTenant.name}</span>
            <ChevronDown className="w-3 h-3 text-[#78817B]" />
          </button>

          {showSwitchDropdown && (
            <div className="absolute bottom-8 left-0 w-52 bg-white rounded-xl shadow-lg border border-[#E6EAE6] py-1 text-xs animate-in fade-in zoom-in-95 duration-150 z-50">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#78817B] border-b border-[#E6EAE6]">
                Switch Tenant Workspace
              </div>
              {tenants.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTenantId(t.id);
                    setShowSwitchDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-[#F7F8F6] transition-colors"
                >
                  <div>
                    <div className="font-medium text-[#222B28]">{t.name}</div>
                    <div className="text-[10px] text-[#78817B]">{t.plan} Plan · {t.memberCount} users</div>
                  </div>
                  {t.id === currentTenantId && (
                    <Check className="w-3.5 h-3.5 text-[#557C68]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={resetDemoData}
          title="Reset all mock data to initial baseline"
          className="flex items-center gap-1 text-[11px] text-[#78817B] hover:text-[#B87570] transition-colors pl-2 border-l border-[#E6EAE6]"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Demo</span>
        </button>
      </div>
    </>
  );
};
