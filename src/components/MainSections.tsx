'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// Import images
import school1 from '../assets/school-1.png';
import school2 from '../assets/school-2.png';
import football from '../assets/sports-club.png';
import pools from '../assets/shot.png';
import playground from '../assets/Classrooms-designed-for-learning.png';
import transport from '../assets/school-bus.png';
import boarding from '../assets/dorms.png';
import labs from '../assets/practical-hands-on.png';
import arts from '../assets/cultural-heritage.png';

export const TrustSection = () => {
  const { t } = useLanguage();
  const facilities = [
    { name: 'Full-size football pitch', image: football },
    { name: 'Two swimming pools', image: pools },
    { name: 'Modern playground', image: playground },
    { name: 'School transport fleet', image: transport },
    { name: 'Boarding houses', image: boarding },
    { name: 'Science & computer labs', image: labs },
    { name: 'Library & arts spaces', image: arts },
  ];

  return (
    <section className="bg-[#fcfcfc] py-28 px-6 overflow-hidden relative selection:bg-[#000080] selection:text-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-16"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4 block">Our Campus</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#000080] leading-[1.1] mb-8 font-sans uppercase">
            ONE CAMPUS · EVERY FACILITY
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl font-medium">
            Where every child has room to learn, play, and grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 w-full">
          {facilities.map((facility, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -10 }}
              className="flex flex-col gap-3 group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#000080] group-hover:text-[#D4AF37] transition-colors">{facility.name}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const ServicesSection = () => {
  const { t } = useLanguage();

  const programs = [
    {
      title: 'Toddler Class',
      age: '18 MO – 3 YRS',
      desc: 'Purposeful activities that develop wonder, natural curiosity, motor and social skills, self-esteem, and the cognitive processes that prepare children for everything to come.',
      image: '/assets/toddler-class.png'
    },
    {
      title: 'Preschool',
      age: '3 – 6 YRS',
      desc: 'Through carefully prepared materials and activities, children grow in independence, concentration, self-motivation, and develop a genuine love of learning.',
      image: '/assets/pre-school.png'
    },
    {
      title: 'Primary School',
      age: '6 – 14 YRS',
      desc: 'Our graduates are prepared for higher education with the tools to succeed — while maintaining a passion for learning and the drive to explore, create, and collaborate.',
      image: '/assets/primary-school.png'
    },
    {
      title: 'Enrichment Activities',
      age: 'ALL AGES',
      desc: 'Music, fitness, art, performing arts, mindfulness, and many other programs that develop the whole child — woven into every school day.',
      image: '/assets/enrichment-activities.png'
    }
  ];

  return (
    <section className="bg-white py-28 px-6 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4 block">Academic excellence</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#000080] leading-[1.15] font-sans uppercase">
              OUR PROGRAMS
            </h2>
            <p className="text-neutral-500 text-lg font-medium mt-4">
              Carefully designed for every stage of early learning. From the first explorations of toddlerhood to the foundations of upper primary, our four programs grow with your child.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/programs" className="px-8 py-4 bg-[#000080] text-white rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#000060] transition-colors">
              Explore All Programs
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-6 group"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 shadow-lg">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#000080] uppercase tracking-widest">
                    {program.age}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-[#000080] group-hover:text-[#D4AF37] transition-colors">{program.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                  {program.desc}
                </p>
                <Link href="/programs" className="text-xs font-bold text-[#000080] uppercase tracking-widest flex items-center gap-2 group/link">
                  {t('common.learn_more')}
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};