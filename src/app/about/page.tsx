'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import us1 from '../../assets/us-1.jpeg';
import us2 from '../../assets/us-2.jpeg';
import us3 from '../../assets/us-3.jpeg';
import us4 from '../../assets/us-4.jpeg';
import us5 from '../../assets/us-5.jpeg';
import us6 from '../../assets/us-6.jpeg';
import us7 from '../../assets/us-7.jpeg';
import us8 from '../../assets/us-8.jpeg';
import us9 from '../../assets/us-9.jpeg';
import us10 from '../../assets/us-10.jpeg';
import us11 from '../../assets/us-11.jpeg';
import us12 from '../../assets/us-12.jpeg';
import us13 from '../../assets/us-13.jpeg';
import us14 from '../../assets/us-14.jpeg';
import us15 from '../../assets/us-15.jpeg';
import us16 from '../../assets/us-16.jpeg';
import us17 from '../../assets/us-17.jpeg';
import us18 from '../../assets/us-18.jpeg';
import us19 from '../../assets/us-19.jpeg';
import us20 from '../../assets/us-20.jpeg';

export default function AboutUsPage() {
  const gallery = [
    { src: us1.src, alt: "Candle picture 1", span: "md:col-span-8 h-[400px]" },
    { src: us2.src, alt: "Candle picture 2", span: "md:col-span-4 h-[400px]" },
    { src: us3.src, alt: "Candle picture 3", span: "md:col-span-4 h-[300px]" },
    { src: us4.src, alt: "Candle picture 4", span: "md:col-span-4 h-[300px]" },
    { src: us5.src, alt: "Candle picture 5", span: "md:col-span-4 h-[300px]" },
    { src: us6.src, alt: "Candle picture 6", span: "md:col-span-6 h-[450px]" },
    { src: us7.src, alt: "Candle picture 7", span: "md:col-span-6 h-[450px]" },
    { src: us8.src, alt: "Candle picture 8", span: "md:col-span-3 h-[280px]" },
    { src: us9.src, alt: "Candle picture 9", span: "md:col-span-6 h-[280px]" },
    { src: us10.src, alt: "Candle picture 10", span: "md:col-span-3 h-[280px]" },
    { src: us11.src, alt: "Candle picture 11", span: "md:col-span-4 h-[350px]" },
    { src: us12.src, alt: "Candle picture 12", span: "md:col-span-8 h-[350px]" },
    { src: us13.src, alt: "Candle picture 13", span: "md:col-span-5 h-[320px]" },
    { src: us14.src, alt: "Candle picture 14", span: "md:col-span-7 h-[320px]" },
    { src: us15.src, alt: "Candle picture 15", span: "md:col-span-4 h-[380px]" },
    { src: us16.src, alt: "Candle picture 16", span: "md:col-span-4 h-[380px]" },
    { src: us17.src, alt: "Candle picture 17", span: "md:col-span-4 h-[380px]" },
    { src: us18.src, alt: "Candle picture 18", span: "md:col-span-8 h-[400px]" },
    { src: us19.src, alt: "Candle picture 19", span: "md:col-span-4 h-[400px]" },
    { src: us20.src, alt: "Candle picture 20", span: "md:col-span-12 h-[450px]" }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.08 } }
  };

  return (
    <main className="bg-[#fcfcfc] min-h-screen pt-24 text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      
      {/* Top Section - What We Do */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="px-6 md:px-12 py-16 border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 font-bold">Our Work</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mt-4 mb-6 leading-tight">
            Helping people slow down,<br />
            feel good, and enjoy the moment.
          </h1>
          <div className="max-w-2xl">
            <p className="text-neutral-500 text-base font-light leading-relaxed">
              We make candles by hand and show people how to make their own candles too. It is a fun way to relax, use your imagination, and make something pretty for your room. We think there is a perfect candle for everyone.
            </p>
          </div>
        </div>
      </motion.section>

      {/* The Event Section */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch">
          
          {/* Left Text */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-neutral-200"
          >
            <h2 className="text-xl md:text-2xl font-light tracking-tight mb-4">
              Our candle event in Dar es Salaam
            </h2>
            <div className="space-y-4 text-neutral-500 text-sm font-light leading-relaxed">
              <p>
                Many different people like teachers, bosses, students, and painters came to our friendly meeting. It was a nice space for everyone to take a break, relax, and try something new.
              </p>
              <p>
                All 34 people who came learned how candles change shape. We talked about how wax starts hard, melts into warm liquid, and then grows hard again. It helps us think about how we can grow and change too.
              </p>
              <p>
                Everyone got to smell different scents. We told them that there is no wrong answer. You just have to trust your own nose and pick what makes you happy.
              </p>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="min-h-[350px] relative bg-neutral-100 overflow-hidden"
          >
            <img 
              src={us1.src} 
              alt="People at the event" 
              className="w-full h-full object-cover absolute inset-0 filter grayscale contrast-110"
            />
          </motion.div>

        </div>
      </section>

      {/* Picture Grid Section (No text or labels inside) */}
      <section className="border-b border-neutral-200 bg-white px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4"
          >
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`${img.span} relative overflow-hidden bg-neutral-100 border border-neutral-200/60`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover filter grayscale contrast-115 hover:scale-105 hover:contrast-100 transition-all duration-700 ease-out absolute inset-0"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who Came Section */}
      <section className="px-6 md:px-12 py-16 border-b border-neutral-200 max-w-7xl mx-auto">
        <h3 className="text-xs font-mono tracking-widest uppercase text-neutral-400 font-bold mb-8">People Who Visited Us</h3>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={fadeInUp} className="p-6 bg-neutral-50 border border-neutral-200">
            <p className="text-neutral-900 font-medium">Dr. Victoria Lihiru</p>
            <p className="text-neutral-500 text-sm">She works with big groups to help women and families.</p>
            <p className="text-neutral-500 text-sm mt-2">She named her favorite candle "Legacy."</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="p-6 bg-neutral-50 border border-neutral-200">
            <p className="text-neutral-900 font-medium">Dr. Amina Baamary (PhD)</p>
            <p className="text-neutral-500 text-sm">She teaches students at the big business school in Dar es Salaam.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* What Makes Us Different */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="px-6 md:px-12 py-20 border-b border-neutral-200 max-w-7xl mx-auto"
      >
        <div className="mb-12">
          <h3 className="text-xs font-mono tracking-widest uppercase text-neutral-400 font-bold">Our Pride</h3>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight mt-3">
            We are the very first group in Tanzania to make this kind of fun experience.
          </h2>
        </div>
        <div className="space-y-4 text-neutral-500 text-sm font-light leading-relaxed max-w-3xl">
          <p>
            You can book a time to visit us now for the end of the year. We do special paths for work teams, family parties, and schools.
          </p>
          <p>
            We work with nice places like Urban by CityBlue and Wild Flour to make sure you have a great time.
          </p>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="border-t border-neutral-200 bg-neutral-950 text-white py-16 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h4 className="text-xl font-light tracking-tight">Want to come make candles with us?</h4>
            <p className="text-neutral-400 text-xs font-mono tracking-wider mt-1 uppercase">Save a spot for your friends or your team</p>
          </div>
          <Link href="/contact" className="flex items-center gap-3 bg-white text-black font-mono font-bold text-xs uppercase px-6 py-4 tracking-wider hover:bg-neutral-100 transition-colors group">
            <span>Book Now</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.section>

    </main>
  );
}