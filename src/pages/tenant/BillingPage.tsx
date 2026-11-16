import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { PlanType } from '../../types';
import {
  CreditCard,
  CheckCircle2,
  Download,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  X,
  FileText,
  Clock,
} from 'lucide-react';

export const BillingPage: React.FC = () => {
  const { currentTenant, invoices, changePlan, showToast } = useDemo();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<'monthly' | 'yearly'>(currentTenant.billingCycle);

  const tenantInvoices = invoices.filter((i) => i.tenantId === currentTenant.id);

  const plans = [
    {
      tier: 'Starter' as PlanType,
      monthly: 49,
      yearly: 39,
      features: ['Up to 10 team seats', '3 Active modules', '500k AI tokens/mo', 'Community support'],
    },
    {
      tier: 'Growth' as PlanType,
      monthly: 149,
      yearly: 119,
      features: ['Up to 50 team seats', '6 Active modules', '2.5M AI tokens/mo', 'Workflow automation engine', 'Priority support'],
    },
    {
      tier: 'Enterprise' as PlanType,
      monthly: 490,
      yearly: 390,
      features: ['Unlimited team seats', 'All 8 modules unlocked', '10M AI tokens/mo', 'Dedicated KMS keys', 'Dedicated architect'],
    },
  ];

  const handleDownloadInvoice = (invNum: string) => {
    showToast('Receipt Downloaded', `Simulated PDF generated for ${invNum}.`, 'info');
  };

  const handleApplyPlan = (tier: PlanType) => {
    changePlan(tier, selectedCycle);
    setShowUpgradeModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Billing & Subscription
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Manage operational subscription plan, payment methods, and invoice history for {currentTenant.name}.
          </p>
        </div>

        <button
          onClick={() => setShowUpgradeModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B89A68]" />
          <span>Change Subscription Plan</span>
        </button>
      </div>

      {/* Plan & Usage Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Current Plan Overview (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6EAE6]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#557C68] bg-[#E7EEE8] px-2.5 py-0.5 rounded-full">
                  CURRENT TIER
                </span>
                <span className="text-xs font-mono text-[#78817B]">
                  Billed {currentTenant.billingCycle}
                </span>
              </div>
              <h2 className="text-2xl font-bold font-display text-[#222B28] mt-1">
                VELORA {currentTenant.plan} Plan
              </h2>
            </div>

            <div className="text-right">
              <div className="text-2xl font-extrabold text-[#222B28] font-display">
                ${currentTenant.monthlyCost}
                <span className="text-xs text-[#78817B] font-normal"> / mo</span>
              </div>
              <span className="text-[10px] text-[#648B70] font-mono">
                Renews on {currentTenant.nextBillingDate}
              </span>
            </div>
          </div>

          {/* Usage Meter Progress Bars */}
          <div className="space-y-4 text-xs">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#78817B] font-mono">
              Tier Utilization Meters
            </h3>

            <div>
              <div className="flex justify-between text-[#78817B] mb-1">
                <span>Team Seats Allocated</span>
                <span className="font-mono text-[#222B28]">
                  {currentTenant.memberCount} of {currentTenant.maxMembers} seats
                </span>
              </div>
              <div className="w-full h-2 bg-[#F0F2EF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#557C68] rounded-full"
                  style={{ width: `${(currentTenant.memberCount / currentTenant.maxMembers) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#78817B] mb-1">
                <span>Active Modules Provisioned</span>
                <span className="font-mono text-[#222B28]">
                  {currentTenant.activeModules.length} of 8 modules
                </span>
              </div>
              <div className="w-full h-2 bg-[#F0F2EF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#557C68] rounded-full"
                  style={{ width: `${(currentTenant.activeModules.length / 8) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#78817B] mb-1">
                <span>AI Reasoning Tokens</span>
                <span className="font-mono text-[#222B28]">
                  {currentTenant.aiTokensUsed.toLocaleString()} of {currentTenant.maxAiTokens.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-2 bg-[#F0F2EF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B89A68] rounded-full"
                  style={{ width: `${(currentTenant.aiTokensUsed / currentTenant.maxAiTokens) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Card (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E6EAE6]">
            <h3 className="text-sm font-bold text-[#222B28] font-display">
              Payment Method
            </h3>
            <p className="text-xs text-[#78817B]">Primary settlement instrument</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-5 rounded bg-[#304F40] text-white flex items-center justify-center font-bold text-[9px] font-mono">
                  VISA
                </div>
                <span className="text-xs font-mono font-bold text-[#222B28]">•••• 4242</span>
              </div>
              <span className="text-[10px] bg-[#E7EEE8] text-[#304F40] font-mono px-2 py-0.2 rounded">
                Default
              </span>
            </div>
            <div className="text-[11px] text-[#78817B] flex justify-between font-mono">
              <span>Expires 12/28</span>
              <span>Stripe Connect</span>
            </div>
          </div>

          <div className="text-[11px] text-[#78817B] leading-relaxed">
            All credit card transactions are simulated locally for this product demonstration. No real financial charges occur.
          </div>
        </div>
      </div>

      {/* Invoice History Table */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs">
        <div className="pb-4 border-b border-[#E6EAE6] mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#222B28] font-display">
              Billing Statements & Invoices
            </h3>
            <p className="text-xs text-[#78817B]">Historical statements for tax and accounting</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8F6] text-[10px] uppercase font-mono font-bold text-[#78817B] border-b border-[#E6EAE6]">
              <tr>
                <th className="px-4 py-3">Invoice ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EAE6]/70 text-[#222B28]">
              {tenantInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium">{inv.invoiceNumber}</td>
                  <td className="px-4 py-3 text-[#78817B]">{inv.date}</td>
                  <td className="px-4 py-3 font-medium">{inv.plan}</td>
                  <td className="px-4 py-3 font-mono font-bold">${inv.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#E7EEE8] text-[#648B70]">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(inv.invoiceNumber)}
                      className="p-1 text-[#78817B] hover:text-[#557C68] transition-colors"
                      title="Download PDF Receipt"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Upgrade / Downgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-2xl w-full p-6 text-left relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-[#78817B] hover:text-[#222B28] p-1.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-[#222B28] font-display mb-1">
              Select Workspace Plan
            </h3>
            <p className="text-xs text-[#78817B] mb-5">
              Change subscription tier for {currentTenant.name}. Changes apply immediately to local demo state.
            </p>

            {/* Cycle toggle */}
            <div className="flex items-center gap-2 mb-6 bg-[#F7F8F6] p-1 rounded-xl border border-[#E6EAE6] max-w-xs">
              <button
                type="button"
                onClick={() => setSelectedCycle('monthly')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCycle === 'monthly' ? 'bg-white shadow-xs text-[#222B28]' : 'text-[#78817B]'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setSelectedCycle('yearly')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCycle === 'yearly' ? 'bg-white shadow-xs text-[#222B28]' : 'text-[#78817B]'
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>

            {/* 3 Plans Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {plans.map((p) => {
                const isCurrent = currentTenant.plan === p.tier;
                const cost = selectedCycle === 'yearly' ? p.yearly : p.monthly;

                return (
                  <div
                    key={p.tier}
                    className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                      isCurrent
                        ? 'border-[#557C68] bg-[#E7EEE8]/40 ring-1 ring-[#557C68]'
                        : 'border-[#E6EAE6] bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-[#222B28] font-display">{p.tier}</h4>
                        {isCurrent && (
                          <span className="text-[9px] font-mono bg-[#557C68] text-white px-1.5 py-0.2 rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-bold text-[#222B28] font-display mb-3">
                        ${cost} <span className="text-[10px] text-[#78817B] font-normal">/ mo</span>
                      </div>

                      <div className="space-y-1.5 text-[11px] text-[#78817B] mb-4">
                        {p.features.map((f, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[#222B28]">
                            <CheckCircle2 className="w-3 h-3 text-[#648B70] shrink-0" />
                            <span className="leading-tight">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyPlan(p.tier)}
                      disabled={isCurrent}
                      className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isCurrent
                          ? 'bg-[#E6EAE6] text-[#78817B] cursor-not-allowed'
                          : 'bg-[#304F40] hover:bg-[#557C68] text-white shadow-xs cursor-pointer'
                      }`}
                    >
                      {isCurrent ? 'Current Plan' : `Switch to ${p.tier}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
