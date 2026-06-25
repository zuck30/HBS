'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Import all images from src/assets folder
import candle1 from '../assets/candle-1.jpg';
import candle2 from '../assets/candle-2.jpg';
import candle3 from '../assets/candle-3.jpg';
import candle4 from '../assets/candle-4.png';
import spaTreatment from '../assets/spa-treatment-dark.jpg';
import pexelsHome from '../assets/candle-7.png';
import pexelsMindful from '../assets/pexels-mike-art-visual-creator-photography-and-video-2159421235-36547455.jpg';

export const TrustSection = () => {
  // Peak card deck parameters with high-fidelity spring coefficients
  const cards = [
    { image: candle1, rotate: -12, x: -70, y: 15, zIndex: 10, variantRotate: -16 },
    { image: candle2, rotate: -6, x: -25, y: 5, zIndex: 20, variantRotate: -4 },
    { image: candle3, rotate: 4, x: 25, y: -5, zIndex: 30, variantRotate: 8 },
    { image: candle4, rotate: 12, x: 70, y: 10, zIndex: 10, variantRotate: 16 },
  ];

  return (
    <section className="bg-[#fcfcfc] py-28 px-6 overflow-hidden relative selection:bg-black selection:text-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Animated hero section with crisp typographic reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-gray-900 leading-[1.1] mb-8 font-sans">
            A place to display your <br className="hidden md:inline" />
            <span className="relative inline-block">
              masterpiece.
              {/* Interactive springing badges */}
              <motion.span 
                whileHover={{ scale: 1.1, rotate: -12 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -top-8 -left-16 bg-[#2563eb] text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-wide shadow-md transform -rotate-6 hidden md:block cursor-grab active:cursor-grabbing"
              >
                @artisanal
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.1, rotate: 12 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -bottom-6 -right-16 bg-[#16a34a] text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-wide shadow-md transform rotate-6 hidden md:block cursor-grab active:cursor-grabbing"
              >
                @sustainable
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Dynamic, Fluid Interactive Drag & Explode Card Deck */}
        <motion.div 
          className="relative w-full max-w-3xl h-64 md:h-80 my-20 flex items-center justify-center select-none"
          initial="rest"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              drag
              dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
              dragElastic={0.6}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              variants={{
                rest: { opacity: 0, scale: 0.7, y: 60, rotate: 0 },
                animate: { 
                  opacity: 1, 
                  scale: 1, 
                  x: card.x, 
                  y: card.y, 
                  rotate: card.rotate,
                  transition: { delay: i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              whileHover={{ 
                scale: 1.08, 
                rotate: card.variantRotate, 
                y: card.y - 15,
                zIndex: 60,
                transition: { type: 'spring', stiffness: 350, damping: 20 }
              }}
              style={{ zIndex: card.zIndex }}
              className="absolute w-40 h-52 md:w-52 md:h-64 rounded-2xl overflow-hidden bg-gray-100 shadow-xl border-4 border-white cursor-grab active:cursor-grabbing touch-none will-change-transform"
            >
              <Image 
                src={card.image} 
                alt="Sensory presentation" 
                fill 
                className="object-cover pointer-events-none"
                sizes="(max-w-768px) 160px, 208px"
                priority
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Brand Philosophy Text Block */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-500 text-xs md:text-sm max-w-xl leading-relaxed tracking-wide font-light mb-10"
        >
          Combining ancient Tanzanian botanical knowledge with modern wellness practices to create scents that heal. Artists can display their masterpieces, and buyers can discover and enjoy.
        </motion.p>

        {/* Feature Grid Entrance Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 w-full border-t border-gray-100 pt-16 text-left">
          {[
            { title: 'Artisanal Quality', desc: 'Every candle is hand-poured in small batches using premium coconut-soy wax and locally sourced essential oils.' },
            { title: 'Sustainable Sourcing', desc: 'Commitment to the environment through plastic-free packaging and supporting local ethical agriculture in Tanzania.' },
            { title: 'Intentional Craft', desc: 'Small-batch production ensures every candle meets our uncompromising standards of excellence.' }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const ServicesSection = () => {
  // Container orchestrator variables for staggering child blocks seamlessly
  const bentoContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 260, damping: 22 } 
    }
  };

  return (
    <section className="bg-white py-28 px-6 border-t border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Typography Block */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full py-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Minimalist Graphic Accent Animation */}
            <div className="w-16 h-10 mb-8 flex flex-col justify-between opacity-40">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="h-[2px] bg-black rounded-full" />
              <motion.div initial={{ width: 0 }} whileInView={{ width: "75%" }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="h-[2px] bg-black rounded-full" />
              <motion.div initial={{ width: 0 }} whileInView={{ width: "50%" }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="h-[2px] bg-black rounded-full" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-6 font-sans">
              Bringing your <br />community together
            </h2>
            
            <p className="text-gray-500 text-base leading-relaxed font-light mb-8 max-w-md">
              We create sensory products that facilitate deep connection with oneself and the surrounding environment. Blends designed to target specific emotional states.
            </p>

            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-[#141414] text-white rounded-full text-sm font-medium hover:bg-black transition-colors shadow-md"
            >
              Get started
            </motion.button>
          </motion.div>

          {/* Testimonial Panel Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 p-6 border border-gray-200 rounded-lg bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] relative"
          >
            <p className="text-xs font-mono italic text-gray-600 leading-relaxed">
              "The standard chunk of premium aromas used since the 1500s is reproduced below for those interested. Cultivated thoughtfully from deep within Tanzania."
            </p>
            
            <div className="flex gap-3 mt-6 text-gray-400">
              {[0, 1, 2].map((idx) => (
                <motion.span 
                  key={idx}
                  whileHover={{ y: -3, backgroundColor: '#000000' }}
                  className="w-4 h-4 rounded-full bg-gray-200 inline-block cursor-pointer transition-colors" 
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Fluid Staggered Bento Grid */}
        <motion.div 
          variants={bentoContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="lg:col-span-7 grid grid-cols-3 grid-rows-3 gap-3 aspect-square w-full max-w-xl mx-auto"
        >
          
          {/* Box 1: Spinning Abstract Graphic Badge */}
          <motion.div variants={itemVariants} className="bg-[#eab308] opacity-90 rounded-none flex items-center justify-center p-4 relative overflow-hidden group">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center animate-spin-slow">
              <span className="text-white text-[10px] tracking-widest uppercase font-bold">Love</span>
            </div>
          </motion.div>

          {/* Box 2: Spa Treatment */}
          <motion.div variants={itemVariants} className="col-span-2 relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src={spaTreatment} alt="Aromatherapy" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <motion.span whileHover={{ y: -2 }} className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none">
              Inclusive
            </motion.span>
          </motion.div>

          {/* Box 3: Large Home Sanctuary */}
          <motion.div variants={itemVariants} className="row-span-2 relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src={pexelsHome} alt="Home Sanctuary" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <motion.span whileHover={{ y: -2 }} className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none">
              Creative
            </motion.span>
          </motion.div>

          {/* Box 4: Mindful Rituals Row Center */}
          <motion.div variants={itemVariants} className="col-span-2 relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src={pexelsMindful} alt="Mindful Rituals" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </motion.div>

          {/* Box 5: Atmosphere Graphic Block */}
          <motion.div variants={itemVariants} className="relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src={spaTreatment} alt="Atmosphere" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <motion.span whileHover={{ y: -2 }} className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none">
              Diverse
            </motion.span>
          </motion.div>

          {/* Box 6: Structural Star Shape Badge */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ rotate: 90 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="bg-[#38bdf8] flex items-center justify-center p-4 cursor-pointer"
          >
            <span className="text-white text-4xl font-extralight select-none">✦</span>
          </motion.div>

          {/* Box 7: Sensory presentation image */}
          <motion.div variants={itemVariants} className="relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src={pexelsHome} alt="Sensory" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <motion.span whileHover={{ y: -2 }} className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none">
              Caring
            </motion.span>
          </motion.div>

          {/* Box 8: Overlapping Circles Shape Frame */}
          <motion.div variants={itemVariants} className="bg-[#6366f1] flex items-center justify-center relative overflow-hidden group">
            <motion.div 
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 150 }}
              className="w-16 h-16 bg-white rounded-full mix-blend-screen opacity-40 translate-x-4" 
            />
            <motion.div 
              whileHover={{ x: -10 }}
              transition={{ type: 'spring', stiffness: 150 }}
              className="w-16 h-16 bg-white rounded-full mix-blend-screen opacity-40 -translate-x-4" 
            />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};