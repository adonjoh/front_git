import { create } from 'zustand';
import api from '../lib/axios';

let notificationInterval = null;

export const useNotificationStore = create((set, get) => ({
    toasts: [],
    unreadCount: 0,
    
    // Actions pour les toasts
    addToast: (message, type = 'info') => {
        const id = Date.now();
        set((state) => ({
            toasts: [...state.toasts, { id, message, type }]
        }));
        
        // Auto-remove après 5 secondes
        setTimeout(() => {
            get().removeToast(id);
        }, 5000);
    },
    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter(t => t.id !== id)
        }));
    },

    // Actions pour le compteur de notifications (bell icon)
    fetchUnreadCount: async () => {
        try {
            const res = await api.get('/notifications/non-lues');
            const count = typeof res.data === 'number' ? res.data : (res.data.count || 0);
            
            // Si on a de nouvelles notifications, on pourrait afficher un toast dynamique
            const oldCount = get().unreadCount;
            if (count > oldCount && oldCount !== 0) {
                get().addToast("Vous avez de nouvelles notifications", "info");
            }
            
            set({ unreadCount: count });
        } catch (err) {
            console.error("Erreur unread notifications", err);
        }
    },
    
    // Système de polling
    startPolling: () => {
        if (notificationInterval) return;
        get().fetchUnreadCount(); // Fetch immédiat
        notificationInterval = setInterval(() => {
            get().fetchUnreadCount();
        }, 15000); // Poll chaque 15 secondes pour le coté "dynamique"
    },
    
    stopPolling: () => {
        if (notificationInterval) {
            clearInterval(notificationInterval);
            notificationInterval = null;
        }
    },

    // Helpers
    decrementUnread: () => {
        set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) }));
    },
    clearUnread: () => set({ unreadCount: 0 })
}));
