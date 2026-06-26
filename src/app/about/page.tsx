'use client';
import React from 'react'
import { ArrowRight, Star, Users, Award, Trophy } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const stats = [
    { label: 'NECTA · Dar es Salaam Region 2024', value: 'No.1', icon: Award },
    { label: 'Highest school average · PSLE 2024', value: '289.9', icon: Star },
    { label: 'Students · 100% Daraja A', value: '59', icon: Users },
    { label: 'Nation-wide · Category 40+', value: 'Top 10', icon: Trophy },
  ]

  const obsessions = [
    {
      id: '01',
      title: 'Great learning in English',
      desc: 'An English-medium education that prepares children for the best secondary schools in Tanzania and beyond — taught with curiosity, exploration, and care. Our 2024 PSLE result (No.1 in Dar es Salaam Region) is one measure.'
    },
    {
      id: '02',
      title: 'Nourishing meals, every day',
      desc: 'Wholesome breakfasts, balanced lunches, light afternoon snacks, and hearty suppers for boarders — dietitian-planned and prepared in a clean, welcoming kitchen.'
    },
    {
      id: '03',
      title: 'Reliable transport, home and back',
      desc: 'Our own LATRA-compliant bus fleet, trained drivers, fixed routes, and on-time pick-ups. The commute should never be the hardest part of a child\'s day.'
    }
  ]

  return (
    <div className="font-mono pt-20">
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-8">About HBS</div>
            <h1 className="text-5xl lg:text-7xl font-bold uppercase italic tracking-tighter leading-none mb-10">
              A school born from a need — not a business plan.
            </h1>
            <p className="text-lg text-neutral-600 font-sans leading-relaxed normal-case max-w-xl">
              Hannah Bennie Schools was never started to make money. It was started because Kigamboni's children deserved a great English-medium school close to home — and no one else was building one.
            </p>
          </div>
          <div className="border border-neutral-200">
            <img src="/public/assets/school-1.png" alt="HBS early years" className="w-full grayscale" />
          </div>
        </div>
      </section>

      <section className="px-6 py-32 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-12">Humble Beginnings</div>
          <div className="space-y-12">
            <blockquote className="text-3xl font-bold uppercase italic tracking-tighter leading-none">
              “HBS did not begin as a business plan. It began as a response to a need the families of Kigamboni lived every single day — and a quiet promise that, for the children in this community, school would no longer be the hardest part of growing up here.”
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-neutral-600 font-sans normal-case leading-relaxed">
              <div className="space-y-6">
                <h4 className="font-mono font-bold uppercase tracking-widest text-black">The problem</h4>
                <p>In the early 2010s, before the Nyerere Bridge, Kigamboni had very few English-medium schools of the quality that parents here hoped for. Families who wanted one had to send their children across the ferry every morning — on a ferry that was always too crowded.</p>
                <p>Children left home at 4 a.m. and returned as late as 9 p.m. The commute was longer than the school day. Something had to change.</p>
              </div>
              <div className="space-y-6">
                <h4 className="font-mono font-bold uppercase tracking-widest text-black">The first attempt</h4>
                <p>We tried the community route first. We sat with the community around us — hoping to build a school together, pooling resources for a shared dream. The idea was right. The commitment to see it through, on the scale it needed, never quite arrived. The plan stalled.</p>
                <p>In 2015 we made a decision: start with whatever was possible. We opened with four classes. A safe, beautiful place to learn. Nourishing meals. Reliable transport.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-32 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="border border-neutral-200">
              <img src="/public/assets/school-2.png" alt="HBS early years" className="w-full grayscale" />
              <div className="p-8 text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic text-center">The original HBS lawn — Kigamboni, 2015.</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-8">What we obsess over</div>
              <h2 className="text-4xl font-bold uppercase italic tracking-tighter leading-none mb-12">Three commitments that have never changed.</h2>
              <div className="space-y-12">
                {obsessions.map((obs) => (
                  <div key={obs.id} className="flex gap-8 group">
                    <div className="text-4xl font-bold italic tracking-tighter text-neutral-200 group-hover:text-black transition-colors">{obs.id}</div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold uppercase italic tracking-tighter">{obs.title}</h4>
                      <p className="text-sm text-neutral-600 font-sans normal-case leading-relaxed">{obs.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-32 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="space-y-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic">Our Mission</div>
              <p className="text-xl font-bold uppercase italic tracking-tighter leading-tight">To nurture curious, confident, and capable young learners through a world-class English-medium curriculum — taught with warmth, rigour, and care.</p>
            </div>
            <div className="space-y-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic">Our Vision</div>
              <p className="text-xl font-bold uppercase italic tracking-tighter leading-tight">Every HBS child finishes primary school ready to thrive — academically, socially, and personally — anywhere in the world.</p>
            </div>
            <div className="space-y-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic">Our Values</div>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li className="flex justify-between border-b border-neutral-200 pb-2"><span>Care</span> <span className="text-neutral-400 italic">Supportive</span></li>
                <li className="flex justify-between border-b border-neutral-200 pb-2"><span>Curiosity</span> <span className="text-neutral-400 italic">Questions</span></li>
                <li className="flex justify-between border-b border-neutral-200 pb-2"><span>Excellence</span> <span className="text-neutral-400 italic">High Standards</span></li>
                <li className="flex justify-between border-b border-neutral-200 pb-2"><span>Integrity</span> <span className="text-neutral-400 italic">Honesty</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-4 border-l border-neutral-200 pl-6 first:border-0">
                <stat.icon className="w-5 h-5 text-neutral-400" />
                <div>
                  <div className="text-4xl font-bold tracking-tighter uppercase italic leading-none mb-2">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
