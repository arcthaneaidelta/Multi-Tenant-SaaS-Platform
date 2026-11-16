import React, { useState } from 'react';
import { Integration } from '../../types';
import { useDemo } from '../../context/DemoContext';
import { X, CheckCircle2, ShieldCheck, Link2, Unlink, Key, Globe, Eye, EyeOff } from 'lucide-react';

interface IntegrationModalProps {
  integration: Integration | null;
  onClose: () => void;
}

export const IntegrationModal: React.FC<IntegrationModalProps> = ({ integration, onClose }) => {
  const { toggleIntegrationConnection, updateIntegrationConfig, currentTenant } = useDemo();

  const [env, setEnv] = useState<'Test' | 'Live'>(integration?.environment || 'Live');
  const [apiKey, setApiKey] = useState(integration?.apiKeyMasked || '');
  const [webhookUrl, setWebhookUrl] = useState(integration?.webhookUrl || '');
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!integration) return null;

  const handleToggle = () => {
    setIsSaving(true);
    setTimeout(() => {
      toggleIntegrationConnection(integration.id);
      setIsSaving(false);
      onClose();
    }, 400);
  };

  const handleSaveConfig = () => {
    updateIntegrationConfig(integration.id, {
      environment: env,
      apiKeyMasked: apiKey,
      webhookUrl: webhookUrl,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-md w-full p-6 text-left relative animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#78817B] hover:text-[#222B28] p-1.5 rounded-lg hover:bg-[#F0F2EF] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4 pr-8">
          <div className="w-10 h-10 rounded-xl bg-[#F0F2EF] flex items-center justify-center text-[#557C68] font-bold">
            {integration.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#222B28] font-display">
                {integration.name}
              </h3>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                  integration.connected
                    ? 'bg-[#E7EEE8] text-[#304F40]'
                    : 'bg-[#F0F2EF] text-[#78817B]'
                }`}
              >
                {integration.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <p className="text-[11px] text-[#78817B]">{integration.category} Gateway</p>
          </div>
        </div>

        <p className="text-xs text-[#222B28] leading-relaxed mb-4">
          {integration.description}
        </p>

        {/* Form Settings */}
        <div className="space-y-3.5 mb-5">
          {/* Environment Switcher */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
              Gateway Environment
            </label>
            <div className="flex items-center gap-2 bg-[#F7F8F6] p-1 rounded-xl border border-[#E6EAE6]">
              <button
                type="button"
                onClick={() => setEnv('Live')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  env === 'Live' ? 'bg-white shadow-xs text-[#222B28]' : 'text-[#78817B]'
                }`}
              >
                Live Production
              </button>
              <button
                type="button"
                onClick={() => setEnv('Test')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  env === 'Test' ? 'bg-white shadow-xs text-[#222B28]' : 'text-[#78817B]'
                }`}
              >
                Test Sandbox
              </button>
            </div>
          </div>

          {/* Masked API Key Input */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] flex items-center justify-between mb-1">
              <span className="flex items-center gap-1">
                <Key className="w-3 h-3 text-[#B89A68]" /> Scoped API Key (Simulated)
              </span>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-[10px] text-[#557C68] hover:underline flex items-center gap-1"
              >
                {showKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showKey ? 'Mask' : 'Reveal'}</span>
              </button>
            </label>
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs font-mono text-[#222B28] focus:outline-none focus:border-[#557C68]"
            />
          </div>

          {/* Webhook Endpoint */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] flex items-center gap-1 mb-1">
              <Globe className="w-3 h-3 text-[#557C68]" /> Webhook Ingest URL
            </label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs font-mono text-[#222B28] focus:outline-none focus:border-[#557C68]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E6EAE6]">
          <button
            onClick={handleToggle}
            disabled={isSaving}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
              integration.connected
                ? 'border-[#B87570]/30 text-[#B87570] hover:bg-[#B87570]/10'
                : 'border-[#557C68] text-[#557C68] hover:bg-[#E7EEE8]'
            }`}
          >
            {integration.connected ? (
              <>
                <Unlink className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </>
            ) : (
              <>
                <Link2 className="w-3.5 h-3.5" />
                <span>Connect Gateway</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-[#78817B] hover:text-[#222B28] rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveConfig}
              className="px-4 py-2 bg-[#304F40] hover:bg-[#557C68] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
