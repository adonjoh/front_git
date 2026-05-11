import { useState, useEffect, useRef } from 'react';
import axios from '../lib/axios';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Users, MessageCircle, Send, Hash, ArrowLeft } from 'lucide-react';

export default function MesGroupes() {
    const { user } = useAuth();
    const [groupes, setGroupes] = useState([]);
    const [activeGroup, setActiveGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingGroupes, setLoadingGroupes] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    // Fetch list of user's groups
    useEffect(() => {
        const fetchGroupes = async () => {
            try {
                const res = await axios.get('/mes-groupes');
                setGroupes(res.data.data || res.data || []);
            } catch (err) {
                console.error("Erreur lors du chargement de mes groupes", err);
            } finally {
                setLoadingGroupes(false);
            }
        };
        fetchGroupes();
    }, []);

    // Fetch messages when a group is selected
    useEffect(() => {
        if (!activeGroup) return;
        
        const fetchMessages = async () => {
            setLoadingMessages(true);
            try {
                const res = await axios.get(`/groups/${activeGroup.id}/messages`);
                setMessages(res.data.data || res.data || []);
            } catch (err) {
                console.error("Erreur lors du chargement des messages", err);
            } finally {
                setLoadingMessages(false);
            }
        };
        
        fetchMessages();
        
        // Polling pour les nouveaux messages (optionnel, idéalement WebSocket)
        const intervalId = setInterval(fetchMessages, 10000); // 10s refresh
        return () => clearInterval(intervalId);
    }, [activeGroup]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeGroup) return;

        setSending(true);
        try {
            await axios.post(`/groups/${activeGroup.id}/messages`, {
                contenu: newMessage
            });
            setNewMessage('');
            // Refetch messages or append optimistically
            const res = await axios.get(`/groups/${activeGroup.id}/messages`);
            setMessages(res.data.data || res.data || []);
        } catch (err) {
            alert("Erreur lors de l'envoi du message.");
        } finally {
            setSending(false);
        }
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    };

    return (
        <DashboardLayout title="Mes Groupes de Discussion">
            <div className="bg-white/[0.02] backdrop-blur-md rounded-2xl border shadow-sm overflow-hidden h-[calc(100vh-140px)] flex">
                
                {/* Liste des groupes (Sidebar) */}
                <div className={`${activeGroup ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-white/10 bg-white/[0.01] h-full`}>
                    <div className="p-4 border-b border-white/10 bg-white/[0.02] backdrop-blur-md">
                        <h2 className="font-bold text-white flex items-center">
                            <Users className="w-5 h-5 mr-2 text-indigo-600" />
                            Mes Discussions
                        </h2>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                        {loadingGroupes ? (
                            <div className="p-8 text-center text-slate-400">Chargement...</div>
                        ) : groupes.length === 0 ? (
                            <div className="p-8 text-center text-slate-400">
                                <p className="text-sm">Vous n'êtes membre d'aucun groupe.</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {groupes.map(groupe => (
                                    <li key={groupe.id}>
                                        <button
                                            onClick={() => setActiveGroup(groupe)}
                                            className={`w-full text-left px-4 py-4 hover:bg-indigo-500/10 transition-colors flex items-center gap-3 ${activeGroup?.id === groupe.id ? 'bg-indigo-500/10 border-l-4 border-indigo-600' : 'border-l-4 border-transparent'}`}
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/10 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0 shadow-sm">
                                                <Hash className="w-5 h-5" />
                                            </div>
                                            <div className="overflow-hidden flex-1">
                                                <h3 className="font-bold text-white truncate">{groupe.nom}</h3>
                                                <p className="text-xs text-slate-400 truncate">{groupe.description || 'Groupe de discussion'}</p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Zone de Chat */}
                <div className={`${!activeGroup ? 'hidden md:flex' : 'flex'} flex-col flex-1 h-full bg-white/[0.02] backdrop-blur-md`}>
                    {!activeGroup ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-lg font-medium">Sélectionnez un groupe pour commencer à discuter</p>
                        </div>
                    ) : (
                        <>
                            {/* Chat Header */}
                            <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center shadow-sm z-10">
                                <button 
                                    className="md:hidden mr-4 text-slate-400 hover:text-indigo-600"
                                    onClick={() => setActiveGroup(null)}
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                                <div>
                                    <h2 className="font-bold text-white text-lg flex items-center">
                                        <Hash className="w-5 h-5 text-slate-500 mr-1" />
                                        {activeGroup.nom}
                                    </h2>
                                    <p className="text-xs text-slate-400">{activeGroup.description}</p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 bg-white/[0.01] space-y-4">
                                {loadingMessages && messages.length === 0 ? (
                                    <div className="flex justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="text-center py-12 text-slate-500">
                                        Soyez le premier à envoyer un message !
                                    </div>
                                ) : (
                                    messages.map((msg, index) => {
                                        const isMe = msg.user_id === user?.id;
                                        const showHeader = index === 0 || messages[index - 1].user_id !== msg.user_id;
                                        
                                        return (
                                            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                                {showHeader && !isMe && (
                                                    <span className="text-xs font-medium text-slate-400 mb-1 ml-1">{msg.user?.name || 'Inconnu'}</span>
                                                )}
                                                <div className={`max-w-[75%] px-4 py-2 rounded-2xl relative ${isMe ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white/[0.02] backdrop-blur-md border border-white/10 text-white rounded-tl-sm shadow-sm'}`}>
                                                    <p className="text-sm whitespace-pre-wrap break-words">{msg.contenu}</p>
                                                    <span className={`text-[10px] block mt-1 text-right ${isMe ? 'text-indigo-200' : 'text-slate-500'}`}>
                                                        {formatDate(msg.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 bg-white/[0.02] backdrop-blur-md border-t border-white/10">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Écrivez votre message..."
                                        className="flex-1 bg-white/[0.02] border-transparent focus:bg-white/[0.02] backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-full px-5 py-2.5 outline-none transition-all"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim() || sending}
                                        className="w-11 h-11 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-colors flex-shrink-0 shadow-sm"
                                    >
                                        <Send className="w-5 h-5 ml-1" />
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
