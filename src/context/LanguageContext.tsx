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
    'nav.contact': 'Contact',
    'nav.enroll': 'Enroll Now',
    'nav.blogs': 'Blogs',
    'nav.events': 'Events',
    'hero.title': 'Ignite curiosity. Grow potential.',
    'hero.subtitle': 'We enrich young minds and inspire children to be creative, mindful, and influential to their communities and the world.',
    'hero.visit': 'Book a visit',
    'hero.explore': 'Explore programs',
    'footer.address': '140 Kimbiji Road, 17106 Mji Mwema, Dar es Salaam, Tanzania.',
    'footer.quick_links': 'Quick links',
    'footer.visit_apply': 'Visit & apply',
    'footer.get_in_touch': 'Get in touch'
  },
  sw: {
    'nav.home': 'Nyumbani',
    'nav.about': 'Kuhusu Sisi',
    'nav.programs': 'Programu',
    'nav.life': 'Maisha',
    'nav.careers': 'Ajira',
    'nav.contact': 'Wasiliana Nasi',
    'nav.enroll': 'Jiunge Sasa',
    'nav.blogs': 'Blogu',
    'nav.events': 'Matukio',
    'hero.title': 'Washa udadisi. Kuza uwezo.',
    'hero.subtitle': 'Tunatajirisha akili za vijana na kuwahamasisha watoto kuwa wabunifu, wasikivu, na wenye ushawishi kwa jamii zao na ulimwengu.',
    'hero.visit': 'Weka miadi ya kutembelea',
    'hero.explore': 'Chunguza programu',
    'footer.address': '140 Barabara ya Kimbiji, 17106 Mji Mwema, Dar es Salaam, Tanzania.',
    'footer.quick_links': 'Viungo vya haraka',
    'footer.visit_apply': 'Tembelea na tuma maombi',
    'footer.get_in_touch': 'Wasiliana nasi'
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
