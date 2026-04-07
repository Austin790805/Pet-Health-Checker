import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, MapPin, Star, Phone } from 'lucide-react';

export default function Appointments() {
  const { t } = useTranslation();
  const [selectedVet, setSelectedVet] = useState<number | null>(null);

  const vets = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      clinic: "Paws & Claws Veterinary Clinic",
      rating: 4.9,
      reviews: 128,
      distance: "2.5 miles",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
      specialties: ["General Practice", "Surgery"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      clinic: "City Pet Hospital",
      rating: 4.8,
      reviews: 95,
      distance: "3.1 miles",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80",
      specialties: ["Emergency Care", "Dentistry"]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      clinic: "Sunrise Animal Care",
      rating: 4.7,
      reviews: 210,
      distance: "4.0 miles",
      image: "https://images.unsplash.com/photo-1594824436998-dd40e4fcbe04?auto=format&fit=crop&w=200&q=80",
      specialties: ["Feline Specialist", "Dermatology"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Book an Appointment</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Find and schedule visits with top-rated veterinarians near you.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vet List */}
        <div className="lg:col-span-2 space-y-6">
          {vets.map((vet) => (
            <div 
              key={vet.id} 
              className={`bg-white dark:bg-slate-800 p-6 rounded-2xl border transition-all cursor-pointer ${selectedVet === vet.id ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 shadow-sm'}`}
              onClick={() => setSelectedVet(vet.id)}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <img src={vet.image} alt={vet.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{vet.name}</h3>
                      <p className="text-slate-600 dark:text-slate-300 font-medium">{vet.clinic}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-md">
                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                      <span className="font-bold text-amber-700 dark:text-amber-400">{vet.rating}</span>
                      <span className="text-xs text-amber-600 dark:text-amber-500">({vet.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {vet.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" /> Contact Clinic
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    {vet.specialties.map((spec, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Schedule Visit</h3>
            
            {!selectedVet ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Calendar className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                <p>Select a veterinarian from the list to see available times.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Appointment booked successfully!'); }}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select Pet</label>
                  <select className="w-full border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5">
                    <option>Max (Dog)</option>
                    <option>Luna (Cat)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input type="date" className="w-full border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'].map((time, i) => (
                      <button key={i} type="button" className="py-2 border border-slate-200 dark:border-slate-600 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Reason for Visit</label>
                  <textarea rows={3} className="w-full border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5" placeholder="Briefly describe the issue..."></textarea>
                </div>
                
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6">
                  Confirm Booking
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
