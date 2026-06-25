'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Handbag, Check, Calendar, HelpCircle } from 'lucide-react';
import Link from 'next/link';

import mobileBarImg from '../../assets/mobile-candle.jpeg';

export default function NawwiAtYoursPage() {
  const perfectionList = [
    'Birthday Celebrations',
    'Bridal Showers',
    'Corporate Wellness Events',
    'Team Building Activities',
    'Private Gatherings',
    'Brand Activations',
    'Weddings & Special Occasions'
  ];

  const inclusionList = [
    'Premium candle-making materials',
    'Guided scent-blending experience',
    'Luxury fragrance oils',
    'Professional setup and styling',
    'Personalized candle creation',
    'Take-home luxury candle for every guest',
    'Memorable photo opportunities'
  ];

  const steps = [
    { num: '01', title: 'Send Inquiry', desc: 'Submit your event details and specifications through our simple request setup.' },
    { num: '02', title: 'Pick Your Spot', desc: 'Choose your preferred date, layout options, and location details.' },
    { num: '03', title: 'Select Plan', desc: 'Pick your precise custom package structure and final guest counts.' },
    { num: '04', title: 'We Drive To You', desc: 'We bring the complete physical Nawwi Mobile Candle Bar setup right to your door.' },
    { num: '05', title: 'Create Moments', desc: 'Your guests enjoy a completely unique hands-on candle-making experience.' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.06 } }
  };

  return (
    <main className="bg-[#fcfcfc] min-h-screen pt-24 text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      
      {/* Intro Hero Split Section */}
      <section className="px-6 md:px-12 py-12 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="lg:col-span-7 space-y-6"
          >
            <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 font-bold flex items-center gap-2">
              <Handbag className="w-3.5 h-3.5 text-neutral-400" /> Nawwi At Yours
            </span>
            <h1 className="text-4xl md:text-7xl font-light tracking-tight leading-none text-neutral-900">
              The Mobile <br />
              <span className="font-semibold text-neutral-950">Candle Bar.</span>
            </h1>
            <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed max-w-xl">
              Bring the magic of Nawwi Wellness directly to your home, office, wedding, or special event. Our Mobile Candle Bar transforms any space into an unforgettable scent-blending experience where guests create their own luxury scented candles while connecting, celebrating, and making memories.
            </p>
            <div className="pt-2">
              <Link href="https://wa.me/255612078359" target="_blank" className="inline-flex items-center gap-3 bg-neutral-950 text-white font-mono font-bold text-xs uppercase px-6 py-4 tracking-wider hover:bg-neutral-900 transition-colors group">
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 aspect-[4/5] bg-neutral-100 overflow-hidden relative border border-neutral-200"
          >
            <img 
              src={mobileBarImg.src} 
              alt="Nawwi Mobile Candle Bar setup" 
              className="w-full h-full object-cover filter grayscale contrast-110"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-neutral-200 text-[10px] font-mono tracking-wider text-black font-bold uppercase">
              Coming Soon to Your Space
            </div>
          </motion.div>

        </div>
      </section>

      {/* Two Column Grid: Perfect For vs What's Included */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          
          {/* Perfect For Section */}
          <div className="p-8 md:p-16 space-y-8">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 font-bold">Applications</span>
              <h2 className="text-2xl font-light tracking-tight mt-2">Perfect For</h2>
            </div>
            <motion.ul 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {perfectionList.map((item, index) => (
                <motion.li key={index} variants={fadeInUp} className="flex items-center gap-3 text-neutral-600 text-sm font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* What's Included Section */}
          <div className="p-8 md:p-16 space-y-8 bg-[#fcfcfc]">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 font-bold">Package Offers</span>
              <h2 className="text-2xl font-light tracking-tight mt-2">What's Included</h2>
            </div>
            <motion.ul 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {inclusionList.map((item, index) => (
                <motion.li key={index} variants={fadeInUp} className="flex items-start gap-3 text-neutral-600 text-sm font-light">
                  <Check className="w-4 h-4 text-neutral-400 stroke-[2.5px] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

        </div>
      </section>

      {/* Horizontal Steps - How It Works */}
      <section className="px-6 md:px-12 py-20 border-b border-neutral-200 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 font-bold">The Process</span>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight mt-2">How It Works</h2>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-5 border-t border-l border-neutral-200"
        >
          {steps.map((step) => (
            <motion.div 
              key={step.num} 
              variants={fadeInUp}
              className="p-6 border-b border-r border-neutral-200 flex flex-col justify-between aspect-square bg-white"
            >
              <span className="font-mono text-xs text-neutral-300 font-bold">{step.num}</span>
              <div className="space-y-2">
                <h4 className="font-medium text-sm tracking-tight text-neutral-900">{step.title}</h4>
                <p className="text-neutral-500 text-xs font-light leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Information Frame */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-b border-neutral-200"
      >
        <div className="bg-neutral-50 border border-neutral-200 p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="font-mono text-[10px] tracking-widest uppercase bg-white border border-neutral-200 px-2.5 py-1 text-neutral-500 font-bold inline-block">
              Transparent Pricing
            </span>
            <h3 className="text-xl md:text-2xl font-light tracking-tight text-neutral-900">
              Starting from <span className="font-semibold text-neutral-950">TZS 45,000</span> per person
            </h3>
            <p className="text-neutral-500 text-xs font-light max-w-xl">
              Minimum event booking starts at TZS 500,000. Custom tailored packages are happily available for large private events, corporate functions, and special celebratory milestones.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <Link href="https://wa.me/255612078359" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-neutral-500 hover:text-black transition-colors group">
              <HelpCircle className="w-4 h-4 stroke-[2.5px]" />
              <span>Ask About Custom Sizes</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Interactive Bottom Booking Frame */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-neutral-950 text-white py-20 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="space-y-2">
            <h4 className="text-2xl md:text-3xl font-light tracking-tight">Ready to Host?</h4>
            <p className="text-neutral-400 text-sm font-light max-w-xl leading-relaxed">
              Whether you are planning an intimate gathering or a large scale milestone celebration, Nawwi At Yours creates beautiful, meaningful experiences your guests will never forget.
            </p>
          </div>
          <Link href="https://wa.me/255612078359" target="_blank" className="flex items-center gap-3 bg-white text-black font-mono font-bold text-xs uppercase px-8 py-5 tracking-wider hover:bg-neutral-100 transition-colors group whitespace-nowrap">
            <Calendar className="w-4 h-4 stroke-[2.5px]" />
            <span>Book Mobile Experience</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.section>

    </main>
  );
}