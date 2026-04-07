import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Activity, Map, Users, BookOpen, UploadCloud, Cpu, ClipboardCheck, Star, Shield } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-indigo-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1600&q=80"
            alt="Happy dog"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative px-6 py-16 sm:py-24 lg:px-8 lg:py-32 text-center">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">PawCheck</span>
            <span className="block text-indigo-300 mt-2">AI-Powered Pet Care</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-indigo-100 sm:max-w-3xl">
            {t('welcome_desc')}
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
            <Link
              to="/assessment"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-indigo-900 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              {t('start_assessment')}
            </Link>
            <Link
              to="/vets"
              className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-800 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              {t('find_vets')}
            </Link>
          </div>
        </div>
      </div>

      {/* How PawCheck Works Section */}
      <div className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How PawCheck Works</h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Our AI-powered health assessment provides preliminary guidance to help you make informed decisions about your pet's care.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
              <UploadCloud className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">1. Describe Symptoms</h3>
            <p className="text-slate-500 dark:text-slate-400">Tell us what you're observing. You can also upload a photo of any visible issues like rashes or injuries.</p>
          </div>
          <div className="text-center space-y-4 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
              <Cpu className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">2. AI Analysis</h3>
            <p className="text-slate-500 dark:text-slate-400">Our TensorFlow.js model analyzes the information securely in your browser to identify potential conditions.</p>
          </div>
          <div className="text-center space-y-4 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="w-16 h-16 mx-auto bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center">
              <ClipboardCheck className="h-8 w-8 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">3. Get Guidance</h3>
            <p className="text-slate-500 dark:text-slate-400">Receive an assessment report with severity levels and recommendations on whether to seek immediate veterinary care.</p>
          </div>
        </div>
        
        <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 max-w-4xl mx-auto">
          <Shield className="h-12 w-12 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <div>
            <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-1">Privacy First</h4>
            <p className="text-indigo-800 dark:text-indigo-400/80">All AI image analysis happens directly on your device. We never upload your pet's photos to our servers for health assessments.</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/assessment" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t('assessment')}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Upload a photo and describe symptoms for an instant AI-powered preliminary health analysis.</p>
        </Link>

        <Link to="/vets" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Map className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{t('vet_locator')}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Find nearby veterinary clinics and hospitals using our integrated map locator.</p>
        </Link>

        <Link to="/community" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{t('community')}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Connect with other pet owners, share experiences, and get advice from the community.</p>
        </Link>

        <Link to="/blog" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="h-6 w-6 text-rose-600 dark:text-rose-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{t('blog')}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Read educational articles about pet care, common diseases, and prevention strategies.</p>
        </Link>
      </div>

      {/* Reviews Section */}
      <div className="py-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Trusted by Pet Parents</h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 text-amber-400 fill-current" />
              ))}
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">4.9/5</span>
            <span className="text-slate-500 dark:text-slate-400">(2k+ reviews)</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah M.", pet: "Luna (Golden Retriever)", review: "PawCheck gave me peace of mind when Luna had a weird rash. The AI suggested it was a mild allergy, and the home care tips worked perfectly!", rating: 5, img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&q=80" },
            { name: "David K.", pet: "Milo (Tabby Cat)", review: "The vet locator is a lifesaver. Found an emergency clinic at 2 AM when Milo was vomiting. Highly recommend this app to all pet parents.", rating: 5, img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=100&q=80" },
            { name: "Emily R.", pet: "Bella (Pug)", review: "Love the community feature! It's so helpful to talk to other Pug owners about breathing issues and get real-world advice.", rating: 4, img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=100&q=80" }
          ].map((review, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative">
              <div className="flex items-center gap-4 mb-4">
                <img src={review.img} alt={review.pet} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-900" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{review.pet}</p>
                </div>
              </div>
              <div className="flex text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-600'}`} />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic">"{review.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

