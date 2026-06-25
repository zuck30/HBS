'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const OperationSection = () => {
  const [activeStep, setActiveStep] = useState('harvest');

  const steps = [
    { id: 'harvest', name: 'Ethical Harvest', desc: 'Sourcing the finest Tanzanian botanicals directly from local ethical farmers and wild harvesters.' },
    { id: 'extract', name: 'Pure Extraction', desc: 'Traditional steam distillation and cold-pressing to preserve the full potency and therapeutic profile of every oil.' },
    { id: 'blend', name: 'Master Blending', desc: 'Guided by aromatherapy principles, we create intricate scent layers that balance the mind and body.' },
    { id: 'pour', name: 'Hand Poured', desc: 'Crafted in small batches using our signature coconut-soy wax blend for a clean, sustainable, and long-lasting burn.' },
    { id: 'cure', name: 'Patient Curing',  desc: 'Every candle is cured for three weeks to ensure maximum scent throw and perfect wax stability before leaving our studio.' },
    { id: 'ritual', name: 'Sensory Ritual', desc: 'Integrating your purchase into a daily wellness ritual designed to ground your space and elevate your mood.' },
  ];

  const currentData = steps.find(s => s.id === activeStep);

  return (
    <section id="company" className="bg-white border-b-4 border-black text-black font-sans antialiased w-full overflow-hidden">
      
      {/* Top Retro Pixel Indicator Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full bg-[#111113] border-b-4 border-black py-16 px-8 text-center flex flex-col items-center relative"
      >
        <div className="flex items-center gap-3 mb-6 select-none">
          <svg width="28" height="28" viewBox="0 0 16 16" fill="none" className="text-[#b47878]">
            <path d="M6 1h4v2H6V1zm5 3h2v2h-2V4zM3 4h2v2H3V4zm5 5h2v2H8V9zm5 2h2v2h-2v-2zM1 11h2v2H1v-2zM6 13h4v2H6v-2z" fill="currentColor"/>
          </svg>
        </div>
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight max-w-4xl text-white uppercase leading-tight font-serif">
          Crafting tranquility through patient, artisanal processes.
        </h2>
      </motion.div>

      {/* Main Multi-tiered Structural Grid Blocks */}
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
                      ? 'bg-[#b47878] text-white translate-x-[4px] translate-y-[4px] shadow-none'
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
                <h3 className="text-4xl font-serif text-neutral-900 mb-4 italic">
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
  const services = [
    { title: 'Scent Matching', desc: 'Personalized fragrance consultation using our AI engine to find your emotional scent signature.' },
    { title: 'Subscription Box', desc: 'Monthly wellness deliveries featuring new seasonal candles, crystals, and Tanzanian tea blends.' },
    { title: 'Custom Gifting', desc: 'Bespoke candle designs and scent profiles for weddings, corporate events, and special celebrations.' },
    { title: 'Home Consultation', desc: 'Expert guidance on how to layer scents throughout your home to create distinct atmospheric zones.' },
    { title: 'Diffuser Blends', desc: 'Highly concentrated pure essential oil blends for ultrasonic and nebulizing diffusers.' },
    { title: 'Wellness Coaching', desc: 'Holistic support to integrate sensory practices into a comprehensive self-care routine.' },
    { title: 'Studio Tours', desc: 'Go behind the scenes at our Dar es Salaam studio to see our artisanal process in person.' },
    { title: 'Partner Venues', desc: 'Experience Nawwi scents at the finest luxury hotels and spas across Tanzania and Zanzibar.' },
  ];

  return (
    <section className="bg-white py-32 px-6 md:px-12 border-b border-neutral-200 text-neutral-900 font-sans antialiased w-full overflow-hidden selection:bg-neutral-900 selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Grid Lines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-neutral-200 mb-20 items-end">
          <div className="lg:col-span-6">
            <h2 className="text-4xl font-light tracking-tight text-neutral-900 leading-none">
              Wellness Services & <span className="font-semibold">Bespoke Scenting</span>
            </h2>
          </div>
          <div className="lg:col-span-6 flex lg:justify-end">
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed font-light">
              Beyond the candle: comprehensive sensory support for your personal sanctuary or commercial space.
            </p>
          </div>
        </div>

        {/* Clean Line Grid */}
        <div className="border-t border-l border-neutral-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={i} 
              className="p-8 border-r border-b border-neutral-200 flex flex-col justify-between aspect-square bg-white hover:bg-[#fcfcfc] transition-colors duration-300 group"
            >
              <div className="space-y-4">
                <h3 className="text-base font-medium tracking-tight text-neutral-900">
                  {s.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                  {s.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 flex items-center justify-between w-full">
                <span className="font-mono text-[10px] text-neutral-300 group-hover:text-neutral-500 transition-colors">0{i + 1}</span>
                <div className="w-6 h-6 rounded-full border border-neutral-100 flex items-center justify-center group-hover:border-neutral-900 transition-colors duration-300">
                  <ArrowRight className="w-3 h-3 text-neutral-300 group-hover:text-neutral-900 transition-colors" />
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
    { title: 'Tanzanian Botanicals', desc: 'Using local ingredients like Zanzibar clove, Lemongrass, and Baobab oil for authentic scent profiles.' },
    { title: 'AI Scent Agent', desc: 'Scientific approach to wellness through personalized scent recommendations based on your unique mood.' },
    { title: 'Pure Ingredients', desc: 'No synthetic phthalates, parabens, or paraffin. Just clean-burning coconut-soy wax and therapeutic oils.' },
    { title: 'Artisanal Studio', desc: 'Every product is hand-crafted in our Dar es Salaam workshop with obsessive attention to detail.' },
    { title: 'Eco-Conscious Packaging', desc: 'Plastic-free shipping and reusable glass vessels that can be repurposed throughout your home.' },
    { title: 'Community Support', desc: 'A portion of every sale supports women-led agricultural cooperatives across rural Tanzania.' },
    { title: 'Immersive Events', desc: 'Monthly workshops and retreats that foster deep connection and sensory mindfulness.' },
    { title: 'Luxury Standard', desc: 'Crafted to compete with the finest international fragrance houses while remaining rooted in African heritage.' }
  ];

  return (
    <section className="bg-[#fcfcfc] py-32 px-6 md:px-12 border-b border-neutral-200 text-neutral-900 font-sans antialiased w-full overflow-hidden selection:bg-neutral-900 selection:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        {/* Left Fixed Header Column */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 leading-[1.05]">
            Why Choose <br />
            <span className="font-semibold text-neutral-900">Nawwi Wellness</span>
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-xs font-light">
            A harmonious integration of biological science, regional heritage, and sustainable sensory design.
          </p>
        </div>

        {/* Right Line Box Grid */}
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
                  <h4 className="font-medium text-base tracking-tight text-neutral-900">
                    {reason.title}
                  </h4>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                  {reason.desc}
                </p>
              </div>
              
              <div className="flex justify-end mt-4">
                <div className="w-1.5 h-1.5 bg-neutral-200 group-hover:bg-neutral-900 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};