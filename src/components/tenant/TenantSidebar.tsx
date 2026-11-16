import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Layers,
  Sparkles,
  GitBranch,
  Network,
  BarChart3,
  CreditCard,
  History,
  Settings,
  HelpCircle,
  ChevronDown,
  Check,
  Building2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
} from 'lucide-react';

interface TenantSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const TenantSidebar: React.FC<TenantSidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { currentTenant, currentTenantId, setTenantId, tenants, isSuperAdmin, setIsSuperAdmin } = useDemo();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      section: 'OVERVIEW',
      items: [
        { label: 'Overview', path: '/app', icon: LayoutDashboard },
      ],
    },
    {
      section: 'WORKSPACE',
      items: [
        { label: 'Team Members', path: '/app/team', icon: Users, badge: `${currentTenant.memberCount}` },
        { label: 'Roles & Permissions', path: '/app/roles', icon: ShieldCheck },
        { label: 'Modules Marketplace', path: '/app/modules', icon: Layers, badge: `${currentTenant.activeModules.length}` },
        { label: 'AI Workspace', path: '/app/ai', icon: Sparkles, highlight: true },
        { label: 'Automations', path: '/app/automations', icon: GitBranch },
        { label: 'Integrations', path: '/app/integrations', icon: Network },
      ],
    },
    {
      section: 'MANAGEMENT',
      items: [
        { label: 'Analytics & KPIs', path: '/app/analytics', icon: BarChart3 },
        { label: 'Billing & Plans', path: '/app/billing', icon: CreditCard, badge: currentTenant.plan },
        { label: 'Activity Logs', path: '/app/activity', icon: History },
      ],
    },
    {
      section: 'SYSTEM',
      items: [
        { label: 'Settings', path: '/app/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`bg-[#F0F2EF] border-r border-[#E6EAE6] flex flex-col justify-between transition-all duration-200 z-30 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      <div>
        {/* Brand & Workspace Switcher */}
        <div className="p-3 border-b border-[#E6EAE6]">
          {/* Logo Bar */}
          <div className="flex items-center justify-between px-2 py-1 mb-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-left group"
              title="Return to Public Website"
            >
              <div className="w-7 h-7 rounded-lg bg-[#304F40] flex items-center justify-center text-[#E7EEE8] shadow-xs group-hover:bg-[#557C68] transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 32 32" fill="none">
                  <path d="M8 10L16 23L24 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="16" cy="12" r="2.2" fill="#B89A68" />
                </svg>
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#222B28] font-display leading-none">
                    VELORA
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-[#78817B] font-mono mt-0.5">
                    Tenant Workspace
                  </span>
                </div>
              )}
            </button>

            <button
              onClick={onToggleCollapse}
              className="p-1 rounded-md text-[#78817B] hover:text-[#222B28] hover:bg-white/60 transition-colors"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Workspace Switcher Selector */}
          {!collapsed ? (
            <div className="relative mt-1">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-white border border-[#E6EAE6] hover:border-[#557C68]/50 shadow-xs transition-all text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs text-white shrink-0"
                    style={{ backgroundColor: currentTenant.color }}
                  >
                    {currentTenant.logoInitial}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#222B28] truncate">
                      {currentTenant.name}
                    </div>
                    <div className="text-[9px] text-[#78817B] truncate font-mono">
                      {currentTenant.domain}
                    </div>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#78817B] shrink-0 ml-1" />
              </button>

              {dropdownOpen && (
                <div className="absolute top-12 left-0 right-0 bg-white rounded-xl shadow-lg border border-[#E6EAE6] py-1 text-xs z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[9px] uppercase font-bold tracking-wider text-[#78817B] border-b border-[#E6EAE6]">
                    Switch Tenant Workspace
                  </div>
                  {tenants.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTenantId(t.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-[#F7F8F6] transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-5 h-5 rounded text-[10px] font-bold text-white flex items-center justify-center shrink-0"
                          style={{ backgroundColor: t.color }}
                        >
                          {t.logoInitial}
                        </div>
                        <div className="truncate">
                          <div className="font-semibold text-[#222B28] text-xs truncate">
                            {t.name}
                          </div>
                          <div className="text-[10px] text-[#78817B]">
                            {t.plan} Plan · {t.memberCount} users
                          </div>
                        </div>
                      </div>
                      {t.id === currentTenantId && (
                        <Check className="w-3.5 h-3.5 text-[#557C68] shrink-0" />
                      )}
                    </button>
                  ))}

                  <div className="mt-1 pt-1 border-t border-[#E6EAE6] px-2 py-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setIsSuperAdmin(true);
                        navigate('/admin');
                      }}
                      className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-semibold text-[#304F40] hover:bg-[#E7EEE8] transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5 text-[#B89A68]" />
                      <span>Super Admin Console</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-center p-2 rounded-xl bg-white border border-[#E6EAE6]"
              title={currentTenant.name}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs text-white"
                style={{ backgroundColor: currentTenant.color }}
              >
                {currentTenant.logoInitial}
              </div>
            </button>
          )}
        </div>

        {/* Navigation list */}
        <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-210px)]">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!collapsed && (
                <div className="px-2 text-[9px] uppercase font-bold tracking-wider text-[#78817B]/80 font-mono">
                  {group.section}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-white text-[#222B28] shadow-xs font-semibold'
                        : 'text-[#78817B] hover:text-[#222B28] hover:bg-white/50'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-[#557C68]'
                          : item.highlight
                          ? 'text-[#B89A68]'
                          : 'text-[#78817B] group-hover:text-[#222B28]'
                      }`}
                    />
                    {!collapsed && (
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#E6EAE6] text-[#78817B]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Footer User Profile */}
      <div className="p-3 border-t border-[#E6EAE6]">
        {!collapsed ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-[#E6EAE6]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#304F40] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentTenant.adminName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#222B28] truncate">
                  {currentTenant.adminName}
                </div>
                <div className="text-[9px] text-[#78817B] truncate">
                  Workspace Admin
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="p-1.5 rounded-lg text-[#78817B] hover:text-[#B87570] transition-colors"
              title="Sign Out / Switch Account"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-7 h-7 rounded-lg bg-[#304F40] text-white flex items-center justify-center font-bold text-xs">
              {currentTenant.adminName[0]}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
