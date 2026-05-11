import { useState, useEffect } from 'react';
import axios from '../lib/axios';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/layout/DashboardLayout';
import { MessageSquare, Heart, Send, Clock, Plus, X } from 'lucide-react';

export default function Forum() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formData, setFormData] = useState({ titre: '', contenu: '' });

    const fetchPosts = async () => {
        try {
            const res = await axios.get('/forum');
            // Assuming data is inside res.data.data or res.data due to pagination
            const fetchedPosts = res.data.data || res.data;
            setPosts(Array.isArray(fetchedPosts) ? fetchedPosts : []);
        } catch (err) {
            setError("Erreur lors du chargement du forum.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            await axios.post('/forum', formData);
            setFormData({ titre: '', contenu: '' });
            setShowForm(false);
            fetchPosts();
        } catch (err) {
            alert("Erreur lors de la création du post.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleLike = async (postId) => {
        try {
            // Optimistic update
            setPosts(posts.map(p => {
                if (p.id === postId) {
                    const isLiked = p.is_liked_by_user;
                    return {
                        ...p,
                        is_liked_by_user: !isLiked,
                        likes_count: isLiked ? p.likes_count - 1 : p.likes_count + 1
                    };
                }
                return p;
            }));
            
            await axios.post(`/forum/${postId}/liker`);
            // Optionally refetch to ensure exact count, but optimistic is better for UX
        } catch (err) {
            // Revert on error
            fetchPosts();
            console.error(err);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toLocaleDateString() + ' à ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    };

    return (
        <DashboardLayout title="Forum de Discussion">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center bg-white/[0.02] backdrop-blur-md p-5 rounded-xl border shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center">
                            <MessageSquare className="w-6 h-6 mr-3 text-indigo-600" /> Espace Communautaire
                        </h1>
                        <p className="text-slate-400 mt-1">Partagez vos idées, questions et actualités avec le club.</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center transition-colors shadow-sm"
                    >
                        {showForm ? <X className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
                        {showForm ? 'Annuler' : 'Nouveau Post'}
                    </button>
                </div>

                {/* Formulaire de création */}
                {showForm && (
                    <div className="bg-white/[0.02] backdrop-blur-md p-6 rounded-xl border shadow-md animate-in fade-in slide-in-from-top-4">
                        <h2 className="text-lg font-bold text-white mb-4">Créer une discussion</h2>
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Titre de la discussion</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    value={formData.titre}
                                    onChange={(e) => setFormData({...formData, titre: e.target.value})}
                                    placeholder="De quoi voulez-vous parler ?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Contenu du message</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-y"
                                    value={formData.contenu}
                                    onChange={(e) => setFormData({...formData, contenu: e.target.value})}
                                    placeholder="Détaillez votre sujet ici..."
                                ></textarea>
                            </div>
                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center transition-colors disabled:opacity-70"
                                >
                                    {submitLoading ? <Clock className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                                    Publier
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {error && (
                    <div className="bg-rose-500/10 text-rose-400 p-4 rounded-xl border border-rose-500/20">
                        {error}
                    </div>
                )}

                {/* Liste des posts */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="bg-white/[0.01] border-2 border-dashed border-white/10 rounded-xl p-16 text-center text-slate-400">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">Le forum est vide pour le moment.</p>
                        <p className="text-sm mt-2">Soyez le premier à lancer une discussion !</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map(post => (
                            <div key={post.id} className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg mr-3">
                                            {post.user?.name ? post.user.name.charAt(0).toUpperCase() : '?'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{post.user?.name || 'Auteur inconnu'}</h4>
                                            <div className="flex items-center text-xs text-slate-400">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {formatDate(post.created_at)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="ml-13 mb-4">
                                    <h3 className="text-xl font-bold text-white mb-2">{post.titre}</h3>
                                    <p className="text-slate-300 whitespace-pre-wrap">{post.contenu}</p>
                                </div>
                                
                                <div className="ml-13 flex items-center gap-4 pt-3 border-t border-white/5">
                                    <button 
                                        onClick={() => handleLike(post.id)}
                                        className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                            post.is_liked_by_user 
                                            ? 'bg-rose-500/10 text-rose-400 hover:bg-red-100' 
                                            : 'bg-white/[0.01] text-slate-400 hover:bg-white/[0.02]'
                                        }`}
                                    >
                                        <Heart className={`w-4 h-4 mr-1.5 ${post.is_liked_by_user ? 'fill-current' : ''}`} />
                                        {post.likes_count || 0} J'aime
                                    </button>
                                    {/* On pourrait ajouter un bouton Commentaires ici dans une version future */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
