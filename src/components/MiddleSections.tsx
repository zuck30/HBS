'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const CommunicationSection = () => {
  const features = [
    {
      title: 'Classrooms designed for learning',
      desc: 'Spacious, well-organized rooms with a limited number of students per class. The open layout encourages movement, collaboration, and meaningful interactions — every session.',
      points: ['Open layout', 'Low ratio'],
      image: '/assets/Classrooms-designed-for-learning.png'
    },
    {
      title: 'A library that invites you in',
      desc: 'Soft carpets, cozy seating, and child-friendly tables. A diverse collection of storybooks for every age — building a lifelong love of reading from day one.',
      points: ['Reading culture', 'All ages'],
      image: '/assets/kid-in-library.png'
    },
    {
      title: 'Technology, the right way',
      desc: 'A computer room equipped with cutting-edge learning software designed for young learners. Kid-friendly hardware and interactive programs prepare students for the digital future — without losing the magic of childhood.',
      points: ['Digital skills', 'AI literacy'],
      image: '/assets/kids-in-class-with-computer.png'
    },
  ];

  return (
    <section className="bg-white py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        <div className="max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4 block">Life at HBS</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#000080] leading-[1.1] uppercase font-sans">
            What a day looks like. A close look at the spaces, programs, and routines that make HBS feel like a second home.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-8 group"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image src={feature.image} alt={feature.title} fill className="object-cover transition-transform group-hover:scale-110 duration-700" />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-[#000080]">{feature.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  {feature.points.map((point, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#000080]/5 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#D4AF37]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#000080]">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ApplicationSection = () => {
  const items = [
    {
      title: 'Cultural heritage & diversity',
      desc: 'Through festivals, language programs, music, dance, and storytelling, we instill identity and global awareness. Students celebrate their heritage while learning to appreciate others.',
      points: ['Festivals', 'Languages', 'Performing arts'],
      image: '/assets/cultural-heritage.png'
    },
    {
      title: 'Nutritious meals for growing minds',
      desc: 'Wholesome breakfasts, balanced lunches, light afternoon snacks, and hearty suppers for boarders. Every dish is prepared with high-quality ingredients in a clean, welcoming environment.',
      points: ['HACCP', 'Dietitian-planned'],
      image: '/assets/kids-with-meals.png'
    },
  ];

  return (
    <section className="bg-[#fcfcfc] py-32 px-6 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-[40px] shadow-sm border border-neutral-100 items-center group"
          >
            <div className="relative w-full md:w-1/2 aspect-square rounded-[32px] overflow-hidden">
              <Image src={item.image} alt={item.title} fill className="object-cover transition-transform group-hover:scale-110 duration-700" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <h3 className="text-xl font-bold text-[#000080]">{item.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              <div className="flex flex-col gap-2 mt-2">
                {item.points.map((point, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const DataIntelligenceSection = () => {
  return (
    <section className="bg-[#000080] py-32 px-6 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Admissions</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] uppercase font-sans">
            Ready to give your child a world-class start?
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-xl font-medium">
            Term 2 admissions are now open. Book your evaluation/assessment visit and meet the team — limited spaces per class.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/contact" className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B8962E] text-white rounded-lg text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2">
              Book a visit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10">
            <Image src="/assets/school-2.png" alt="HBS Campus" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};