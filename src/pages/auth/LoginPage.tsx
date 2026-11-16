import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { Shield, Building2, ArrowRight, Lock, Mail, Sparkles, Check, Key } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@acme-demo.com');
  const [password, setPassword] = useState('velora2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setTenantId, setIsSuperAdmin, showToast } = useDemo();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email.includes('superadmin')) {
        setIsSuperAdmin(true);
        showToast('Super Admin Authenticated', 'Entered platform control console.', 'success');
        navigate('/admin');
      } else {
        setIsSuperAdmin(false);
        setTenantId('tenant-acme');
        showToast('Authenticated', 'Welcome back, Alex Mercer (Acme Technologies).', 'success');
        navigate('/app');
      }
    }, 400);
  };

  const handleQuickTenant = () => {
    setIsSuperAdmin(false);
    setTenantId('tenant-acme');
    showToast('Direct Access Granted', 'Entered Acme Technologies workspace.', 'info');
    navigate('/app');
  };

  const handleQuickAdmin = () => {
    setIsSuperAdmin(true);
    showToast('Direct Access Granted', 'Entered Platform Super Admin console.', 'warning');
    navigate('/admin');
  };

  const fillTenantDemo = () => {
    setEmail('admin@acme-demo.com');
    setPassword('velora2026');
  };

  const fillAdminDemo = () => {
    setEmail('superadmin@velora-demo.com');
    setPassword('velora-platform');
  };

  return (
    <div className="min-h-screen bg-[#F7F8F6] flex flex-col justify-between py-10 px-6 sm:px-8">
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-[#304F40] flex items-center justify-center text-[#E7EEE8] group-hover:bg-[#557C68] transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none">
              <path d="M8 10L16 23L24 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16" cy="12" r="2.2" fill="#B89A68" />
            </svg>
          </div>
          <span className="text-lg font-bold text-[#222B28] font-display">VELORA</span>
        </Link>
        <Link to="/" className="text-xs text-[#78817B] hover:text-[#222B28]">
          Back to website
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8">
        {/* Quick One-Click Demo Access Box */}
        <div className="mb-6 p-4 rounded-2xl bg-white border border-[#E6EAE6] shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#222B28]">
            <Sparkles className="w-4 h-4 text-[#B89A68]" />
            <span>Instant One-Click Demo Access</span>
          </div>
          <p className="text-[11px] text-[#78817B] mb-3">
            Explore either environment directly without filling in credentials:
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleQuickTenant}
              className="py-2.5 px-3 rounded-xl bg-[#E7EEE8] hover:bg-[#d8e4da] text-[#304F40] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-[#557C68]" />
              <span>Tenant Workspace</span>
            </button>

            <button
              onClick={handleQuickAdmin}
              className="py-2.5 px-3 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#B89A68]" />
              <span>Super Admin</span>
            </button>
          </div>
        </div>

        {/* Credentials Form Box */}
        <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 sm:p-8 shadow-sm text-left">
          <h2 className="text-xl font-bold text-[#222B28] font-display mb-1">
            Sign in to your account
          </h2>
          <p className="text-xs text-[#78817B] mb-5">
            Use predefined demo accounts or click a prefill shortcut below.
          </p>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 mb-5">
            <button
              type="button"
              onClick={fillTenantDemo}
              className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-mono border transition-all ${
                email === 'admin@acme-demo.com'
                  ? 'border-[#557C68] bg-[#E7EEE8] text-[#304F40] font-bold'
                  : 'border-[#E6EAE6] text-[#78817B] hover:bg-[#F7F8F6]'
              }`}
            >
              Preset: Tenant Admin
            </button>
            <button
              type="button"
              onClick={fillAdminDemo}
              className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-mono border transition-all ${
                email === 'superadmin@velora-demo.com'
                  ? 'border-[#304F40] bg-[#304F40] text-white font-bold'
                  : 'border-[#E6EAE6] text-[#78817B] hover:bg-[#F7F8F6]'
              }`}
            >
              Preset: Super Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#78817B] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#222B28] font-mono focus:outline-none focus:border-[#557C68]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B]">
                  Password
                </label>
                <span className="text-[10px] text-[#557C68] cursor-pointer hover:underline">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#78817B] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#222B28] font-mono focus:outline-none focus:border-[#557C68]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#78817B]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E6EAE6] text-[#557C68] focus:ring-0"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating Workspace...</span>
              ) : (
                <>
                  <span>Sign In to Environment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Social SSO simulated */}
          <div className="mt-5 pt-5 border-t border-[#E6EAE6] space-y-2">
            <button
              onClick={handleQuickTenant}
              className="w-full py-2 px-3 border border-[#E6EAE6] hover:bg-[#F7F8F6] text-[#222B28] rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={handleQuickTenant}
              className="w-full py-2 px-3 border border-[#E6EAE6] hover:bg-[#F7F8F6] text-[#222B28] rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              <span>Continue with Microsoft Entra ID</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-[#78817B]">
        VELORA Platform Demonstration • Zero credentials stored on server
      </div>
    </div>
  );
};
