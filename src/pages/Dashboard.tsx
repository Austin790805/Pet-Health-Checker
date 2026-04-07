import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { Activity, Calendar, MessageSquare, Plus, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { t } = useTranslation();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Mock data for dashboard
  const pets = [
    { id: 1, name: "Max", type: "Dog", breed: "Golden Retriever", age: "3 years", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80" },
    { id: 2, name: "Luna", type: "Cat", breed: "Siamese", age: "2 years", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80" }
  ];

  const activities = [
    { id: 1, type: 'assessment', text: "Completed health assessment for Max", date: "2 days ago", icon: Activity, color: "text-indigo-600", bg: "bg-indigo-100 dark:bg-indigo-900/50" },
    { id: 2, type: 'appointment', text: "Booked appointment with Dr. Smith", date: "1 week ago", icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/50" },
    { id: 3, type: 'community', text: "Replied to 'Best food for sensitive stomachs'", date: "2 weeks ago", icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/50" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'Pet Parent'}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here's what's happening with your pets.</p>
        </div>
        <Link to="/assessment" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Activity className="h-4 w-4" />
          New Assessment
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Pets & Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pet Profiles */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Pets</h2>
              <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Pet
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pets.map(pet => (
                <div key={pet.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <img src={pet.img} alt={pet.name} className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{pet.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{pet.breed} • {pet.age}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${activity.bg}`}>
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 dark:text-white font-medium">{activity.text}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions & Reminders */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Upcoming Reminders</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-900/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-emerald-900 dark:text-emerald-300">Annual Checkup - Max</h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">Tomorrow, 10:00 AM</p>
                  </div>
                  <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                </div>
              </div>
              <div className="p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-amber-900 dark:text-amber-300">Flea & Tick Medication</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">In 3 days</p>
                  </div>
                  <Activity className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                </div>
              </div>
            </div>
            <Link to="/appointments" className="mt-6 w-full block text-center py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              Manage Appointments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
