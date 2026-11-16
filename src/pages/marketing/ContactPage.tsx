import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { Mail, Building, Users, Send, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    companySize: '50-250',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#222B28] flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 pb-20 px-6 sm:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#557C68] bg-[#E7EEE8] px-3 py-1 rounded-full">
            ENTERPRISE CONSULTATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#222B28] font-display tracking-tight">
            Let's build something meaningful.
          </h1>
          <p className="text-xs sm:text-sm text-[#78817B]">
            Speak with an enterprise architect to explore how VELORA's modular operating system adapts to your organization.
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-white rounded-2xl border border-[#E6EAE6] p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-[#E7EEE8] text-[#304F40] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#648B70]" />
            </div>
            <h3 className="text-xl font-bold text-[#222B28] font-display mb-2">
              Demonstration Submission Received
            </h3>
            <p className="text-xs text-[#78817B] mb-6 leading-relaxed">
              In a live production deployment, this would instantly route an enriched ticket to your sales queue, trigger the AI lead qualification workflow, and dispatch a calendar invitation.
            </p>
            <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E6EAE6] text-left text-xs mb-6 font-mono space-y-1">
              <div className="text-[10px] uppercase font-bold text-[#78817B]">Simulated Payload:</div>
              <div className="text-[#304F40]">Organization: {formData.company || 'Enterprise Prospect'}</div>
              <div className="text-[#304F40]">Contact: {formData.fullName || 'Alex Mercer'} ({formData.workEmail || 'alex@enterprise.com'})</div>
              <div className="text-[#304F40]">Assigned ICP Score: 96 / 100</div>
            </div>
            <button
              onClick={() => navigate('/app')}
              className="px-6 py-3 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Enter Live Demo Workspace →
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E6EAE6] p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-4 py-2.5 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-4 py-2.5 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Technologies"
                    className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-4 py-2.5 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1.5">
                    Company Size
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-4 py-2.5 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                  >
                    <option value="1-10">1 - 10 employees</option>
                    <option value="11-50">11 - 50 employees</option>
                    <option value="50-250">50 - 250 employees</option>
                    <option value="250-1000">250 - 1,000 employees</option>
                    <option value="1000+">1,000+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1.5">
                  Project Vision & Workload Requirements
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the modules, multi-tenancy requirements, or automation workflows you are evaluating..."
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl p-4 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#78817B] font-mono">
                  Simulated demonstration interaction
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
