'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import heroImage from '../assets/hero.png';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen w-full bg-[#f6f5f1] font-sans antialiased overflow-hidden flex flex-col justify-center items-center px-6 selection:bg-[#44ACFF] selection:text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="HBS Campus"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.07] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, #000 1px, transparent 1px),
          linear-gradient(to bottom, #000 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
        backgroundPosition: 'center center'
      }} />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-neutral-900 leading-[1.1] max-w-3xl mb-6 font-sans uppercase"
        >
          Nursery & Primary<br />
          <span className="text-[#44ACFF]">Established Dar es Salaam</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-700 text-base md:text-lg font-normal max-w-2xl leading-relaxed mb-8 tracking-wide"
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
            className="group px-6 py-3 bg-[#6D9E51] hover:bg-[#5a8a42] text-white rounded-lg text-xs font-medium tracking-wide transition-all shadow-sm flex items-center gap-2 inline-flex"
          >
            {t('hero.book_visit')}
            <ChevronRight className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/programs"
            className="group px-6 py-3 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-900 rounded-lg text-xs font-medium tracking-wide transition-all shadow-sm flex items-center gap-2 inline-flex"
          >
            {t('hero.explore_programs')}
            <ChevronRight className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};