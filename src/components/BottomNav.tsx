import { Home, ClipboardList, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'bookings' | 'profile';
  onChangeTab: (tab: 'home' | 'bookings' | 'profile') => void;
}

export default function BottomNav({ activeTab, onChangeTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#020202] border-t border-gold/20 py-3.5 px-8 z-40 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
      <div className="max-w-md mx-auto flex justify-around items-center">
        
        {/* Tab Item 1 - Home */}
        <button
          onClick={() => onChangeTab('home')}
          className="flex flex-col items-center space-y-1 group relative cursor-pointer"
        >
          <div
            className={`p-2 rounded-full transition-all duration-300 ${
              activeTab === 'home'
                ? 'bg-gold/15 border border-gold scale-105 shadow-[0_0_10px_rgba(227,212,129,0.2)]'
                : 'border border-transparent hover:border-gold/30'
            }`}
          >
            <Home
              className={`w-5.5 h-5.5 transition-colors ${
                activeTab === 'home' ? 'text-gold fill-gold/10' : 'text-gray-500 group-hover:text-gold/80'
              }`}
            />
          </div>
          <span
            className={`text-[9.5px] tracking-widest font-sans uppercase font-medium transition-colors ${
              activeTab === 'home' ? 'text-gold' : 'text-gray-500 group-hover:text-gold/60'
            }`}
          >
            Home
          </span>
        </button>

        {/* Tab Item 2 - Bookings */}
        <button
          onClick={() => onChangeTab('bookings')}
          className="flex flex-col items-center space-y-1 group relative cursor-pointer"
        >
          <div
            className={`p-2 rounded-full transition-all duration-300 ${
              activeTab === 'bookings'
                ? 'bg-gold/15 border border-gold scale-105 shadow-[0_0_10px_rgba(227,212,129,0.2)]'
                : 'border border-transparent hover:border-gold/30'
            }`}
          >
            <ClipboardList
              className={`w-5.5 h-5.5 transition-colors ${
                activeTab === 'bookings' ? 'text-gold' : 'text-gray-500 group-hover:text-gold/80'
              }`}
            />
          </div>
          <span
            className={`text-[9.5px] tracking-widest font-sans uppercase font-medium transition-colors ${
              activeTab === 'bookings' ? 'text-gold' : 'text-gray-500 group-hover:text-gold/60'
            }`}
          >
            Bookings
          </span>
        </button>

        {/* Tab Item 3 - Profile */}
        <button
          onClick={() => onChangeTab('profile')}
          className="flex flex-col items-center space-y-1 group relative cursor-pointer"
        >
          <div
            className={`p-2 rounded-full transition-all duration-305 ${
              activeTab === 'profile'
                ? 'bg-gold/15 border border-gold scale-105 shadow-[0_0_10px_rgba(227,212,129,0.2)]'
                : 'border border-transparent hover:border-gold/30'
            }`}
          >
            <User
              className={`w-5.5 h-5.5 transition-colors ${
                activeTab === 'profile' ? 'text-gold' : 'text-gray-500 group-hover:text-gold/80'
              }`}
            />
          </div>
          <span
            className={`text-[9.5px] tracking-widest font-sans uppercase font-medium transition-colors ${
              activeTab === 'profile' ? 'text-gold' : 'text-gray-500 group-hover:text-gold/60'
            }`}
          >
            Profile
          </span>
        </button>

      </div>
    </div>
  );
}
