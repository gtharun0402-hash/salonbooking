import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import { Salon, Service } from '../types';

interface SalonDetailsViewProps {
  salon: Salon;
  onBack: () => void;
  onBookNow: (selectedService: Service) => void;
}

export default function SalonDetailsView({ salon, onBack, onBookNow }: SalonDetailsViewProps) {
  // Let the user select a service from the list (default to first service)
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    salon.services[0]?.id || ''
  );

  const handleBookNow = () => {
    const selected = salon.services.find((s) => s.id === selectedServiceId);
    if (selected) {
      onBookNow(selected);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      {/* Absolute Header Navigation */}
      <div className="relative w-full h-64 max-w-md mx-auto md:h-72">
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover border-b border-gold/10"
          referrerPolicy="no-referrer"
        />
        {/* Shadow overlays */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />

        {/* Back Arrow */}
        <button
          onClick={onBack}
          className="absolute top-8 left-6 bg-black/40 backdrop-blur-md text-gold hover:text-white p-2.5 rounded-full transition-all hover:bg-black/80 active:scale-95 duration-250 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[#e3d481]" />
        </button>
      </div>

      {/* Main Details Section */}
      <div className="max-w-md mx-auto px-6 mt-4 space-y-6">
        
        {/* Title Details banner */}
        <div className="space-y-3">
          <h3 className="font-serif text-3xl font-medium text-gold tracking-wide">
            {salon.name}
          </h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span className="text-sm font-sans font-light text-gray-300">{salon.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold shrink-0" strokeWidth={2.5} />
              <span className="text-xs font-sans font-light text-white tracking-wide">{salon.distance}</span>
            </div>
          </div>
        </div>

        {/* Services Head */}
        <div className="space-y-4 pt-2">
          <h4 className="font-sans font-semibold text-[#e3d481] text-lg tracking-wider">
            Services
          </h4>

          {/* Interactive items with beautiful selections */}
          <div className="space-y-3">
            {salon.services.map((service) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`flex justify-between items-center px-6 py-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-gold/15 border-gold shadow-[0_0_15px_rgba(227,212,129,0.15)] scale-102'
                      : 'bg-black/40 border-gold/15 hover:border-gold/40'
                  }`}
                >
                  <span className={`font-sans font-semibold tracking-wide text-sm ${isSelected ? 'text-gold' : 'text-gray-200'}`}>
                    {service.name}
                  </span>
                  <span className={`font-sans font-bold tracking-wider text-sm ${isSelected ? 'text-gold' : 'text-gray-400'}`}>
                    Rs.{service.price}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Working Hours */}
        <div className="space-y-2 pt-4">
          <h4 className="font-sans font-semibold text-[#e3d481] text-sm tracking-widest uppercase">
            Working Hours
          </h4>
          <p className="font-sans text-xs text-gray-400 font-medium tracking-wide">
            {salon.workingHours}
          </p>
        </div>

        {/* Call to action full golden button */}
        <div className="pt-6">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleBookNow}
            className="w-full bg-gold hover:bg-gold/90 text-black font-sans font-semibold tracking-widest py-4.5 rounded-2xl transition-all duration-300 shadow-[0_4px_25px_rgba(227,212,129,0.25)] text-center block cursor-pointer text-sm"
          >
            Book Now
          </motion.button>
        </div>

      </div>
    </div>
  );
}
