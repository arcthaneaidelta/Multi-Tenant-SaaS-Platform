import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { PlanType } from '../../types';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  Percent,
} from 'lucide-react';

export const AdminSubscriptionsPage: React.FC = () => {
  const { tenants, invoices, showToast } = useDemo();
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('All');

  const plansCount = {
    Starter: tenants.filter((t) => t.plan === 'Starter').length,
    Growth: tenants.filter((t) => t.plan === 'Growth').length,
    Enterprise: tenants.filter((t) => t.plan === 'Enterprise').length,
  };

  const handleApplyDiscount = (tenantName: string) => {
    showToast('Promo Discount Applied', `Applied 15% partner demonstration discount to ${tenantName}.`, 'success');
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Subscription & Revenue Fleet
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Fleet-wide ARR metrics, billing tier distribution, and enterprise contract records.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#E7EEE8] text-[#304F40] font-semibold">
          Platform MRR: $24,600 / mo
        </span>
      </div>

      {/* Plan Distribution Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E6EAE6] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono">Starter Tier ($49/mo)</div>
          <div className="text-2xl font-bold font-display text-[#222B28] mt-1">{plansCount.Starter} Workspaces</div>
          <div className="text-xs text-[#78817B] mt-0.5 font-mono">${plansCount.Starter * 49}/mo MRR</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#557C68]/40 shadow-xs ring-1 ring-[#557C68]/20">
          <div className="text-[10px] uppercase font-bold text-[#557C68] font-mono">Growth Tier ($149/mo)</div>
          <div className="text-2xl font-bold font-display text-[#222B28] mt-1">{plansCount.Growth} Workspaces</div>
          <div className="text-xs text-[#557C68] mt-0.5 font-mono">${plansCount.Growth * 149}/mo MRR</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E6EAE6] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#78817B] font-mono">Enterprise Tier ($490/mo)</div>
          <div className="text-2xl font-bold font-display text-[#222B28] mt-1">{plansCount.Enterprise} Workspaces</div>
          <div className="text-xs text-[#78817B] mt-0.5 font-mono">${plansCount.Enterprise * 490}/mo MRR</div>
        </div>
      </div>

      {/* Tenant Subscriptions List */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xs overflow-hidden">
        <div className="p-4 bg-[#F7F8F6] border-b border-[#E6EAE6] flex items-center justify-between">
          <span className="text-xs font-bold text-[#222B28] font-display">
            Tenant Subscription Registers ({tenants.length})
          </span>
          <span className="text-[10px] font-mono text-[#78817B]">Stripe Subscriptions Gateway</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] uppercase font-mono font-bold text-[#78817B] border-b border-[#E6EAE6]">
              <tr>
                <th className="px-5 py-3">Tenant Organization</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Billing Cycle</th>
                <th className="px-5 py-3">Monthly Value</th>
                <th className="px-5 py-3">Renewal Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EAE6]/70 text-[#222B28]">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-[#222B28]">
                    {t.name}
                    <span className="text-[10px] text-[#78817B] block font-mono font-normal">{t.domain}</span>
                  </td>
                  <td className="px-5 py-3.5 font-medium">{t.plan}</td>
                  <td className="px-5 py-3.5 capitalize font-mono text-[11px] text-[#78817B]">{t.billingCycle}</td>
                  <td className="px-5 py-3.5 font-bold font-mono text-[#222B28]">${t.monthlyCost}</td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#78817B]">{t.nextBillingDate}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => handleApplyDiscount(t.name)}
                      className="px-2.5 py-1 rounded-lg border border-[#E6EAE6] hover:bg-[#F7F8F6] text-[11px] text-[#557C68] font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      <Percent className="w-3 h-3" />
                      <span>Apply Promo</span>
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
