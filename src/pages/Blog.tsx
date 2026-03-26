import { useState, useEffect } from 'react';
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
}

const MOCK_BLOGS = [
  {
    id: '1',
    title: 'Understanding Canine Parvovirus',
    content: 'Canine parvovirus is a highly contagious viral illness that affects dogs. The virus manifests itself in two different forms. The more common form is the intestinal form, which is characterized by vomiting, diarrhea, weight loss and lack of appetite (anorexia). The less common form is the cardiac form, which attacks the heart muscles of fetuses and very young puppies, often leading to death.',
    authorId: 'admin',
    category: 'Diseases',
    createdAt: { toDate: () => new Date() }
  },
  {
    id: '2',
    title: 'Essential Vaccinations for Your Kitten',
    content: 'Vaccinations are a critical part of your kitten\'s preventative healthcare. Core vaccines include Feline Panleukopenia (FVRCP), Feline Calicivirus, Feline Herpesvirus Type I (Rhinotracheitis), and Rabies. Non-core vaccines may be recommended based on your cat\'s lifestyle, such as Feline Leukemia Virus (FeLV).',
    authorId: 'admin',
    category: 'Prevention',
    createdAt: { toDate: () => new Date(Date.now() - 86400000) }
  },
  {
    id: '3',
    title: 'Signs of Heatstroke in Pets',
    content: 'Heatstroke is a medical emergency. Signs include excessive panting, drooling, reddened gums, vomiting, diarrhea, mental dullness or loss of consciousness, uncoordinated movement, and collapse. If you suspect heatstroke, move your pet to a cool area immediately and contact a veterinarian.',
    authorId: 'admin',
    category: 'Emergency Care',
    createdAt: { toDate: () => new Date(Date.now() - 172800000) }
  }
];

export default function Blog() {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);

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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-8">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8 text-rose-600" />
          Educational Blog
        </h2>
        <p className="max-w-2xl mx-auto text-xl text-slate-500">
          Learn about common pet diseases, symptoms, prevention, and care strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="flex flex-col rounded-2xl shadow-sm overflow-hidden border border-slate-100 bg-white hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              <div className="h-48 w-full object-cover bg-rose-100 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-rose-300" />
              </div>
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-rose-600">
                  {blog.category}
                </p>
                <a href="#" className="block mt-2">
                  <p className="text-xl font-semibold text-slate-900">{blog.title}</p>
                  <p className="mt-3 text-base text-slate-500 line-clamp-3">{blog.content}</p>
                </a>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-500 gap-1">
                  <Clock className="h-4 w-4" />
                  <time dateTime={blog.createdAt?.toDate ? new Date(blog.createdAt.toDate()).toISOString() : new Date().toISOString()}>
                    {blog.createdAt?.toDate ? new Date(blog.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                  </time>
                </div>
                <button className="text-rose-600 hover:text-rose-700 font-medium text-sm flex items-center gap-1">
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
