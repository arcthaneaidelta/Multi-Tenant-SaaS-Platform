import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Integration } from '../../types';
import { IntegrationModal } from '../../components/marketing/IntegrationModal';
import {
  Network,
  Link2,
  Unlink,
  Settings,
  Search,
  Filter,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const { integrations, currentTenant, toggleIntegrationConnection } = useDemo();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [activeModalIntegration, setActiveModalIntegration] = useState<Integration | null>(null);

  const categories = ['All', 'AI', 'CRM', 'Communication', 'Payments', 'Automation', 'Productivity'];

  const filteredIntegrations = integrations.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Enterprise Integrations Hub
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Connect external LLMs, CRMs, payment gateways, and event brokers for {currentTenant.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#E7EEE8] text-[#304F40] font-semibold border border-[#557C68]/20">
            {connectedCount} of {integrations.length} Gateways Connected
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#78817B] absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gateways, OpenAI, Stripe, Slack, Salesforce..."
            className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#304F40] text-white shadow-xs'
                  : 'bg-[#F7F8F6] text-[#78817B] hover:text-[#222B28]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((int) => (
          <div
            key={int.id}
            className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
              int.connected ? 'border-[#557C68]/50 ring-1 ring-[#557C68]/20' : 'border-[#E6EAE6]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0F2EF] text-[#557C68] font-bold text-sm flex items-center justify-center">
                  {int.name[0]}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0F2EF] text-[#78817B]">
                    {int.environment}
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                      int.connected
                        ? 'bg-[#E7EEE8] text-[#304F40]'
                        : 'bg-[#F0F2EF] text-[#78817B]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${int.connected ? 'bg-[#648B70]' : 'bg-[#78817B]'}`} />
                    {int.connected ? 'Connected' : 'Offline'}
                  </span>
                </div>
              </div>

              <div className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] font-mono">
                {int.category} Gateway
              </div>
              <h3 className="text-sm font-bold text-[#222B28] font-display mt-0.5 mb-2">
                {int.name}
              </h3>
              <p className="text-xs text-[#78817B] leading-relaxed mb-4">
                {int.description}
              </p>

              {int.connected && (
                <div className="p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6] mb-4 space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between text-[#78817B]">
                    <span>Events Synced:</span>
                    <span className="text-[#222B28]">{int.eventCount?.toLocaleString() || '1,420'}</span>
                  </div>
                  <div className="flex justify-between text-[#78817B]">
                    <span>Last Heartbeat:</span>
                    <span className="text-[#648B70]">{int.lastSynced}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E6EAE6] flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveModalIntegration(int)}
                className="px-3 py-1.5 rounded-xl border border-[#E6EAE6] hover:bg-[#F7F8F6] text-xs font-semibold text-[#222B28] transition-colors"
              >
                Configure
              </button>

              <button
                onClick={() => toggleIntegrationConnection(int.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  int.connected
                    ? 'border border-[#B87570]/30 text-[#B87570] hover:bg-[#B87570]/10'
                    : 'bg-[#304F40] hover:bg-[#557C68] text-white shadow-xs'
                }`}
              >
                {int.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Configure Modal */}
      <IntegrationModal
        integration={activeModalIntegration}
        onClose={() => setActiveModalIntegration(null)}
      />
    </div>
  );
};
