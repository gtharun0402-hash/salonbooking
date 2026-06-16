import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Scissors, LogOut, ArrowRight, Edit3, Check, Plus, Trash2 } from 'lucide-react';
import { Service } from '../types';

interface BarberProfileViewProps {
  barberName: string;
  barberEmail: string;
  onUpdateName: (newName: string) => void;
  onLogout: () => void;
  onNavigateTab: (tab: 'home' | 'bookings' | 'profile') => void;
  services: Service[];
  onAddService: (name: string, price: number) => void;
  onRemoveService: (id: string) => void;
}

export default function BarberProfileView({
  barberName,
  barberEmail,
  onUpdateName,
  onLogout,
  onNavigateTab,
  services,
  onAddService,
  onRemoveService,
}: BarberProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(barberName);
  const [showServicesList, setShowServicesList] = useState(false);

  // Service fields
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  const handleSaveName = () => {
    if (editValue.trim()) {
      onUpdateName(editValue.trim());
      setIsEditing(false);
    }
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(newServicePrice);
    if (newServiceName.trim() && !isNaN(priceNum) && priceNum > 0) {
      onAddService(newServiceName.trim(), priceNum);
      setNewServiceName('');
      setNewServicePrice('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32 pt-10">
      <div className="max-w-md mx-auto px-6 space-y-8">
        
        {/* Title Header */}
        <h3 className="font-serif text-3xl font-medium text-gold text-center tracking-wide">
          Profile
        </h3>

        {/* Profile Avatar Card with gold ring */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full border-2 border-gold flex items-center justify-center p-1 bg-gold/5 relative">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-serif text-3xl text-gold font-bold">
              {barberName.charAt(0)}
            </div>
            {/* Inline Action Edit Badge */}
            <button
              onClick={() => {
                setEditValue(barberName);
                setIsEditing(!isEditing);
              }}
              className="absolute -right-1 -bottom-1 bg-gold hover:bg-gold/90 text-black p-2 rounded-full cursor-pointer transition-transform duration-200 active:scale-90"
            >
              <Edit3 className="w-4.5 h-4.5 strokeWidth={2.5}" />
            </button>
          </div>

          {/* User Details */}
          <div className="text-center mt-5 w-full max-w-xs">
            {isEditing ? (
              <div className="flex gap-2 justify-center items-center mt-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="bg-black border border-gold px-3 py-1.5 rounded-lg text-sm font-serif text-gold outline-none w-40 text-center"
                  maxLength={15}
                />
                <button
                  onClick={handleSaveName}
                  className="bg-gold text-black p-2 rounded-lg cursor-pointer animate-pulse"
                >
                  <Check className="w-3.5 h-3.5 strokeWidth={3}" />
                </button>
              </div>
            ) : (
              <h4 className="font-serif text-2xl font-light text-gold tracking-wide">
                {barberName}
              </h4>
            )}
            <p className="font-sans text-xs text-gray-500 tracking-wider mt-1.5 select-all">
              {barberEmail}
            </p>
          </div>
        </div>

        {/* Dynamic Services Editor Dropdown */}
        <AnimatePresence>
          {showServicesList && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border border-gold/35 rounded-2xl bg-[#030303] overflow-hidden"
            >
              <div className="p-4 border-b border-gold/15 flex justify-between items-center bg-gold/5">
                <span className="text-xs font-serif font-bold text-gold tracking-wide">My Custom Treatments</span>
                <button
                  onClick={() => setShowServicesList(false)}
                  className="text-[10px] text-gray-500 underline cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Add form */}
              <form onSubmit={handleCreateService} className="p-4 bg-black/40 border-b border-gold/10 flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="New Service (e.g., Styling)"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="bg-black border border-gold/25 focus:border-gold outline-none p-2 rounded text-xs text-white flex-1"
                  required
                />
                <input
                  type="number"
                  placeholder="Rs."
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  className="bg-black border border-gold/25 focus:border-gold outline-none p-2 rounded text-xs text-white w-16"
                  required
                />
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold/90 text-black p-2 rounded-md transition-all duration-205 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4 strokeWidth={2.5}" />
                </button>
              </form>

              {/* Listing custom services */}
              <div className="divide-y divide-gold/15 max-h-56 overflow-y-auto">
                {services.map((s) => (
                  <div key={s.id} className="p-4 flex justify-between items-center bg-black/10">
                    <div>
                      <p className="text-xs text-gray-200 font-sans font-semibold">{s.name}</p>
                      <p className="text-[10px] text-gold font-mono">Rs.{s.price}</p>
                    </div>
                    {services.length > 2 && (
                      <button
                        onClick={() => onRemoveService(s.id)}
                        className="text-red-400 hover:text-red-500 p-1.5 rounded hover:bg-red-500/5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Option Grid Stack styling matching Screen 10 */}
        <div className="space-y-4 pt-4">
          
          {/* Option 1: My Appointments */}
          <div
            onClick={() => onNavigateTab('home')}
            className="flex items-center justify-between border border-gold/25 hover:border-gold px-5 py-4.5 rounded-2xl cursor-pointer bg-black/40 hover:bg-gold/5 transition-all duration-300 group shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/5 border border-gold/30 flex items-center justify-center p-2 text-gold">
                <Calendar className="w-5 h-5 stroke-[#e3d481]" />
              </div>
              <span className="font-serif text-sm tracking-wide text-gray-200">
                My Appointments
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>

          {/* Option 2: Edit Profile */}
          <div
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center justify-between border border-gold/25 hover:border-gold px-5 py-4.5 rounded-2xl cursor-pointer bg-black/40 hover:bg-gold/5 transition-all duration-300 group shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/5 border border-gold/30 flex items-center justify-center p-2 text-gold">
                <User className="w-5 h-5 stroke-[#e3d481]" />
              </div>
              <span className="font-serif text-sm tracking-wide text-gray-200">
                Edit Profile
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>

          {/* Option 3: My Services */}
          <div
            onClick={() => setShowServicesList(!showServicesList)}
            className="flex items-center justify-between border border-gold/25 hover:border-gold px-5 py-4.5 rounded-2xl cursor-pointer bg-black/40 hover:bg-gold/5 transition-all duration-300 group shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/5 border border-gold/30 flex items-center justify-center p-2 text-gold">
                <Scissors className="w-5 h-5 stroke-[#e3d481]" />
              </div>
              <span className="font-serif text-sm tracking-wide text-gray-200">
                My Services
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] bg-gold/15 border border-gold/30 px-2 py-0.5 rounded-full text-gold font-sans font-medium">
                {services.length} Total
              </span>
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </div>

          {/* Option 4: Logout */}
          <div
            onClick={onLogout}
            className="flex items-center justify-between border border-red-500/20 hover:border-red-500 px-5 py-4.5 rounded-2xl cursor-pointer bg-black/40 hover:bg-red-550/5 transition-all duration-300 group shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/5 border border-red-500/30 flex items-center justify-center p-2 text-red-400">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <span className="font-serif text-sm tracking-wide text-red-400 font-medium font-serif">
                Logout
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>

        </div>

      </div>
    </div>
  );
}
