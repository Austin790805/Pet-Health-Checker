import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Stethoscope, MapPin, Users, BookOpen, LogOut, Globe } from 'lucide-react';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/auth');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sw' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <Stethoscope className="h-8 w-8 text-indigo-600" />
                <span className="font-bold text-xl text-slate-900 hidden sm:block">
                  {t('app_name')}
                </span>
              </Link>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/assessment" className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t('assessment')}
                </Link>
                <Link to="/vets" className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t('vet_locator')}
                </Link>
                <Link to="/community" className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t('community')}
                </Link>
                <Link to="/blog" className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t('blog')}
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-100 flex items-center gap-1"
                title={t('language')}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium uppercase">{i18n.language}</span>
              </button>
              
              {user ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('logout')}</span>
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="sm:hidden bg-white border-b border-slate-200 flex justify-around p-2">
        <Link to="/assessment" className="text-slate-500 hover:text-indigo-600 p-2"><Stethoscope className="h-6 w-6" /></Link>
        <Link to="/vets" className="text-slate-500 hover:text-indigo-600 p-2"><MapPin className="h-6 w-6" /></Link>
        <Link to="/community" className="text-slate-500 hover:text-indigo-600 p-2"><Users className="h-6 w-6" /></Link>
        <Link to="/blog" className="text-slate-500 hover:text-indigo-600 p-2"><BookOpen className="h-6 w-6" /></Link>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {t('app_name')}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
