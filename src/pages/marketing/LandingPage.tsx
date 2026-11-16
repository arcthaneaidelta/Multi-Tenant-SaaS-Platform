import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { HeroCanvas } from '../../components/marketing/HeroCanvas';
import { HeroPreview } from '../../components/marketing/HeroPreview';
import { ArchitectureViz } from '../../components/marketing/ArchitectureViz';
import { InteractiveWorkflow } from '../../components/marketing/InteractiveWorkflow';
import { InteractiveAIPreview } from '../../components/marketing/InteractiveAIPreview';
import { ModuleDetailModal } from '../../components/marketing/ModuleDetailModal';
import { IntegrationModal } from '../../components/marketing/IntegrationModal';
import { useDemo } from '../../context/DemoContext';
import { AppModule, Integration, PlanType } from '../../types';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Shield,
  Sparkles,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  Lock,
  Database,
  BarChart3,
  Users,
  Terminal,
  Cpu,
  Zap,
  Globe,
  Settings,
  Building2,
  Check,
  ChevronRight,
  TrendingUp,
  Sliders,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { modules, integrations, changePlan, setTenantId, setIsSuperAdmin } = useDemo();
  const navigate = useNavigate();

  const [selectedModule, setSelectedModule] = useState<AppModule | null>(null);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedRolePreview, setSelectedRolePreview] = useState<'Owner' | 'Administrator' | 'Manager' | 'Member' | 'Viewer'>('Administrator');

  const pricingTiers = [
    {
      name: 'Starter',
      priceMonthly: 49,
      priceYearly: 39,
      description: 'Essential multi-tenant foundation for emerging teams.',
      features: [
        'Up to 10 team seats',
        '3 Active modules enabled',
        'Basic AI copilot (500k tokens/mo)',
        'Standard REST API access',
        'Community & email support',
      ],
      plan: 'Starter' as PlanType,
      isPopular: false,
    },
    {
      name: 'Growth',
      priceMonthly: 149,
      priceYearly: 119,
      description: 'Comprehensive modular power for scaling organizations.',
      features: [
        'Up to 50 team seats',
        '6 Active modules enabled',
        'Advanced AI copilot (2.5M tokens/mo)',
        'Visual workflow automation builder',
        'Priority SLA & webhook integrations',
        'Custom role matrix permissions',
      ],
      plan: 'Growth' as PlanType,
      isPopular: true,
    },
    {
      name: 'Enterprise',
      priceMonthly: 490,
      priceYearly: 390,
      description: 'Dedicated tenancy, high throughput, and bespoke compliance.',
      features: [
        'Unlimited team seats & sub-tenants',
        'All 8 feature modules unlocked',
        'Unlimited AI reasoning & local models',
        'Dedicated cryptographic KMS keys',
        'Custom SSO (SAML/Okta) & SCIM',
        '24/7 dedicated solutions architect',
      ],
      plan: 'Enterprise' as PlanType,
      isPopular: false,
    },
  ];

  const rolePermissionsMatrix = {
    Owner: [
      { name: 'Workspace Billing & Subscription', allowed: true },
      { name: 'Tenant Cryptographic KMS Rotation', allowed: true },
      { name: 'Module Activation & Deactivation', allowed: true },
      { name: 'Visual Workflow Authoring', allowed: true },
      { name: 'AI Workspace Prompt Execution', allowed: true },
      { name: 'Team Member Role Alterations', allowed: true },
      { name: 'View Audit Logs & Raw Telemetry', allowed: true },
    ],
    Administrator: [
      { name: 'Workspace Billing & Subscription', allowed: false },
      { name: 'Tenant Cryptographic KMS Rotation', allowed: false },
      { name: 'Module Activation & Deactivation', allowed: true },
      { name: 'Visual Workflow Authoring', allowed: true },
      { name: 'AI Workspace Prompt Execution', allowed: true },
      { name: 'Team Member Role Alterations', allowed: true },
      { name: 'View Audit Logs & Raw Telemetry', allowed: true },
    ],
    Manager: [
      { name: 'Workspace Billing & Subscription', allowed: false },
      { name: 'Tenant Cryptographic KMS Rotation', allowed: false },
      { name: 'Module Activation & Deactivation', allowed: false },
      { name: 'Visual Workflow Authoring', allowed: true },
      { name: 'AI Workspace Prompt Execution', allowed: true },
      { name: 'Team Member Role Alterations', allowed: false },
      { name: 'View Audit Logs & Raw Telemetry', allowed: true },
    ],
    Member: [
      { name: 'Workspace Billing & Subscription', allowed: false },
      { name: 'Tenant Cryptographic KMS Rotation', allowed: false },
      { name: 'Module Activation & Deactivation', allowed: false },
      { name: 'Visual Workflow Authoring', allowed: false },
      { name: 'AI Workspace Prompt Execution', allowed: true },
      { name: 'Team Member Role Alterations', allowed: false },
      { name: 'View Audit Logs & Raw Telemetry', allowed: false },
    ],
    Viewer: [
      { name: 'Workspace Billing & Subscription', allowed: false },
      { name: 'Tenant Cryptographic KMS Rotation', allowed: false },
      { name: 'Module Activation & Deactivation', allowed: false },
      { name: 'Visual Workflow Authoring', allowed: false },
      { name: 'AI Workspace Prompt Execution', allowed: false },
      { name: 'Team Member Role Alterations', allowed: false },
      { name: 'View Audit Logs & Raw Telemetry', allowed: false },
    ],
  };

  const handleSelectPlan = (tier: PlanType) => {
    changePlan(tier, billingCycle);
    setTenantId('tenant-acme');
    navigate('/app/billing');
  };

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#222B28]">
      <Navbar />

      {/* 4.3 Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Restrained Architectural Animated Canvas Background */}
        <HeroCanvas />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7EEE8] border border-[#557C68]/20 text-[#304F40] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#557C68]" />
                <span>MODULAR MULTI-TENANT ARCHITECTURE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#222B28] font-display leading-[1.12]">
                Your business deserves a smarter operating system.
              </h1>

              <p className="text-sm sm:text-base text-[#78817B] max-w-xl leading-relaxed">
                Bring your teams, workflows, integrations and AI-powered capabilities together in one modular enterprise platform. Built around your business. Ready for what's next.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setTenantId('tenant-acme');
                    setIsSuperAdmin(false);
                    navigate('/app');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-sm transition-all duration-150 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore the Platform</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('architecture');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F0F2EF] text-[#222B28] border border-[#E6EAE6] text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Architecture</span>
                </button>
              </div>

              <p className="text-[11px] text-[#78817B] font-mono flex items-center gap-2 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#648B70]" />
                <span>Modular by design. Enterprise-ready by nature.</span>
              </p>
            </div>

            {/* Right Interactive Hero Product Preview */}
            <div className="lg:col-span-6">
              <HeroPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 4.4 Trust / Platform Highlights */}
      <section className="border-y border-[#E6EAE6] bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="space-y-1">
              <div className="text-xs uppercase font-bold tracking-wider text-[#557C68] font-mono">
                01. Modular Architecture
              </div>
              <h4 className="text-sm font-bold text-[#222B28]">On-Demand Modules</h4>
              <p className="text-xs text-[#78817B]">Enable or disable CRM, AI, and APIs instantly without redeploying code.</p>
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase font-bold tracking-wider text-[#557C68] font-mono">
                02. Isolated Workspaces
              </div>
              <h4 className="text-sm font-bold text-[#222B28]">Strict Multi-Tenancy</h4>
              <p className="text-xs text-[#78817B]">Cryptographic key separation, dedicated schemas, and zero data leakage.</p>
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase font-bold tracking-wider text-[#557C68] font-mono">
                03. Unified Integrations
              </div>
              <h4 className="text-sm font-bold text-[#222B28]">Pre-Built Connectors</h4>
              <p className="text-xs text-[#78817B]">Stripe, Salesforce, HubSpot, Slack, OpenAI, and webhook bridges ready to run.</p>
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase font-bold tracking-wider text-[#557C68] font-mono">
                04. AI Automation
              </div>
              <h4 className="text-sm font-bold text-[#222B28]">Intelligent Workflows</h4>
              <p className="text-xs text-[#78817B]">Context-aware copilots and multi-step autonomous trigger execution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 Platform Overview Section */}
      <section id="platform" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#557C68] bg-[#E7EEE8] px-3 py-1 rounded-full">
              ENTERPRISE FABRIC
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222B28] font-display tracking-tight">
              Everything works better when everything works together.
            </h2>
            <p className="text-xs sm:text-sm text-[#78817B] leading-relaxed">
              VELORA unifies fragmented corporate applications into a single logical operating system. No data silos. No brittle custom point-to-point glue code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-[#E6EAE6] text-left space-y-4 hover:border-[#557C68]/50 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#E7EEE8] text-[#304F40] flex items-center justify-center">
                <Database className="w-6 h-6 text-[#557C68]" />
              </div>
              <h3 className="text-lg font-bold text-[#222B28] font-display">
                Multi-Tenant Infrastructure
              </h3>
              <p className="text-xs text-[#78817B] leading-relaxed">
                Host thousands of discrete companies or autonomous business units on a single scalable cluster. Each workspace maintains distinct configuration registers, encryption keys, and role policies.
              </p>
              <div className="pt-2 text-xs font-mono text-[#557C68] flex items-center gap-1.5">
                <span>Row-level tenant security & KMS vaulting</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E6EAE6] text-left space-y-4 hover:border-[#557C68]/50 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#E7EEE8] text-[#304F40] flex items-center justify-center">
                <Layers className="w-6 h-6 text-[#557C68]" />
              </div>
              <h3 className="text-lg font-bold text-[#222B28] font-display">
                Modular Architecture
              </h3>
              <p className="text-xs text-[#78817B] leading-relaxed">
                Activate only the capabilities your organization requires today. Dynamically provision CRM modules, document intelligence, or developer webhooks without touching your core stack.
              </p>
              <div className="pt-2 text-xs font-mono text-[#557C68] flex items-center gap-1.5">
                <span>Hot-swappable module registry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E6EAE6] text-left space-y-4 hover:border-[#557C68]/50 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#E7EEE8] text-[#304F40] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#B89A68]" />
              </div>
              <h3 className="text-lg font-bold text-[#222B28] font-display">
                Intelligent Automation
              </h3>
              <p className="text-xs text-[#78817B] leading-relaxed">
                Infuse intelligence directly into operational pipelines. Construct visual triggers that summarize inbound records, qualify deals, and alert response teams with zero human latency.
              </p>
              <div className="pt-2 text-xs font-mono text-[#557C68] flex items-center gap-1.5">
                <span>Visual DAG execution engine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E6EAE6] text-left space-y-4 hover:border-[#557C68]/50 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#E7EEE8] text-[#304F40] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#304F40]" />
              </div>
              <h3 className="text-lg font-bold text-[#222B28] font-display">
                Unified Governance & Super Admin
              </h3>
              <p className="text-xs text-[#78817B] leading-relaxed">
                Platform administrators maintain total operational visibility. Monitor global MRR, tenant health metrics, system microservice latencies, and global module adoption from one console.
              </p>
              <div className="pt-2 text-xs font-mono text-[#557C68] flex items-center gap-1.5">
                <span>Centralized Super Admin plane</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.6 Multi-Tenant Architecture Visualization Section */}
      <section id="architecture" className="py-16 sm:py-24 bg-[#F0F2EF] border-y border-[#E6EAE6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <ArchitectureViz />
        </div>
      </section>

      {/* 4.7 Modular Feature System */}
      <section id="modules" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl text-left space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#557C68] bg-[#E7EEE8] px-3 py-1 rounded-full">
                EXTENSIBLE ECOSYSTEM
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222B28] font-display tracking-tight">
                Start with what you need. Expand when you're ready.
              </h2>
              <p className="text-xs sm:text-sm text-[#78817B]">
                Every module is built to enterprise specifications. Click any module to view deep capabilities and simulate enabling it in your workspace.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#78817B]">Target Workspace:</span>
              <span className="text-xs font-bold text-[#304F40] bg-white px-3 py-1.5 rounded-xl border border-[#E6EAE6]">
                Acme Technologies
              </span>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((mod) => (
              <div
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                className="cursor-pointer bg-white rounded-2xl border border-[#E6EAE6] p-5 text-left hover:border-[#557C68] hover:shadow-md transition-all duration-150 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E7EEE8] text-[#304F40] flex items-center justify-center group-hover:bg-[#557C68] group-hover:text-white transition-colors">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0F2EF] text-[#78817B]">
                      v{mod.version}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#78817B]">
                    {mod.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#222B28] font-display mt-0.5 mb-2 group-hover:text-[#557C68] transition-colors">
                    {mod.name}
                  </h3>
                  <p className="text-xs text-[#78817B] leading-relaxed line-clamp-3 mb-4">
                    {mod.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6EAE6] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#557C68] flex items-center gap-1 text-[11px]">
                    Inspect Module
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#78817B] group-hover:text-[#557C68] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.8 AI & Automation Section */}
      <section id="ai" className="py-20 sm:py-28 bg-[#F0F2EF] border-y border-[#E6EAE6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#557C68] bg-[#E7EEE8] px-3 py-1 rounded-full">
              INTELLIGENT REASONING
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222B28] font-display tracking-tight">
              Intelligence built into every workflow.
            </h2>
            <p className="text-xs sm:text-sm text-[#78817B]">
              Experience how VELORA marries visual process orchestration with domain-trained AI copilots to automate enterprise workloads.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <InteractiveWorkflow />
            </div>
            <div className="lg:col-span-5">
              <InteractiveAIPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 4.9 Integrations Section */}
      <section id="integrations" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#557C68] bg-[#E7EEE8] px-3 py-1 rounded-full">
              CONNECTED ECOSYSTEM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222B28] font-display tracking-tight">
              Your existing tools. One connected ecosystem.
            </h2>
            <p className="text-xs sm:text-sm text-[#78817B]">
              Connect third-party services securely. Click "Configure" on any integration to inspect webhooks and test live connections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {integrations.map((int) => (
              <div
                key={int.id}
                className="bg-white rounded-2xl border border-[#E6EAE6] p-4 text-left flex flex-col justify-between hover:border-[#557C68]/60 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F0F2EF] text-[#557C68] font-bold text-xs flex items-center justify-center">
                      {int.name[0]}
                    </div>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                        int.connected
                          ? 'bg-[#E7EEE8] text-[#304F40]'
                          : 'bg-[#F0F2EF] text-[#78817B]'
                      }`}
                    >
                      {int.connected ? 'Active' : 'Offline'}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-[#222B28] mb-1 font-display">{int.name}</h3>
                  <p className="text-[11px] text-[#78817B] leading-snug line-clamp-2 mb-3">
                    {int.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedIntegration(int)}
                  className="w-full py-1.5 px-3 rounded-lg border border-[#E6EAE6] hover:border-[#557C68] text-[11px] font-semibold text-[#222B28] hover:bg-[#F7F8F6] transition-colors"
                >
                  Configure Gateway
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.10 Security & Permissions Section */}
      <section id="security" className="py-20 sm:py-28 bg-[#F0F2EF] border-y border-[#E6EAE6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#557C68] bg-[#E7EEE8] px-3 py-1 rounded-full">
              ENTERPRISE SECURITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222B28] font-display tracking-tight">
              Your workspace. Your people. Your rules.
            </h2>
            <p className="text-xs sm:text-sm text-[#78817B]">
              Granular role-based access control (RBAC). Select a role below to preview its active workspace permissions matrix.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#E6EAE6] p-6 sm:p-8 shadow-sm">
            {/* Role Selectors */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pb-6 border-b border-[#E6EAE6]">
              {(['Owner', 'Administrator', 'Manager', 'Member', 'Viewer'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRolePreview(role)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedRolePreview === role
                      ? 'bg-[#304F40] text-white shadow-xs'
                      : 'bg-[#F7F8F6] text-[#78817B] hover:text-[#222B28] border border-[#E6EAE6]'
                  }`}
                >
                  {role} Role
                </button>
              ))}
            </div>

            {/* Permissions Matrix */}
            <div className="space-y-3">
              {rolePermissionsMatrix[selectedRolePreview].map((perm, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]/60 text-xs"
                >
                  <span className="font-medium text-[#222B28]">{perm.name}</span>
                  <div className="flex items-center gap-2">
                    {perm.allowed ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E7EEE8] text-[#304F40] font-mono text-[10px] font-semibold">
                        <Check className="w-3 h-3 text-[#648B70]" /> Granted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F0F2EF] text-[#78817B] font-mono text-[10px]">
                        Restricted
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4.11 Pricing Section */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#557C68] bg-[#E7EEE8] px-3 py-1 rounded-full">
              TRANSPARENT VALUE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#222B28] font-display tracking-tight">
              Predictable enterprise pricing.
            </h2>
            <p className="text-xs sm:text-sm text-[#78817B]">
              Choose the tier that matches your current operational scale. Upgrade or change cycles anytime.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-[#222B28]' : 'text-[#78817B]'}`}>
                Monthly Billing
              </span>
              <button
                type="button"
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-12 h-6 bg-[#E7EEE8] rounded-full p-1 border border-[#557C68]/30 transition-colors relative"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#304F40] transition-transform duration-200 ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-semibold ${billingCycle === 'yearly' ? 'text-[#222B28]' : 'text-[#78817B]'}`}>
                  Yearly Billing
                </span>
                <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#B89A68]/20 text-[#B89A68] font-mono">
                  Save 20%
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => {
              const price = billingCycle === 'yearly' ? tier.priceYearly : tier.priceMonthly;

              return (
                <div
                  key={tier.name}
                  className={`rounded-2xl p-7 text-left flex flex-col justify-between transition-all relative ${
                    tier.isPopular
                      ? 'bg-white border-2 border-[#557C68] shadow-lg ring-4 ring-[#557C68]/10'
                      : 'bg-white border border-[#E6EAE6] hover:border-[#557C68]/40 shadow-xs'
                  }`}
                >
                  {tier.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#557C68] text-white text-[10px] font-mono uppercase font-bold px-3 py-0.5 rounded-full tracking-wider">
                      Most Selected
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-[#222B28] font-display mb-1">{tier.name}</h3>
                    <p className="text-xs text-[#78817B] mb-5">{tier.description}</p>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-extrabold text-[#222B28] font-display">
                        ${price}
                      </span>
                      <span className="text-xs text-[#78817B]">/ workspace / mo</span>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-[#E6EAE6] mb-8 text-xs text-[#222B28]">
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#648B70] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPlan(tier.plan)}
                    className={`w-full py-3 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2 ${
                      tier.isPopular
                        ? 'bg-[#304F40] hover:bg-[#557C68] text-white'
                        : 'bg-[#F7F8F6] hover:bg-[#E7EEE8] text-[#222B28] border border-[#E6EAE6]'
                    }`}
                  >
                    <span>Deploy {tier.name} Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4.12 Final CTA Section */}
      <section className="bg-[#202B27] text-[#F4F5F1] py-20 sm:py-28 relative overflow-hidden border-t border-[#304F40]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#557C68]/30 border border-[#557C68]/50 text-[#E7EEE8] text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-[#B89A68] animate-pulse" />
            <span>READY FOR ENTERPRISE DEPLOYMENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Build a platform that grows with your business.
          </h2>

          <p className="text-xs sm:text-sm text-[#E7EEE8]/80 max-w-xl mx-auto leading-relaxed">
            Start with the capabilities you need today. Expand your modular ecosystem as your enterprise footprint evolves.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => {
                setTenantId('tenant-acme');
                setIsSuperAdmin(false);
                navigate('/app');
              }}
              className="px-7 py-3.5 rounded-xl bg-[#557C68] hover:bg-[#648B70] text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Your Workspace</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold transition-colors cursor-pointer"
            >
              Talk to Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ModuleDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />

      <IntegrationModal
        integration={selectedIntegration}
        onClose={() => setSelectedIntegration(null)}
      />

      <Footer />
    </div>
  );
};
