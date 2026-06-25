'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[#f6f5f1] font-sans antialiased overflow-hidden selection:bg-neutral-950 selection:text-white flex flex-col justify-between">
      <Navbar />

      <section className="relative pt-40 pb-24 px-6 flex-1 flex flex-col justify-center items-center">
        {/* Alignment Grid Overlay matches the Mistral look */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          backgroundPosition: 'center center'
        }} />

        {/* Perfectly center-aligned content wrapper block */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
          
          {/* Small uppercase category tag line tracking element */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-6 block"
          >
            AI Scent Agent
          </motion.span>

          {/* Clean heavy bold compressed display title spacing */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-neutral-900 leading-[1.1] max-w-3xl mb-6 font-sans"
          >
            Find Your Signature
            <br />
            Atmosphere
          </motion.h1>

          {/* Centered narrative paragraph block */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-600 text-base md:text-lg font-normal max-w-2xl leading-relaxed mb-12 tracking-wide"
          >
            Our diagnostic routine analyzes your mood, environment, and preferences to map out the perfect custom candle pairings fitted precisely for your living spaces.
          </motion.p>

          {/* Minimal Instruction Card Area */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-neutral-200/80 rounded-xl p-8 max-w-md w-full shadow-sm flex flex-col items-center"
          >
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2">Ready to begin?</h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-6 text-center">
              Click the chat assistant interface icon in the bottom right corner of your screen to trigger your personalized consulting session.
            </p>
            
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-neutral-400 flex items-center justify-center p-2 bg-neutral-50 border border-neutral-100 rounded-lg"
            >
              <ArrowRight className="w-5 h-5 rotate-45 text-neutral-800" />
            </motion.div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}