import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Settings,
  Building,
  Shield,
  Bell,
  Key,
  Copy,
  Check,
  Save,
  RotateCcw,
  Sparkles,
  Lock,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentTenant, showToast, resetDemoData } = useDemo();

  const [orgName, setOrgName] = useState(currentTenant.name);
  const [domain, setDomain] = useState(currentTenant.domain);
  const [adminEmail, setAdminEmail] = useState(currentTenant.adminEmail);
  const [accentColor, setAccentColor] = useState(currentTenant.color);

  // Security Toggles
  const [enforce2FA, setEnforce2FA] = useState(true);
  const [samlSSO, setSamlSSO] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('8h');

  // Notification Toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // API Key state
  const [apiKey, setApiKey] = useState('vel_live_891b29a8f4c0239108e4');
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopiedKey(true);
    showToast('Copied to Clipboard', 'Production API secret key copied.', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleGenerateKey = () => {
    const randomKey = `vel_live_${Math.random().toString(36).substr(2, 10)}${Math.random().toString(36).substr(2, 10)}`;
    setApiKey(randomKey);
    showToast('Token Rotated', 'Generated fresh scoped API key.', 'success');
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings Saved', 'Workspace configuration saved successfully.', 'success');
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Workspace Settings
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Manage organization identity, security policies, notifications, and API credentials for {currentTenant.name}.
          </p>
        </div>

        <button
          onClick={handleSaveGeneral}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* Organization Profile */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-[#E6EAE6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-[#557C68]" />
            <h3 className="text-sm font-bold text-[#222B28] font-display">
              Organization & Tenant Profile
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#78817B]">Tenant ID: {currentTenant.id}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
              Organization Name
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
              Custom Domain Routing
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] font-mono focus:outline-none focus:border-[#557C68]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
              Primary Administrative Email
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] font-mono focus:outline-none focus:border-[#557C68]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
              Brand Accent Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-9 h-9 rounded-xl border border-[#E6EAE6] cursor-pointer p-0.5 bg-white"
              />
              <span className="text-xs font-mono text-[#78817B]">{accentColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Policies */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-[#E6EAE6] flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#304F40]" />
          <h3 className="text-sm font-bold text-[#222B28] font-display">
            Authentication & Security Policies
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]">
            <div>
              <div className="font-semibold text-[#222B28]">Mandate Two-Factor Authentication (2FA)</div>
              <div className="text-[11px] text-[#78817B]">Require TOTP or hardware security keys for all members.</div>
            </div>
            <button
              type="button"
              onClick={() => setEnforce2FA(!enforce2FA)}
              className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                enforce2FA ? 'bg-[#557C68]' : 'bg-[#E6EAE6]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  enforce2FA ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]">
            <div>
              <div className="font-semibold text-[#222B28]">SAML 2.0 / Okta SSO Enforcement</div>
              <div className="text-[11px] text-[#78817B]">Delegate employee authentication to your identity provider.</div>
            </div>
            <button
              type="button"
              onClick={() => setSamlSSO(!samlSSO)}
              className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                samlSSO ? 'bg-[#557C68]' : 'bg-[#E6EAE6]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  samlSSO ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]">
            <div>
              <div className="font-semibold text-[#222B28]">Session Inactivity Timeout</div>
              <div className="text-[11px] text-[#78817B]">Automatically terminate inactive member sessions.</div>
            </div>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="bg-white border border-[#E6EAE6] rounded-lg px-2.5 py-1 text-xs font-mono"
            >
              <option value="1h">1 hour</option>
              <option value="4h">4 hours</option>
              <option value="8h">8 hours (standard)</option>
              <option value="24h">24 hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Developer API & Webhook Credentials */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-[#E6EAE6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#B89A68]" />
            <h3 className="text-sm font-bold text-[#222B28] font-display">
              Scoped API & Developer Tokens
            </h3>
          </div>
          <button
            onClick={handleGenerateKey}
            className="text-xs font-semibold text-[#557C68] hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Rotate Secret Key</span>
          </button>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block">
            Workspace Master Secret (Simulated Token)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={apiKey}
              className="flex-1 bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs font-mono text-[#222B28] select-all"
            />
            <button
              onClick={handleCopyKey}
              className="px-3.5 py-2 rounded-xl bg-[#F0F2EF] hover:bg-[#E7EEE8] text-xs font-semibold text-[#304F40] transition-colors flex items-center gap-1.5"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-[#648B70]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-[11px] text-[#78817B]">
            This token carries admin execution privileges for {currentTenant.name}'s APIs and Webhook endpoints.
          </p>
        </div>
      </div>

      {/* Demo Reset Danger Area */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 shadow-xs flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-[#222B28] font-display">Reset All Demo State</h4>
          <p className="text-[11px] text-[#78817B] mt-0.5">
            Restore original mock datasets, active modules, and team members to initial baseline.
          </p>
        </div>
        <button
          onClick={resetDemoData}
          className="px-3.5 py-2 rounded-xl border border-[#B87570]/40 text-[#B87570] hover:bg-[#FAF2F2] text-xs font-semibold transition-colors"
        >
          Reset Demo Data
        </button>
      </div>
    </div>
  );
};
