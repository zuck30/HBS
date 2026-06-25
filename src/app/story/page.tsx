'use client';
import React from 'react';
import { motion } from 'framer-motion';

import story1 from '../../assets/story-1.jpg';
import story2 from '../../assets/story-2.jpg';
import story3 from '../../assets/story-3.jpg';
import faraja from '../../assets/faraja.png';

export default function OurStoryPage() {
  return (
    <main className="bg-white min-h-screen pt-24 text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* Title Section */}
      <section className="px-6 md:px-12 py-20 border-b border-neutral-200 max-w-7xl mx-auto">
        <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 font-bold">Our Story</span>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mt-4 mb-8 leading-tight">
          Born from a personal journey <br />
          of scent sensitivity.
        </h1>
        <div className="max-w-2xl text-neutral-500 text-base md:text-lg font-light leading-relaxed space-y-4">
          <p>
            Nawwi Wellness is a Tanzania-based, scent-led brand. We make refined soy candles and immersive experiences. We translate the rhythm, beauty, and intimacy of African daily life into moments of intentional living.
          </p>
        </div>
      </section>

      {/* How It Started */}
      <section className="px-6 md:px-12 py-20 border-b border-neutral-200 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">How Nawwi began</h2>
            <p className="text-neutral-500 text-sm font-light leading-relaxed mb-4">
              Nawwi Wellness was born from a personal journey. Our founder discovered that many traditional scents triggered sensitivity reactions. Rather than give up on a beautifully scented home, she began blending scents to create candles that heal instead of harm.
            </p>
            <p className="text-neutral-500 text-sm font-light leading-relaxed">
              Today, Nawwi Wellness means more than just luxury candles. It is a movement toward intentional living, celebrating African heritage, and redefining wellness on our own terms. Every candle is made with care, using refined soy and fairly sourced ingredients.
            </p>
          </div>
          <div className="bg-neutral-100 aspect-square overflow-hidden rounded-2xl">
            <img src={faraja.src} alt="Founder Faraja Brown" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Founder Quote or Simple Timeline Note */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto text-center border-b border-neutral-200">
        <p className="font-serif italic text-2xl text-neutral-700 font-light">
          "There is no perfect scent. Trust your nose."
        </p>
        <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mt-4 font-bold">Faraja Brown, Founder</span>
      </section>

    </main>
  );
}