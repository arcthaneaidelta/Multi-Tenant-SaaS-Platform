import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sparkles,
  Shield,
  HelpCircle,
  X,
  ExternalLink,
  Menu,
} from 'lucide-react';

interface TenantHeaderProps {
  onToggleMobileMenu?: () => void;
}

export const TenantHeader: React.FC<TenantHeaderProps> = ({ onToggleMobileMenu }) => {
  const { currentTenant, activityLogs, setIsSuperAdmin } = useDemo();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const tenantLogs = activityLogs.filter((l) => l.tenantId === currentTenant.id).slice(0, 5);

  return (
    <>
      <header className="h-14 bg-white border-b border-[#E6EAE6] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-1.5 rounded-lg text-[#78817B] hover:text-[#222B28] hover:bg-[#F0F2EF]"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Quick Search trigger */}
          <button
            onClick={() => setShowSearchModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6] text-xs text-[#78817B] hover:border-[#557C68]/50 transition-colors w-44 sm:w-64 text-left"
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Search commands, records...</span>
            <kbd className="hidden sm:inline-block ml-auto text-[9px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#E6EAE6] text-[#78817B]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right header controls */}
        <div className="flex items-center gap-2.5">
          {/* Super Admin Switch link */}
          <button
            onClick={() => {
              setIsSuperAdmin(true);
              navigate('/admin');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-[#304F40] bg-[#E7EEE8] hover:bg-[#d6e2d8] transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-[#B89A68]" />
            <span>Super Admin</span>
          </button>

          {/* Notifications toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-[#78817B] hover:text-[#222B28] hover:bg-[#F0F2EF] relative transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#557C68]" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-xl border border-[#E6EAE6] p-4 text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6EAE6]">
                  <span className="font-bold text-[#222B28] font-display">
                    Workspace Activity ({tenantLogs.length})
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[#78817B] hover:text-[#222B28]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="py-2 space-y-2.5 max-h-64 overflow-y-auto">
                  {tenantLogs.map((log) => (
                    <div key={log.id} className="p-2 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6]/60">
                      <div className="flex items-center justify-between text-[10px] text-[#78817B] mb-0.5">
                        <span className="font-semibold text-[#557C68]">{log.event}</span>
                        <span>{log.date}</span>
                      </div>
                      <p className="text-[11px] text-[#222B28] leading-tight">
                        {log.action}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/app/activity');
                  }}
                  className="w-full text-center pt-2 text-[11px] font-semibold text-[#557C68] hover:underline block"
                >
                  View Complete Audit Log →
                </button>
              </div>
            )}
          </div>

          {/* Quick AI Help trigger */}
          <button
            onClick={() => navigate('/app/ai')}
            className="p-2 rounded-xl text-[#B89A68] hover:bg-[#E7EEE8]/50 transition-colors"
            title="Open AI Copilot"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Global Command Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/30 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-2xl max-w-lg w-full p-4 relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E6EAE6]">
              <Search className="w-4 h-4 text-[#78817B]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Jump to route, member, module or automation..."
                className="flex-1 text-xs text-[#222B28] focus:outline-none"
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-[10px] bg-[#F0F2EF] px-1.5 py-0.5 rounded text-[#78817B]"
              >
                ESC
              </button>
            </div>

            <div className="pt-3 space-y-1 text-xs">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] px-2 py-1">
                Quick Navigation
              </div>
              {[
                { name: 'AI Enterprise Copilot', path: '/app/ai' },
                { name: 'Visual Workflow Builder', path: '/app/automations' },
                { name: 'Team Member Management', path: '/app/team' },
                { name: 'Module Marketplace', path: '/app/modules' },
                { name: 'Integration Gateways', path: '/app/integrations' },
                { name: 'Billing & Plan Upgrade', path: '/app/billing' },
              ]
                .filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      setShowSearchModal(false);
                      navigate(item.path);
                    }}
                    className="w-full px-3 py-2 text-left rounded-lg hover:bg-[#F7F8F6] text-[#222B28] flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] font-mono text-[#78817B]">{item.path}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
