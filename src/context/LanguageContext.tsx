'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.programs': 'Programs',
    'nav.life': 'Life',
    'nav.careers': 'Careers',
    'nav.blog': 'Blog',
    'nav.events': 'Events',
    'nav.contact': 'Contact',
    'nav.enroll': 'Enroll Now',
    'footer.address': '140 Kimbiji Road, 17106 Mji Mwema, Dar es Salaam, Tanzania.',
    'footer.quick_links': 'Quick links',
    'footer.get_in_touch': 'Get in touch',
    'footer.enquiries': 'General enquiries',
    'footer.hr': 'HR / Job applications',
    'footer.rights': 'All rights reserved.',
    'hero.breaking': 'BREAKING: We\'re hiring',
    'hero.tagline': 'Ignite curiosity. Grow potential.',
    'hero.description': 'We enrich young minds and inspire children to be creative, mindful, and influential to their communities and the world.',
    'hero.book_visit': 'Book a visit',
    'hero.explore_programs': 'Explore programs',
    'stats.no1': 'No.1 NECTA · Dar es Salaam Region 2024',
    'stats.average': '289.9 Highest school average · PSLE 2024',
    'stats.students': '59 Students · 100% Daraja A',
    'stats.nationwide': 'Top 10 Nation-wide · Category 40+',
    'common.learn_more': 'Learn more',
    'contact.title': 'Let\'s talk — we\'d love to meet your family.',
    'contact.send_enquiry': 'Send us an enquiry'
  },
  sw: {
    'nav.home': 'Nyumbani',
    'nav.about': 'Kuhusu',
    'nav.programs': 'Programu',
    'nav.life': 'Maisha ya Shule',
    'nav.careers': 'Kazi',
    'nav.blog': 'Blogu',
    'nav.events': 'Matukio',
    'nav.contact': 'Wasiliana Nasi',
    'nav.enroll': 'Jisajili Sasa',
    'footer.address': 'Barabara ya 140 Kimbiji, 17106 Mji Mwema, Dar es Salaam, Tanzania.',
    'footer.quick_links': 'Viungo vya Haraka',
    'footer.get_in_touch': 'Wasiliana Nasi',
    'footer.enquiries': 'Maswali ya Jumla',
    'footer.hr': 'HR / Maombi ya Kazi',
    'footer.rights': 'Haki zote zimehifadhiwa.',
    'hero.breaking': 'TAARIFA: Tunajiri',
    'hero.tagline': 'Washa udadisi. Kuza uwezo.',
    'hero.description': 'Tunatajirisha akili za vijana na kuwatia moyo watoto kuwa wabunifu, wenye busara, na wenye ushawishi kwa jamii zao na ulimwengu.',
    'hero.book_visit': 'Weka miadi ya kutembelea',
    'hero.explore_programs': 'Gundua programu',
    'stats.no1': 'Namba 1 NECTA · Mkoa wa Dar es Salaam 2024',
    'stats.average': 'Wastani wa juu wa shule 289.9 · PSLE 2024',
    'stats.students': 'Wanafunzi 59 · 100% Daraja A',
    'stats.nationwide': 'Shule 10 Bora Kitaifa · Jamii 40+',
    'common.learn_more': 'Jifunze zaidi',
    'contact.title': 'Tuzungumze — tungependa kukutana na familia yako.',
    'contact.send_enquiry': 'Tutunzie swali lako'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};