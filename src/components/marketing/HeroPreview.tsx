import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  GitBranch,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Activity,
  Cpu,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai' | 'automation'>('overview');
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Subtle outer frame */}
      <div className="relative rounded-2xl border border-[#E6EAE6] bg-white shadow-xl overflow-hidden transition-all duration-300">
        {/* Top window bar */}
        <div className="h-10 bg-[#F0F2EF] border-b border-[#E6EAE6] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E6EAE6]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E6EAE6]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E6EAE6]" />
            <span className="text-[10px] text-[#78817B] font-mono ml-2">app.velora.internal/acme</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#E7EEE8] text-[#304F40]">
              Acme Technologies
            </span>
          </div>
        </div>

        {/* Mini Workspace Content */}
        <div className="flex h-[360px] sm:h-[390px]">
          {/* Mini Sidebar */}
          <div className="w-40 sm:w-44 bg-[#F0F2EF] border-r border-[#E6EAE6] p-3 flex flex-col justify-between shrink-0">
            <div>
              {/* Tenant Badge */}
              <div className="flex items-center gap-2 px-2 py-2 mb-3 bg-white rounded-lg border border-[#E6EAE6]">
                <div className="w-6 h-6 rounded-md bg-[#557C68] text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-[#222B28] truncate">Acme Tech</div>
                  <div className="text-[9px] text-[#648B70] flex items-center gap-1 font-mono">
                    <span className="h-1 w-1 rounded-full bg-[#648B70]" /> Growth Tier
                  </div>
                </div>
              </div>

              {/* Navigation items */}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-white text-[#222B28] shadow-xs'
                      : 'text-[#78817B] hover:text-[#222B28]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#557C68]" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    activeTab === 'ai'
                      ? 'bg-white text-[#222B28] shadow-xs'
                      : 'text-[#78817B] hover:text-[#222B28]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B89A68]" />
                  <span>AI Copilot</span>
                </button>

                <button
                  onClick={() => setActiveTab('automation')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    activeTab === 'automation'
                      ? 'bg-white text-[#222B28] shadow-xs'
                      : 'text-[#78817B] hover:text-[#222B28]'
                  }`}
                >
                  <GitBranch className="w-3.5 h-3.5 text-[#557C68]" />
                  <span>Workflows</span>
                </button>
              </div>

              {/* Modules list snippet */}
              <div className="mt-4 pt-3 border-t border-[#E6EAE6]">
                <span className="text-[9px] uppercase font-bold tracking-wider text-[#78817B] px-1">
                  Active Modules (6)
                </span>
                <div className="mt-2 space-y-1 text-[10px] text-[#78817B]">
                  <div className="flex items-center justify-between px-1.5 py-0.5">
                    <span>CRM Lead Core</span>
                    <span className="text-[#648B70]">✓</span>
                  </div>
                  <div className="flex items-center justify-between px-1.5 py-0.5">
                    <span>Automation Engine</span>
                    <span className="text-[#648B70]">✓</span>
                  </div>
                  <div className="flex items-center justify-between px-1.5 py-0.5">
                    <span>Document Vault</span>
                    <span className="text-[#648B70]">✓</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/app')}
              className="w-full py-1.5 px-2 bg-[#304F40] hover:bg-[#557C68] text-white rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <span>Open App</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Mini Workspace Main Panel */}
          <div className="flex-1 bg-[#F7F8F6] p-4 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#222B28]">Operations Dashboard</h4>
                    <p className="text-[10px] text-[#78817B]">Real-time tenant telemetry</p>
                  </div>
                  <span className="text-[10px] bg-white border border-[#E6EAE6] px-2 py-0.5 rounded-full text-[#557C68] font-mono">
                    Live Sync
                  </span>
                </div>

                {/* 3 mini metric cards */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 bg-white rounded-xl border border-[#E6EAE6]">
                    <div className="text-[9px] text-[#78817B]">Active Members</div>
                    <div className="text-sm font-bold text-[#222B28] mt-0.5 font-display">24</div>
                    <div className="text-[8px] text-[#648B70] flex items-center gap-0.5 mt-0.5">
                      <TrendingUp className="w-2.5 h-2.5" /> +3 this week
                    </div>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-[#E6EAE6]">
                    <div className="text-[9px] text-[#78817B]">Active Modules</div>
                    <div className="text-sm font-bold text-[#222B28] mt-0.5 font-display">6 / 8</div>
                    <div className="text-[8px] text-[#557C68] mt-0.5">Growth tier</div>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-[#E6EAE6]">
                    <div className="text-[9px] text-[#78817B]">Executions</div>
                    <div className="text-sm font-bold text-[#222B28] mt-0.5 font-display">1.2k</div>
                    <div className="text-[8px] text-[#648B70] mt-0.5">99.4% success</div>
                  </div>
                </div>

                {/* Simulated lightweight chart */}
                <div className="p-3 bg-white rounded-xl border border-[#E6EAE6]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold text-[#222B28]">Weekly Pipeline Velocity</span>
                    <span className="text-[9px] text-[#78817B]">Last 7 days</span>
                  </div>
                  <div className="h-16 flex items-end gap-2 pt-2 px-1">
                    {[45, 60, 52, 78, 65, 88, 94].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-sm transition-all duration-300"
                          style={{
                            height: `${(val / 100) * 48}px`,
                            backgroundColor: idx === 6 ? '#557C68' : '#E7EEE8',
                          }}
                        />
                        <span className="text-[7px] text-[#78817B]">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity feed snippet */}
                <div className="p-2.5 bg-white rounded-xl border border-[#E6EAE6] text-[10px] space-y-1.5">
                  <div className="flex items-center justify-between text-[#78817B]">
                    <span className="font-semibold text-[#222B28]">Recent Event</span>
                    <span>4m ago</span>
                  </div>
                  <p className="text-[#222B28] leading-tight truncate">
                    Lead qualification workflow routed 12 qualified accounts to Slack.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B89A68]" />
                    <span className="text-xs font-bold text-[#222B28]">Executive Copilot</span>
                  </div>
                  <span className="text-[9px] bg-[#E7EEE8] text-[#304F40] px-2 py-0.5 rounded font-mono">
                    GPT-4o Enterprise
                  </span>
                </div>

                {/* Chat bubble simulation */}
                <div className="space-y-2 text-[10px]">
                  <div className="p-2 rounded-lg bg-white border border-[#E6EAE6] text-[#222B28]">
                    <span className="font-semibold text-[#557C68]">Alex Mercer:</span> "Summarize our latest business activity across teams."
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#304F40] text-[#F4F5F1] space-y-1 shadow-xs">
                    <div className="flex items-center gap-1 font-semibold text-[#B89A68] text-[9px]">
                      <Sparkles className="w-2.5 h-2.5" /> VELORA AI Copilot
                    </div>
                    <p className="leading-relaxed">
                      "Inbound volume increased 18% this week. CRM module captured 42 new enterprise leads with a 99.4% qualification rate. Automated Slack dispatch is operating with 0 latency errors."
                    </p>
                  </div>
                </div>

                <div className="p-2 bg-white rounded-lg border border-[#E6EAE6] flex items-center justify-between text-[10px] text-[#78817B]">
                  <span>Ask a question...</span>
                  <span className="px-2 py-0.5 rounded bg-[#F0F2EF] text-[8px] font-mono">Return ↵</span>
                </div>
              </div>
            )}

            {activeTab === 'automation' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#222B28]">Visual Workflow Flow</span>
                  <span className="text-[9px] text-[#648B70] flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#648B70] animate-ping" /> Active
                  </span>
                </div>

                <div className="space-y-1.5">
                  {[
                    { step: '1', title: 'Inbound Webhook', type: 'Trigger', color: 'bg-[#557C68]' },
                    { step: '2', title: 'AI ICP Score Analysis', type: 'AI Node', color: 'bg-[#B89A68]' },
                    { step: '3', title: 'Score > 85 Logic Check', type: 'Condition', color: 'bg-[#648B70]' },
                    { step: '4', title: 'Dispatch Slack Alert', type: 'Action', color: 'bg-[#304F40]' },
                  ].map((node) => (
                    <div
                      key={node.step}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E6EAE6] text-[10px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded text-white flex items-center justify-center text-[8px] font-bold ${node.color}`}>
                          {node.step}
                        </span>
                        <span className="font-medium text-[#222B28]">{node.title}</span>
                      </div>
                      <span className="text-[8px] font-mono text-[#78817B] uppercase">{node.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative subtle badge below preview */}
      <div className="mt-3 flex items-center justify-between px-2 text-[11px] text-[#78817B]">
        <span className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-[#557C68]" /> 60 FPS Client-Side Engine
        </span>
        <span className="font-mono text-[10px]">Zero Latency Local State</span>
      </div>
    </div>
  );
};
