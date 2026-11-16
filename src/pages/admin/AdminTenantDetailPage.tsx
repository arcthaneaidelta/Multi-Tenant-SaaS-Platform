import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { TenantId, PlanType } from '../../types';
import {
  Building2,
  ExternalLink,
  ShieldCheck,
  Layers,
  Users,
  CreditCard,
  Clock,
  ArrowLeft,
  Pause,
  Play,
  Database,
  Lock,
  Sparkles,
  CheckCircle2,
  Edit2,
  Trash2,
} from 'lucide-react';

export const AdminTenantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tenants, modules, enterImpersonation, suspendTenant, currentMembers } = useDemo();

  const tenant = tenants.find((t) => t.id === id) || tenants[0];

  const tenantModules = modules.filter((m) => tenant.activeModules.includes(m.id));

  return (
    <div className="space-y-6 text-left">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/tenants')}
            className="p-1.5 rounded-lg text-[#78817B] hover:text-[#222B28] hover:bg-[#F0F2EF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
                {tenant.name}
              </h1>
              <span
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  tenant.status === 'Active'
                    ? 'bg-[#E7EEE8] text-[#304F40]'
                    : 'bg-[#FFFDF9] text-[#C49A58] border border-[#C49A58]/30'
                }`}
              >
                {tenant.status}
              </span>
            </div>
            <p className="text-xs text-[#78817B] font-mono mt-0.5">
              Tenant ID: {tenant.id} • {tenant.domain}
            </p>
          </div>
        </div>

        {/* View as Tenant Impersonation Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => enterImpersonation(tenant.id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#557C68] hover:bg-[#648B70] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View as Tenant Workspace</span>
          </button>

          <button
            onClick={() => suspendTenant(tenant.id)}
            className="p-2 rounded-xl border border-[#E6EAE6] hover:bg-[#F7F8F6] text-[#78817B] hover:text-[#C49A58] transition-colors"
            title={tenant.status === 'Active' ? 'Suspend' : 'Activate'}
          >
            {tenant.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Grid: Profile & Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Core Specs Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs space-y-6">
          <div className="pb-3 border-b border-[#E6EAE6]">
            <h3 className="text-sm font-bold text-[#222B28] font-display">
              Tenant Partition Infrastructure
            </h3>
            <p className="text-xs text-[#78817B]">Dedicated multi-tenant isolation configuration</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]">
              <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono mb-1">
                Database Schema
              </div>
              <div className="font-mono font-semibold text-[#222B28]">
                {tenant.slug}_partition_isolated
              </div>
              <div className="text-[10px] text-[#648B70] mt-1 font-mono">Row-level security active</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]">
              <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono mb-1">
                KMS Encryption Key
              </div>
              <div className="font-mono font-semibold text-[#222B28] truncate">
                arn:velora:kms:us-east-1:{tenant.slug}-key
              </div>
              <div className="text-[10px] text-[#648B70] mt-1 font-mono">AES-256-GCM hardware key</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]">
              <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono mb-1">
                Subscription Plan
              </div>
              <div className="font-semibold text-[#222B28]">
                {tenant.plan} Tier (${tenant.monthlyCost}/month)
              </div>
              <div className="text-[10px] text-[#78817B] mt-1">Next invoice: {tenant.nextBillingDate}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]">
              <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono mb-1">
                Root Workspace Administrator
              </div>
              <div className="font-semibold text-[#222B28]">
                {tenant.adminName}
              </div>
              <div className="text-[10px] text-[#78817B] font-mono">{tenant.adminEmail}</div>
            </div>
          </div>

          {/* Usage Gauges */}
          <div className="space-y-3 pt-3 border-t border-[#E6EAE6] text-xs">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#78817B] font-mono">
              Live Allocation Telemetry
            </h4>

            <div>
              <div className="flex justify-between text-[#78817B] mb-1">
                <span>Storage Utilization</span>
                <span className="font-mono text-[#222B28]">
                  {tenant.storageUsedGB} GB / {tenant.maxStorageGB} GB
                </span>
              </div>
              <div className="w-full h-2 bg-[#F0F2EF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#557C68] rounded-full"
                  style={{ width: `${(tenant.storageUsedGB / tenant.maxStorageGB) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#78817B] mb-1">
                <span>AI Token Budget</span>
                <span className="font-mono text-[#222B28]">
                  {tenant.aiTokensUsed.toLocaleString()} / {tenant.maxAiTokens.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-2 bg-[#F0F2EF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B89A68] rounded-full"
                  style={{ width: `${(tenant.aiTokensUsed / tenant.maxAiTokens) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enabled Modules on Tenant (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E6EAE6]">
            <h3 className="text-sm font-bold text-[#222B28] font-display">
              Provisioned Modules ({tenantModules.length})
            </h3>
            <p className="text-xs text-[#78817B]">Active feature modules for this tenant</p>
          </div>

          <div className="space-y-2">
            {tenantModules.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#222B28]">{m.name}</div>
                  <div className="text-[10px] text-[#78817B] font-mono">v{m.version} • {m.category}</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#648B70]" />
              </div>
            ))}
          </div>

          <button
            onClick={() => enterImpersonation(tenant.id)}
            className="w-full py-2 bg-[#304F40] hover:bg-[#557C68] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open in Workspace Mode</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
