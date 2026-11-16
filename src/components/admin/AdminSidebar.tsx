import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Shield,
  Building2,
  Layers,
  CreditCard,
  BarChart3,
  Activity,
  History,
  Settings,
  ArrowLeft,
  Server,
  Zap,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { tenants, setIsSuperAdmin, setTenantId } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();

  const navGroups = [
    {
      title: 'PLATFORM CORE',
      items: [
        { label: 'Platform Overview', path: '/admin', icon: Activity },
        { label: 'Tenants Directory', path: '/admin/tenants', icon: Building2, badge: `${tenants.length}` },
        { label: 'Global Modules', path: '/admin/modules', icon: Layers },
        { label: 'Subscriptions & MRR', path: '/admin/subscriptions', icon: CreditCard },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { label: 'Platform Analytics', path: '/admin/analytics', icon: BarChart3 },
        { label: 'System Health', path: '/admin/system-health', icon: Server, badge: '99.9%' },
        { label: 'Global Audit Logs', path: '/admin/activity', icon: History },
      ],
    },
    {
      title: 'CONFIGURATION',
      items: [
        { label: 'Global Settings', path: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#202B27] text-[#F4F5F1] flex flex-col justify-between border-r border-[#304F40] shrink-0 z-30">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-[#304F40]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#557C68] flex items-center justify-center text-[#E7EEE8] shadow-sm">
                <Shield className="w-4 h-4 text-[#F4F5F1]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-[#F4F5F1] font-display">
                  VELORA
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#B89A68] font-mono font-semibold">
                  SUPER ADMIN CONSOLE
                </span>
              </div>
            </div>
          </div>

          {/* Quick jump back to tenant */}
          <button
            onClick={() => {
              setIsSuperAdmin(false);
              setTenantId('tenant-acme');
              navigate('/app');
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#304F40]/80 hover:bg-[#304F40] text-[#E7EEE8] text-xs font-medium transition-colors border border-[#557C68]/30"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5 text-[#B89A68]" />
              <span>Enter Tenant App</span>
            </span>
            <span className="text-[10px] font-mono text-[#E7EEE8]/60">Acme Tech</span>
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-220px)]">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[9px] uppercase font-bold tracking-wider text-[#B89A68]/80 font-mono">
                {group.title}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#304F40] text-white font-semibold shadow-xs border border-[#557C68]/40'
                        : 'text-[#E7EEE8]/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#B89A68]' : 'text-[#E7EEE8]/60'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-[#E7EEE8]/80">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Admin User Profile */}
      <div className="p-4 border-t border-[#304F40] bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#557C68] text-white flex items-center justify-center font-bold text-xs">
            SA
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">
              Root Administrator
            </div>
            <div className="text-[10px] text-[#E7EEE8]/60 truncate font-mono">
              superadmin@velora-demo.com
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
