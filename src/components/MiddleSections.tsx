'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Import all images from src/assets folder
import spaTreatment from '../assets/spa-treatment-dark.jpg';
import pexelsHome from '../assets/candle-6.png';

export const CommunicationSection = () => {
  const categories = [
    { name: 'Floral & Sweet', count: '01' },
    { name: 'Woody & Earthy', count: '02' },
    { name: 'Fresh & Crisp', count: '03' },
    { name: 'Warm & Spicy', count: '04' },
    { name: 'Citrus & Energizing', count: '05' },
    { name: 'Calming Herbs', count: '06' },
  ];

  return (
    <section id="solutions" className="bg-[#fcfcfc] py-32 px-6 md:px-12 border-b border-neutral-200 font-sans antialiased w-full overflow-hidden selection:bg-neutral-900 selection:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 leading-[1.05]">
            Curated Scent <br />
            <span className="font-semibold text-neutral-900">Collections</span>
          </h2>
          
          <p className="text-neutral-500 text-sm leading-relaxed max-w-xs font-light">
            Explore our diverse range of fragrance families, each designed to evoke a specific memory, mood, or atmosphere in your sanctuary.
          </p>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 w-full border-t border-l border-neutral-200 grid grid-cols-1 sm:grid-cols-2">
          {categories.map((category, i) => (
            <Link
              href={`/shop?category=${encodeURIComponent(category.name)}`}
              key={i} 
              className="group p-8 border-r border-b border-neutral-200 flex flex-col justify-between aspect-[4/3] bg-[#fcfcfc] hover:bg-white transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-neutral-300 group-hover:text-neutral-900 transition-colors duration-300 font-medium">
                  {category.count}
                </span>
              </div>

              <div className="flex items-end justify-between mt-auto">
                <h3 className="text-lg font-medium text-neutral-900 tracking-tight">
                  {category.name}
                </h3>
                <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-all duration-300">
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
    <section className="bg-white py-32 px-6 md:px-12 border-b border-neutral-200 text-neutral-900 font-sans antialiased w-full overflow-hidden selection:bg-neutral-900 selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-neutral-200 mb-20 items-end">
          <div className="lg:col-span-6">
            <h2 className="text-4xl font-light tracking-tight text-neutral-900 leading-none">
              Immersive <span className="font-semibold">Experiences</span>
            </h2>
          </div>
          <div className="lg:col-span-6 flex lg:justify-end">
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed font-light">
              Beyond products, we offer guided workshops and retreats that teach you the art of scent-making and mindful living in beautiful settings.
            </p>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-between group cursor-pointer">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-50 border border-neutral-200">
              <Image 
                src={spaTreatment} 
                alt="Workshops" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
                sizes="(max-w-1024px) 100vw, 700px"
              />
            </div>
            <div className="mt-6 flex justify-between items-start gap-4 border-b border-neutral-100 pb-6">
              <div>
                <h3 className="text-xl font-medium text-neutral-900 tracking-tight">Scent-Making Workshops</h3>
                <p className="text-neutral-500 text-sm font-light mt-2 max-w-md leading-relaxed">
                  Learn to blend botanical extracts and pour your own signature candles in our monthly intimate workshops.
                </p>
              </div>
              <span className="text-xs font-medium text-neutral-400 bg-neutral-50 px-2.5 py-1 border border-neutral-200 rounded">Monthly</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col justify-between group cursor-pointer lg:pt-20">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-50 border border-neutral-200">
              <Image 
                src={pexelsHome} 
                alt="Retreats" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
                sizes="(max-w-1024px) 100vw, 500px"
              />
            </div>
            <div className="mt-6 flex justify-between items-start gap-4 border-b border-neutral-100 pb-6">
              <div>
                <h3 className="text-xl font-medium text-neutral-900 tracking-tight">Wellness Retreats</h3>
                <p className="text-neutral-500 text-sm font-light mt-2 leading-relaxed">
                  Escape to our partner venues for multi-day sensory journeys focused on meditation, aromatherapy, and grounding.
                </p>
              </div>
              <span className="text-xs font-medium text-neutral-400 bg-neutral-50 px-2.5 py-1 border border-neutral-200 rounded">Guided</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const DataIntelligenceSection = () => {
  const pillars = [
    { title: 'Mood Enhancement' },
    { title: 'Focus & Clarity' },
    { title: 'Stress Relief' },
    { title: 'Sensory Grounding' },
    { title: 'Sleep Optimization' },
    { title: 'Energy Boost' },
  ];

  return (
    <section id="models" className="bg-[#fcfcfc] py-32 px-6 md:px-12 border-b border-neutral-200 text-neutral-900 font-sans antialiased w-full overflow-hidden selection:bg-neutral-900 selection:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-7 w-full order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 overflow-hidden">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="p-6 bg-[#fcfcfc] hover:bg-white flex flex-col justify-between h-28 group transition-colors duration-300"
            >
              <div className="flex items-center justify-between mt-auto">
                <h4 className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900 transition-colors tracking-tight">
                  {p.title}
                </h4>
                <div className="w-1.5 h-1.5 bg-neutral-200 group-hover:bg-neutral-900 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 w-full order-1 lg:order-2 space-y-6 lg:pl-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-light tracking-tight text-neutral-900 leading-[1.05]">
              Science of <br />
              <span className="font-semibold text-neutral-900">Scent Healing</span>
            </h2>
            
            <p className="text-neutral-500 text-sm leading-relaxed font-light">
              Our AI-driven scent concierge leverages neurological data to recommend the exact fragrance profiles needed to balance your energy and atmosphere.
            </p>
          </div>
          
          <div className="pt-4">
            <Link 
              href="/quiz" 
              className="inline-flex items-center justify-between bg-neutral-900 hover:bg-black text-white px-6 py-4 text-xs uppercase tracking-widest transition-all group w-full sm:max-w-xs border border-neutral-900"
            >
              <span>Start Scent Quiz</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};