'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();
  const heroBackgroundUrl = '/assets/school-1.png';

  return (
    <section className="relative min-h-screen w-full bg-[#f6f5f1] font-sans antialiased overflow-hidden flex flex-col justify-center items-center px-6 selection:bg-[#000080] selection:text-white">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackgroundUrl})` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
      </div>

      <div className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, #000 1px, transparent 1px),
          linear-gradient(to bottom, #000 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
        backgroundPosition: 'center center'
      }} />

      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center justify-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col items-center gap-2"
        >
          <span className="bg-[#D4AF37] text-white px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
            {t('hero.breaking')}
          </span>
          <p className="text-[#000080] text-xs font-bold uppercase tracking-widest mt-2">
            NECTA No.1 · Dar es Salaam Region
          </p>
          <p className="text-neutral-500 text-[10px] uppercase font-semibold">
            Term 2 admissions now open
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-[#000080] leading-[1.1] max-w-4xl mb-6 font-sans uppercase"
        >
          NURSERY & PRIMARY<br />
          <span className="text-[#D4AF37]">ESTABLISHED DAR ES SALAAM</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-700 text-lg md:text-xl font-normal max-w-3xl leading-relaxed mb-10 tracking-wide"
        >
          {t('hero.tagline')} {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link 
            href="/contact"
            className="group px-8 py-4 bg-[#D4AF37] hover:bg-[#B8962E] text-white rounded-lg text-sm font-bold tracking-wide transition-all shadow-md flex items-center gap-2 inline-flex"
          >
            {t('hero.book_visit')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/programs"
            className="group px-8 py-4 bg-white border border-[#000080]/20 hover:bg-neutral-50 text-[#000080] rounded-lg text-sm font-bold tracking-wide transition-all shadow-sm flex items-center gap-2 inline-flex"
          >
            {t('hero.explore_programs')}
            <ChevronRight className="h-4 w-4 opacity-80" />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          <div className="flex flex-col items-center">
            <span className="text-[#000080] text-xl md:text-2xl font-bold">No.1</span>
            <span className="text-[10px] text-neutral-500 uppercase font-bold text-center mt-1">NECTA Dar 2024</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#000080] text-xl md:text-2xl font-bold">289.9</span>
            <span className="text-[10px] text-neutral-500 uppercase font-bold text-center mt-1">Average PSLE 2024</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#000080] text-xl md:text-2xl font-bold">100%</span>
            <span className="text-[10px] text-neutral-500 uppercase font-bold text-center mt-1">Daraja A Students</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#000080] text-xl md:text-2xl font-bold">Top 10</span>
            <span className="text-[10px] text-neutral-500 uppercase font-bold text-center mt-1">Nation-wide Cat 40+</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};