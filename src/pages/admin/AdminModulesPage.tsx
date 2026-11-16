import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Layers, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Check, X } from 'lucide-react';

export const AdminModulesPage: React.FC = () => {
  const { modules, toggleModuleGlobal } = useDemo();

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Global Module Governance
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Manage global availability, deployment status, and fleet adoption across all 128 tenant organizations.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#E7EEE8] text-[#304F40] font-semibold">
          {modules.filter((m) => m.isGloballyAvailable).length} of {modules.length} Globally Available
        </span>
      </div>

      {/* Global Modules Table */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8F6] text-[10px] uppercase font-mono font-bold text-[#78817B] border-b border-[#E6EAE6]">
              <tr>
                <th className="px-5 py-3.5">Module Name</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Version</th>
                <th className="px-5 py-3.5">Tenant Adoption</th>
                <th className="px-5 py-3.5">Min Plan</th>
                <th className="px-5 py-3.5 text-right">Global Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EAE6]/70 text-[#222B28]">
              {modules.map((m) => (
                <tr key={m.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#E7EEE8] text-[#304F40] flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-[#557C68]" />
                      </div>
                      <div>
                        <div className="font-bold text-[#222B28]">{m.name}</div>
                        <div className="text-[11px] text-[#78817B] truncate max-w-xs">{m.shortDescription}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 font-medium">{m.category}</td>

                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#78817B]">v{m.version}</td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#557C68] font-mono">{m.adoptionCount}</span>
                      <span className="text-[10px] text-[#78817B]">workspaces</span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 font-medium">{m.pricingTierRequired}</td>

                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => toggleModuleGlobal(m.id)}
                      className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                        m.isGloballyAvailable
                          ? 'bg-[#E7EEE8] text-[#304F40] border border-[#557C68]/30 shadow-xs'
                          : 'bg-[#F0F2EF] text-[#78817B] border border-[#E6EAE6]'
                      }`}
                    >
                      {m.isGloballyAvailable ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#648B70]" />
                          <span>Globally Active</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3.5 h-3.5 text-[#B87570]" />
                          <span>Restricted</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
