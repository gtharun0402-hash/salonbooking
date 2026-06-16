import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Salon, Service } from '../types';

interface BookingViewProps {
  salon: Salon;
  service: Service;
  onBack: () => void;
  onConfirmBooking: (date: string, time: string) => void;
}

export default function BookingView({ salon, service, onBack, onConfirmBooking }: BookingViewProps) {
  // Mock calendar days from screenshot: 13 Sat, 14 Sun, 15 Mon, 16 Tue
  const dates = [
    { value: '13 Sat', dayNum: '13', dayName: 'Sat' },
    { value: '14 Sun', dayNum: '14', dayName: 'Sun' },
    { value: '15 Mon', dayNum: '15', dayName: 'Mon' },
    { value: '16 Tue', dayNum: '16', dayName: 'Tue' },
  ];

  // Map times from screenshot
  const times = [
    '9:00AM',
    '10:00AM',
    '11:00AM',
    '2:00PM',
    '3:00PM',
    '4:00PM',
    '5:00PM',
    '6:00PM',
    '7:00PM',
  ];

  const [selectedDate, setSelectedDate] = useState(dates[0].value);
  const [selectedTime, setSelectedTime] = useState(times[0]);

  return (
    <div className="min-h-screen bg-black text-white pb-32 pt-8">
      {/* Header bar with Back trigger */}
      <div className="max-w-md mx-auto px-6 relative flex justify-center items-center mb-10">
        <button
          onClick={onBack}
          className="absolute left-6 text-gold/80 hover:text-gold p-2 rounded-full transition-colors active:scale-95 duration-200"
        >
          <ArrowLeft className="w-6 h-6 stroke-[#e3d481]" />
        </button>
        <h3 className="font-serif text-2xl text-gold tracking-wide">
          Book Appointment
        </h3>
      </div>

      <div className="max-w-md mx-auto px-6 space-y-10">
        
        {/* Salon / Service mini card */}
        <div className="border border-gold/15 bg-[#030303] rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-widest block">Salon</span>
            <span className="text-sm font-serif font-semibold text-gold">{salon.name}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 uppercase tracking-widest block">Selected Service</span>
            <span className="text-sm font-sans font-medium text-white">{service.name} (Rs.{service.price})</span>
          </div>
        </div>

        {/* Date choice row */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg text-gold tracking-wide">
            Select Date
          </h4>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {dates.map((d) => {
              const isSelected = selectedDate === d.value;
              return (
                <div
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  className={`flex-1 min-w-[70px] aspect-[4/5] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(227,212,129,0.35)] scale-102'
                      : 'bg-black border-gold/30 text-gold hover:border-gold/60'
                  }`}
                >
                  <span className="text-lg font-sans font-bold leading-none mb-1">
                    {d.dayNum}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase font-sans font-semibold">
                    {d.dayName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Time choice grid */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg text-gold tracking-wide">
            Select Time
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {times.map((t) => {
              const isSelected = selectedTime === t;
              return (
                <div
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-3.5 px-2 rounded-xl text-center cursor-pointer transition-all duration-350 border font-sans text-xs font-semibold tracking-wider ${
                    isSelected
                      ? 'bg-gold text-black border-gold shadow-[0_0_12px_rgba(227,212,129,0.3)]'
                      : 'bg-[#030303] border-gold/25 text-gold hover:border-gold/50'
                  }`}
                >
                  {t}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Action trigger */}
        <div className="pt-6">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onConfirmBooking(selectedDate, selectedTime)}
            className="w-full bg-gold hover:bg-gold/90 text-black py-4.5 rounded-2xl font-sans font-bold tracking-widest text-center block cursor-pointer uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(227,212,129,0.25)] text-xs"
          >
            Book Appointment
          </motion.button>
        </div>

      </div>
    </div>
  );
}
