'use client';
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="font-mono min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img src="/HBSlogo.png" alt="HBS Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-4xl font-bold uppercase italic tracking-tighter">Admin Portal</h1>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Management & Moderation</p>
        </div>

        <form className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="admin@hbs.ac.tz"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button className="w-full py-5 bg-neutral-950 text-white font-bold uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3">
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-8 border-t border-neutral-100 text-center">
          <p className="text-[9px] text-neutral-400 uppercase tracking-widest leading-relaxed">
            Authorized personnel only. Access is monitored and logged.<br />
            © 2026 Hannah Bennie Schools.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
