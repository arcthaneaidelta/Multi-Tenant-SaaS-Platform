import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Server, RefreshCw, Activity, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminHeader: React.FC = () => {
  const { tenants, refreshServicesHealth } = useDemo();
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-white border-b border-[#E6EAE6] px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-[#222B28] font-display">
          Platform Management Console
        </span>
        <span className="text-[10px] bg-[#E7EEE8] text-[#304F40] px-2 py-0.5 rounded-full font-mono font-medium">
          Cluster us-east-multi
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Microservices Health status pill */}
        <button
          onClick={refreshServicesHealth}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F8F6] border border-[#E6EAE6] hover:border-[#557C68] text-xs text-[#222B28] transition-colors"
          title="Click to re-ping all 8 microservices"
        >
          <span className="h-2 w-2 rounded-full bg-[#648B70] animate-pulse" />
          <span className="text-[11px] font-medium">8 Services Healthy</span>
          <RefreshCw className="w-3 h-3 text-[#78817B] ml-1" />
        </button>

        {/* Global tenant stats */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#78817B] pl-2 border-l border-[#E6EAE6]">
          <Building2 className="w-3.5 h-3.5 text-[#557C68]" />
          <span>{tenants.length} Total Tenants</span>
        </div>
      </div>
    </header>
  );
};
