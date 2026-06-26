'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export const FinalCTAAndFooter = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="w-full bg-[#f6f5f1] text-neutral-900 font-sans antialiased border-t border-neutral-200/60 flex flex-col overflow-hidden selection:bg-[#000080] selection:text-white">
      
      {/* 1. Final CTA Section */}
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
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-4 block">
            Join Our Community
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#000080] max-w-2xl mb-8 leading-[1.15]">
            Ready to give your child a world-class start?
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group px-6 py-3 bg-[#D4AF37] hover:bg-[#B8962E] text-white rounded-lg text-sm font-medium tracking-wide transition-all shadow-sm flex items-center gap-2"
            >
              {t('hero.book_visit')}
              <ChevronRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. Main Footer Content */}
      <footer className="w-full border-t border-neutral-200/40 bg-[#f6f5f1] pb-12">
        <div className="max-w-7xl mx-auto px-6 pt-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo & Address */}
          <div className="flex flex-col gap-6">
            <img src="/HBSlogo.png" alt="HBS Logo" className="h-16 w-auto self-start object-contain mix-blend-multiply" />
            <p className="text-sm font-bold text-[#000080]">Hannah Bennie Schools</p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Nursery · Primary · Dar es Salaam<br />
              {t('footer.address')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#000080]">{t('footer.quick_links')}</h4>
            <div className="flex flex-col gap-3 text-xs text-neutral-500 font-medium">
              <Link href="/about" className="hover:text-[#D4AF37] transition-colors">About</Link>
              <Link href="/programs" className="hover:text-[#D4AF37] transition-colors">Programs</Link>
              <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Admissions</Link>
              <Link href="/life" className="hover:text-[#D4AF37] transition-colors">Life at HBS</Link>
              <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Visit & apply</Link>
              <Link href="/careers" className="hover:text-[#D4AF37] transition-colors">Careers</Link>
              <Link href="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</Link>
              <Link href="/events" className="hover:text-[#D4AF37] transition-colors">Events</Link>
              <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact us</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#000080]">{t('footer.get_in_touch')}</h4>
            <div className="flex flex-col gap-4 text-xs text-neutral-500 font-medium">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span>+255 762 224 224</span>
                  <span>+255 627 30 10 10</span>
                  <span>+255 765 001 001</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span className="font-bold text-[#000080]">{t('footer.enquiries')}:</span>
                  <span>hbs.admin@hbs.ac.tz</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <div className="flex flex-col">
                  <span className="font-bold text-[#000080]">{t('footer.hr')}:</span>
                  <span>hr.hbs.tz@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Link */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#000080]">Location</h4>
            <a 
              href="https://maps.google.com/?q=Hannah+Bennie+Schools+Dar+es+Salaam"
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col gap-4"
            >
              <div className="w-full aspect-video bg-neutral-200 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/0 transition-colors">
                  <MapPin className="w-8 h-8 text-[#D4AF37]" />
                </div>
              </div>
              <span className="text-xs font-bold text-[#000080] group-hover:text-[#D4AF37] transition-colors underline underline-offset-4">View on Google Maps →</span>
            </a>
          </div>

        </div>
      </footer>

      {/* 3. Bottom Row */}
      <div className="bg-[#f6f5f1] border-t border-neutral-200/60 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-medium tracking-wide text-neutral-400 uppercase">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <span>© {new Date().getFullYear()} Hannah Bennie Schools. {t('footer.rights')}</span>
            <span>Made by Sheddysilicon (github.com/zuck30)</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              {['en', 'sw'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as any)}
                  className={`uppercase px-3 py-1 rounded text-[10px] font-bold border transition-all ${
                    language === lang 
                      ? 'bg-[#000080] text-white border-[#000080]'
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