import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { AppModule } from '../../types';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Shield,
  Search,
  Filter,
  Check,
  X,
  AlertTriangle,
} from 'lucide-react';

export const ModulesPage: React.FC = () => {
  const { modules, currentTenant, toggleModuleForTenant } = useDemo();
  const [filter, setFilter] = useState<'All' | 'Enabled' | 'Available'>('All');
  const [search, setSearch] = useState('');
  const [activeModalModule, setActiveModalModule] = useState<AppModule | null>(null);

  const filteredModules = modules.filter((m) => {
    const isEnabled = currentTenant.activeModules.includes(m.id);
    const matchesFilter =
      filter === 'All' ? true : filter === 'Enabled' ? isEnabled : !isEnabled;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase()) ||
      m.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const enabledCount = currentTenant.activeModules.length;

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Module Marketplace
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Dynamically enable and configure enterprise feature extensions for {currentTenant.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#E7EEE8] text-[#304F40] font-semibold border border-[#557C68]/20">
            {enabledCount} of {modules.length} Modules Active
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#78817B] absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search modular capabilities, CRM, AI, webhooks..."
            className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-[#F7F8F6] p-1 rounded-xl border border-[#E6EAE6]">
          {(['All', 'Enabled', 'Available'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === tab
                  ? 'bg-white shadow-xs text-[#222B28] font-semibold'
                  : 'text-[#78817B] hover:text-[#222B28]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((mod) => {
          const isEnabled = currentTenant.activeModules.includes(mod.id);

          return (
            <div
              key={mod.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                isEnabled ? 'border-[#557C68]/50 ring-1 ring-[#557C68]/20' : 'border-[#E6EAE6]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E7EEE8] text-[#557C68] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0F2EF] text-[#78817B]">
                      v{mod.version}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                        isEnabled
                          ? 'bg-[#E7EEE8] text-[#304F40]'
                          : 'bg-[#F0F2EF] text-[#78817B]'
                      }`}
                    >
                      {isEnabled ? 'Enabled' : 'Available'}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] font-mono">
                  {mod.category}
                </div>
                <h3 className="text-sm font-bold text-[#222B28] font-display mt-0.5 mb-2">
                  {mod.name}
                </h3>
                <p className="text-xs text-[#78817B] leading-relaxed line-clamp-3 mb-4">
                  {mod.shortDescription}
                </p>

                {/* Features list bullet points */}
                <div className="space-y-1.5 py-3 border-t border-[#E6EAE6] mb-4 text-xs">
                  {mod.features.slice(0, 3).map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#222B28]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#648B70] shrink-0" />
                      <span className="text-[11px] truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6EAE6] flex items-center justify-between gap-2">
                <span className="text-[10px] text-[#78817B] font-mono">
                  Tier: {mod.pricingTierRequired}
                </span>

                <button
                  onClick={() => setActiveModalModule(mod)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isEnabled
                      ? 'border border-[#B87570]/30 text-[#B87570] hover:bg-[#B87570]/10'
                      : 'bg-[#304F40] hover:bg-[#557C68] text-white shadow-xs'
                  }`}
                >
                  {isEnabled ? 'Manage / Disable' : 'Enable Module'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation & Details Modal */}
      {activeModalModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-md w-full p-6 text-left relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveModalModule(null)}
              className="absolute top-4 right-4 text-[#78817B] hover:text-[#222B28] p-1.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E7EEE8] text-[#557C68] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#222B28] font-display">
                  {activeModalModule.name}
                </h3>
                <span className="text-[10px] font-mono text-[#78817B]">
                  {activeModalModule.category} • v{activeModalModule.version}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#222B28] leading-relaxed mb-4">
              {activeModalModule.longDescription}
            </p>

            {currentTenant.activeModules.includes(activeModalModule.id) ? (
              <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#C49A58]/30 text-xs mb-5 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#C49A58]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Disable Module Warning</span>
                </div>
                <p className="text-[11px] text-[#78817B] leading-snug">
                  Disabling this module will temporarily hide its workspace navigation item and pause associated background schedulers. No historical records will be deleted.
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-[#E7EEE8]/60 border border-[#557C68]/20 text-xs mb-5 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#304F40]">
                  <CheckCircle2 className="w-4 h-4 text-[#648B70]" />
                  <span>Instant Hot-Provisioning</span>
                </div>
                <p className="text-[11px] text-[#78817B] leading-snug">
                  Enabling will immediately allocate necessary database schema migrations and register navigation endpoints in your sidebar.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E6EAE6]">
              <button
                onClick={() => setActiveModalModule(null)}
                className="px-3.5 py-2 text-xs font-medium text-[#78817B] hover:text-[#222B28]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toggleModuleForTenant(activeModalModule.id);
                  setActiveModalModule(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors ${
                  currentTenant.activeModules.includes(activeModalModule.id)
                    ? 'bg-[#B87570] hover:bg-[#a6625d] text-white'
                    : 'bg-[#304F40] hover:bg-[#557C68] text-white'
                }`}
              >
                {currentTenant.activeModules.includes(activeModalModule.id)
                  ? 'Confirm Deactivation'
                  : 'Confirm & Provision Module'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
