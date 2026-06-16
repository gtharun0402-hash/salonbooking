import { motion } from 'motion/react';
import { User, Scissors } from 'lucide-react';
import { Role } from '../types';

interface RoleSelectionViewProps {
  onSelectRole: (role: Role) => void;
}

export default function RoleSelectionView({ onSelectRole }: RoleSelectionViewProps) {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 overflow-hidden">
      
      {/* Background Giant Faint Watermark Shears */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.06]">
        <svg
          className="w-[120%] h-[120%] max-w-[800px] max-h-[800px]"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Frame Piece: Bottom-Left Loop (with Finger Tang) crossing to Right Blade */}
          <g>
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
              fill="#e3d481"
            />
            {/* Right Blade */}
            <path
              d="M 100 105 L 115 25 L 104 105 Z"
              fill="#e3d481"
            />
          </g>

          {/* Right Frame Piece: Bottom-Right Loop crossing to Left Blade */}
          <g>
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
              fill="#e3d481"
            />
            {/* Left Blade */}
            <path
              d="M 100 105 L 85 25 L 96 105 Z"
              fill="#e3d481"
            />
          </g>

          {/* High-end Pivot Screw Assembly (Golden Dial in center) */}
          <circle cx="100" cy="105" r="7.5" fill="#e3d481" />
          <circle cx="100" cy="105" r="5" fill="#000" />
          <circle cx="100" cy="105" r="3" fill="#e3d481" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        {/* Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-gold tracking-wide leading-tight">
            Welcome to SalonMate
          </h2>
          <p className="font-sans text-xs md:text-sm text-gray-400 tracking-[0.2em] uppercase">
            Choose your role
          </p>
        </motion.div>

        {/* Buttons List */}
        <div className="w-full space-y-5 px-4">
          
          {/* Customer Choice */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            onClick={() => onSelectRole('customer')}
            className="w-full flex items-center justify-start gap-4 px-8 py-4.5 rounded-full border border-gold/40 hover:border-gold bg-black text-gold text-lg font-medium transition-all duration-300 md:hover:bg-gold md:hover:text-black group active:scale-98 shadow-[0_0_15px_rgba(227,212,129,0.03)] hover:shadow-[0_0_20px_rgba(227,212,129,0.15)]"
          >
            <User className="w-5 h-5 transition-transform duration-300 md:group-hover:scale-110 text-gold md:group-hover:text-black shrink-0" />
            <span className="font-serif tracking-wider">Customer</span>
          </motion.button>

          {/* Barber Choice */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            onClick={() => onSelectRole('barber')}
            className="w-full flex items-center justify-start gap-4 px-8 py-4.5 rounded-full border border-gold/40 hover:border-gold bg-black text-gold text-lg font-medium transition-all duration-300 md:hover:bg-gold md:hover:text-black group active:scale-98 shadow-[0_0_15px_rgba(227,212,129,0.03)] hover:shadow-[0_0_20px_rgba(227,212,129,0.15)]"
          >
            <Scissors className="w-5 h-5 transition-transform duration-300 md:group-hover:scale-110 text-gold md:group-hover:text-black shrink-0" />
            <span className="font-serif tracking-wider">Barber</span>
          </motion.button>

        </div>

      </div>

    </div>
  );
}
