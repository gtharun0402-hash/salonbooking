import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Role } from '../types';
import { supabase } from '../lib/supabase';

interface LoginViewProps {
  role: Role;
  onBack: () => void;
  onLoginSuccess: (email: string, name: string) => void;
}

export default function LoginView({ role, onBack, onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) { setError('Please enter your email.'); setLoading(false); return; }
    if (!password) { setError('Please enter your password.'); setLoading(false); return; }
    if (isSignup && !name) { setError('Please enter your name.'); setLoading(false); return; }

    if (isSignup) {
      const { error: signupError } = await supabase.auth.signUp({ email, password });
      if (signupError) { setError(signupError.message); setLoading(false); return; }
      onLoginSuccess(email, name);
    } else {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) { setError('Invalid email or password!'); setLoading(false); return; }
      
      // Supabase la saved name edukanum
      const { data: userData } = await supabase
        .from('users')
        .select('name')
        .eq('email', email)
        .single();

      const defaultName = email.split('@')[0];
      const savedName = userData?.name || defaultName;
      onLoginSuccess(email, savedName);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-8 relative">
      
      <button onClick={onBack} className="absolute top-12 left-6 text-gold/80 hover:text-gold p-2 rounded-full transition-colors active:scale-95 duration-200">
        <ArrowLeft className="w-6 h-6 stroke-[#e3d481]" />
      </button>

      <div className="w-full max-w-sm mx-auto flex flex-col justify-center space-y-12">
        
        <div className="text-center">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl text-gold tracking-wide"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </motion.h3>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">
            as {role === 'customer' ? 'Customer' : 'Barber'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-400 text-xs text-center border border-red-500/20 bg-red-500/5 py-2.5 rounded-lg font-sans">
              {error}
            </div>
          )}

          {isSignup && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-black border border-gold/40 focus:border-gold outline-none px-6 py-4 rounded-xl text-white font-serif placeholder:text-gray-500 focus:ring-1 focus:ring-gold/30 transition-all text-sm tracking-wide"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-black border border-gold/40 focus:border-gold outline-none px-6 py-4 rounded-xl text-white font-serif placeholder:text-gray-500 focus:ring-1 focus:ring-gold/30 transition-all text-sm tracking-wide"
          />

          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-black border border-gold/40 focus:border-gold outline-none px-6 py-4 rounded-xl text-white font-serif placeholder:text-gray-500 focus:ring-1 focus:ring-gold/30 transition-all text-sm tracking-wide"
              autoComplete="current-password"
            />
            {!isSignup && (
              <div className="flex justify-end pt-1">
                <button type="button" onClick={() => alert(`Password recovery sent to ${email || 'your email'}`)} className="text-xs font-sans text-gold/90 hover:text-gold active:underline transition-all tracking-wider">
                  Forgot Password
                </button>
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-gold hover:bg-gold/90 text-black py-4 rounded-2xl font-sans font-semibold text-base transition-all duration-300 shadow-[0_4px_20px_rgba(227,212,129,0.25)] flex items-center justify-center cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
          </motion.button>

          <div className="text-center">
            <button type="button" onClick={() => { setIsSignup(!isSignup); setError(''); }} className="text-xs text-gray-400 hover:text-gold transition-colors">
              {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}