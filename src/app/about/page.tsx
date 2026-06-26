'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Import images from assets
import school1 from '../../assets/school-1.png';
import school2 from '../../assets/school-2.png';
import sportsClub from '../../assets/sports-club.png';
import kidsWithMeals from '../../assets/kids-with-meals.png';
import schoolBus from '../../assets/school-bus.png';

export default function AboutPage() {
  const { t } = useLanguage();

  const obsessions = [
    {
      id: '01',
      title: 'Great learning in English',
      desc: 'An English-medium education that prepares children for the best secondary schools in Tanzania and beyond taught with curiosity, exploration, and care.',
      image: school1
    },
    {
      id: '02',
      title: 'Nourishing meals, every day',
      desc: 'Wholesome breakfasts, balanced lunches, light afternoon snacks, and hearty suppers for boarders dietitian-planned and prepared in a clean, welcoming kitchen.',
      image: kidsWithMeals
    },
    {
      id: '03',
      title: 'Reliable transport, home and back',
      desc: 'Our own LATRA-compliant bus fleet, trained drivers, fixed routes, and on-time pick-ups. The commute should never be the hardest part of a child\'s day.',
      image: schoolBus
    }
  ];

  const guides = [
    {
      id: '01',
      title: 'Our mission',
      desc: 'To nurture curious, confident, and capable young learners through a world-class English-medium curriculum taught with warmth, rigour, and care.'
    },
    {
      id: '02',
      title: 'Our vision',
      desc: 'Every HBS child finishes primary school ready to thrive academically, socially, and personally anywhere in the world.'
    },
    {
      id: '03',
      title: 'Our values',
      desc: 'Care, Curiosity, Excellence, Integrity, and Community. These are the principles that guide our daily decisions and interactions.'
    }
  ];

  return (
    <main className="pt-16 bg-[#f6f5f1] min-h-screen font-sans selection:bg-[#44ACFF] selection:text-white">
      {/* Hero */}
      <section className="py-24 px-6 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F] mb-4 block">ABOUT HBS</span>
            <h1 className="text-4xl md:text-7xl font-bold text-[#44ACFF] uppercase leading-[0.9] mb-8">
              A school born from a need not a business plan.
            </h1>
            <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-xl">
              Hannah Bennie Schools was never started to make money. It was started because Kigamboni's children deserved a great English-medium school close to home.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden shadow-2xl rotate-0">
            <Image 
              src={school1} 
              alt="HBS early years" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Image Strip */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto relative aspect-[21/9] overflow-hidden shadow-xl">
          <Image 
            src={school2} 
            alt="HBS Lawn" 
            fill 
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-12">
            <p className="text-white text-xs font-bold uppercase tracking-widest">Planted by hand. Shaped by patience.</p>
            <h3 className="text-white text-4xl font-bold uppercase">THE ORIGINAL HBS LAWN KIGAMBONI, 2015.</h3>
          </div>
        </div>
      </section>

      {/* Obsessions Section with Images */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F] mb-4 block">WHAT WE OBSESS OVER</span>
            <h2 className="text-4xl md:text-6xl font-bold text-[#44ACFF] uppercase">Three commitments that have never changed.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
            {obsessions.map((obs) => (
              <div key={obs.id} className="bg-white flex flex-col group hover:bg-neutral-50 transition-colors">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={obs.image} 
                    alt={obs.title} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105 duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-6xl font-bold text-white/20 group-hover:text-[#ECB65F]/30 transition-colors">{obs.id}</span>
                </div>
                <div className="p-10 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-[#44ACFF]">{obs.title}</h3>
                  <p className="text-neutral-500 font-medium leading-relaxed">{obs.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F] mb-4 block">WHAT GUIDES US</span>
            <h2 className="text-4xl md:text-6xl font-bold text-[#44ACFF] uppercase">Mission, vision, and values.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white p-12 flex flex-col gap-6 group hover:bg-neutral-50 transition-colors">
                <span className="text-6xl font-bold text-neutral-100 group-hover:text-[#44ACFF]/10 transition-colors">{guide.id}</span>
                <h3 className="text-2xl font-bold text-[#44ACFF] uppercase">{guide.title}</h3>
                <p className="text-neutral-500 font-medium leading-relaxed">{guide.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}