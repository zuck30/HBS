'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const obsessions = [
    {
      id: '01',
      title: 'Great learning in English',
      desc: 'An English-medium education that prepares children for the best secondary schools in Tanzania and beyond — taught with curiosity, exploration, and care. Our 2024 PSLE result (No.1 in Dar es Salaam Region) is one measure. The way children talk about school is the other.'
    },
    {
      id: '02',
      title: 'Nourishing meals, every day',
      desc: 'Wholesome breakfasts, balanced lunches, light afternoon snacks, and hearty suppers for boarders — dietitian-planned and prepared in a clean, welcoming kitchen. A child who eats well learns well. We take this as seriously as we take the timetable.'
    },
    {
      id: '03',
      title: 'Reliable transport, home and back',
      desc: 'Our own LATRA-compliant bus fleet, trained drivers, fixed routes, and on-time pick-ups. The commute should never be the hardest part of a child\'s day — and it never is at HBS.'
    }
  ];

  const values = [
    { title: 'Care', desc: 'every child is known and supported.' },
    { title: 'Curiosity', desc: 'questions are where learning begins.' },
    { title: 'Excellence', desc: 'high standards, held with kindness.' },
    { title: 'Integrity', desc: 'honesty in everything we do.' },
    { title: 'Community', desc: 'families and school, together.' }
  ];

  return (
    <main className="pt-16 bg-[#f6f5f1] min-h-screen font-sans selection:bg-[#44ACFF] selection:text-white">
      {/* Hero */}
      <section className="py-24 px-6 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F] mb-4 block">ABOUT HBS</span>
            <h1 className="text-4xl md:text-7xl font-bold text-[#44ACFF] uppercase leading-[0.9] mb-8 font-sans">
              A school born from a need — not a business plan.
            </h1>
            <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-xl">
              Hannah Bennie Schools was never started to make money. It was started because Kigamboni's children deserved a great English-medium school close to home — and no one else was building one.
            </p>
          </div>
          <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl rotate-3">
            <Image src="/assets/school-1.png" alt="HBS early years" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Humble Beginnings */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-12">
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F]">HUMBLE BEGINNINGS</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#44ACFF] uppercase">A school built by the community, for the community.</h2>
              <blockquote className="text-2xl font-bold text-[#44ACFF] italic border-l-8 border-[#ECB65F] pl-8 py-4">
                "HBS did not begin as a business plan. It began as a response to a need the families of Kigamboni lived every single day — and a quiet promise that, for the children in this community, school would no longer be the hardest part of growing up here."
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-neutral-600 leading-relaxed font-medium">
              <div className="space-y-6">
                <p>
                  <strong className="text-[#44ACFF] uppercase block mb-2">The problem:</strong>
                  In the early 2010s, before the Nyerere Bridge, Kigamboni had very few English-medium schools of the quality that parents here hoped for. Families who wanted one had to send their children across the ferry every morning — on a ferry that was always too crowded. Children left home at 4 a.m. and returned as late as 9 p.m. The commute was longer than the school day. Something had to change.
                </p>
                <p>
                  <strong className="text-[#44ACFF] uppercase block mb-2">The first attempt:</strong>
                  We tried the community route first. We sat with the community around us — hoping to build a school together, pooling resources for a shared dream. The idea was right. The commitment to see it through, on the scale it needed, never quite arrived. The plan stalled. But the need did not go away.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  <strong className="text-[#44ACFF] uppercase block mb-2">The call to start:</strong>
                  In 2015 we made a decision: start with whatever was possible, just to keep the ambition alive. We opened with four classes. A safe, beautiful place to learn. Nourishing meals. Reliable transport. That was the whole plan. Not profit. Not scale. Just three things, done well, for the children in front of us.
                </p>
                <p>
                  <strong className="text-[#44ACFF] uppercase block mb-2">The same focus, today:</strong>
                  Eleven years later, the campus has grown — classrooms, labs, a library, pools, a football pitch, boarding houses, our own buses. The school is no longer small. But the founding obsession has not changed: a great English-medium education, in a place children love coming to, with the meals and the journey home both taken seriously. The rest follows from there.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Strip */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto relative aspect-[21/9] rounded-[60px] overflow-hidden shadow-xl">
          <Image src="/assets/school-2.png" alt="HBS Lawn" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-12">
            <p className="text-white text-xs font-bold uppercase tracking-widest">Planted by hand. Shaped by patience.</p>
            <h3 className="text-white text-4xl font-bold uppercase">THE ORIGINAL HBS LAWN — KIGAMBONI, 2015.</h3>
          </div>
        </div>
      </section>

      {/* Obsessions */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F] mb-4 block">WHAT WE OBSESS OVER</span>
            <h2 className="text-4xl md:text-6xl font-bold text-[#44ACFF] uppercase">Three commitments that have never changed.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200 rounded-[40px] overflow-hidden">
            {obsessions.map((obs) => (
              <div key={obs.id} className="bg-white p-12 flex flex-col gap-6 group hover:bg-neutral-50 transition-colors">
                <span className="text-6xl font-bold text-neutral-100 group-hover:text-[#ECB65F]/20 transition-colors">{obs.id}</span>
                <h3 className="text-2xl font-bold text-[#44ACFF]">{obs.title}</h3>
                <p className="text-neutral-500 font-medium leading-relaxed">{obs.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F] mb-4 block">WHAT GUIDES US</span>
            <h2 className="text-4xl font-bold text-[#44ACFF] uppercase mb-8">Mission, vision, and values.</h2>
            <p className="text-neutral-500 font-medium leading-relaxed">The three obsessions came first. These statements explain how we live them out, every day.</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#44ACFF] p-10 rounded-[40px] text-white">
              <h3 className="text-xl font-bold text-[#ECB65F] uppercase mb-4">01 Our mission</h3>
              <p className="font-medium leading-relaxed opacity-90">To nurture curious, confident, and capable young learners through a world-class English-medium curriculum — taught with warmth, rigour, and care.</p>
            </div>
            <div className="bg-[#ECB65F] p-10 rounded-[40px] text-white">
              <h3 className="text-xl font-bold text-[#44ACFF] uppercase mb-4">02 Our vision</h3>
              <p className="font-medium leading-relaxed opacity-90">Every HBS child finishes primary school ready to thrive — academically, socially, and personally — anywhere in the world.</p>
            </div>
            <div className="bg-white p-10 rounded-[40px] border border-neutral-200 md:col-span-2">
              <h3 className="text-xl font-bold text-[#44ACFF] uppercase mb-6">03 Our values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((v, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-lg font-bold text-[#44ACFF]">{v.title}</span>
                    <span className="text-sm text-neutral-500 font-medium">{v.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}