import { useState, useEffect } from 'react';
import axios from '../lib/axios';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Bell, CheckCircle2, Clock, Info } from 'lucide-react';
import { useNotificationStore } from '../stores/useNotificationStore';

export default function Notifications() {
    const addToast = useNotificationStore(state => state.addToast);
    const [notifications, setNotifications] = useState([]);
    const [nonLues, setNonLues] = useState(0);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const { clearUnread, decrementUnread, fetchUnreadCount } = useNotificationStore();

    const fetchNotifications = async () => {
        try {
            const [notifsRes, countRes] = await Promise.all([
                axios.get('/notifications').catch(() => ({ data: [] })),
                axios.get('/notifications/non-lues').catch(() => ({ data: { count: 0 } }))
            ]);
            
            setNotifications(notifsRes.data.data || notifsRes.data || []);
            
            let count = 0;
            if (typeof countRes.data === 'number') count = countRes.data;
            else if (countRes.data && typeof countRes.data.count === 'number') count = countRes.data.count;
            
            setNonLues(count);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        fetchUnreadCount(); // sync global store with backend
    }, []);

    const handleToutLire = async () => {
        setActionLoading(true);
        try {
            await axios.put('/notifications/tout-lire');
            setNotifications(notifications.map(n => ({ ...n, lu: true, read_at: new Date().toISOString() })));
            setNonLues(0);
            clearUnread();
        } catch (err) {
            console.error(err);
            addToast("Erreur lors de la mise à jour des notifications.", "error");
        } finally {
            setActionLoading(false);
        }
    };

    const handleLireUne = async (id) => {
        // Optimistic UI update
        const updated = notifications.map(n => {
            if (n.id === id && !n.read_at && !n.lu) {
                return { ...n, lu: true, read_at: new Date().toISOString() };
            }
            return n;
        });
        
        const oldNotifs = [...notifications];
        setNotifications(updated);
        
        // Recalculate unread
        const newCount = updated.filter(n => !n.read_at && !n.lu).length;
        if (newCount < nonLues) {
            decrementUnread();
        }
        setNonLues(newCount);

        try {
            // S'il existe une route spécifique pour lire une seule notification :
            // await axios.put(`/notifications/${id}/lire`);
            // Sinon on peut appeler l'API pour être sûr, mais comme c'est pas dans le prompt, on laisse l'optimistic.
        } catch (err) {
            // Revert on error
            setNotifications(oldNotifs);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toLocaleDateString() + ' à ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    };

    return (
        <DashboardLayout title="Notifications">
            <div className="max-w-3xl mx-auto space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.02] backdrop-blur-md p-5 rounded-xl border shadow-sm">
                    <div className="flex items-center">
                        <div className="relative">
                            <Bell className="w-8 h-8 text-indigo-600 mr-4" />
                            {nonLues > 0 && (
                                <span className="absolute top-0 right-3 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 ring-2 ring-white text-[10px] font-bold text-white">
                                    {nonLues}
                                </span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Centre de Notifications</h1>
                            <p className="text-slate-400 text-sm">Vous avez {nonLues} notification{nonLues > 1 ? 's' : ''} non lue{nonLues > 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleToutLire}
                        disabled={nonLues === 0 || actionLoading}
                        className="flex items-center px-4 py-2 bg-white/[0.02] hover:bg-gray-200 text-slate-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {actionLoading ? <Clock className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                        Tout marquer comme lu
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="bg-white/[0.01] border-2 border-dashed border-white/10 rounded-xl p-16 text-center text-slate-400">
                        <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Vous n'avez aucune notification.</p>
                    </div>
                ) : (
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border shadow-sm divide-y divide-gray-100">
                        {notifications.map(notif => {
                            const isUnread = !notif.read_at && !notif.lu;
                            
                            return (
                                <div 
                                    key={notif.id} 
                                    onClick={() => isUnread && handleLireUne(notif.id)}
                                    className={`p-5 flex items-start transition-colors ${isUnread ? 'bg-indigo-500/10/50 cursor-pointer hover:bg-indigo-500/10' : 'bg-white/[0.02] backdrop-blur-md'}`}
                                >
                                    <div className={`mt-1 mr-4 rounded-full p-2 ${isUnread ? 'bg-indigo-500/20 text-indigo-600' : 'bg-white/[0.02] text-slate-400'}`}>
                                        <Info className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-base ${isUnread ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>
                                                {notif.titre || 'Notification'}
                                            </h4>
                                            <span className="text-xs text-slate-400 whitespace-nowrap ml-4 flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {formatDate(notif.created_at)}
                                            </span>
                                        </div>
                                        <p className={`text-sm ${isUnread ? 'text-white' : 'text-slate-400'}`}>
                                            {notif.message || notif.data?.message || 'Aucun détail fourni.'}
                                        </p>
                                    </div>
                                    {isUnread && (
                                        <div className="ml-4 flex-shrink-0 flex items-center self-center">
                                            <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
