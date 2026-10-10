import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClasses = 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200';
        let iconColor = 'text-emerald-400';

        if (toast.type === 'error') {
          Icon = XCircle;
          colorClasses = 'bg-rose-950/90 border-rose-500/40 text-rose-200';
          iconColor = 'text-rose-400';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          colorClasses = 'bg-amber-950/90 border-amber-500/40 text-amber-200';
          iconColor = 'text-amber-400';
        } else if (toast.type === 'info') {
          Icon = Info;
          colorClasses = 'bg-indigo-950/90 border-indigo-500/40 text-indigo-200';
          iconColor = 'text-indigo-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all animate-fade-in ${colorClasses}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-sm">
              <h4 className="font-semibold">{toast.title}</h4>
              {toast.description && <p className="text-xs opacity-90 mt-0.5">{toast.description}</p>}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
