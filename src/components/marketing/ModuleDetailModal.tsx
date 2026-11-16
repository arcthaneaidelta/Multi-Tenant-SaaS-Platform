import React from 'react';
import { AppModule } from '../../types';
import { useDemo } from '../../context/DemoContext';
import { X, CheckCircle2, ShieldCheck, Zap, ArrowRight, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

interface ModuleDetailModalProps {
  module: AppModule | null;
  onClose: () => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({ module, onClose }) => {
  const { currentTenant, toggleModuleForTenant } = useDemo();

  if (!module) return null;

  const isEnabled = currentTenant.activeModules.includes(module.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-lg w-full p-6 text-left relative animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#78817B] hover:text-[#222B28] p-1.5 rounded-lg hover:bg-[#F0F2EF] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 mb-4 pr-8">
          <div className="w-11 h-11 rounded-xl bg-[#E7EEE8] text-[#304F40] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#557C68]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#222B28] font-display">
                {module.name}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0F2EF] text-[#78817B]">
                v{module.version}
              </span>
            </div>
            <p className="text-xs text-[#78817B] mt-0.5">{module.category}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#222B28] leading-relaxed mb-4">
          {module.longDescription}
        </p>

        {/* Specifications & Capabilities */}
        <div className="bg-[#F7F8F6] rounded-xl p-4 border border-[#E6EAE6] mb-5 space-y-2.5">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] font-mono">
            Included Capabilities
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {module.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[#222B28]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#648B70] shrink-0" />
                <span className="text-[11px] leading-tight">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant Scope Information */}
        <div className="mb-6 flex items-center justify-between p-3 rounded-xl border border-[#E6EAE6] text-xs">
          <div>
            <div className="text-[10px] text-[#78817B]">Target Workspace</div>
            <div className="font-semibold text-[#222B28]">{currentTenant.name}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-[#78817B]">Current State</div>
            <div className={`font-semibold ${isEnabled ? 'text-[#648B70]' : 'text-[#78817B]'}`}>
              {isEnabled ? 'Enabled & Active' : 'Available to Provision'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E6EAE6]">
          <span className="text-[11px] text-[#78817B] font-mono">
            Requires {module.pricingTierRequired} Plan or higher
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-[#78817B] hover:text-[#222B28] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toggleModuleForTenant(module.id);
                onClose();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 ${
                isEnabled
                  ? 'bg-[#B87570] hover:bg-[#a6625d] text-white'
                  : 'bg-[#304F40] hover:bg-[#557C68] text-white'
              }`}
            >
              <span>{isEnabled ? 'Disable Module' : 'Enable Module for Workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
