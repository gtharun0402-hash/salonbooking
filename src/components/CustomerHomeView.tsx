import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Star, MapPin } from 'lucide-react';
import { Salon } from '../types';

interface CustomerHomeViewProps {
  salons: Salon[];
  onSelectSalon: (salon: Salon) => void;
  onNavigateTab: (tab: 'home' | 'bookings' | 'profile') => void;
  activeTab: 'home' | 'bookings' | 'profile';
  userName: string;
}

export default function CustomerHomeView({
  salons,
  onSelectSalon,
  onNavigateTab,
  activeTab,
  userName,
}: CustomerHomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSalons = salons.filter((salon) =>
    salon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      {/* Top Welcome Header bar */}
      <div className="px-6 pt-10 pb-5 max-w-md mx-auto flex justify-between items-center">
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-widest block">Welcome back</span>
          <span className="text-lg font-serif text-gold font-medium">{userName}</span>
        </div>
        <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-gold/10">
          <span className="font-serif text-sm font-semibold text-gold">
            {userName.charAt(0)}
          </span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 space-y-8">
        {/* Search Bar Pill Design */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Saloons"
            className="w-full bg-black border border-gold focus:border-gold outline-none px-12 py-4.5 rounded-full text-white placeholder:text-gray-400 placeholder:font-serif placeholder:font-light tracking-wide text-sm font-serif"
          />
          <Search className="w-4.5 h-4.5 text-gold absolute left-5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Nearby Saloons Label Header */}
        <div className="space-y-4">
          <h4 className="font-sans font-semibold text-base text-white tracking-wider">
            Nearby Saloons
          </h4>

          {/* Salons list */}
          {filteredSalons.length > 0 ? (
            <div className="space-y-6">
              {filteredSalons.map((salon) => (
                <motion.div
                  key={salon.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="border border-gold/30 rounded-[28px] p-4 bg-black/40 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Photo Container */}
                  <div className="w-full h-48 rounded-2xl overflow-hidden relative border border-gold/10">
                    <img
                      src={salon.image}
                      alt={salon.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Body Info Block */}
                  <div className="px-1 space-y-3">
                    <h5 className="font-serif text-xl text-gold font-medium tracking-wide">
                      {salon.name}
                    </h5>

                    {/* Meta stats */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-gold text-gold" />
                        <span className="text-sm font-sans font-light text-gray-300">{salon.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gold" strokeWidth={2.5} />
                        <span className="text-xs font-sans font-light tracking-wider text-white">{salon.distance}</span>
                      </div>
                    </div>

                    {/* View Details full rounded-pill inside card */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectSalon(salon)}
                      className="w-full mt-2 cursor-pointer border border-gold text-gold hover:bg-gold hover:text-black font-serif font-light text-sm tracking-widest py-3 rounded-full transition-all duration-300 active:scale-98"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gold/20 rounded-2xl space-y-2">
              <p className="text-gray-400 font-serif">No saloons match your search.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-gold underline tracking-wide font-sans cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
