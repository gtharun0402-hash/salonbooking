import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Salon, Service } from '../types';

interface BookingConfirmationViewProps {
  salon: Salon;
  service: Service;
  date: string;
  time: string;
  onGoHome: () => void;
  onViewBookings: () => void;
}

export default function BookingConfirmationView({
  salon,
  service,
  date,
  time,
  onGoHome,
  onViewBookings,
}: BookingConfirmationViewProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-8 relative py-12">
      
      {/* Top Absolute Back Button */}
      <button
        onClick={onGoHome}
        className="absolute top-12 left-6 text-gold/80 hover:text-gold p-2 rounded-full transition-colors active:scale-95 duration-200"
      >
        <ArrowLeft className="w-6 h-6 stroke-[#e3d481]" />
      </button>

      <div className="w-full max-w-sm mx-auto flex flex-col justify-center space-y-10 items-center">
        
        {/* Animated Checkmark Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center shadow-[0_0_20px_rgba(227,212,129,0.2)]">
            <CheckCircle2 className="w-8 h-8 text-gold strokeWidth={1.5}" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="font-serif text-3xl text-gold tracking-wide leading-tight">
              Booking Confirmed
            </h3>
            <p className="font-sans text-xs text-gray-400 uppercase tracking-widest">
              Your appointment is booked
            </p>
          </div>
        </motion.div>

        {/* Detailed Receipt Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full border border-gold/30 rounded-[28px] p-8 space-y-5 bg-[#030303]/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
          {/* Salon Identifier */}
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Salon</span>
            <p className="font-serif text-lg text-gold font-medium">
              {salon.name}
            </p>
          </div>

          {/* Appointment Schedule */}
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Date & Time</span>
            <p className="font-sans text-sm font-semibold text-gray-200">
              {date} , {time}
            </p>
          </div>

          {/* Service Particulars */}
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Service Selected</span>
            <p className="font-sans text-sm font-bold text-gold">
              {service.name} Rs. {service.price}
            </p>
          </div>
        </motion.div>

        {/* Two Luxury buttons list stacked */}
        <div className="w-full space-y-4 pt-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onGoHome}
            className="w-full bg-gold hover:bg-gold/90 text-black py-4.5 rounded-2xl font-sans font-bold tracking-widest text-center uppercase cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(227,212,129,0.2)] text-xs"
          >
            Go to Home
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onViewBookings}
            className="w-full border border-gold hover:bg-gold/10 text-gold py-4.5 rounded-2xl font-sans font-bold tracking-widest text-center uppercase cursor-pointer transition-all duration-300 text-xs"
          >
            View Bookings
          </motion.button>
        </div>

      </div>

    </div>
  );
}
