import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#202B27] text-[#F4F5F1] border-t border-[#304F40] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#304F40]/60">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#557C68] flex items-center justify-center text-[#E7EEE8]">
                <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none">
                  <path d="M8 10L16 23L24 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="16" cy="12" r="2.2" fill="#B89A68" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#F4F5F1] font-display">
                VELORA
              </span>
            </div>
            <p className="text-xs text-[#E7EEE8]/70 max-w-sm leading-relaxed">
              An intelligent, modular workspace built to scale with your business. Multi-tenant infrastructure, AI copilots, and visual workflow automation in one cohesive platform.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#E7EEE8]/80 font-mono">
              <span className="flex h-2 w-2 rounded-full bg-[#648B70] animate-pulse" />
              <span>All Systems Operational (99.98% uptime)</span>
            </div>
          </div>

          {/* Links Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B89A68]">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#E7EEE8]/70">
              <li><Link to="/#architecture" className="hover:text-white transition-colors">Multi-Tenant Core</Link></li>
              <li><Link to="/#modules" className="hover:text-white transition-colors">Modular Extensions</Link></li>
              <li><Link to="/#ai" className="hover:text-white transition-colors">AI Workspace</Link></li>
              <li><Link to="/#automations" className="hover:text-white transition-colors">Visual Automation Engine</Link></li>
              <li><Link to="/#security" className="hover:text-white transition-colors">Security & RBAC</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Environments */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B89A68]">
              Environments
            </h4>
            <ul className="space-y-2 text-xs text-[#E7EEE8]/70">
              <li><Link to="/app" className="hover:text-white transition-colors">Tenant Workspace Demo</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Super Admin Console</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Sample Authentication</Link></li>
              <li><Link to="/#pricing" className="hover:text-white transition-colors">Tier Comparisons</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Enterprise Inquiry</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Trust & Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B89A68]">
              Standards
            </h4>
            <ul className="space-y-2 text-xs text-[#E7EEE8]/70">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#648B70]" /> SOC2 Type II Certified</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#648B70]" /> ISO 27001 Compliant</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#648B70]" /> HIPAA Ready Partition</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#648B70]" /> GDPR & CCPA Aligned</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E7EEE8]/60">
          <div>
            © {new Date().getFullYear()} VELORA Platform Systems Inc. Prototype Demonstration.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Security Whitepaper</span>
            <span className="text-[#B89A68] font-mono">Build v3.8.4-preview</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
