import React, { useState } from 'react';
import { Shield, Database, Lock, Server, Users, Layers, ExternalLink, CheckCircle2, ChevronRight } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { useNavigate } from 'react-router-dom';

export const ArchitectureViz: React.FC = () => {
  const [selectedTenantIndex, setSelectedTenantIndex] = useState<number>(0);
  const { tenants, setTenantId } = useDemo();
  const navigate = useNavigate();

  const previewTenants = [
    {
      id: 'tenant-acme',
      name: 'Acme Technologies',
      subdomain: 'acme.velora.internal',
      tier: 'Growth Tier',
      dbPartition: 'acme_prod_partition_01',
      kmsKey: 'kms-arn:aws:kms:us-east-1:acme-key',
      activeModules: ['CRM Core', 'AI Copilot', 'Automations', 'Analytics', 'Document Vault', 'Integrations Hub'],
      users: 24,
      monthlyVol: '142k requests/mo',
      color: '#557C68',
      description: 'B2B SaaS with automated lead qualification and marketing webhook routing.',
    },
    {
      id: 'tenant-northstar',
      name: 'Northstar Consulting',
      subdomain: 'northstar.velora.internal',
      tier: 'Enterprise Tier',
      dbPartition: 'northstar_isolated_partition_02',
      kmsKey: 'kms-arn:aws:kms:eu-west-1:northstar-vault',
      activeModules: ['AI Copilot', 'Analytics Hub', 'Document Vault', 'Team Directory', 'Integrations Hub'],
      users: 42,
      monthlyVol: '89k requests/mo',
      color: '#304F40',
      description: 'Management consultancy deploying dedicated document intelligence with custom vector retrieval.',
    },
    {
      id: 'tenant-meridian',
      name: 'Meridian Group',
      subdomain: 'meridian.velora.internal',
      tier: 'Enterprise Tier',
      dbPartition: 'meridian_high_throughput_03',
      kmsKey: 'kms-arn:aws:kms:us-west-2:meridian-ops',
      activeModules: ['CRM Core', 'Automation Engine', 'Analytics Hub', 'Developer API', 'Integrations Hub'],
      users: 68,
      monthlyVol: '820k requests/mo',
      color: '#B89A68',
      description: 'Global logistics conglomerate with high-throughput webhook sync and API token management.',
    },
  ];

  const current = previewTenants[selectedTenantIndex];

  return (
    <div className="w-full">
      {/* Central Hub & Connection Visualizer */}
      <div className="bg-[#202B27] text-[#F4F5F1] rounded-2xl p-6 sm:p-8 border border-[#304F40] shadow-xl relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#E7EEE8 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#557C68]/30 border border-[#557C68]/50 text-[#E7EEE8] text-[11px] font-semibold mb-3">
            <Server className="w-3.5 h-3.5 text-[#B89A68]" />
            <span>CENTRAL MULTI-TENANT ORCHESTRATION</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
            Shared Infrastructure. Strict Logical Isolation.
          </h3>
          <p className="text-xs text-[#E7EEE8]/70 mt-2 leading-relaxed">
            Every organization receives dedicated cryptographic partitioning, individual module configurations, isolated user rosters, and tenant-scoped AI models.
          </p>
        </div>

        {/* 3 Tenant Node Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {previewTenants.map((t, idx) => {
            const isSelected = selectedTenantIndex === idx;
            return (
              <div
                key={t.id}
                onMouseEnter={() => setSelectedTenantIndex(idx)}
                onClick={() => setSelectedTenantIndex(idx)}
                className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border text-left relative ${
                  isSelected
                    ? 'bg-[#304F40]/90 border-[#557C68] shadow-md ring-1 ring-[#557C68]'
                    : 'bg-[#202B27]/90 border-[#304F40]/80 hover:border-[#557C68]/60 hover:bg-[#304F40]/40'
                }`}
              >
                {/* Active connection line marker */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-xs"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.name[0]}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#E7EEE8]/80">
                    {t.tier}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1 font-display">{t.name}</h4>
                <p className="text-[11px] text-[#E7EEE8]/70 leading-snug line-clamp-2 mb-3">
                  {t.description}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#E7EEE8]/60 font-mono">
                  <span>{t.users} team members</span>
                  <span className="text-[#B89A68]">{t.activeModules.length} modules</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tenant Isolated Specification Panel */}
        <div className="mt-6 pt-6 border-t border-[#304F40] bg-black/25 rounded-xl p-5 relative z-10 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                style={{ backgroundColor: current.color }}
              >
                {current.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white font-display">{current.name}</h4>
                  <span className="text-[10px] bg-[#557C68]/30 text-[#E7EEE8] px-2 py-0.5 rounded font-mono border border-[#557C68]/40">
                    ISOLATED INSTANCE
                  </span>
                </div>
                <div className="text-xs text-[#E7EEE8]/70 font-mono mt-0.5">{current.subdomain}</div>
              </div>
            </div>

            <button
              onClick={() => {
                setTenantId(current.id as any);
                navigate('/app');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#557C68] hover:bg-[#648B70] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Explore This Workspace</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-[10px] text-[#E7EEE8]/60 uppercase font-mono mb-1 flex items-center gap-1">
                <Database className="w-3 h-3 text-[#B89A68]" /> Database Partition
              </div>
              <div className="font-mono text-[#F4F5F1] text-[11px] truncate">{current.dbPartition}</div>
              <div className="text-[9px] text-[#648B70] mt-1">Tenant isolated schema</div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-[10px] text-[#E7EEE8]/60 uppercase font-mono mb-1 flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#B89A68]" /> Encryption Vault
              </div>
              <div className="font-mono text-[#F4F5F1] text-[11px] truncate">{current.kmsKey}</div>
              <div className="text-[9px] text-[#648B70] mt-1">AES-256 dedicated KMS</div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-[10px] text-[#E7EEE8]/60 uppercase font-mono mb-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-[#B89A68]" /> RBAC Directory
              </div>
              <div className="font-medium text-[#F4F5F1]">{current.users} Active Users</div>
              <div className="text-[9px] text-[#E7EEE8]/60 mt-1">5 Role hierarchies</div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-[10px] text-[#E7EEE8]/60 uppercase font-mono mb-1 flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#B89A68]" /> Enabled Modules
              </div>
              <div className="font-medium text-[#F4F5F1]">{current.activeModules.length} Active Modules</div>
              <div className="text-[9px] text-[#648B70] mt-1">Instant hot-reloading</div>
            </div>
          </div>

          {/* Active modules pills */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-[#E7EEE8]/50 uppercase font-mono mr-1">Modules:</span>
            {current.activeModules.map((m) => (
              <span
                key={m}
                className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-medium border border-white/10 flex items-center gap-1"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-[#648B70]" />
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
