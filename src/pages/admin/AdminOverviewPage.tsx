import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  CreditCard,
  Layers,
  Activity,
  TrendingUp,
  Server,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const AdminOverviewPage: React.FC = () => {
  const { tenants, activityLogs, servicesHealth, setTenantId, setIsSuperAdmin } = useDemo();
  const navigate = useNavigate();
  const [chartView, setChartView] = useState<'mrr' | 'tenants'>('mrr');

  // Top Operational Stats per PRD 7.1
  const stats = [
    { title: 'Total Tenants', value: '128', sub: '112 Active accounts', icon: Building2, color: 'text-[#557C68]' },
    { title: 'Monthly Revenue', value: '$24,600', sub: '+18% ARR run-rate', icon: CreditCard, color: 'text-[#B89A68]' },
    { title: 'Platform Users', value: '4,820', sub: 'Across all workspaces', icon: Users, color: 'text-[#304F40]' },
    { title: 'Active Modules', value: '684', sub: 'Dynamic instances', icon: Layers, color: 'text-[#648B70]' },
  ];

  const mrrBars = [
    { month: 'Jun', mrr: 16200, tenants: 84 },
    { month: 'Jul', mrr: 17800, tenants: 92 },
    { month: 'Aug', mrr: 19400, tenants: 101 },
    { month: 'Sep', mrr: 21100, tenants: 110 },
    { month: 'Oct', mrr: 23200, tenants: 120 },
    { month: 'Nov', mrr: 24600, tenants: 128 },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Platform Master Console
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Operational governance, revenue telemetry, and tenant fleet observability across all clusters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E7EEE8] text-[#304F40] text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#648B70] animate-pulse" />
            <span>Platform Uptime: 99.98%</span>
          </span>

          <button
            onClick={() => navigate('/admin/tenants')}
            className="px-4 py-2 bg-[#304F40] hover:bg-[#557C68] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Manage Tenants Directory
          </button>
        </div>
      </div>

      {/* 4 Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-[#E6EAE6] shadow-xs">
              <div className="flex items-center justify-between text-[#78817B] mb-2">
                <span className="text-xs font-medium">{s.title}</span>
                <div className={`w-8 h-8 rounded-xl bg-[#F0F2EF] flex items-center justify-center ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#222B28] font-display">
                {s.value}
              </div>
              <div className="text-[11px] text-[#648B70] mt-1 font-mono">
                {s.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & System Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Growth & Revenue Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E6EAE6]">
            <div>
              <h3 className="text-sm font-bold text-[#222B28] font-display">
                Platform Expansion & Revenue Trajectory
              </h3>
              <p className="text-xs text-[#78817B]">
                Track historical monthly recurring revenue and active company provisioning
              </p>
            </div>

            <div className="flex items-center bg-[#F7F8F6] p-1 rounded-xl border border-[#E6EAE6]">
              <button
                onClick={() => setChartView('mrr')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  chartView === 'mrr' ? 'bg-white shadow-xs text-[#222B28] font-semibold' : 'text-[#78817B]'
                }`}
              >
                MRR ($)
              </button>
              <button
                onClick={() => setChartView('tenants')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  chartView === 'tenants' ? 'bg-white shadow-xs text-[#222B28] font-semibold' : 'text-[#78817B]'
                }`}
              >
                Tenants Count
              </button>
            </div>
          </div>

          <div className="h-52 flex items-end gap-4 sm:gap-6 pt-6 pb-2 px-2 border-b border-[#E6EAE6]">
            {mrrBars.map((item, idx) => {
              const val = chartView === 'mrr' ? item.mrr : item.tenants;
              const max = chartView === 'mrr' ? 26000 : 140;
              const heightPct = (val / max) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#222B28] text-white text-[10px] py-0.5 px-2 rounded font-mono pointer-events-none whitespace-nowrap shadow-xs">
                    {chartView === 'mrr' ? `$${item.mrr.toLocaleString()} MRR` : `${item.tenants} tenants`}
                  </div>

                  <div className="w-full bg-[#E7EEE8] rounded-t-md h-40 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-[#304F40] hover:bg-[#557C68] transition-all duration-300 rounded-t-md"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-[#78817B]">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-[#78817B]">
            <span>Current Net Retention: 114%</span>
            <span className="font-mono text-[11px]">Updated 5 mins ago</span>
          </div>
        </div>

        {/* Microservices Quick Health (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6EAE6]">
            <div>
              <h3 className="text-sm font-bold text-[#222B28] font-display">
                Microservice Cluster Health
              </h3>
              <p className="text-xs text-[#78817B]">Real-time edge response times</p>
            </div>
            <button
              onClick={() => navigate('/admin/system-health')}
              className="text-xs font-semibold text-[#557C68] hover:underline"
            >
              All 8 →
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {servicesHealth.slice(0, 5).map((svc) => (
              <div
                key={svc.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]"
              >
                <div>
                  <div className="font-semibold text-[#222B28]">{svc.name}</div>
                  <div className="text-[10px] text-[#78817B] font-mono">{svc.category}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-[#648B70]">
                    {svc.latencyMs}ms
                  </span>
                  <div className="text-[9px] text-[#78817B] font-mono">{svc.uptime90d}%</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/admin/system-health')}
            className="w-full py-2 bg-[#F0F2EF] hover:bg-[#E7EEE8] text-[#304F40] rounded-xl text-xs font-semibold transition-colors block text-center"
          >
            Inspect Infrastructure Telemetry →
          </button>
        </div>
      </div>

      {/* Tenants Roster Snippet */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#E6EAE6] mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#222B28] font-display">
              Active Tenants Overview
            </h3>
            <p className="text-xs text-[#78817B]">Recently provisioned enterprise organizations</p>
          </div>
          <button
            onClick={() => navigate('/admin/tenants')}
            className="text-xs font-semibold text-[#557C68] hover:underline"
          >
            View Complete Directory →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tenants.slice(0, 3).map((t) => (
            <div
              key={t.id}
              onClick={() => navigate(`/admin/tenants/${t.id}`)}
              className="cursor-pointer p-4 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6] hover:border-[#557C68] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.logoInitial}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#78817B] border border-[#E6EAE6]">
                    {t.plan} Plan
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#222B28] font-display mb-0.5">{t.name}</h4>
                <p className="text-[11px] text-[#78817B] font-mono">{t.domain}</p>
              </div>

              <div className="pt-3 border-t border-[#E6EAE6]/70 mt-3 flex items-center justify-between text-[11px] text-[#78817B]">
                <span>{t.memberCount} members</span>
                <span className="text-[#557C68] font-semibold flex items-center gap-1">
                  Manage <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
