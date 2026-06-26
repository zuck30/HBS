'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2 } from 'lucide-react';

// Import HBS images
import school1 from '../assets/school-1.png';
import school2 from '../assets/school-2.png';
import football from '../assets/sports-club.png';
import pools from '../assets/shot.png';

export const TrustSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      image: school1,
      title: 'Academic Excellence',
      subtitle: 'World-class classrooms & laboratories',
      description: 'State-of-the-art learning spaces designed to inspire curiosity and foster academic growth.',
      stats: '15+ Classrooms',
      color: '#44ACFF'
    },
    {
      image: school2,
      title: 'Beautiful Campus',
      subtitle: 'A serene environment for learning',
      description: 'Lush green spaces and thoughtfully designed buildings create the perfect atmosphere for education.',
      stats: '5 Acres',
      color: '#ECB65F'
    },
    {
      image: football,
      title: 'Sports & Recreation',
      subtitle: 'Where champions are made',
      description: 'Full-size football pitch, two swimming pools, and modern playground facilities for all ages.',
      stats: '3 Sports Facilities',
      color: '#6D9E51'
    },
    {
      image: pools,
      title: 'Swimming Pools',
      subtitle: 'Professional aquatic facilities',
      description: 'Two regulation-size pools with trained instructors for both recreation and competitive swimming.',
      stats: '2 Pools',
      color: '#B331F1'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && !isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="bg-[#fcfcfc] py-28 px-6 overflow-hidden relative selection:bg-[#44ACFF] selection:text-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-8 font-sans uppercase">
            One Campus <br className="hidden md:inline" />
            <span className="relative inline-block">
              Every Facility.
              <motion.span
                whileHover={{ scale: 1.1, rotate: -12 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -top-10 -left-20 bg-[#6D9E51] text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-wide shadow-md transform -rotate-6 hidden md:block cursor-grab active:cursor-grabbing"
              >
                @excellence
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.1, rotate: 12 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -bottom-8 -right-20 bg-[#ECB65F] text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-wide shadow-md transform rotate-6 hidden md:block cursor-grab active:cursor-grabbing"
              >
                @community
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative w-full max-w-5xl mx-auto mt-12 mb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image Display */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Content Overlay - Removed colored line */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-left z-10"
              >
                <span className="text-white/60 text-sm font-medium tracking-wider uppercase mb-2 block">
                  {slides[currentIndex].subtitle}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 uppercase tracking-wide">
                  {slides[currentIndex].title}
                </h2>
                <p className="text-white/80 text-base md:text-lg max-w-2xl font-light">
                  {slides[currentIndex].description}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ background: slides[currentIndex].color }}
                    />
                    <span className="text-white/60 text-sm font-medium">
                      {slides[currentIndex].stats}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full transition-all hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full transition-all hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>

            {/* Controls */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button
                onClick={toggleAutoPlay}
                className="bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-2.5 rounded-full transition-all hover:scale-110"
              >
                {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                className="bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-2.5 rounded-full transition-all hover:scale-110"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-6 overflow-x-auto px-4 py-2">
            {slides.map((slide, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-20 h-14 md:w-24 md:h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                  currentIndex === index 
                    ? 'ring-2 ring-offset-2 ring-offset-white' 
                    : 'opacity-50 hover:opacity-80'
                }`}
                style={{ 
                  ringColor: currentIndex === index ? slide.color : 'transparent'
                } as React.CSSProperties}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                {currentIndex === index && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: slide.color }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative h-1 rounded-full transition-all duration-300"
                style={{
                  width: currentIndex === index ? '32px' : '16px',
                  background: currentIndex === index ? slide.color : '#E5E7EB'
                }}
              >
                {currentIndex === index && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, ease: 'linear' }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: slide.color }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-500 text-xs md:text-sm max-w-xl leading-relaxed tracking-wide font-light mt-8"
        >
          Where every child has room to learn, play, and grow. Our campus is equipped with everything your child needs to thrive academically and physically.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 w-full border-t border-gray-100 pt-16 text-left">
          {[
            { 
              icon: '⚽',
              title: 'Sports & Arts', 
              desc: 'Full-size football pitch, two swimming pools, modern playground, and dedicated library and arts spaces.' 
            },
            { 
              icon: '🚌',
              title: 'Safe Transport', 
              desc: 'Our own school transport fleet and LATRA-compliant buses ensure a safe journey for every child.' 
            },
            { 
              icon: '🏠',
              title: 'Boarding Facilities', 
              desc: 'Secure and comfortable boarding houses with 24/7 supervision and dedicated study spaces.' 
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group hover:bg-gray-50 p-6 rounded-2xl transition-colors duration-300"
            >
              <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
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

        <div className="lg:col-span-5 flex flex-col justify-between h-full py-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-16 h-10 mb-8 flex flex-col justify-between opacity-40">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="h-[2px] bg-[#B331F1] rounded-full" />
              <motion.div initial={{ width: 0 }} whileInView={{ width: "75%" }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="h-[2px] bg-[#44ACFF] rounded-full" />
              <motion.div initial={{ width: 0 }} whileInView={{ width: "50%" }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="h-[2px] bg-[#6D9E51] rounded-full" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-6 font-sans uppercase">
              Our <br />Programs
            </h2>

            <p className="text-gray-500 text-base leading-relaxed font-light mb-8 max-w-md">
              Carefully designed for every stage of early learning. From toddler explorations to the foundations of upper primary, our programs grow with your child.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-[#44ACFF] text-white rounded-full text-sm font-medium hover:bg-[#3b9ae0] transition-colors shadow-md uppercase tracking-widest font-bold"
            >
              Explore Programs
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 p-6 border border-gray-200 rounded-lg bg-white shadow-[4px_4px_0px_0px_rgba(179,49,241,0.1)] relative"
          >
            <p className="text-xs font-mono italic text-gray-600 leading-relaxed uppercase">
              "We enrich young minds and inspire children to be creative, mindful, and influential to their communities and the world."
            </p>

            <div className="flex gap-3 mt-6 text-gray-400">
              {[0, 1, 2].map((idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ y: -3, backgroundColor: '#ECB65F' }}
                  className="w-4 h-4 rounded-full bg-gray-200 inline-block cursor-pointer transition-colors"
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={bentoContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="lg:col-span-7 grid grid-cols-3 grid-rows-3 gap-3 aspect-square w-full max-w-xl mx-auto"
        >

          <motion.div variants={itemVariants} className="bg-[#ECB65F] opacity-90 rounded-none flex items-center justify-center p-4 relative overflow-hidden group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center"
            >
              <span className="text-white text-[10px] tracking-widest uppercase font-bold text-center">Grow</span>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-2 relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src="/assets/toddler-class.png" alt="Toddler Class" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
            <motion.span whileHover={{ y: -2, scale: 1.05 }} className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none uppercase font-bold">
              18MO – 3YRS
            </motion.span>
          </motion.div>

          <motion.div variants={itemVariants} className="row-span-2 relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src="/assets/pre-school.png" alt="Preschool" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
            <motion.span whileHover={{ y: -2, scale: 1.05 }} className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none uppercase font-bold">
              3 – 6 YRS
            </motion.span>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-2 relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src="/assets/primary-school.png" alt="Primary School" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
            <motion.span whileHover={{ y: -2, scale: 1.05 }} className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none uppercase font-bold">
              6 – 14 YRS
            </motion.span>
          </motion.div>

          <motion.div variants={itemVariants} className="relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src="/assets/enrichment-activities.png" alt="Enrichment" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
            <motion.span whileHover={{ y: -2, scale: 1.05 }} className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none uppercase font-bold">
              All Ages
            </motion.span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="bg-[#B331F1] flex items-center justify-center p-4 cursor-pointer group"
          >
            <motion.span 
              whileHover={{ scale: 1.2 }}
              className="text-white text-4xl font-extralight select-none"
            >
              ✦
            </motion.span>
          </motion.div>

          <motion.div variants={itemVariants} className="relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src="/assets/Classrooms-designed-for-learning.png" alt="Classrooms" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#6D9E51] flex items-center justify-center relative overflow-hidden group">
            <motion.div
              whileHover={{ x: 20, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 150 }}
              className="w-16 h-16 bg-white rounded-full mix-blend-screen opacity-40 translate-x-4"
            />
            <motion.div
              whileHover={{ x: -20, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 150 }}
              className="w-16 h-16 bg-white rounded-full mix-blend-screen opacity-40 -translate-x-4"
            />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};