import { useNotificationStore } from '../../stores/useNotificationStore';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastContainer() {
    const { toasts, removeToast } = useNotificationStore();

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div 
                    key={toast.id} 
                    className={`pointer-events-auto flex items-center gap-3 min-w-[300px] max-w-sm p-4 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 animate-fade-in-up
                        ${toast.type === 'success' ? 'bg-emerald-500/10' : 
                          toast.type === 'error' ? 'bg-rose-500/10' : 
                          'bg-indigo-500/10'}`}
                >
                    <div className={`p-2 rounded-xl flex-shrink-0
                        ${toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 
                          toast.type === 'error' ? 'bg-rose-500/20 text-rose-400' : 
                          'bg-indigo-500/20 text-indigo-400'}`}
                    >
                        {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                        {toast.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                        {toast.type === 'info' && <Info className="w-5 h-5" />}
                    </div>
                    
                    <p className="flex-1 text-sm font-medium text-white">
                        {toast.message}
                    </p>
                    
                    <button 
                        onClick={() => removeToast(toast.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
