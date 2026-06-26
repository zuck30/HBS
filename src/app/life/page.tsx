'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LifePage() {
  const { t } = useLanguage();

  const sections = [
    {
      title: 'SPACES',
      subtitle: 'Classrooms designed for learning.',
      desc: 'Spacious, well-organised rooms with a limited number of students per class. The open layout encourages movement, collaboration, and meaningful interactions — so every child is seen and every session counts.',
      points: ['Open layout', 'Low ratio', 'Bright & airy'],
      image: '/assets/Classrooms-designed-for-learning.png'
    },
    {
      title: 'LIBRARY',
      subtitle: 'A library that loves curiosity.',
      desc: 'Soft carpets, cosy seating, and child-friendly tables surround a diverse collection of storybooks for every age. It\'s where a lifelong love of reading begins — quiet corners for one, story circles for many.',
      points: ['Reading culture', 'All ages', 'Storytime'],
      image: '/assets/kid-in-library.png'
    },
    {
      title: 'TECHNOLOGY',
      subtitle: 'Technology that opens doors.',
      desc: 'STEM labs, computer rooms, and smart boards bring learning to life. Kid-friendly hardware and interactive software prepare students for a digital future — introduced thoughtfully, without losing the magic of childhood.',
      points: ['Smart boards', 'Robotics lab', 'Digital skills'],
      image: '/assets/kids-in-class-with-computer.png'
    },
    {
      title: 'ACTIVE LIFE',
      subtitle: 'Sports, clubs & performing arts.',
      desc: 'Courts, a football field, a half-Olympic swimming pool, and indoor game areas keep bodies moving. Music, drama, and dance programmes help students discover talents, build confidence, and grow into well-rounded people.',
      points: ['Football', 'Swimming', 'Music'],
      image: '/assets/sports-club.png'
    },
    {
      title: 'COMMUNITY',
      subtitle: 'Cultural heritage & community.',
      desc: 'Through festivals, language programmes, music, dance, and storytelling, we instil identity and global awareness. Students celebrate their own heritage while learning to appreciate others — growing into confident global citizens.',
      points: ['Festivals', 'Languages', 'Performing arts'],
      image: '/assets/cultural-heritage.png'
    },
    {
      title: 'DINING',
      subtitle: 'Nutritious meals for growing minds.',
      desc: 'Wholesome breakfasts, balanced lunches, light afternoon snacks, and hearty suppers for boarders. Every dish is prepared with quality ingredients in a clean, welcoming dining area.',
      points: ['HACCP', 'Dietitian-planned', 'Fresh daily'],
      image: '/assets/kids-with-meals.png'
    },
    {
      title: 'TRANSPORT',
      subtitle: 'Safe school transport.',
      desc: 'Well-maintained vehicles and trained staff make every ride to and from school comfortable and secure — so parents have peace of mind and students arrive ready to learn.',
      points: ['LATRA-compliant', 'Trained drivers', 'Door-to-door'],
      image: '/assets/school-bus.png'
    },
    {
      title: 'BOARDING',
      subtitle: 'Comfortable boarding.',
      desc: 'Spacious dormitories with cosy bedding, personal storage, and a peaceful atmosphere for rest and study. Dedicated supervision fosters independence, discipline, and personal growth — making boarding life supportive and enjoyable.',
      points: ['24/7 supervision', 'Study spaces', 'Home-like'],
      image: '/assets/dorms.png'
    }
  ];

  const schedule = [
    { time: '7:00', event: 'Arrival & breakfast' },
    { time: '8:00', event: 'Morning assembly' },
    { time: '8:30', event: 'Lessons begin' },
    { time: '10:30', event: 'Snack & outdoor play' },
    { time: '11:00', event: 'Lessons continue' },
    { time: '13:00', event: 'Lunch in the dining area' },
    { time: '14:00', event: 'Lessons & enrichment' },
    { time: '15:00', event: 'Afternoon tea / snack' },
    { time: '16:00', event: 'Clubs & sports' },
    { time: '17:00', event: 'Pickup or boarders\' study time' },
    { time: '19:00', event: 'Dinner (boarders)' },
    { time: '20:30', event: 'Quiet time / read-aloud (boarders)' },
    { time: '21:00', event: 'Lights out' }
  ];

  return (
    <main className="pt-16 bg-[#f6f5f1] min-h-screen font-sans">
      <section className="py-24 px-6 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4 block">LIFE AT HBS</span>
          <h1 className="text-4xl md:text-7xl font-bold text-[#000080] uppercase leading-[0.9] mb-8 max-w-4xl">
            More than lessons — a whole world of learning.
          </h1>
          <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-3xl">
            Boarding, dining, sports, clubs, technology, and the everyday rhythms that make HBS feel like home.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, i) => (
            <div key={i} className="flex flex-col bg-white rounded-[40px] overflow-hidden shadow-sm border border-neutral-200 group">
              <div className="relative aspect-video overflow-hidden">
                <Image src={section.image} alt={section.title} fill className="object-cover transition-transform group-hover:scale-110 duration-700" />
                <div className="absolute top-8 left-8">
                  <span className="bg-[#D4AF37] text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {section.title}
                  </span>
                </div>
              </div>
              <div className="p-10 flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-[#000080]">{section.subtitle}</h3>
                <p className="text-neutral-500 font-medium leading-relaxed">{section.desc}</p>
                <div className="flex flex-wrap gap-4">
                  {section.points.map((point, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#000080]/5 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#D4AF37]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4 block">A TYPICAL DAY</span>
            <h2 className="text-4xl font-bold text-[#000080] uppercase mb-8">From breakfast to lights out.</h2>
            <p className="text-neutral-500 font-medium leading-relaxed mb-8">
              A gentle, predictable rhythm that balances focused learning with play, rest, and friendship.
            </p>
          </div>
          <div className="bg-white rounded-[40px] border border-neutral-200 p-10 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-[100px]" />
             <div className="flex flex-col gap-6">
               {schedule.map((item, i) => (
                 <div key={i} className="flex items-center gap-8 group">
                   <span className="text-sm font-bold text-[#D4AF37] w-12">{item.time}</span>
                   <div className="h-px flex-1 bg-neutral-100 group-hover:bg-[#000080]/20 transition-colors" />
                   <span className="text-sm font-bold text-[#000080] uppercase tracking-wide">{item.event}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}