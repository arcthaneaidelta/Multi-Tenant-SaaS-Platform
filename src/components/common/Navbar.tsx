import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Shield, Layers, ChevronDown, Sparkles, Building2 } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setTenantId, setIsSuperAdmin } = useDemo();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Platform', path: '/#platform' },
    { name: 'Architecture', path: '/#architecture' },
    { name: 'Modules', path: '/#modules' },
    { name: 'Integrations', path: '/#integrations' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const targetId = path.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const enterTenantDemo = () => {
    setTenantId('tenant-acme');
    setIsSuperAdmin(false);
    setShowDemoModal(false);
    navigate('/app');
  };

  const enterAdminDemo = () => {
    setIsSuperAdmin(true);
    setShowDemoModal(false);
    navigate('/admin');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-[#F7F8F6]/90 backdrop-blur-md border-b border-[#E6EAE6] shadow-xs py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#304F40] flex items-center justify-center text-[#E7EEE8] shadow-xs group-hover:bg-[#557C68] transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none">
                <path d="M8 10L16 23L24 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="16" cy="12" r="2.2" fill="#B89A68" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#222B28] font-display">
                VELORA
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#78817B] font-medium -mt-1 hidden sm:block">
                Modular Enterprise OS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="text-xs font-medium text-[#78817B] hover:text-[#222B28] transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-medium text-[#222B28] hover:text-[#557C68] px-3 py-2 rounded-lg transition-colors"
            >
              Log in
            </Link>

            <button
              onClick={() => setShowDemoModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-all duration-150 group"
            >
              <span>Experience Demo</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#222B28] hover:bg-white/80 border border-[#E6EAE6]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E6EAE6] px-6 py-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3 mb-5">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className="text-left text-sm font-medium text-[#222B28] py-2 border-b border-[#E6EAE6]/40"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-medium border border-[#E6EAE6] rounded-xl text-[#222B28]"
              >
                Log in to Workspace
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowDemoModal(true);
                }}
                className="w-full py-2.5 text-xs font-semibold bg-[#304F40] text-white rounded-xl shadow-xs"
              >
                Experience Live Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Quick Demo Access Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-md w-full p-6 text-left relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-[#78817B] hover:text-[#222B28] p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-[#E7EEE8] text-[#304F40] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-[#222B28] font-display">
              Choose Demo Environment
            </h3>
            <p className="text-xs text-[#78817B] mt-1 mb-5 leading-relaxed">
              Experience VELORA instantly without sign-up. Select which perspective you want to explore.
            </p>

            <div className="space-y-3">
              <button
                onClick={enterTenantDemo}
                className="w-full p-4 rounded-xl border border-[#E6EAE6] hover:border-[#557C68] bg-[#F7F8F6] hover:bg-white text-left transition-all duration-150 group flex items-start justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#557C68]/15 text-[#304F40] flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#222B28] group-hover:text-[#557C68] transition-colors">
                      Tenant Workspace
                    </h4>
                    <p className="text-[11px] text-[#78817B] mt-0.5">
                      Explore Acme Technologies' private workspace, team management, AI copilot, and visual automation builder.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#78817B] group-hover:text-[#557C68] group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
              </button>

              <button
                onClick={enterAdminDemo}
                className="w-full p-4 rounded-xl border border-[#E6EAE6] hover:border-[#304F40] bg-[#F7F8F6] hover:bg-white text-left transition-all duration-150 group flex items-start justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#304F40]/15 text-[#304F40] flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#222B28] group-hover:text-[#304F40] transition-colors">
                      Platform Super Admin
                    </h4>
                    <p className="text-[11px] text-[#78817B] mt-0.5">
                      Multi-tenant control plane: manage all 128 companies, global module governance, revenue metrics, and system health.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#78817B] group-hover:text-[#304F40] group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E6EAE6] flex items-center justify-between text-[11px] text-[#78817B]">
              <span>Sample login credentials also available</span>
              <Link
                to="/login"
                onClick={() => setShowDemoModal(false)}
                className="font-medium text-[#557C68] hover:underline"
              >
                View Login Page
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
