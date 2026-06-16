import { motion } from 'motion/react';
import { Calendar, Clock, Check, X, ShieldAlert } from 'lucide-react';
import { Booking } from '../types';

interface BarberHomeViewProps {
  bookings: Booking[];
  onAcceptBooking: (id: string) => void;
  onCancelBooking: (id: string) => void;
  barberName: string;
}

export default function BarberHomeView({
  bookings,
  onAcceptBooking,
  onCancelBooking,
  barberName,
}: BarberHomeViewProps) {
  // Filters to find pending requests
  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const activeBookings = bookings.filter((b) => b.status === 'accepted');

  return (
    <div className="min-h-screen bg-black text-white pb-32 pt-10">
      <div className="max-w-md mx-auto px-6 space-y-8">
        
        {/* Profile Header row */}
        <div className="text-center space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-widest block font-sans">Barber Hub</span>
          <h3 className="font-serif text-3xl font-medium text-gold tracking-wide">
            My Schedule
          </h3>
        </div>

        {/* Today's Bookings summary card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="border-2 border-gold rounded-[28px] p-8 bg-gold/5 flex flex-col items-center justify-center text-center space-y-3 shadow-[0_0_25px_rgba(227,212,129,0.1)]"
        >
          <span className="font-serif text-xl tracking-wider text-gold font-light">
            Today’s Bookings
          </span>
          <span className="font-serif text-4xl text-white font-bold">
            {activeBookings.length + pendingBookings.length}
          </span>
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold/80">
            Appointments
          </span>
        </motion.div>

        {/* Section 2: Upcoming Appointments list */}
        <div className="space-y-4 pt-2">
          <h4 className="font-serif text-xl text-gold font-light tracking-wide">
            Upcoming Appointments
          </h4>

          {pendingBookings.length > 0 ? (
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="border border-gold/25 rounded-2xl p-5 bg-[#030303] flex flex-col space-y-4"
                >
                  {/* Customer Info row */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">Client</span>
                      <p className="font-sans font-bold text-gray-200">
                        {booking.customerName}
                      </p>
                      <p className="text-[11px] text-gold/80 font-serif">
                        {booking.serviceName}
                      </p>
                    </div>

                    <div className="text-right space-y-1">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">Slot</span>
                      <div className="flex items-center gap-1.5 justify-end text-xs text-gray-300 font-sans font-semibold">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span>{booking.time}</span>
                      </div>
                      <span className="text-[9px] text-gray-500 block font-sans">{booking.date}</span>
                    </div>
                  </div>

                  {/* Actions Pills: Accept vs Cancel */}
                  <div className="grid grid-cols-2 gap-3.5 pt-2">
                    {/* Accept button with custom light golden tint */}
                    <button
                      onClick={() => onAcceptBooking(booking.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-gold hover:bg-gold/90 text-black font-sans font-semibold text-xs tracking-wider cursor-pointer active:scale-97 transition-all duration-200"
                    >
                      <Check className="w-3.5 h-3.5 strokeWidth={2.5}" />
                      Accept
                    </button>

                    {/* Cancel button in red */}
                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-sans font-semibold text-xs tracking-wider cursor-pointer active:scale-97 transition-all duration-200"
                    >
                      <X className="w-3.5 h-3.5 strokeWidth={2.5}" />
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gold/15 rounded-2xl flex flex-col items-center justify-center gap-3">
              <ShieldAlert className="w-8 h-8 text-gold/45" />
              <div className="space-y-1">
                <p className="text-gray-400 font-serif text-sm">No new requests pending.</p>
                <p className="text-[10px] text-gold/50 font-sans uppercase tracking-widest">Everything is up-to-date!</p>
              </div>
            </div>
          )}
        </div>

        {/* Accepted/Confirmed list */}
        {activeBookings.length > 0 && (
          <div className="space-y-4 pt-2">
            <h4 className="font-serif text-xl text-gold font-light tracking-wide">
              Confirmed Schedule
            </h4>
            <div className="space-y-3">
              {activeBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gold/15 rounded-xl p-4 bg-gold-[2%] flex justify-between items-center"
                >
                  <div>
                    <p className="font-sans text-sm font-bold text-white">{booking.customerName}</p>
                    <p className="text-xs text-gold/80 font-serif">{booking.serviceName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-sans font-semibold text-gold">{booking.time}</p>
                    <p className="text-[10px] text-gray-500 font-mono">{booking.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
