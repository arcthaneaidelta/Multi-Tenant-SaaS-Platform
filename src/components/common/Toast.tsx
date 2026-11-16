import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useDemo();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-[#648B70] shrink-0" />,
          warning: <AlertTriangle className="w-4 h-4 text-[#C49A58] shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-[#B87570] shrink-0" />,
          info: <Info className="w-4 h-4 text-[#557C68] shrink-0" />,
        };

        const borderStyles = {
          success: 'border-[#648B70]/30 bg-white/95 text-[#222B28]',
          warning: 'border-[#C49A58]/40 bg-[#FFFDF9]/95 text-[#222B28]',
          error: 'border-[#B87570]/30 bg-white/95 text-[#222B28]',
          info: 'border-[#E6EAE6] bg-white/95 text-[#222B28]',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-sm backdrop-blur-sm transition-all duration-200 animate-in slide-in-from-bottom-2 ${
              borderStyles[toast.type]
            }`}
          >
            <div className="mt-0.5">{icons[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-[#222B28] leading-tight">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-[11px] text-[#78817B] mt-0.5 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#78817B] hover:text-[#222B28] p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
