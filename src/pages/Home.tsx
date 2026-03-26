import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Activity, Map, Users, BookOpen } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8 py-12">
        <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
          <span className="block">{t('welcome')}</span>
          <span className="block text-indigo-600 mt-2">AI-Powered Care</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-slate-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {t('welcome_desc')}
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/assessment"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              {t('start_assessment')}
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Activity className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('assessment')}</h3>
          <p className="text-slate-500 text-sm">Upload a photo and describe symptoms for an instant AI-powered preliminary health analysis.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <Map className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('vet_locator')}</h3>
          <p className="text-slate-500 text-sm">Find nearby veterinary clinics and hospitals using our integrated map locator.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('community')}</h3>
          <p className="text-slate-500 text-sm">Connect with other pet owners, share experiences, and get advice from the community.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-rose-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('blog')}</h3>
          <p className="text-slate-500 text-sm">Read educational articles about pet care, common diseases, and prevention strategies.</p>
        </div>
      </div>
    </div>
  );
}
