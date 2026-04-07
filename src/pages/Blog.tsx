import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  category: string;
  createdAt: any;
  imageUrl?: string;
}

const MOCK_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Canine Parvovirus',
    content: 'Canine parvovirus is a highly contagious viral illness that affects dogs. The virus manifests itself in two different forms. The more common form is the intestinal form, which is characterized by vomiting, diarrhea, weight loss and lack of appetite (anorexia). The less common form is the cardiac form, which attacks the heart muscles of fetuses and very young puppies, often leading to death.',
    authorId: 'admin',
    category: 'Diseases',
    createdAt: { toDate: () => new Date() },
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Essential Vaccinations for Your Kitten',
    content: 'Vaccinations are a critical part of your kitten\'s preventative healthcare. Core vaccines include Feline Panleukopenia (FVRCP), Feline Calicivirus, Feline Herpesvirus Type I (Rhinotracheitis), and Rabies. Non-core vaccines may be recommended based on your cat\'s lifestyle, such as Feline Leukemia Virus (FeLV).',
    authorId: 'admin',
    category: 'Prevention',
    createdAt: { toDate: () => new Date(Date.now() - 86400000) },
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Signs of Heatstroke in Pets',
    content: 'Heatstroke is a medical emergency. Signs include excessive panting, drooling, reddened gums, vomiting, diarrhea, mental dullness or loss of consciousness, uncoordinated movement, and collapse. If you suspect heatstroke, move your pet to a cool area immediately and contact a veterinarian.',
    authorId: 'admin',
    category: 'Emergency Care',
    createdAt: { toDate: () => new Date(Date.now() - 172800000) },
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'The Best Diet for Senior Dogs',
    content: 'As dogs age, their nutritional needs change. Senior dogs often require diets lower in calories but higher in fiber and certain supplements like glucosamine for joint health. Always consult your vet before making significant dietary changes.',
    authorId: 'admin',
    category: 'Nutrition',
    createdAt: { toDate: () => new Date(Date.now() - 259200000) },
    imageUrl: 'https://images.unsplash.com/photo-1537151608804-ea2f14cb3981?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Dental Care Tips for Cats',
    content: 'Dental disease is one of the most common medical conditions seen by veterinarians. Brushing your cat\'s teeth, providing dental treats, and regular checkups can prevent plaque buildup and periodontal disease.',
    authorId: 'admin',
    category: 'Prevention',
    createdAt: { toDate: () => new Date(Date.now() - 345600000) },
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    title: 'Recognizing Anxiety in Pets',
    content: 'Pets can suffer from anxiety just like humans. Look out for signs such as excessive barking, destructive behavior, pacing, or hiding. Creating a safe space and maintaining a routine can help alleviate stress.',
    authorId: 'admin',
    category: 'Behavior',
    createdAt: { toDate: () => new Date(Date.now() - 432000000) },
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'
  }
];

export default function Blog() {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const blogsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setBlogs(blogsData);
      }
    }, (err) => {
      console.error("Error fetching blogs:", err);
    });

    return () => unsubscribe();
  }, []);

  const categories = ['all', 'Diseases', 'Prevention', 'Emergency Care', 'Nutrition', 'Behavior'];

  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(b => b.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8 text-rose-600 dark:text-rose-500" />
          Educational Blog
        </h2>
        <p className="max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400">
          Learn about common pet diseases, symptoms, prevention, and care strategies.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              selectedCategory === category 
                ? 'bg-rose-600 text-white shadow-md' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="flex flex-col rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              {blog.imageUrl ? (
                <img src={blog.imageUrl} alt={blog.title} className="h-48 w-full object-cover transition-transform hover:scale-105 duration-500" />
              ) : (
                <div className="h-48 w-full object-cover bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-rose-300 dark:text-rose-700" />
                </div>
              )}
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
                  {blog.category}
                </p>
                <a href="#" className="block mt-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white line-clamp-2">{blog.title}</h3>
                  <p className="mt-3 text-base text-slate-500 dark:text-slate-400 line-clamp-3">{blog.content}</p>
                </a>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 gap-1">
                  <Clock className="h-4 w-4" />
                  <time dateTime={blog.createdAt?.toDate ? new Date(blog.createdAt.toDate()).toISOString() : new Date().toISOString()}>
                    {blog.createdAt?.toDate ? new Date(blog.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                  </time>
                </div>
                <button className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium text-sm flex items-center gap-1">
                  Read More <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
