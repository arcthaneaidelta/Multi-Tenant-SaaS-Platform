import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Layers,
  GitBranch,
  Activity,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Database,
  Cpu,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentTenant, workflows, activityLogs, modules } = useDemo();
  const navigate = useNavigate();
  const [chartRange, setChartRange] = useState<'weekly' | 'monthly' | 'quarterly'>('weekly');

  const chartData = {
    weekly: [
      { label: 'Mon', value: 45, events: 320 },
      { label: 'Tue', value: 62, events: 480 },
      { label: 'Wed', value: 58, events: 410 },
      { label: 'Thu', value: 84, events: 690 },
      { label: 'Fri', value: 72, events: 540 },
      { label: 'Sat', value: 91, events: 810 },
      { label: 'Sun', value: 98, events: 940 },
    ],
    monthly: [
      { label: 'W1', value: 52, events: 2100 },
      { label: 'W2', value: 68, events: 2800 },
      { label: 'W3', value: 74, events: 3400 },
      { label: 'W4', value: 94, events: 4200 },
    ],
    quarterly: [
      { label: 'Oct', value: 65, events: 12400 },
      { label: 'Nov', value: 78, events: 14800 },
      { label: 'Dec', value: 96, events: 18200 },
    ],
  };

  const activePoints = chartData[chartRange];
  const activeWorkflowsCount = workflows.filter((w) => w.status === 'Active').length;
  const tenantLogs = activityLogs.filter((l) => l.tenantId === currentTenant.id).slice(0, 5);

  const enabledModules = modules.filter((m) => currentTenant.activeModules.includes(m.id));

  return (
    <div className="space-y-6">
      {/* 6.3 Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Good morning, {currentTenant.adminName.split(' ')[0]}.
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Here's what's happening across your <strong className="text-[#222B28]">{currentTenant.name}</strong> workspace today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/app/ai')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E6EAE6] hover:border-[#557C68] text-xs font-semibold text-[#222B28] transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B89A68]" />
            <span>Ask Copilot</span>
          </button>

          <button
            onClick={() => navigate('/app/automations')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>New Automation</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E6EAE6] shadow-xs text-left">
          <div className="flex items-center justify-between text-[#78817B] mb-2">
            <span className="text-xs font-medium">Total Members</span>
            <div className="w-8 h-8 rounded-xl bg-[#E7EEE8] text-[#557C68] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#222B28] font-display">
            {currentTenant.memberCount}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#648B70] mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>Capacity: {currentTenant.maxMembers} seats</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E6EAE6] shadow-xs text-left">
          <div className="flex items-center justify-between text-[#78817B] mb-2">
            <span className="text-xs font-medium">Active Modules</span>
            <div className="w-8 h-8 rounded-xl bg-[#E7EEE8] text-[#557C68] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#222B28] font-display">
            {currentTenant.activeModules.length}
          </div>
          <div className="text-[11px] text-[#78817B] mt-1">
            <span>{currentTenant.plan} tier enabled</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E6EAE6] shadow-xs text-left">
          <div className="flex items-center justify-between text-[#78817B] mb-2">
            <span className="text-xs font-medium">Automations Running</span>
            <div className="w-8 h-8 rounded-xl bg-[#E7EEE8] text-[#557C68] flex items-center justify-center">
              <GitBranch className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#222B28] font-display">
            {activeWorkflowsCount}
          </div>
          <div className="text-[11px] text-[#648B70] mt-1 font-mono">
            <span>99.4% avg success rate</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E6EAE6] shadow-xs text-left">
          <div className="flex items-center justify-between text-[#78817B] mb-2">
            <span className="text-xs font-medium">Storage Quota</span>
            <div className="w-8 h-8 rounded-xl bg-[#E7EEE8] text-[#557C68] flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#222B28] font-display">
            {Math.round((currentTenant.storageUsedGB / currentTenant.maxStorageGB) * 100)}%
          </div>
          <div className="text-[11px] text-[#78817B] mt-1">
            <span>{currentTenant.storageUsedGB} GB of {currentTenant.maxStorageGB} GB</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Activity Chart Section */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-sm font-bold text-[#222B28] font-display">
                Workspace Operational Throughput
              </h3>
              <p className="text-xs text-[#78817B]">
                Inbound requests, automation executions, and copilot queries
              </p>
            </div>

            {/* Toggle Range buttons */}
            <div className="flex items-center bg-[#F7F8F6] p-1 rounded-xl border border-[#E6EAE6]">
              {(['weekly', 'monthly', 'quarterly'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setChartRange(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                    chartRange === r
                      ? 'bg-white shadow-xs text-[#222B28] font-semibold'
                      : 'text-[#78817B] hover:text-[#222B28]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Lightweight Chart Bars */}
          <div className="h-48 flex items-end gap-3 sm:gap-4 pt-6 pb-2 px-2 border-b border-[#E6EAE6]">
            {activePoints.map((item, idx) => {
              const heightPct = item.value;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#222B28] text-white text-[10px] py-0.5 px-2 rounded font-mono pointer-events-none whitespace-nowrap z-10 shadow-sm">
                    {item.events.toLocaleString()} events
                  </div>

                  <div className="w-full bg-[#E7EEE8] rounded-t-md h-36 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-[#557C68] hover:bg-[#304F40] transition-all duration-300 rounded-t-md"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#78817B]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-[#78817B]">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#557C68]" /> Daily Executions
            </span>
            <span className="font-mono text-[11px]">Updated 2 mins ago</span>
          </div>
        </div>

        {/* Workspace Health & Telemetry Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6EAE6]">
            <h3 className="text-sm font-bold text-[#222B28] font-display">
              Workspace Health
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E7EEE8] text-[#304F40] text-[10px] font-semibold font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-[#648B70]" /> {currentTenant.health}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[#78817B] mb-1">
                <span>AI Token Quota</span>
                <span className="font-mono">
                  {((currentTenant.aiTokensUsed / currentTenant.maxAiTokens) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#F0F2EF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B89A68] rounded-full"
                  style={{ width: `${(currentTenant.aiTokensUsed / currentTenant.maxAiTokens) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#78817B] mb-1">
                <span>API Calls Allocation</span>
                <span className="font-mono">
                  {((currentTenant.apiCallsThisMonth / currentTenant.maxApiCalls) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#F0F2EF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#557C68] rounded-full"
                  style={{ width: `${(currentTenant.apiCallsThisMonth / currentTenant.maxApiCalls) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#E6EAE6] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#78817B]">Subscription Plan</span>
                <span className="font-semibold text-[#222B28]">{currentTenant.plan} (${currentTenant.monthlyCost}/mo)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#78817B]">Next Billing Cycle</span>
                <span className="font-mono text-[#222B28] text-[11px]">{currentTenant.nextBillingDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#78817B]">Domain Isolation</span>
                <span className="font-mono text-[#557C68] text-[11px]">{currentTenant.domain}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/app/billing')}
              className="w-full mt-2 py-2 text-center text-xs font-semibold text-[#557C68] hover:bg-[#E7EEE8] rounded-xl transition-colors block"
            >
              Manage Subscription & Limits →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Modules Overview & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Active Modules Overview */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs text-left">
          <div className="flex items-center justify-between pb-4 border-b border-[#E6EAE6] mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#222B28] font-display">
                Active Modules ({enabledModules.length})
              </h3>
              <p className="text-xs text-[#78817B]">Provisioned on-demand capabilities</p>
            </div>
            <button
              onClick={() => navigate('/app/modules')}
              className="text-xs font-semibold text-[#557C68] hover:underline"
            >
              Module Catalog →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {enabledModules.map((mod) => (
              <div
                key={mod.id}
                onClick={() => navigate('/app/modules')}
                className="cursor-pointer p-3.5 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6] hover:border-[#557C68]/50 transition-colors flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E7EEE8] text-[#557C68] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#222B28] truncate">{mod.name}</div>
                  <div className="text-[10px] text-[#78817B]">{mod.category} • v{mod.version}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Audit Feed */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs text-left">
          <div className="flex items-center justify-between pb-4 border-b border-[#E6EAE6] mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#222B28] font-display">
                Recent Workspace Activity
              </h3>
              <p className="text-xs text-[#78817B]">Real-time operational audit events</p>
            </div>
            <button
              onClick={() => navigate('/app/activity')}
              className="text-xs font-semibold text-[#557C68] hover:underline"
            >
              View All Logs →
            </button>
          </div>

          <div className="space-y-3">
            {tenantLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]/60 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#222B28]">{log.event}</span>
                    <span className="text-[10px] text-[#78817B] font-mono">by {log.user}</span>
                  </div>
                  <p className="text-[11px] text-[#78817B]">{log.action}</p>
                </div>
                <span className="text-[10px] font-mono text-[#78817B] shrink-0">{log.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
