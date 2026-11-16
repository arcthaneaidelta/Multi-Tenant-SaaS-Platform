import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Tenant, TenantId, PlanType } from '../../types';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Pause,
  Play,
  Trash2,
  ExternalLink,
  X,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const AdminTenantsPage: React.FC = () => {
  const { tenants, createTenant, suspendTenant, activateTenant, deleteTenant, enterImpersonation } = useDemo();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTenantData, setNewTenantData] = useState({
    name: '',
    slug: '',
    adminEmail: '',
    adminName: '',
    plan: 'Growth' as PlanType,
  });

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase()) ||
      t.domain.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = planFilter === 'All' || t.plan === planFilter;
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantData.name.trim()) return;

    createTenant({
      name: newTenantData.name,
      slug: newTenantData.slug || newTenantData.name.toLowerCase().replace(/\s+/g, '-'),
      domain: `${(newTenantData.slug || newTenantData.name).toLowerCase().replace(/\s+/g, '-')}.com`,
      adminEmail: newTenantData.adminEmail || `admin@${newTenantData.slug || 'company'}.com`,
      adminName: newTenantData.adminName || 'Admin User',
      plan: newTenantData.plan,
    });

    setNewTenantData({ name: '', slug: '', adminEmail: '', adminName: '', plan: 'Growth' });
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Tenant Fleet Directory
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Manage logical partitioning, tenant licenses, and workspace provisioning across the platform.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Provision New Tenant</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#78817B] absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search organizations, slugs, domains..."
            className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
          >
            <option value="All">All Plans</option>
            <option value="Starter">Starter</option>
            <option value="Growth">Growth</option>
            <option value="Enterprise">Enterprise</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8F6] text-[10px] uppercase font-mono font-bold text-[#78817B] border-b border-[#E6EAE6]">
              <tr>
                <th className="px-5 py-3.5">Organization</th>
                <th className="px-5 py-3.5">Tenant ID</th>
                <th className="px-5 py-3.5">Plan Tier</th>
                <th className="px-5 py-3.5">Members</th>
                <th className="px-5 py-3.5">Modules</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EAE6]/70 text-[#222B28]">
              {filteredTenants.map((t) => (
                <tr key={t.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                  {/* Organization */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0"
                        style={{ backgroundColor: t.color }}
                      >
                        {t.logoInitial}
                      </div>
                      <div>
                        <div
                          onClick={() => navigate(`/admin/tenants/${t.id}`)}
                          className="font-bold text-[#222B28] hover:text-[#557C68] cursor-pointer"
                        >
                          {t.name}
                        </div>
                        <div className="text-[10px] text-[#78817B] font-mono">{t.domain}</div>
                      </div>
                    </div>
                  </td>

                  {/* Tenant ID */}
                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#78817B]">
                    {t.id}
                  </td>

                  {/* Plan Tier */}
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-[#222B28]">{t.plan}</span>
                    <span className="text-[10px] text-[#78817B] block font-mono">${t.monthlyCost}/mo</span>
                  </td>

                  {/* Members */}
                  <td className="px-5 py-3.5">
                    <span className="font-medium">{t.memberCount}</span>
                    <span className="text-[10px] text-[#78817B] block font-mono">/ {t.maxMembers} max</span>
                  </td>

                  {/* Active Modules */}
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-[#557C68] font-mono">
                      {t.activeModules.length} enabled
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${
                        t.status === 'Active'
                          ? 'bg-[#E7EEE8] text-[#648B70]'
                          : 'bg-[#FFFDF9] text-[#C49A58] border border-[#C49A58]/30'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'Active' ? 'bg-[#648B70]' : 'bg-[#C49A58]'}`} />
                      {t.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => enterImpersonation(t.id)}
                        className="px-2.5 py-1 rounded-lg bg-[#E7EEE8] hover:bg-[#d8e4da] text-[#304F40] text-[11px] font-semibold transition-colors flex items-center gap-1"
                        title="Simulate Viewing as Tenant Workspace"
                      >
                        <span>Impersonate</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => navigate(`/admin/tenants/${t.id}`)}
                        className="px-2.5 py-1 rounded-lg border border-[#E6EAE6] hover:bg-[#F7F8F6] text-[11px] text-[#222B28] transition-colors"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => suspendTenant(t.id)}
                        className="p-1 rounded text-[#78817B] hover:text-[#C49A58]"
                        title={t.status === 'Active' ? 'Suspend Tenant' : 'Activate Tenant'}
                      >
                        {t.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => deleteTenant(t.id)}
                        className="p-1 rounded text-[#78817B] hover:text-[#B87570]"
                        title="Delete Tenant"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision Tenant Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-md w-full p-6 text-left relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-[#78817B] hover:text-[#222B28] p-1.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#222B28] font-display mb-1">
              Provision New Tenant Workspace
            </h3>
            <p className="text-xs text-[#78817B] mb-5">
              Initializes dedicated partition, cryptographic keys, and default admin user.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                  Organization Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={newTenantData.name}
                  onChange={(e) => setNewTenantData({ ...newTenantData, name: e.target.value })}
                  placeholder="e.g. Horizon Media Group"
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                  Slug / Subdomain
                </label>
                <input
                  type="text"
                  value={newTenantData.slug}
                  onChange={(e) => setNewTenantData({ ...newTenantData, slug: e.target.value })}
                  placeholder="horizon"
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] font-mono focus:outline-none focus:border-[#557C68]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                    Primary Admin Name
                  </label>
                  <input
                    type="text"
                    value={newTenantData.adminName}
                    onChange={(e) => setNewTenantData({ ...newTenantData, adminName: e.target.value })}
                    placeholder="Jordan Vance"
                    className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                    Subscription Tier
                  </label>
                  <select
                    value={newTenantData.plan}
                    onChange={(e) => setNewTenantData({ ...newTenantData, plan: e.target.value as PlanType })}
                    className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
                  >
                    <option value="Starter">Starter ($49/mo)</option>
                    <option value="Growth">Growth ($149/mo)</option>
                    <option value="Enterprise">Enterprise ($490/mo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                  Admin Work Email
                </label>
                <input
                  type="email"
                  value={newTenantData.adminEmail}
                  onChange={(e) => setNewTenantData({ ...newTenantData, adminEmail: e.target.value })}
                  placeholder="admin@horizon.com"
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] font-mono focus:outline-none focus:border-[#557C68]"
                />
              </div>

              <div className="pt-3 border-t border-[#E6EAE6] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-2 text-xs font-medium text-[#78817B] hover:text-[#222B28]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#304F40] hover:bg-[#557C68] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Provision Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
