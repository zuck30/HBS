'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (['super_admin', 'admin', 'moderator'].includes(profile?.role)) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (['super_admin', 'admin', 'moderator'].includes(profile?.role)) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f1] flex items-center justify-center px-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 shadow-2xl border border-neutral-200"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <img src="/HBSlogo.png" alt="HBS Logo" className="h-16 w-auto mb-6" />
          <h1 className="text-2xl font-bold text-[#44ACFF] uppercase tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-widest mt-2">HBS Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 w-4 h-4" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border border-neutral-200 outline-none focus:ring-1 focus:ring-[#44ACFF] transition-all bg-neutral-50 font-medium text-sm"
                placeholder="you@hbs.ac.tz"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 w-4 h-4" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border border-neutral-200 outline-none focus:ring-1 focus:ring-[#44ACFF] transition-all bg-neutral-50 font-medium text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#44ACFF] text-white py-5 font-bold uppercase tracking-widest hover:bg-[#ECB65F] transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
} 