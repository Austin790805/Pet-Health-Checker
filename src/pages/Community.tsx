import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Users, AlertCircle, MessageSquare, Clock } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  petType: string;
  condition: string;
  createdAt: any;
}

export default function Community() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [petType, setPetType] = useState('dog');
  const [condition, setCondition] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postsData);
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

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-amber-800">
        <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
        <p className="text-sm font-medium">{t('community_disclaimer')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Post Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-amber-600" />
              {t('new_post')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('title')}</label>
                <input
                  type="text"
                  required
                  className="w-full border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border p-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('pet_type')}</label>
                <select
                  className="w-full border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border p-2"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                >
                  <option value="dog">{t('dog')}</option>
                  <option value="cat">{t('cat')}</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Condition (Optional)</label>
                <input
                  type="text"
                  className="w-full border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border p-2"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="e.g., Allergies, Anxiety"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('content')}</label>
                <textarea
                  required
                  rows={4}
                  className="w-full border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border p-2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !auth.currentUser}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                {loading ? 'Posting...' : t('post')}
              </button>
              {!auth.currentUser && (
                <p className="text-xs text-center text-slate-500 mt-2">Login to post</p>
              )}
            </form>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-amber-600" />
            {t('community')} Discussions
          </h2>

          {posts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center text-slate-500">
              No posts yet. Be the first to start a discussion!
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{post.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                        <span className="font-medium text-slate-700">{post.authorName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                        {post.petType}
                      </span>
                      {post.condition && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                          {post.condition}
                        </span>
                      )}
                      <button 
                        onClick={() => alert('Post reported to moderators.')}
                        className="text-xs text-slate-400 hover:text-red-500 ml-2"
                        title="Report post"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-700 whitespace-pre-wrap">{post.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
