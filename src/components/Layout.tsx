import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Stethoscope, MapPin, Users, BookOpen, LogOut, Globe, PawPrint, Moon, Sun, Bell, LayoutDashboard, Calendar } from 'lucide-react';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    
    // Check local storage for dark mode preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
    
    return unsubscribe;
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/auth');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sw' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <PawPrint className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <span className="font-bold text-xl text-slate-900 dark:text-white hidden sm:block">
                  {t('app_name')}
                </span>
              </Link>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/dashboard" className="border-transparent text-slate-500 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t('dashboard')}
                </Link>
                <Link to="/assessment" className="border-transparent text-slate-500 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t('assessment')}
                </Link>
                <Link to="/vets" className="border-transparent text-slate-500 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t('vet_locator')}
                </Link>
                <Link to="/appointments" className="border-transparent text-slate-500 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t('appointments')}
                </Link>
                <Link to="/community" className="border-transparent text-slate-500 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t('community')}
                </Link>
                <Link to="/blog" className="border-transparent text-slate-500 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t('blog')}
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center relative"
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                {notificationsEnabled && <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800" />}
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center"
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={toggleLanguage}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1"
                title={t('language')}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium uppercase hidden sm:inline">{i18n.language}</span>
              </button>
              
              {user ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('logout')}</span>
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="sm:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex justify-around p-2 overflow-x-auto">
        <Link to="/dashboard" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"><LayoutDashboard className="h-6 w-6" /></Link>
        <Link to="/assessment" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"><Stethoscope className="h-6 w-6" /></Link>
        <Link to="/vets" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"><MapPin className="h-6 w-6" /></Link>
        <Link to="/appointments" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"><Calendar className="h-6 w-6" /></Link>
        <Link to="/community" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"><Users className="h-6 w-6" /></Link>
        <Link to="/blog" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"><BookOpen className="h-6 w-6" /></Link>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-auto transition-colors duration-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* PawCheck with Logo */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <PawPrint className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <span className="font-bold text-xl text-slate-900 dark:text-white">
                  {t('app_name')}
                </span>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Empowering pet parents with AI-driven health insights and a supportive community.
              </p>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link to="/assessment" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Health Assessment</Link></li>
                <li><Link to="/vets" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Vet Locator</Link></li>
                <li><Link to="/appointments" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Appointments</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/community" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Community</Link></li>
                <li><Link to="/blog" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Blog</Link></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</a></li>
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase mb-4">Subscribe</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Get the latest pet health tips and news.</p>
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} {t('app_name')}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
