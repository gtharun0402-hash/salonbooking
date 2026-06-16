import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, User, Bell, LogOut, ArrowRight, Edit3, Check } from 'lucide-react';

interface CustomerProfileViewProps {
  userName: string;
  userEmail: string;
  onNavigateTab: (tab: 'home' | 'bookings' | 'profile') => void;
  onUpdateName: (newName: string) => void;
  onLogout: () => void;
  notificationCount: number;
}

export default function CustomerProfileView({
  userName,
  userEmail,
  onNavigateTab,
  onUpdateName,
  onLogout,
  notificationCount,
}: CustomerProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(userName);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSaveName = () => {
    if (editValue.trim()) {
      onUpdateName(editValue.trim());
      setIsEditing(false);
    }
  };

  const sampleNotifications = [
    { id: '1', text: 'Appointment accepted by Barber Raja for Haircut on 13 Sat, 9:00 AM.', time: 'Just now' },
    { id: '2', text: 'Welcome to SalonMate! Get Rs.50 off your first elegant design.', time: '1 hour ago' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-32 pt-10">
      <div className="max-w-md mx-auto px-6 space-y-8">
        
        {/* Title Header */}
        <h3 className="font-serif text-3xl font-medium text-gold text-center tracking-wide">
          Profile
        </h3>

        {/* Profile Avatar Card with gold circle */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full border-2 border-gold flex items-center justify-center p-1 bg-gold/5 relative">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-serif text-3xl text-gold font-bold">
              {userName.charAt(0)}
            </div>
            {/* Action edit icon badge in gold */}
            <button
              onClick={() => {
                setEditValue(userName);
                setIsEditing(!isEditing);
              }}
              className="absolute -right-1 -bottom-1 bg-gold hover:bg-gold/90 text-black p-2 rounded-full cursor-pointer transition-transform duration-200 active:scale-90"
            >
              <Edit3 className="w-4.5 h-4.5 strokeWidth={2.5}" />
            </button>
          </div>

          {/* User Name & Email display or Edit Field */}
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
                  className="bg-gold text-black p-2 rounded-lg cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 strokeWidth={3}" />
                </button>
              </div>
            ) : (
              <h4 className="font-serif text-2xl font-light text-gold tracking-wide">
                {userName}
              </h4>
            )}
            <p className="font-sans text-xs text-gray-500 tracking-wider mt-1.5 select-all">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Dynamic Inline Notifications Toast dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border border-gold/30 rounded-2xl bg-[#050505] overflow-hidden"
            >
              <div className="p-4 border-b border-gold/15 flex justify-between items-center bg-gold/5">
                <span className="text-xs font-serif font-bold text-gold tracking-wide">Recent Notifications</span>
                <button onClick={() => setShowNotifications(false)} className="text-[10px] text-gray-500 underline cursor-pointer">Close</button>
              </div>
              <div className="divide-y divide-gold/15">
                {sampleNotifications.map((notif) => (
                  <div key={notif.id} className="p-4 space-y-1">
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">{notif.text}</p>
                    <span className="text-[9px] text-gold/60 font-mono italic block">{notif.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Options Stack with Gold Borders */}
        <div className="space-y-4 pt-4">
          
          {/* Option 1: My Bookings */}
          <div
            onClick={() => onNavigateTab('bookings')}
            className="flex items-center justify-between border border-gold/25 hover:border-gold px-5 py-4.5 rounded-2xl cursor-pointer bg-black/40 hover:bg-gold/5 transition-all duration-300 group shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/5 border border-gold/30 flex items-center justify-center p-2 text-gold">
                <ClipboardList className="w-5 h-5 stroke-[#e3d481]" />
              </div>
              <span className="font-serif text-sm tracking-wide text-gray-200">
                My Bookings
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

          {/* Option 3: Notifications */}
          <div
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex items-center justify-between border border-gold/25 hover:border-gold px-5 py-4.5 rounded-2xl cursor-pointer bg-black/40 hover:bg-gold/5 transition-all duration-300 group shadow-[0_4px_15px_rgba(0,0,0,0.3)] relative"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/5 border border-gold/30 flex items-center justify-center p-2 text-gold relative">
                <Bell className="w-5 h-5 stroke-[#e3d481]" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                )}
              </div>
              <span className="font-serif text-sm tracking-wide text-gray-200">
                Notifications
              </span>
            </div>
            <div className="flex items-center gap-3">
              {notificationCount > 0 && (
                <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded-full text-white font-sans font-bold">
                  {notificationCount}
                </span>
              )}
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
              <span className="font-serif text-sm tracking-wide text-red-400 font-medium">
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
