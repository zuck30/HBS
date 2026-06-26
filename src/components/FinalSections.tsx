'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const OperationSection = () => {
  const [activeStep, setActiveStep] = useState('latra');

  const steps = [
    { id: 'latra', name: 'LATRA-compliant', desc: 'Well-maintained vehicles and trained staff make every ride comfortable and secure.' },
    { id: 'drivers', name: 'Trained drivers', desc: 'Our drivers are experienced and undergo regular safety training.' },
    { id: 'supervision', name: '24/7 supervision', desc: 'Spacious dormitories with cozy bedding and dedicated supervision for boarders.' },
    { id: 'study', name: 'Study spaces', desc: 'Peaceful atmosphere for rest and study, fostering independence and discipline.' },
  ];

  const currentData = steps.find(s => s.id === activeStep);

  return (
    <section id="transport" className="bg-white border-b-4 border-black text-black font-sans antialiased w-full overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full bg-[#000000] border-b-4 border-black py-16 px-8 text-center flex flex-col items-center relative"
      >
        <div className="flex items-center gap-3 mb-6 select-none">
          <svg width="28" height="28" viewBox="0 0 16 16" fill="none" className="text-[#ECB65F]">
             <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight max-w-4xl text-white uppercase leading-tight font-serif">
          Safe, reliable school bus service & Comfortable boarding.
        </h2>
      </motion.div>

      <div className="mx-auto flex flex-col lg:flex-row items-stretch w-full min-h-[480px] bg-neutral-100">

        <div className="w-full lg:w-80 flex flex-col justify-start border-b-4 lg:border-b-0 lg:border-r-4 border-black p-6 lg:p-8 bg-white">
          <div className="flex flex-col gap-3 w-full">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`group relative border-4 border-black px-4 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-75 text-left ${
                    isActive
                      ? 'bg-[#44ACFF] text-white translate-x-[4px] translate-y-[4px] shadow-none'
                      : 'bg-white text-neutral-500 hover:text-black shadow-[4px_4px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
                  }`}
                >
                  <span className="absolute inset-0 border-t-2 border-l-2 border-white/30 pointer-events-none" />
                  <span className="absolute inset-0 border-b-2 border-r-2 border-black/30 pointer-events-none" />

                  <span className="relative flex items-center justify-between w-full">
                    <span className="flex items-center gap-3">
                      <span className={isActive ? 'font-extrabold' : ''}>
                        {step.name}
                      </span>
                    </span>
                    {isActive && <ArrowRight className="w-3.5 h-3.5 text-white" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-6 md:p-12 bg-neutral-100 flex flex-col justify-center items-stretch relative">
          <div className="bg-white border-4 border-black p-8 md:p-12 min-h-[300px] flex flex-col justify-center relative shadow-[8px_8px_0px_0px_#000000]">
            <span className="absolute inset-0 border-t-4 border-l-4 border-white pointer-events-none" />
            <span className="absolute inset-0 border-b-4 border-r-4 border-neutral-300 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="max-w-xl relative"
              >
                <h3 className="text-4xl font-serif text-neutral-900 mb-4 italic uppercase">
                  {currentData?.name}.
                </h3>
                <p className="text-neutral-700 text-sm md:text-base leading-relaxed font-normal">
                  {currentData?.desc}
                </p>
              </motion.div>
            </AnimatePresence>
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
    <section className="bg-white py-32 px-6 md:px-12 border-b border-neutral-200 text-neutral-900 font-sans antialiased w-full overflow-hidden selection:bg-[#44ACFF] selection:text-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-neutral-200 mb-20 items-end">
          <div className="lg:col-span-6">
            <h2 className="text-4xl font-light tracking-tight text-neutral-900 leading-none uppercase">
              Unmatched Academic <span className="font-semibold text-[#44ACFF]">Results</span>
            </h2>
          </div>
          <div className="lg:col-span-6 flex lg:justify-end">
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed font-light">
              Our results speak for themselves. We are committed to excellence in every aspect of our students' education.
            </p>
          </div>
        </div>

        <div className="border-t border-l border-neutral-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-8 border-r border-b border-neutral-200 flex flex-col justify-between aspect-square bg-white hover:bg-[#fcfcfc] transition-colors duration-300 group"
            >
              <div className="space-y-4">
                <h3 className="text-4xl font-bold tracking-tight text-neutral-900">
                  {s.value}
                </h3>
                <p className="text-[#44ACFF] text-sm font-bold uppercase tracking-widest">
                  {s.label}
                </p>
                <p className="text-neutral-400 text-[10px] font-bold uppercase">
                  {s.sub}
                </p>
              </div>

              <div className="mt-8 pt-4 flex items-center justify-between w-full">
                <span className="font-mono text-[10px] text-neutral-300 group-hover:text-neutral-500 transition-colors">0{i + 1}</span>
                <div className="w-6 h-6 rounded-full border border-neutral-100 flex items-center justify-center group-hover:border-[#44ACFF] transition-colors duration-300">
                  <ArrowRight className="w-3 h-3 text-neutral-300 group-hover:text-[#44ACFF] transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const WhySection = () => {
  const reasons = [
    { title: 'Tanzanian Excellence', desc: 'No.1 NECTA ranking in Dar es Salaam Region, demonstrating our commitment to academic rigor.' },
    { title: 'AI Literacy', desc: 'Preparing students for the digital future with age-appropriate technology and software.' },
    { title: 'Nourishing Meals', desc: 'Dietitian-planned wholesome meals prepared with high-quality ingredients daily.' },
    { title: 'Safe Environment', desc: 'Secure campus with 24/7 supervision and modern play and learning spaces.' },
    { title: 'Reliable Transport', desc: 'Our own fleet of LATRA-compliant buses with experienced, trained drivers.' },
    { title: 'Modern Facilities', desc: 'Half-Olympic swimming pool, full-size football pitch, and cutting-edge labs.' },
    { title: 'Community Focused', desc: 'A school built by the community, for the community, with heart and patience.' },
    { title: 'Global Citizens', desc: 'Instilling identity and global awareness through cultural heritage and languages.' }
  ];

  return (
    <section className="bg-[#fcfcfc] py-32 px-6 md:px-12 border-b border-neutral-200 text-neutral-900 font-sans antialiased w-full overflow-hidden selection:bg-[#B331F1] selection:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 leading-[1.05] uppercase">
            Why Choose <br />
            <span className="font-semibold text-[#B331F1]">HBS</span>
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-xs font-light">
            A harmonious integration of academic excellence, regional heritage, and modern pedagogy.
          </p>
        </div>

        <div className="lg:col-span-8 w-full border-t border-l border-neutral-200 grid grid-cols-1 sm:grid-cols-2">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="p-8 border-r border-b border-neutral-200 flex flex-col justify-between aspect-[4/3] bg-[#fcfcfc] hover:bg-white transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-300 group-hover:text-neutral-900 transition-colors font-medium">
                    0{i + 1}
                  </span>
                  <h4 className="font-medium text-base tracking-tight text-neutral-900 uppercase">
                    {reason.title}
                  </h4>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                  {reason.desc}
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <div className="w-1.5 h-1.5 bg-neutral-200 group-hover:bg-[#B331F1] transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};