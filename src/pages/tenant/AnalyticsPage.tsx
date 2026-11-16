import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Sparkles,
  GitBranch,
  Layers,
  Users,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { currentTenant, showToast } = useDemo();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'custom'>('30d');
  const [isExporting, setIsExporting] = useState(false);

  // Filtered telemetry datasets
  const telemetry = {
    '7d': {
      growthRate: '+14.2%',
      totalEvents: '14,290',
      aiTokensUsed: '280k',
      automationExecutions: '312',
      bars: [45, 62, 78, 54, 88, 92, 98],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      moduleBreakdown: [
        { name: 'CRM & Pipeline', share: 38 },
        { name: 'Automation Engine', share: 29 },
        { name: 'AI Copilot', share: 21 },
        { name: 'Integrations Hub', share: 12 },
      ],
    },
    '30d': {
      growthRate: '+28.4%',
      totalEvents: '89,450',
      aiTokensUsed: '1.24M',
      automationExecutions: '1,248',
      bars: [35, 42, 58, 64, 72, 81, 89, 94, 99],
      labels: ['W1-A', 'W1-B', 'W2-A', 'W2-B', 'W3-A', 'W3-B', 'W4-A', 'W4-B', 'Current'],
      moduleBreakdown: [
        { name: 'CRM & Pipeline', share: 42 },
        { name: 'Automation Engine', share: 26 },
        { name: 'AI Copilot', share: 20 },
        { name: 'Integrations Hub', share: 12 },
      ],
    },
    '90d': {
      growthRate: '+46.8%',
      totalEvents: '310,800',
      aiTokensUsed: '3.80M',
      automationExecutions: '4,190',
      bars: [28, 39, 48, 55, 69, 74, 82, 88, 97],
      labels: ['Sep W1', 'Sep W3', 'Oct W1', 'Oct W3', 'Nov W1', 'Nov W3', 'Dec W1', 'Dec W3', 'Now'],
      moduleBreakdown: [
        { name: 'CRM & Pipeline', share: 45 },
        { name: 'Automation Engine', share: 25 },
        { name: 'AI Copilot', share: 18 },
        { name: 'Integrations Hub', share: 12 },
      ],
    },
    custom: {
      growthRate: '+19.6%',
      totalEvents: '42,100',
      aiTokensUsed: '840k',
      automationExecutions: '820',
      bars: [50, 60, 65, 70, 75, 80, 85],
      labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'],
      moduleBreakdown: [
        { name: 'CRM & Pipeline', share: 40 },
        { name: 'Automation Engine', share: 30 },
        { name: 'AI Copilot', share: 20 },
        { name: 'Integrations Hub', share: 10 },
      ],
    },
  }[dateRange];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('Report Exported', `Generated telemetry snapshot CSV for ${currentTenant.name} (${dateRange}).`, 'success');
    }, 800);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Analytics & Telemetry
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Operational metrics, member velocity, and token consumption for {currentTenant.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Date range filters */}
          <div className="flex items-center bg-[#F7F8F6] p-1 rounded-xl border border-[#E6EAE6]">
            {(['7d', '30d', '90d', 'custom'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  dateRange === r
                    ? 'bg-white shadow-xs text-[#222B28] font-semibold'
                    : 'text-[#78817B] hover:text-[#222B28]'
                }`}
              >
                {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : r === '90d' ? '90 Days' : 'Custom'}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating CSV...' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E6EAE6] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono">Workspace Velocity</div>
          <div className="text-2xl font-bold font-display text-[#222B28] mt-1">{telemetry.growthRate}</div>
          <div className="text-[10px] text-[#648B70] mt-0.5 font-mono">Compared to prev period</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E6EAE6] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono">Processed Events</div>
          <div className="text-2xl font-bold font-display text-[#222B28] mt-1">{telemetry.totalEvents}</div>
          <div className="text-[10px] text-[#78817B] mt-0.5">Webhook & API ingest</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E6EAE6] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono">AI Tokens Used</div>
          <div className="text-2xl font-bold font-display text-[#B89A68] mt-1 font-mono">{telemetry.aiTokensUsed}</div>
          <div className="text-[10px] text-[#78817B] mt-0.5">GPT-4o & Claude 3.5</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E6EAE6] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono">DAG Executions</div>
          <div className="text-2xl font-bold font-display text-[#557C68] mt-1">{telemetry.automationExecutions}</div>
          <div className="text-[10px] text-[#648B70] mt-0.5 font-mono">99.6% SLA adherence</div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Growth & Volume Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E6EAE6] mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#222B28] font-display">
                Execution Throughput Curve ({dateRange.toUpperCase()})
              </h3>
              <p className="text-xs text-[#78817B]">
                Daily event dispatch volume across all active modules
              </p>
            </div>
            <span className="text-[10px] font-mono bg-[#E7EEE8] text-[#304F40] px-2 py-0.5 rounded-full font-semibold">
              Live Aggregation
            </span>
          </div>

          <div className="h-52 flex items-end gap-3 sm:gap-5 pt-6 pb-2 px-2 border-b border-[#E6EAE6]">
            {telemetry.bars.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 bg-[#222B28] text-white text-[10px] py-0.5 px-2 rounded font-mono pointer-events-none whitespace-nowrap shadow-xs">
                  {val}% throughput
                </div>

                <div className="w-full bg-[#E7EEE8] rounded-t-md h-40 flex items-end overflow-hidden">
                  <div
                    className="w-full bg-[#557C68] hover:bg-[#304F40] transition-all duration-300 rounded-t-md"
                    style={{ height: `${val}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#78817B]">
                  {telemetry.labels[idx]}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-[#78817B]">
            <span>Partition: {currentTenant.slug}_primary_analytics</span>
            <span className="font-mono text-[11px]">Latency: 14ms</span>
          </div>
        </div>

        {/* Module Adoption Distribution */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E6EAE6]">
            <h3 className="text-sm font-bold text-[#222B28] font-display">
              Module Load Breakdown
            </h3>
            <p className="text-xs text-[#78817B]">Relative consumption by service</p>
          </div>

          <div className="space-y-4 text-xs">
            {telemetry.moduleBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[#222B28]">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-mono text-[#557C68] font-bold">{item.share}%</span>
                </div>
                <div className="w-full h-2 bg-[#F0F2EF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#557C68] rounded-full"
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E6EAE6] text-[11px] text-[#78817B] leading-relaxed">
            Telemetry is streamed asynchronously into the local client store with zero external cloud dependencies.
          </div>
        </div>
      </div>
    </div>
  );
};
