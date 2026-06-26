'use client';
import React from 'react'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'

export const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 pt-16 pb-8 font-mono antialiased">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img src="/HBSlogo.png" alt="HBS Logo" className="h-12 w-12 object-contain" />
            <div className="leading-tight uppercase tracking-wider font-bold">
              <div className="text-sm">Hannah Bennie</div>
              <div className="text-[10px] text-neutral-500">Schools</div>
            </div>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-xs">
            Nursery · Primary · Dar es Salaam<br />
            {t('footer.address')}
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 bg-white border border-neutral-200 hover:bg-neutral-900 hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">{t('footer.quick_links')}</h4>
          <ul className="space-y-4 text-[11px] uppercase font-bold text-neutral-500">
            <li><Link href="/about" className="hover:text-black transition-colors">{t('nav.about')}</Link></li>
            <li><Link href="/programs" className="hover:text-black transition-colors">{t('nav.programs')}</Link></li>
            <li><Link href="/contact" className="hover:text-black transition-colors">Admissions</Link></li>
            <li><Link href="/life" className="hover:text-black transition-colors">Life at HBS</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">{t('footer.visit_apply')}</h4>
          <ul className="space-y-4 text-[11px] uppercase font-bold text-neutral-500">
            <li><Link href="/careers" className="hover:text-black transition-colors">{t('nav.careers')}</Link></li>
            <li><Link href="/contact" className="hover:text-black transition-colors">{t('nav.contact')}</Link></li>
            <li><Link href="/contact" className="hover:text-black transition-colors">Book a visit</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">{t('footer.get_in_touch')}</h4>
          <ul className="space-y-4 text-[11px] font-bold text-neutral-500">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-black shrink-0" />
              <div className="space-y-1">
                <div>+255 762 224 224</div>
                <div>+255 627 30 10 10</div>
                <div>+255 765 001 001</div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-black shrink-0" />
              <div className="lowercase">hbs.admin@hbs.ac.tz</div>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-black shrink-0" />
              <div className="lowercase">hr.hbs.tz@gmail.com</div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
        <div>© 2026 Hannah Bennie Schools. All rights reserved.</div>
        <div>Made by Sheddysilicon (github.com/zuck30)</div>
      </div>
    </footer>
  )
}
