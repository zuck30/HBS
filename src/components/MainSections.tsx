'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Import HBS images
import school1 from '../assets/school-1.png';
import school2 from '../assets/school-2.png';
import football from '../assets/sports-club.png';
import pools from '../assets/shot.png';

export const TrustSection = () => {
  const cards = [
    { image: school1, rotate: -12, x: -70, y: 15, zIndex: 10, variantRotate: -16 },
    { image: school2, rotate: -6, x: -25, y: 5, zIndex: 20, variantRotate: -4 },
    { image: football, rotate: 4, x: 25, y: -5, zIndex: 30, variantRotate: 8 },
    { image: pools, rotate: 12, x: 70, y: 10, zIndex: 10, variantRotate: 16 },
  ];

  return (
    <section className="bg-[#fcfcfc] py-28 px-6 overflow-hidden relative selection:bg-[#44ACFF] selection:text-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-gray-900 leading-[1.1] mb-8 font-sans uppercase">
            One Campus <br className="hidden md:inline" />
            <span className="relative inline-block">
              Every Facility.
              <motion.span
                whileHover={{ scale: 1.1, rotate: -12 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -top-8 -left-16 bg-[#6D9E51] text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-wide shadow-md transform -rotate-6 hidden md:block cursor-grab active:cursor-grabbing"
              >
                @excellence
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.1, rotate: 12 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -bottom-6 -right-16 bg-[#ECB65F] text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-wide shadow-md transform rotate-6 hidden md:block cursor-grab active:cursor-grabbing"
              >
                @community
              </motion.span>
            </span>
          </h1>
        </motion.div>

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
                alt="School facility"
                fill
                className="object-cover pointer-events-none"
                sizes="(max-w-768px) 160px, 208px"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-500 text-xs md:text-sm max-w-xl leading-relaxed tracking-wide font-light mb-10"
        >
          Where every child has room to learn, play, and grow. Our campus is equipped with everything your child needs to thrive academically and physically.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 w-full border-t border-gray-100 pt-16 text-left">
          {[
            { title: 'Sports & Arts', desc: 'Full-size football pitch, two swimming pools, modern playground, and dedicated library and arts spaces.' },
            { title: 'Safe Transport', desc: 'Our own school transport fleet and LATRA-compliant buses ensure a safe journey for every child.' },
            { title: 'Boarding Facilities', desc: 'Secure and comfortable boarding houses with 24/7 supervision and dedicated study spaces.' }
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
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center animate-spin-slow">
              <span className="text-white text-[10px] tracking-widest uppercase font-bold text-center">Grow</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-2 relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src="/assets/toddler-class.png" alt="Toddler Class" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <motion.span whileHover={{ y: -2 }} className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none uppercase font-bold">
              18MO – 3YRS
            </motion.span>
          </motion.div>

          <motion.div variants={itemVariants} className="row-span-2 relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src="/assets/pre-school.png" alt="Preschool" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <motion.span whileHover={{ y: -2 }} className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none uppercase font-bold">
              3 – 6 YRS
            </motion.span>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-2 relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src="/assets/primary-school.png" alt="Primary School" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <motion.span whileHover={{ y: -2 }} className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none uppercase font-bold">
              6 – 14 YRS
            </motion.span>
          </motion.div>

          <motion.div variants={itemVariants} className="relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src="/assets/enrichment-activities.png" alt="Enrichment" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <motion.span whileHover={{ y: -2 }} className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wide shadow-sm text-black pointer-events-none uppercase font-bold">
              All Ages
            </motion.span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ rotate: 90 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="bg-[#B331F1] flex items-center justify-center p-4 cursor-pointer"
          >
            <span className="text-white text-4xl font-extralight select-none">✦</span>
          </motion.div>

          <motion.div variants={itemVariants} className="relative overflow-hidden bg-gray-100 group rounded-none">
            <Image src="/assets/Classrooms-designed-for-learning.png" alt="Classrooms" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#6D9E51] flex items-center justify-center relative overflow-hidden group">
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