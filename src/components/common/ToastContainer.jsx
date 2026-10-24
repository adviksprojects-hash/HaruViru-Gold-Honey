import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-[#1C120C] text-white border-[#E29D1D]/40';
        let icon = <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />;

        if (toast.type === 'error') {
          bg = 'bg-[#2E0B0B] text-white border-red-500/50';
          icon = <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
        } else if (toast.type === 'info') {
          bg = 'bg-[#181E29] text-white border-blue-500/40';
          icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-slide-in ${bg}`}
          >
            {icon}
            <div className="text-sm font-medium flex-1 pt-0.5 leading-snug">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
