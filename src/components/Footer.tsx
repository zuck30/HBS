'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

export const FinalCTAAndFooter = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="w-full bg-[#f6f5f1] text-neutral-900 font-sans antialiased border-t border-neutral-200/60 flex flex-col overflow-hidden selection:bg-[#44ACFF] selection:text-white">
      
      {/* 1. Refined Center-Aligned Banner Section */}
      <section className="relative w-full max-w-4xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          backgroundPosition: 'center center'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center justify-center"
        >
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#ECB65F] uppercase mb-4 block">
            Admissions
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 max-w-2xl mb-8 leading-[1.15] uppercase">
            Ready to give your child a world-class start?
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group px-6 py-3 bg-[#6D9E51] hover:bg-[#5a8a42] text-white rounded-lg text-xs font-medium tracking-wide transition-all shadow-sm flex items-center gap-2"
            >
              {t('hero.book_visit')}
              <ChevronRight className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. Simplified Minimal Navigation Links */}
      <footer className="w-full border-t border-neutral-200/40 bg-[#f6f5f1] pb-12">
        <div className="max-w-4xl mx-auto px-6 pt-12 flex flex-col items-center justify-center text-center">
          
          <div className="mb-8">
            <img src="/HBSlogo.png" alt="HBS Logo" className="h-13 w-13 object-contain mix-blend-multiply mx-auto" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-8 text-xs font-bold tracking-wide text-neutral-500 uppercase">
            <Link href="/about" className="hover:text-[#44ACFF] transition-colors">About</Link>
            <Link href="/programs" className="hover:text-[#44ACFF] transition-colors">Programs</Link>
            <Link href="/life" className="hover:text-[#44ACFF] transition-colors">Life at HBS</Link>
            <Link href="/careers" className="hover:text-[#44ACFF] transition-colors">Careers</Link>
            <Link href="/blog" className="hover:text-[#44ACFF] transition-colors">Blog</Link>
            <Link href="/events" className="hover:text-[#44ACFF] transition-colors">Events</Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <a
              href="https://www.facebook.com/hbs.tanzania"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#1877F2] transition-all hover:scale-110"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/hbs.tanzania"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#E4405F] transition-all hover:scale-110"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-3 gap-x-6 text-xs text-neutral-400 font-bold uppercase">
            <span className="flex items-center gap-1.5 select-all hover:text-neutral-600 transition-colors">
              <Mail className="w-3.5 h-3.5 opacity-70" />
              hbs.admin@hbs.ac.tz
            </span>
            <span className="flex items-center gap-1.5 select-all hover:text-neutral-600 transition-colors">
              <Phone className="w-3.5 h-3.5 opacity-70" />
              +255 762 224 224
            </span>
          </div>

        </div>
      </footer>

      {/* 3. Bottom Meta and Language Controls Row */}
      <div className="bg-[#f6f5f1] border-t border-neutral-200/60 py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold tracking-wide text-neutral-400 uppercase">
          
          <div>
            Hannah Bennie Schools © {new Date().getFullYear()}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-[10px] font-normal tracking-normal text-neutral-400 uppercase">
              Made by{' '}
              <a
                href="https://github.com/zuck30"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-neutral-900 transition-colors underline-offset-2 hover:underline"
              >
                Sheddysilicon
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              {['en', 'sw'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as any)}
                  className={`uppercase px-2 py-0.5 rounded text-[9px] font-bold border transition-all ${
                    language === lang 
                      ? 'bg-[#44ACFF] text-white border-[#44ACFF]'
                      : 'bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}