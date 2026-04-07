import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Users, AlertCircle, MessageSquare, Clock, Heart, Share2, MessageCircle, Image as ImageIcon } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  petType: string;
  condition: string;
  createdAt: any;
  likes?: number;
  replies?: number;
  imageUrl?: string;
  authorAvatar?: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: 'mock-1',
    title: 'Tips for a picky eater?',
    content: 'My 2-year-old Golden Retriever suddenly stopped eating his kibble. He still takes treats, so I don\'t think he\'s sick, just being stubborn. Any advice on how to make his meals more appealing?',
    authorId: 'user1',
    authorName: 'Sarah Jenkins',
    petType: 'dog',
    condition: 'Diet',
    createdAt: { toDate: () => new Date(Date.now() - 3600000) },
    likes: 24,
    replies: 8,
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'mock-2',
    title: 'Cat scratching furniture - help!',
    content: 'I\'ve bought 3 different scratching posts, but Luna still prefers the side of my new sofa. I\'ve tried catnip spray and double-sided tape. What worked for your cats?',
    authorId: 'user2',
    authorName: 'Mike Chen',
    petType: 'cat',
    condition: 'Behavior',
    createdAt: { toDate: () => new Date(Date.now() - 86400000) },
    likes: 15,
    replies: 12,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'mock-3',
    title: 'Successful recovery from Parvo!',
    content: 'Just wanted to share some good news. After a terrifying week at the emergency vet, little Buster is finally home and eating on his own. Thank you to everyone who shared their recovery stories here, it really gave me hope when things looked bleak.',
    authorId: 'user3',
    authorName: 'Emily Rodriguez',
    petType: 'dog',
    condition: 'Recovery',
    createdAt: { toDate: () => new Date(Date.now() - 172800000) },
    likes: 142,
    replies: 35,
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
  }
];

export default function Community() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [petType, setPetType] = useState('dog');
  const [condition, setCondition] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        likes: Math.floor(Math.random() * 20), // Mock likes
        replies: Math.floor(Math.random() * 5), // Mock replies
        ...doc.data()
      })) as Post[];
      
      // Combine fetched posts with mock posts
      setPosts([...fetchedPosts, ...MOCK_POSTS]);
    }, (err) => {
      console.error("Error fetching posts:", err);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setError('You must be logged in to post.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || auth.currentUser.email?.split('@')[0] || 'Anonymous',
        petType,
        condition,
        createdAt: serverTimestamp()
      });
      
      setTitle('');
      setContent('');
      setCondition('');
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 flex items-center gap-3">
            <Users className="h-10 w-10" />
            PawCheck Community
          </h1>
          <p className="text-lg md:text-xl text-amber-50 mb-6">
            Connect with other pet parents, share experiences, ask questions, and find support for your furry friends.
          </p>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5 text-amber-100" />
            <p className="text-sm font-medium text-amber-50">{t('community_disclaimer')}</p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none hidden md:block">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-2-4c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Post Form (Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-amber-500" />
              {t('new_post')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>}
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{t('title')}</label>
                <input
                  type="text"
                  required
                  placeholder="What's on your mind?"
                  className="w-full border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border p-3 transition-colors"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{t('pet_type')}</label>
                  <select
                    className="w-full border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border p-3 transition-colors"
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                  >
                    <option value="dog">{t('dog')}</option>
                    <option value="cat">{t('cat')}</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Topic</label>
                  <input
                    type="text"
                    className="w-full border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border p-3 transition-colors"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    placeholder="e.g., Diet"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{t('content')}</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details, ask questions..."
                  className="w-full border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border p-3 transition-colors resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !auth.currentUser}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Posting...' : t('post')}
              </button>
              {!auth.currentUser && (
                <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-3">
                  Please <a href="/auth" className="text-amber-600 dark:text-amber-400 hover:underline">log in</a> to post
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="lg:col-span-8 space-y-6">
          {posts.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl border border-slate-100 dark:border-slate-700 text-center text-slate-500 dark:text-slate-400">
              <MessageSquare className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-lg">No posts yet. Be the first to start a discussion!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={post.authorAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorId}`} 
                          alt={post.authorName} 
                          className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{post.authorName}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 capitalize">
                              {post.petType}
                            </span>
                            {post.condition && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300">
                                {post.condition}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{post.title}</h2>
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap mb-6 leading-relaxed text-lg">{post.content}</p>
                    
                    {post.imageUrl && (
                      <div className="mb-6 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
                        <img src={post.imageUrl} alt="Post attachment" className="w-full h-auto max-h-96 object-cover" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors group"
                        >
                          <div className="p-2 rounded-full group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 transition-colors">
                            <Heart className="h-5 w-5" />
                          </div>
                          <span className="font-medium">{post.likes || 0}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                            <MessageCircle className="h-5 w-5" />
                          </div>
                          <span className="font-medium">{post.replies || 0}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                            <Share2 className="h-5 w-5" />
                          </div>
                        </button>
                      </div>
                      <button 
                        onClick={() => alert('Post reported to moderators.')}
                        className="text-sm font-medium text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
