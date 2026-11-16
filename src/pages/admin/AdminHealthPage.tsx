import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Server,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Activity,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

export const AdminHealthPage: React.FC = () => {
  const { servicesHealth, refreshServicesHealth } = useDemo();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      refreshServicesHealth();
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Microservice Cluster Health
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Real-time status, response latencies, and 90-day SLA telemetry across all 8 core platform microservices.
          </p>
        </div>

        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Pinging Services...' : 'Refresh Health Telemetry'}</span>
        </button>
      </div>

      {/* 8 Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {servicesHealth.map((svc) => (
          <div
            key={svc.id}
            className="bg-white rounded-2xl border border-[#E6EAE6] p-5 shadow-xs flex flex-col justify-between text-left space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] font-mono">
                  {svc.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#E7EEE8] text-[#648B70]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#648B70] animate-pulse" />
                  {svc.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#222B28] font-display">
                {svc.name}
              </h3>
            </div>

            <div className="pt-3 border-t border-[#E6EAE6] space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#78817B]">Round-Trip Latency:</span>
                <span className="font-mono font-bold text-[#557C68]">{svc.latencyMs} ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#78817B]">90-Day Uptime SLA:</span>
                <span className="font-mono text-[#222B28]">{svc.uptime90d}%</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#78817B] font-mono pt-1">
                <span>Last verified:</span>
                <span>{svc.lastChecked}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white rounded-2xl border border-[#E6EAE6] text-xs text-[#78817B] flex items-center justify-between">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#648B70]" />
          <span>Cross-region active-active failover is operating at 100% capacity.</span>
        </span>
        <span className="font-mono text-[11px]">Primary region: us-east-1</span>
      </div>
    </div>
  );
};
