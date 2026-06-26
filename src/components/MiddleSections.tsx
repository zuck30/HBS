'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const CommunicationSection = () => {
  const sections = [
    { name: 'Nursery Classrooms', count: '01', href: '/life' },
    { name: 'Modern Library', count: '02', href: '/life' },
    { name: 'Computer Labs', count: '03', href: '/life' },
    { name: 'Sports Courts', count: '04', href: '/life' },
    { name: 'Swimming Pools', count: '05', href: '/life' },
    { name: 'Dining Hall', count: '06', href: '/life' },
  ];

  return (
    <section id="solutions" className="bg-[#fcfcfc] py-32 px-6 md:px-12 border-b border-neutral-200 font-sans antialiased w-full overflow-hidden selection:bg-[#44ACFF] selection:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 leading-[1.05] uppercase">
            Life at <br />
            <span className="font-semibold text-[#44ACFF]">HBS</span>
          </h2>

          <p className="text-neutral-500 text-sm leading-relaxed max-w-xs font-light">
            A close look at the spaces, programs, and routines that make Hannah Bennie Schools feel like a second home for your child.
          </p>
        </div>

        <div className="lg:col-span-8 w-full border-t border-l border-neutral-200 grid grid-cols-1 sm:grid-cols-2">
          {sections.map((section, i) => (
            <Link
              href={section.href}
              key={i}
              className="group p-8 border-r border-b border-neutral-200 flex flex-col justify-between aspect-[4/3] bg-[#fcfcfc] hover:bg-white transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-neutral-300 group-hover:text-neutral-900 transition-colors duration-300 font-medium">
                  {section.count}
                </span>
              </div>

              <div className="flex items-end justify-between mt-auto">
                <h3 className="text-lg font-medium text-neutral-900 tracking-tight uppercase">
                  {section.name}
                </h3>
                <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-[#44ACFF] group-hover:border-[#44ACFF] transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export const ApplicationSection = () => {
  return (
    <section className="bg-white py-32 px-6 md:px-12 border-b border-neutral-200 text-neutral-900 font-sans antialiased w-full overflow-hidden selection:bg-[#6D9E51] selection:text-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-neutral-200 mb-20 items-end">
          <div className="lg:col-span-6">
            <h2 className="text-4xl font-light tracking-tight text-neutral-900 leading-none uppercase">
              Cultural <span className="font-semibold text-[#6D9E51]">Heritage</span>
            </h2>
          </div>
          <div className="lg:col-span-6 flex lg:justify-end">
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed font-light">
              Through festivals, language programs, music, and dance, we instill identity and global awareness in every HBS student.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          <div className="lg:col-span-7 flex flex-col justify-between group cursor-pointer">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-50 border border-neutral-200">
              <Image
                src="/assets/cultural-heritage.png"
                alt="Festivals"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
              />
            </div>
            <div className="mt-6 flex justify-between items-start gap-4 border-b border-neutral-100 pb-6">
              <div>
                <h3 className="text-xl font-medium text-neutral-900 tracking-tight uppercase">Performing Arts & Festivals</h3>
                <p className="text-neutral-500 text-sm font-light mt-2 max-w-md leading-relaxed">
                  Students celebrate their heritage while learning to appreciate others — building well-rounded global citizens.
                </p>
              </div>
              <span className="text-xs font-medium text-neutral-400 bg-neutral-50 px-2.5 py-1 border border-neutral-200 rounded uppercase">Annual</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between group cursor-pointer lg:pt-20">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-50 border border-neutral-200">
              <Image
                src="/assets/kids-with-meals.png"
                alt="Meals"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
              />
            </div>
            <div className="mt-6 flex justify-between items-start gap-4 border-b border-neutral-100 pb-6">
              <div>
                <h3 className="text-xl font-medium text-neutral-900 tracking-tight uppercase">Nutritious Dining</h3>
                <p className="text-neutral-500 text-sm font-light mt-2 leading-relaxed">
                  Dietitian-planned meals prepared with high-quality ingredients in a clean, welcoming environment.
                </p>
              </div>
              <span className="text-xs font-medium text-neutral-400 bg-neutral-50 px-2.5 py-1 border border-neutral-200 rounded uppercase">Daily</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const DataIntelligenceSection = () => {
  const values = [
    { title: 'Academic Rigour' },
    { title: 'Creative Exploration' },
    { title: 'Mindful Growth' },
    { title: 'Global Identity' },
    { title: 'Community Spirit' },
    { title: 'Digital Literacy' },
  ];

  return (
    <section id="models" className="bg-[#fcfcfc] py-32 px-6 md:px-12 border-b border-neutral-200 text-neutral-900 font-sans antialiased w-full overflow-hidden selection:bg-[#ECB65F] selection:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        <div className="lg:col-span-7 w-full order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 overflow-hidden">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-6 bg-[#fcfcfc] hover:bg-white flex flex-col justify-between h-28 group transition-colors duration-300"
            >
              <div className="flex items-center justify-between mt-auto">
                <h4 className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900 transition-colors tracking-tight uppercase">
                  {v.title}
                </h4>
                <div className="w-1.5 h-1.5 bg-neutral-200 group-hover:bg-[#ECB65F] transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 w-full order-1 lg:order-2 space-y-6 lg:pl-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-light tracking-tight text-neutral-900 leading-[1.05] uppercase">
              Our <br />
              <span className="font-semibold text-[#ECB65F]">Core Values</span>
            </h2>

            <p className="text-neutral-500 text-sm leading-relaxed font-light">
              We layer inquiry-based learning and modern pedagogy on top of the national curriculum — drawing on leading international approaches.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-between bg-neutral-900 hover:bg-black text-white px-6 py-4 text-xs uppercase tracking-widest transition-all group w-full sm:max-w-xs border border-neutral-900 font-bold"
            >
              <span>Book a Visit</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};