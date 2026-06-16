import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, CheckCircle2, XCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { Booking } from '../types';

interface BarberBookingsViewProps {
  bookings: Booking[];
  onAcceptBooking: (id: string) => void;
  onCancelBooking: (id: string) => void;
}

type FilterStatus = 'all' | 'pending' | 'accepted' | 'cancelled';

export default function BarberBookingsView({
  bookings,
  onAcceptBooking,
  onCancelBooking,
}: BarberBookingsViewProps) {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  return (
    <div className="min-h-screen bg-black text-white pb-32 pt-10 animate-fade-in">
      <div className="max-w-md mx-auto px-6 space-y-8">
        
        {/* Screen Header */}
        <div className="text-center">
          <h3 className="font-serif text-3xl font-medium text-gold tracking-wide">
            Appointments List
          </h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">
            Client Bookings Management
          </p>
        </div>

        {/* Filter Pills with gold accents */}
        <div className="flex gap-1.5 bg-[#030303] border border-gold/15 p-1 rounded-full text-xs overflow-x-auto">
          {(['all', 'pending', 'accepted', 'cancelled'] as FilterStatus[]).map((status) => {
            const isSelected = filter === status;
            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`flex-1 py-2 px-3 rounded-full text-center capitalize transition-all duration-300 font-sans tracking-wide cursor-pointer ${
                  isSelected
                    ? 'bg-gold text-black font-semibold'
                    : 'text-gray-400 hover:text-gold'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Bookings Stack */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const isAccepted = booking.status === 'accepted';
              const isCancelled = booking.status === 'cancelled';
              const isPending = booking.status === 'pending';

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gold/15 rounded-2xl p-5 bg-[#030303]/60 relative space-y-4 shadow-lg"
                >
                  {/* Status Overlay Ribbon/Indicator */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest block">Client Name</span>
                      <h4 className="font-sans font-bold text-gray-200 text-base">
                        {booking.customerName}
                      </h4>
                      <p className="text-xs text-gold/80 font-serif mt-0.5">
                        {booking.serviceName}
                      </p>
                    </div>

                    <div className="text-right">
                      {isAccepted && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-sans font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full uppercase">
                          <CheckCircle2 className="w-3 h-3 strokeWidth={3}" />
                          Confirmed
                        </span>
                      )}
                      {isCancelled && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-sans font-bold tracking-widest bg-red-500/10 border border-red-500/30 text-red-500 px-2.5 py-1 rounded-full uppercase">
                          <XCircle className="w-3 h-3" />
                          Cancelled
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-sans font-bold tracking-widest bg-gold/15 border border-gold/45 text-gold px-2.5 py-1 rounded-full uppercase animate-pulse">
                          <AlertCircle className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Booking details card */}
                  <div className="grid grid-cols-2 gap-3.5 pt-3 border-t border-gold/10 text-xs">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-gold shrink-0" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4 text-gold shrink-0" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gold font-sans font-semibold col-span-2">
                      <ShoppingBag className="w-4 h-4 text-gold shrink-0" strokeWidth={2.5} />
                      <span>Service Fee: Rs.{booking.price}</span>
                    </div>
                  </div>

                  {/* Actions for Pending list on booking overview */}
                  {isPending && (
                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      <button
                        onClick={() => onAcceptBooking(booking.id)}
                        className="py-2 rounded-full bg-gold hover:bg-gold/90 text-black font-sans font-semibold text-[11px] uppercase tracking-wider cursor-pointer transition-all active:scale-97"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onCancelBooking(booking.id)}
                        className="py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-sans font-semibold text-[11px] uppercase tracking-wider cursor-pointer transition-all active:scale-97"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gold/15 rounded-3xl space-y-3">
            <p className="text-gray-400 font-serif text-sm">
              No appointments found with status "{filter}".
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
