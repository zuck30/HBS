'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sw' | 'pl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.products': 'Shop',
    'nav.solutions': 'Events',
    'nav.sekela': 'Workshops',
    'nav.developers': 'Journal',
    'nav.blog': 'Journal',
    'nav.customers': 'Community',
    'nav.company': 'Our Story',
    'nav.contact_sales': 'Contact Us',
    'nav.start_building': 'Shop Now',
    'hero.title_part1': 'The Scent of',
    'hero.title_part2': 'Serenity.',
    'hero.description': 'Nawwi Wellness brings luxury, scent-led wellness from the heart of Tanzania. Discover handcrafted candles and immersive sensory experiences designed for your sanctuary.',
    'page.products.title': 'Our Candles',
    'page.products.desc': 'Handcrafted scents for every mood and space.',
    'page.solutions.title': 'Bespoke Events',
    'page.solutions.desc': 'Immersive sensory experiences in the heart of Tanzania.',
    'page.sekela.title': 'Scent Workshops',
    'page.sekela.desc': 'Learn the art of candle making and scent blending.',
    'page.developers.title': 'Journal',
    'page.developers.desc': 'Stories of wellness, scent, and serenity.',
    'page.blog.title': 'Journal',
    'page.blog.desc': 'Latest insights and updates from NAWWI.',
    'page.customers.title': 'Our Community',
    'page.customers.desc': 'Sharing the journey of wellness together.',
    'page.company.title': 'Our Story',
    'page.company.desc': 'Our mission to bring peace and serenity through scent.',
    'page.models.title': 'Scent Science',
    'page.models.desc': 'The art and psychology behind our unique blends.',
    'company.founded': 'Founded',
    'company.founded_value': '2026',
    'company.headquarters': 'Headquarters',
    'company.headquarters_value': 'Dar es Salaam, Tanzania',
    'company.offices': 'Offices',
    'company.offices_value': 'Dar es Salaam • Dodoma'
  },
  sw: {
    'nav.products': 'Duka',
    'nav.solutions': 'Matukio',
    'nav.sekela': 'Warsha',
    'nav.developers': 'Jarida',
    'nav.blog': 'Jarida',
    'nav.customers': 'Jamii',
    'nav.company': 'Hadithi Yetu',
    'nav.contact_sales': 'Wasiliana Nasi',
    'nav.start_building': 'Nunua Sasa',
    'hero.title_part1': 'Harufu ya',
    'hero.title_part2': 'Utulivu.',
    'hero.description': 'NAWWI Wellness inaleta afya ya hali ya juu inayoongozwa na harufu kutoka moyoni mwa Tanzania. Gundua mishumaa iliyotengenezwa kwa mkono na uzoefu wa hisia ulioundwa kwa ajili ya makazi yako.',
    'page.products.title': 'Mishumaa Yetu',
    'page.products.desc': 'Harufu zilizotengenezwa kwa mkono kwa kila hali.',
    'page.solutions.title': 'Matukio Maalum',
    'page.solutions.desc': 'Uzoefu wa hisia katika moyo wa Tanzania.',
    'page.sekela.title': 'Warsha za Harufu',
    'page.sekela.desc': 'Jifunze sanaa ya kutengeneza mishumaa.',
    'page.developers.title': 'Jarida',
    'page.developers.desc': 'Hadithi za afya na utulivu.',
    'page.blog.title': 'Jarida',
    'page.blog.desc': 'Maelezo ya hivi karibuni kutoka NAWWI.',
    'page.customers.title': 'Jamii Yetu',
    'page.customers.desc': 'Kushiriki safari ya afya pamoja.',
    'page.company.title': 'Hadithi Yetu',
    'page.company.desc': 'Dhamira yetu ya kuleta amani kupitia harufu.',
    'page.models.title': 'Sayansi ya Harufu',
    'page.models.desc': 'Sanaa na saikolojia nyuma ya mchanganyiko wetu.',
    'company.founded': 'Ilianzishwa',
    'company.founded_value': '2026',
    'company.headquarters': 'Makao Makuu',
    'company.headquarters_value': 'Dar es Salaam, Tanzania',
    'company.offices': 'Ofisi',
    'company.offices_value': 'Dar es Salaam • Dodoma'
  },
  pl: {
    'nav.products': 'Sklep',
    'nav.solutions': 'Wydarzenia',
    'nav.sekela': 'Warsztaty',
    'nav.developers': 'Dziennik',
    'nav.blog': 'Dziennik',
    'nav.customers': 'Społeczność',
    'nav.company': 'Nasza Historia',
    'nav.contact_sales': 'Kontakt',
    'nav.start_building': 'Kup Teraz',
    'hero.title_part1': 'Zapach',
    'hero.title_part2': 'Spokoju.',
    'hero.description': 'NAWWI Wellness przynosi luksusowe produkty zapachowe prosto z serca Tanzanii. Odkryj ręcznie robione świece i niezwykłe doznania sensoryczne stworzone dla Twojego sanktuarium.',
    'page.products.title': 'Nasze Świece',
    'page.products.desc': 'Ręcznie tworzone zapachy dla Twojego domu.',
    'page.solutions.title': 'Wydarzenia',
    'page.solutions.desc': 'Niezapomniane wrażenia sensoryczne w sercu Tanzanii.',
    'page.sekela.title': 'Warsztaty Zapachowe',
    'page.sekela.desc': 'Naucz się sztuki tworzenia świec i zapachów.',
    'page.developers.title': 'Dziennik',
    'page.developers.desc': 'Opowieści o wellness i zapachach.',
    'page.blog.title': 'Dziennik',
    'page.blog.desc': 'Najnowsze wieści od NAWWI.',
    'page.customers.title': 'Nasza Społeczność',
    'page.customers.desc': 'Wspólna podróż do dobrego samopoczucia.',
    'page.company.title': 'Nasza Historia',
    'page.company.desc': 'Nasza misja niesienia spokoju poprzez zapach.',
    'page.models.title': 'Nauka o Zapachu',
    'page.models.desc': 'Sztuka i psychologia stojąca za naszymi mieszankami.',
    'company.founded': 'Założona',
    'company.founded_value': '2026',
    'company.headquarters': 'Siedziba Główna',
    'company.headquarters_value': 'Dar es Salaam, Tanzania',
    'company.offices': 'Biura',
    'company.offices_value': 'Dar es Salaam • Dodoma'
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