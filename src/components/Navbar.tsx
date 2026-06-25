'use client';
import React, { useState } from 'react'
import { Menu, X, Globe, ShoppingCart, User, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '../context/LanguageContext'

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLangs, setShowLangs] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  const languages: { code: 'en' | 'sw'; name: string }[] = [
    { code: 'en', name: 'EN' },
    { code: 'sw', name: 'SW' }
  ]

  // Added Nawwi At Yours link right here
  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Nawwi At Yours', href: '/at-yours' },
    { name: 'Our Story', href: '/story' },
    { name: 'About Us', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Quiz', href: '/quiz' },
    { name: 'Track Order', href: '/track' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200/80 text-xs font-mono font-bold antialiased uppercase tracking-wider h-16">
        <div className="max-w-7xl mx-auto flex items-stretch justify-between h-full">
          
          <div className="flex items-stretch">
            <Link href="/" className="flex items-center gap-3 px-6 border-r border-neutral-200/80 hover:bg-neutral-50 transition-colors">
              <img src="/Nawwi-logo.png" alt="Nawwi Logo" className="h-16 w-16 object-contain" />
            </Link>

            <div className="hidden lg:flex items-stretch">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 border-r border-neutral-200/80 transition-colors flex items-center whitespace-nowrap ${
                    pathname === link.href ? 'bg-neutral-950 text-white' : 'text-black hover:bg-neutral-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-stretch">
            <div className="relative flex items-stretch border-l border-neutral-200/80">
              <button
                onClick={() => setShowLangs(!showLangs)}
                className="px-4 flex items-center gap-2 text-black hover:bg-neutral-50 transition-colors"
              >
                <Globe className="w-4 h-4 stroke-[2.5px]" />
                <span>{language}</span>
              </button>
              
              <AnimatePresence>
                {showLangs && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute right-0 top-16 bg-white border border-neutral-200/80 shadow-sm w-24 flex flex-col divide-y divide-neutral-200/80"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setShowLangs(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs font-bold transition-colors ${
                          language === lang.code ? 'bg-neutral-950 text-white' : 'text-black hover:bg-neutral-50'
                        }`}
                      >
                        {lang.code}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/shop/checkout" className="px-6 flex items-center gap-2 border-l border-neutral-200/80 text-black hover:bg-neutral-50 transition-colors">
              <ShoppingCart size={18} />
            </Link>

            <Link href="/login" className="px-6 flex items-center gap-2 border-l border-neutral-200/80 text-black hover:bg-neutral-50 transition-colors">
              <User size={18} />
            </Link>
            
            <Link href="https://wa.me/255612078359" target="_blank" className="px-6 bg-neutral-950 text-white font-bold flex items-center justify-center hover:bg-neutral-900 border-l border-neutral-200/80 transition-colors gap-2 relative group">
              <span>{t('nav.contact_sales')}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
            </Link>
          </div>

          <button
            className="lg:hidden px-6 flex items-center justify-center text-black border-l border-neutral-200/80 hover:bg-neutral-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5px]" /> : <Menu className="w-5 h-5 stroke-[2.5px]" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-16 bg-white z-40 lg:hidden flex flex-col divide-y divide-neutral-200/80 border-t border-neutral-200/80 overflow-y-auto font-mono font-bold text-xs uppercase tracking-wider"
          >
            <div className="flex flex-col divide-y divide-neutral-200/60 text-black">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-6 py-4 hover:bg-neutral-50 ${pathname === link.href ? 'bg-neutral-950 text-white' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 hover:bg-neutral-50">Account</Link>
            </div>
            
            <div className="mt-auto bg-neutral-50 flex flex-col divide-y divide-neutral-200/80 border-t border-neutral-200/80">
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="p-4 font-bold text-center text-black hover:bg-neutral-100 transition-colors">
                {t('nav.start_building')}
              </Link>
              <Link 
                href="https://wa.me/255612078359"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-4 font-bold text-center bg-neutral-950 text-white hover:bg-neutral-900 transition-colors"
              >
                {t('nav.contact_sales')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}