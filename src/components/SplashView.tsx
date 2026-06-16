import { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashViewProps {
  onNext: () => void;
}

export default function SplashView({ onNext }: SplashViewProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div
      onClick={onNext}
      className="fixed inset-0 bg-black flex flex-col justify-between items-center py-16 px-6 cursor-pointer select-none"
    >
      {/* Top Spacer */}
      <div />

      {/* Main Branding Block */}
      <div className="flex flex-col items-center space-y-12">
        {/* SalonMate Text */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-serif text-5xl md:text-6xl tracking-wide text-gold"
        >
          SalonMate
        </motion.h1>

        {/* Custom Shears Vector Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: 'backOut' }}
          className="relative w-52 h-52 flex items-center justify-center"
        >
          {/* Decorative faint outer glow */}
          <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full" />
          
          <svg
            className="w-full h-full drop-shadow-[0_0_20px_rgba(227,212,129,0.4)]"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Premium 3D Gold Metallic Gradients */}
              <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF4B8" />
                <stop offset="20%" stopColor="#E3D481" />
                <stop offset="45%" stopColor="#B39943" />
                <stop offset="60%" stopColor="#F7E696" />
                <stop offset="85%" stopColor="#967924" />
                <stop offset="100%" stopColor="#EAD88B" />
              </linearGradient>
              <linearGradient id="goldDark" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7E6015" />
                <stop offset="50%" stopColor="#C2A84E" />
                <stop offset="100%" stopColor="#E3D481" />
              </linearGradient>
              <linearGradient id="bladeBevelLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFF4B8" />
                <stop offset="60%" stopColor="#D8C26C" />
                <stop offset="100%" stopColor="#8F711E" />
              </linearGradient>
              <linearGradient id="bladeBevelRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8F711E" />
                <stop offset="40%" stopColor="#D8C26C" />
                <stop offset="100%" stopColor="#FFF4B8" />
              </linearGradient>
            </defs>

            {/* Left Frame Piece: Bottom-Left Loop (with Finger Tang) crossing to Right Blade */}
            <motion.g
              animate={{ 
                rotate: [0, -2.5, 0, -2.5, 0] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ transformOrigin: "100px 105px" }}
            >
              {/* Loop Outer + Shank + Spur in a unified luxury path (evenodd fills to cut out the loop hole) */}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 100 105 
                   C 95 116, 91 123, 85 127
                   C 89 127, 93 133, 94 140
                   C 94 150, 86 158, 76 158
                   C 70 158, 65 155, 61 151
                   C 57 157, 51 163, 44 171
                   C 40 175, 36 179, 31 183
                   C 29 184, 27 184, 26 182
                   C 26 181, 27 179, 29 177
                   C 35 171, 42 165, 48 158
                   C 54 152, 57 146, 57 140
                   C 57 130, 65 122, 75 122
                   C 81 116, 88 109, 100 105 Z
                   M 75.5 134 A 8.5 8.5 0 1 0 75.5 151 A 8.5 8.5 0 1 0 75.5 134 Z"
                fill="url(#goldMetallic)"
              />

              {/* Right Blade - Multi-bevel metallic construct for high-fidelity 3D shine */}
              {/* Outer Spine (Rich shadow gold) */}
              <path
                d="M 102 105 L 115 25 C 111 50, 107 75, 104 105 Z"
                fill="url(#goldDark)"
              />
              {/* Inner Surface (Bright gleaming gold) */}
              <path
                d="M 100 105 L 115 25 L 102 105 Z"
                fill="url(#bladeBevelRight)"
              />
              {/* White mirror-polished cutting edge highlight */}
              <path
                d="M 100 105 L 115 25"
                stroke="#FFEFAF"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.95"
              />
            </motion.g>

            {/* Right Frame Piece: Bottom-Right Loop crossing to Left Blade */}
            <motion.g
              animate={{ 
                rotate: [0, 2.5, 0, 2.5, 0] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ transformOrigin: "100px 105px" }}
            >
              {/* Loop Outer + Shank + Spur */}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 100 105 
                   C 105 116, 109 123, 115 127
                   C 111 127, 107 133, 106 140
                   C 106 150, 114 158, 124 158
                   C 130 158, 135 155, 139 151
                   C 143 157, 149 163, 156 171
                   C 160 175, 164 179, 169 183
                   C 171 184, 173 184, 174 182
                   C 174 181, 173 179, 171 177
                   C 165 171, 158 165, 152 158
                   C 146 152, 143 146, 143 140
                   C 143 130, 135 122, 125 122
                   C 119 116, 112 109, 100 105 Z
                   M 124.5 134 A 8.5 8.5 0 1 0 124.5 151 A 8.5 8.5 0 1 0 124.5 134 Z"
                fill="url(#goldMetallic)"
              />

              {/* Left Blade - Multi-bevel metallic construct */}
              {/* Outer Spine (Rich shadow gold) */}
              <path
                d="M 98 105 L 85 25 C 89 50, 93 75, 96 105 Z"
                fill="url(#goldDark)"
              />
              {/* Inner Surface (Bright gleaming gold) */}
              <path
                d="M 100 105 L 85 25 L 98 105 Z"
                fill="url(#bladeBevelLeft)"
              />
              {/* White mirror-polished cutting edge highlight */}
              <path
                d="M 100 105 L 85 25"
                stroke="#FFEFAF"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.95"
              />
            </motion.g>

            {/* High-end Pivot Screw Assembly (Premium Dial with custom micro slotted detailing) */}
            <circle cx="100" cy="105" r="7.5" fill="url(#goldMetallic)" stroke="#8F711E" strokeWidth="1" />
            <circle cx="100" cy="105" r="5" fill="#151515" />
            <circle cx="100" cy="105" r="3" fill="url(#goldMetallic)" />
            {/* Custom 3-way Slot Pattern */}
            <path d="M 100 103 L 100 107 L 97.4 106 Z" fill="#2A1E05" />
            <line x1="100" y1="105" x2="100" y2="102" stroke="#2A1E05" strokeWidth="0.8" />
            <line x1="100" y1="105" x2="102.6" y2="106.5" stroke="#2A1E05" strokeWidth="0.8" />
            <line x1="100" y1="105" x2="97.4" y2="106.5" stroke="#2A1E05" strokeWidth="0.8" />
          </svg>
        </motion.div>
      </div>

      {/* Subtitle / Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex flex-col items-center space-y-2"
      >
        <span className="font-sans text-sm tracking-[0.3em] uppercase text-gold font-light">
          Book Your Look
        </span>
        <span className="text-[10px] text-gray-500 font-mono tracking-widest mt-8">
          TAP TO ENTER
        </span>
      </motion.div>
    </div>
  );
}
