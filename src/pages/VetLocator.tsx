import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Search, Navigation } from 'lucide-react';

export default function VetLocator() {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [mapUrl, setMapUrl] = useState('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzEwLjAiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      const encodedQuery = encodeURIComponent(`veterinarian near ${location}`);
      setMapUrl(`https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY_HERE&q=${encodedQuery}`);
      // Since we don't have an API key, we'll use a generic iframe search URL that works without one for some basic queries, 
      // or we can just use a standard maps link. For the iframe to work reliably without an API key, we use the standard embed format.
      const query = encodeURIComponent(`veterinary clinic ${location}`);
      setMapUrl(`https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const query = encodeURIComponent('veterinarian');
        setMapUrl(`https://maps.google.com/maps?q=${query}&ll=${latitude},${longitude}&z=13&ie=UTF8&iwloc=&output=embed`);
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      }, (error) => {
        console.error("Error getting location", error);
        alert("Unable to retrieve your location. Please enter it manually.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-emerald-600" />
          {t('vet_locator')}
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="Enter city, zip code, or address..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-sm"
            >
              {t('search')}
            </button>
          </form>
          
          <button
            onClick={useCurrentLocation}
            className="px-6 py-3 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-sm flex items-center justify-center gap-2"
          >
            <Navigation className="h-4 w-4 text-emerald-600" />
            Use Current Location
          </button>
        </div>

        <div className="w-full h-[600px] rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50 relative">
          <iframe
            title="Vet Locator Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
            className="absolute inset-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
