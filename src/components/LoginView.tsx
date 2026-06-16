import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Role } from '../types';

interface LoginViewProps {
  role: Role;
  onBack: () => void;
  onLoginSuccess: (email: string, name: string) => void;
}

export default function LoginView({ role, onBack, onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle Login from submission
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (!email) {
    setError('Please enter your email.');
    return;
  }

  if (!password) {
    setError('Please enter your password.');
    return;
  }

  const parts = email.split('@')[0];
  const name = parts.charAt(0).toUpperCase() + parts.slice(1);

  onLoginSuccess(email, name);
};
  

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-8 relative">
      
      {/* Absolute Back Button */}
      <button
        onClick={onBack}
        className="absolute top-12 left-6 text-gold/80 hover:text-gold p-2 rounded-full transition-colors active:scale-95 duration-200"
      >
        <ArrowLeft className="w-6 h-6 stroke-[#e3d481]" />
      </button>

      {/* Main Form Box */}
      <div className="w-full max-w-sm mx-auto flex flex-col justify-center space-y-12">
        
        {/* Screen Heading */}
        <div className="text-center">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl text-gold tracking-wide"
          >
            Login
          </motion.h3>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">
            as {role === 'customer' ? 'Customer' : 'Barber'}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-400 text-xs text-center border border-red-500/20 bg-red-500/5 py-2.5 rounded-lg font-sans">
              {error}
            </div>
          )}

          {/* Email Card Field */}
          <div className="space-y-2">
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-black border border-gold/40 focus:border-gold outline-none px-6 py-4 rounded-xl text-white font-serif placeholder:text-gray-500 placeholder:font-serif placeholder:font-light focus:ring-1 focus:ring-gold/30 transition-all text-sm tracking-wide"
              />
            </div>
          </div>

          {/* Password Card Field */}
          <div className="space-y-2">
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-black border border-gold/40 focus:border-gold outline-none px-6 py-4 rounded-xl text-white font-serif placeholder:text-gray-500 placeholder:font-serif placeholder:font-light focus:ring-1 focus:ring-gold/30 transition-all text-sm tracking-wide"
                autoComplete="current-password"
              />
            </div>
            
            {/* Forgot Password Right Link */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => alert(`Password recovery sent to ${email || 'your email'}`)}
                className="text-xs font-sans text-gold/90 hover:text-gold active:underline transition-all tracking-wider"
              >
                Forgot Password
              </button>
            </div>
          </div>

          {/* Action Log In Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-8 bg-gold hover:bg-gold/90 text-black py-4.5 rounded-2xl font-sans font-semibold text-base transition-all duration-300 shadow-[0_4px_20px_rgba(227,212,129,0.25)] flex items-center justify-center cursor-pointer"
          >
            Login
          </motion.button>
        </form>

      </div>

    </div>
  );
}
