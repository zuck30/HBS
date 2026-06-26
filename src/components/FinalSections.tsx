'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const OperationSection = () => {
  const steps = [
    { title: 'LATRA-compliant', desc: 'Well-maintained vehicles and trained staff make every ride comfortable and secure.' },
    { title: 'Trained drivers', desc: 'Our drivers are experienced and undergo regular safety training.' },
    { title: '24/7 supervision', desc: 'Spacious dormitories with cozy bedding and dedicated supervision for boarders.' },
    { title: 'Study spaces', desc: 'Peaceful atmosphere for rest and study, fostering independence and discipline.' },
  ];

  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2">
          <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl">
            <Image src="/assets/school-bus.png" alt="School Transport" fill className="object-cover" />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Transport & Boarding</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#000080] leading-[1.1] uppercase font-sans">
            Safe, reliable school bus service & Comfortable boarding.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-2">
                <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">{step.title}</h4>
                <p className="text-neutral-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const DataScienceSection = () => {
  const stats = [
    { label: 'NECTA No.1', value: '2024', sub: 'Dar es Salaam Region' },
    { label: 'Highest Average', value: '289.9', sub: 'PSLE 2024' },
    { label: 'Daraja A', value: '100%', sub: '59 Students' },
    { label: 'Nation-wide', value: 'Top 10', sub: 'Category 40+' },
  ];

  return (
    <section className="bg-[#fcfcfc] py-32 px-6 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        <div className="text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-[#000080] uppercase font-sans mb-4">Unmatched Academic Results</h2>
          <p className="text-neutral-500 font-medium">Our results speak for themselves. We are committed to excellence in every aspect of our students' education.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[32px] shadow-sm border border-neutral-100 flex flex-col items-center text-center gap-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />
              </div>
              <span className="text-4xl font-bold text-[#000080]">{stat.value}</span>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{stat.label}</span>
              <span className="text-[10px] text-neutral-400 font-bold uppercase">{stat.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhySection = () => {
  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto bg-[#000080] rounded-[60px] p-12 md:p-24 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2 group-hover:translate-x-1/3 transition-transform duration-1000" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase font-sans leading-tight mb-8">
              Experience HBS <br />
              <span className="text-[#D4AF37]">In Person</span>
            </h2>
            <p className="text-blue-100 text-lg font-medium mb-10">
              Book a school visit, meet our teachers, and see our classrooms, library, and play spaces in person.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B8962E] text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-all">
                Book a visit
              </Link>
              <Link href="/programs" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-sm font-bold uppercase tracking-widest transition-all">
                See our open days
              </Link>
            </div>
          </div>
          <div className="relative w-48 h-48 md:w-64 md:h-64">
             <div className="absolute inset-0 bg-[#D4AF37] rounded-full animate-pulse opacity-20" />
             <img src="/HBSlogo.png" alt="HBS Logo" className="relative z-10 w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};