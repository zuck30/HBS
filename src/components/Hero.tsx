'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  const heroBackgroundUrl = new URL('../assets/hero.jpg', import.meta.url).href;

  return (
    <section className="relative min-h-screen w-full bg-[#f6f5f1] font-sans antialiased overflow-hidden flex flex-col justify-center items-center px-6 selection:bg-neutral-950 selection:text-white">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackgroundUrl})` }}
        />

        <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px]" />
      </div>


      <div className="absolute inset-0 z-10 opacity-[0.07] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, #000 1px, transparent 1px),
          linear-gradient(to bottom, #000 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
        backgroundPosition: 'center center'
      }} />


      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-neutral-900 leading-[1.1] max-w-3xl mb-6 font-sans"
        >
          The Scent of
          <br />
          Serenity
        </motion.h1>


        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-700 text-base md:text-lg font-normal max-w-2xl leading-relaxed mb-8 tracking-wide"
        >
          Luxury scent-led wellness from the heart of Tanzania. Discover handcrafted candles
          and immersive sensory experiences that bring calm to your everyday.
        </motion.p>


        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link 
            href="/shop"
            className="group px-5 py-2.5 bg-neutral-950 hover:bg-neutral-900 text-white rounded-lg text-xs font-medium tracking-wide transition-all shadow-sm flex items-center gap-2 inline-flex"
          >
            Shop Candles
            <ChevronRight className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};