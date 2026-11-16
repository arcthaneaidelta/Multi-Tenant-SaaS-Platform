import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  BarChart3,
  TrendingUp,
  Building2,
  Users,
  Layers,
  Cpu,
  Activity,
} from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { tenants, modules } = useDemo();
  const [range, setRange] = useState<'30d' | '90d' | '1y'>('30d');

  const fleetMetrics = [
    { title: 'Global Platform ARR', value: '$295,200', change: '+22.4%', sub: 'Normalized annual run rate' },
    { title: 'Fleet Users', value: '4,820', change: '+18.1%', sub: 'Across 128 workspaces' },
    { title: 'AI Tokens (30d)', value: '38.4M', change: '+34.5%', sub: 'LLM gateway calls' },
    { title: 'Automation SLA', value: '99.98%', change: '+0.02%', sub: 'Zero dropped webhooks' },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Platform-Wide Fleet Analytics
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Aggregated cross-tenant telemetry, capacity forecasting, and platform growth metrics.
          </p>
        </div>

        <div className="flex items-center bg-[#F7F8F6] p-1 rounded-xl border border-[#E6EAE6]">
          {(['30d', '90d', '1y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                range === r
                  ? 'bg-white shadow-xs text-[#222B28] font-semibold'
                  : 'text-[#78817B] hover:text-[#222B28]'
              }`}
            >
              {r === '30d' ? '30 Days' : r === '90d' ? '90 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fleetMetrics.map((m, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-[#E6EAE6] shadow-xs">
            <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono">{m.title}</div>
            <div className="text-2xl font-bold font-display text-[#222B28] mt-1">{m.value}</div>
            <div className="text-[11px] text-[#648B70] mt-1 font-mono flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{m.change} ({m.sub})</span>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-Tenant Module Adoption */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs">
        <div className="pb-4 border-b border-[#E6EAE6] mb-4">
          <h3 className="text-sm font-bold text-[#222B28] font-display">
            Module Fleet Penetration
          </h3>
          <p className="text-xs text-[#78817B]">Adoption rate across all 128 provisioned company tenants</p>
        </div>

        <div className="space-y-3">
          {modules.map((mod) => {
            const adoptionPct = Math.round((mod.adoptionCount / 128) * 100);
            return (
              <div key={mod.id} className="space-y-1 text-xs">
                <div className="flex justify-between items-center text-[#222B28]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{mod.name}</span>
                    <span className="text-[10px] text-[#78817B] font-mono">({mod.category})</span>
                  </div>
                  <span className="font-mono text-[#557C68] font-bold">
                    {mod.adoptionCount} / 128 ({adoptionPct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-[#F0F2EF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#557C68] rounded-full"
                    style={{ width: `${adoptionPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
