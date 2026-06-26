'use client';
import React from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ProgramsPage() {
  const programs = [
    {
      title: 'Toddler Class',
      age: '18 MO – 3 YRS',
      tagline: 'First explorations, big curiosity.',
      desc: 'A gentle, joyful introduction to school where wonder leads the way. Through sensory play, music, and story circles, toddlers build the motor, social, and language foundations that everything else grows from — supported by warm caregivers and predictable daily routines.',
      features: ['Sensory play', 'Music & movement', 'Story circles', 'Social skills', 'Daily routines'],
      schedule: ['Arrival & free play', 'Group circle', 'Snack', 'Sensory activity', 'Outdoor play', 'Lunch', 'Rest', 'Music', 'Story', 'Pickup'],
      image: '/public/assets/toddler-class.png'
    },
    {
      title: 'Pre-school',
      age: '3 – 6 YRS',
      tagline: 'Playful foundations for reading, writing, and number sense.',
      desc: 'Carefully prepared activities turn play into purposeful learning. Children meet early literacy and numeracy through phonics, hands-on materials, and creative arts — building independence, concentration, and a genuine love of learning before they ever sit a formal lesson.',
      features: ['Early literacy', 'Early numeracy', 'Phonics', 'Fine motor', 'Creative arts', 'Outdoor learning'],
      schedule: ['Arrival & settling', 'Morning circle', 'Phonics & literacy', 'Snack & outdoor play', 'Numeracy activities', 'Creative arts', 'Lunch', 'Story & rest', 'Free choice play', 'Pickup'],
      image: '/public/assets/pre-school.png'
    },
    {
      title: 'Primary School',
      age: '6 – 14 YRS',
      tagline: 'Rigour, curiosity, and PSLE-ready confidence.',
      desc: 'Our primary programme is fully aligned to NECTA and TIE standards, taught in small classes by qualified subject teachers. Daily practice, frequent feedback, and structured PSLE preparation are how our students reach 100% Daraja A — without losing the curiosity that makes learning a pleasure.',
      subjects: ['English', 'Kiswahili', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'Religion', 'Civics'],
      image: '/public/assets/primary-school.png'
    },
    {
      title: 'Enrichment',
      age: 'ALL AGES',
      tagline: 'Talents found, talents grown.',
      desc: 'Beyond the core curriculum, a rich programme of clubs and activities helps every child discover what they love. From coding and robotics to chess, drama, and languages, enrichment is woven through the school week — building confidence, creativity, and well-rounded young people.',
      activities: ['Coding', 'Robotics', 'Public speaking', 'Chess', 'Drama', 'Choir', 'Dance', 'French', 'Mandarin'],
      image: '/public/assets/enrichment-activities.png'
    }
  ]

  return (
    <div className="font-mono pt-20">
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-8">HBS Programs</div>
            <h1 className="text-5xl lg:text-7xl font-bold uppercase italic tracking-tighter leading-none mb-10">
              Programmes for every stage — from first steps to PSLE.
            </h1>
            <p className="text-lg text-neutral-600 font-sans leading-relaxed normal-case max-w-xl">
              From toddler explorations to PSLE excellence, our four programmes meet children where they are — and stretch them with care.
            </p>
          </div>
        </div>
      </section>

      <section className="divide-y divide-neutral-200 border-t border-neutral-200">
        {programs.map((program, i) => (
          <div key={i} className="px-6 py-32 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-12">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-4">{program.age}</div>
                  <h2 className="text-4xl font-bold uppercase italic tracking-tighter leading-none mb-4">{program.title}</h2>
                  <div className="text-xl font-bold uppercase italic tracking-tighter text-neutral-400 leading-tight">{program.tagline}</div>
                </div>

                <p className="text-sm text-neutral-600 font-sans normal-case leading-relaxed">{program.desc}</p>

                <div className="grid grid-cols-2 gap-4">
                  {(program.features || program.subjects || program.activities)?.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      <CheckCircle2 className="w-3 h-3 text-black shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                {program.schedule && (
                  <div className="space-y-6 pt-8 border-t border-neutral-100">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Typical Day</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.schedule.map((slot, k) => (
                        <div key={k} className="px-3 py-1 bg-neutral-50 text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative aspect-square lg:aspect-auto">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-neutral-200 shadow-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="px-6 py-32 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-20 text-center">Curriculum Framework</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="space-y-6">
              <h4 className="text-xl font-bold uppercase italic tracking-tighter">Aligned to NECTA & TIE</h4>
              <p className="text-sm text-neutral-600 font-sans normal-case leading-relaxed">Our programme follows the Tanzanian national curriculum and TIE syllabi end to end, with structured PSLE preparation built into the primary years.</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-bold uppercase italic tracking-tighter">International Thinking</h4>
              <p className="text-sm text-neutral-600 font-sans normal-case leading-relaxed">We layer inquiry-based learning and modern pedagogy on top of the national curriculum — drawing on leading international approaches.</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-bold uppercase italic tracking-tighter">Personalised Pace</h4>
              <p className="text-sm text-neutral-600 font-sans normal-case leading-relaxed">Small classes mean teachers know every child. Lessons stretch the confident and support the still-growing, with extra practice and challenge.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
