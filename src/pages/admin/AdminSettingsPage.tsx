import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Settings,
  Shield,
  Server,
  Key,
  Save,
  RotateCcw,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useDemo();

  const [clusterRegion, setClusterRegion] = useState('us-east-multi');
  const [rateLimitPerSec, setRateLimitPerSec] = useState('10000');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [sandboxProvisioning, setSandboxProvisioning] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Global Settings Saved', 'Cluster operational parameters updated.', 'success');
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Global Platform Settings
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Fleet-wide edge routing, global rate limit policies, and cluster security parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Global Configurations</span>
        </button>
      </div>

      {/* Cluster Settings */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-[#E6EAE6] flex items-center gap-2">
          <Server className="w-4 h-4 text-[#557C68]" />
          <h3 className="text-sm font-bold text-[#222B28] font-display">
            Multi-Tenant Cluster Fabric
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
              Active Regional Gateway
            </label>
            <select
              value={clusterRegion}
              onChange={(e) => setClusterRegion(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs font-mono"
            >
              <option value="us-east-multi">us-east-multi (Virginia / Ohio)</option>
              <option value="eu-west-multi">eu-west-multi (Frankfurt / Dublin)</option>
              <option value="ap-southeast-multi">ap-southeast-multi (Singapore / Tokyo)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
              Global Ingress Limit (Req / Sec)
            </label>
            <input
              type="text"
              value={rateLimitPerSec}
              onChange={(e) => setRateLimitPerSec(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs font-mono text-[#222B28]"
            />
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-[#E6EAE6] text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]">
            <div>
              <div className="font-semibold text-[#222B28]">Instant Sandbox Self-Provisioning</div>
              <div className="text-[11px] text-[#78817B]">Allow demonstration visitors to provision demo tenants.</div>
            </div>
            <button
              type="button"
              onClick={() => setSandboxProvisioning(!sandboxProvisioning)}
              className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                sandboxProvisioning ? 'bg-[#557C68]' : 'bg-[#E6EAE6]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  sandboxProvisioning ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]">
            <div>
              <div className="font-semibold text-[#222B28]">Global Cluster Maintenance Mode</div>
              <div className="text-[11px] text-[#78817B]">Locks write operations and displays maintenance window.</div>
            </div>
            <button
              type="button"
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                maintenanceMode ? 'bg-[#B87570]' : 'bg-[#E6EAE6]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
