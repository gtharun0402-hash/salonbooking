import { motion } from 'motion/react';
import { Calendar, Clock, DollarSign, RefreshCw, Scissors } from 'lucide-react';
import { Booking } from '../types';

interface CustomerBookingsViewProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export default function CustomerBookingsView({ bookings, onCancelBooking }: CustomerBookingsViewProps) {
  return (
    <div className="min-h-screen bg-black text-white pb-32 pt-10">
      <div className="max-w-md mx-auto px-6 space-y-8">
        {/* Screen Header */}
        <div className="text-center">
          <h3 className="font-serif text-3xl font-medium text-gold tracking-wide">
            My Bookings
          </h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">
            History & Appointments
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const isAccepted = booking.status === 'accepted';
              const isCancelled = booking.status === 'cancelled';
              const isPending = booking.status === 'pending';

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border border-gold/20 rounded-[24px] p-6 bg-black/50 space-y-5 shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
                >
                  {/* Salon Head row with Status Badger */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-gold font-medium leading-tight">
                        {booking.salonName}
                      </h4>
                      <p className="text-xs text-gray-400 font-sans tracking-wide">
                        {booking.serviceName}
                      </p>
                    </div>

                    {/* Status badges */}
                    <div>
                      {isAccepted && (
                        <span className="text-[9px] font-sans font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full uppercase">
                          Accepted
                        </span>
                      )}
                      {isCancelled && (
                        <span className="text-[9px] font-sans font-bold tracking-widest bg-red-500/10 border border-red-500/40 text-red-400 px-3 py-1 rounded-full uppercase">
                          Cancelled
                        </span>
                      )}
                      {isPending && (
                        <span className="text-[9px] font-sans font-bold tracking-widest bg-gold/10 border border-gold/40 text-gold px-3 py-1 rounded-full uppercase animate-pulse">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Scheduled block details */}
                  <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 pt-1 pb-2 border-y border-gold/10">
                    {/* Date */}
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-xs text-gray-300 font-sans tracking-wide">{booking.date}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-xs text-gray-300 font-sans tracking-wide">{booking.time}</span>
                    </div>

                    {/* Cost */}
                    <div className="flex items-center gap-2.5 col-span-2">
                      <Scissors className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-xs text-gold/90 font-sans font-semibold tracking-wide">
                        Cost: Rs.{booking.price}
                      </span>
                    </div>
                  </div>

                  {/* Cancellations support for pending lists */}
                  {isPending && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => onCancelBooking(booking.id)}
                        className="text-xs text-red-400 hover:text-red-500 hover:underline tracking-wider font-sans py-1 px-3 cursor-pointer transition-all duration-200"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-gold/15 rounded-3xl space-y-4">
            <p className="text-gray-400 font-serif leading-relaxed">
              You do not have any bookings yet.
            </p>
            <p className="text-xs text-gold/60 font-sans">
              Book your first treatment on the Home feed!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
