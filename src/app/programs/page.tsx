'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function ProgramsPage() {
  const { t } = useLanguage();

  const programs = [
    {
      title: 'TODDLER CLASS',
      age: '18 MO TO 3 YRS',
      subtitle: 'Toddler Class: first explorations, big curiosity.',
      desc: 'A gentle, joyful introduction to school where wonder leads the way. Through sensory play, music, and story circles, toddlers build the motor, social, and language foundations that everything else grows from, supported by warm caregivers and predictable daily routines.',
      points: ['Sensory play', 'Music and movement', 'Story circles', 'Social skills', 'Daily routines', 'Caregiver partnerships'],
      schedule: 'Arrival and free play. Group circle. Snack. Sensory activity. Outdoor play. Lunch. Rest. Music. Story. Pickup',
      image: '/assets/toddler-class.png'
    },
    {
      title: 'PRE-SCHOOL',
      age: '3 TO 6 YRS',
      subtitle: 'Pre-school: playful foundations for reading, writing, and number sense.',
      desc: 'Carefully prepared activities turn play into purposeful learning. Children meet early literacy and numeracy through phonics, hands-on materials, and creative arts, building independence, concentration, and a genuine love of learning before they ever sit a formal lesson.',
      points: ['Early literacy', 'Early numeracy', 'Phonics', 'Fine motor', 'Creative arts', 'Outdoor learning'],
      schedule: 'Arrival and settling. Morning circle. Phonics and literacy. Snack and outdoor play. Numeracy activities. Creative arts. Lunch. Story and rest. Free choice play. Pickup',
      image: '/assets/pre-school.png'
    },
    {
      title: 'PRIMARY SCHOOL',
      age: '6 TO 14 YRS',
      subtitle: 'Primary School: rigour, curiosity, and PSLE ready confidence.',
      desc: 'Our primary programme is fully aligned to NECTA and TIE standards, taught in small classes by qualified subject teachers. Daily practice, frequent feedback, and structured PSLE preparation are how our students reach 100 percent Daraja A, without losing the curiosity that makes learning a pleasure.',
      points: ['English', 'Kiswahili', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'Religion', 'Civics'],
      image: '/assets/primary-school.png'
    },
    {
      title: 'ENRICHMENT',
      age: 'ALL AGES',
      subtitle: 'Enrichment activities: talents found, talents grown.',
      desc: 'Beyond the core curriculum, a rich programme of clubs and activities helps every child discover what they love. From coding and robotics to chess, drama, and languages, enrichment is woven through the school week, building confidence, creativity, and well rounded young people.',
      points: ['Coding', 'Robotics', 'Public speaking', 'Chess', 'Drama', 'Choir', 'Dance', 'French', 'Mandarin'],
      image: '/assets/enrichment-activities.png'
    }
  ];

  return (
    <main className="pt-16 bg-[#f6f5f1] min-h-screen font-sans">
      {/* Hero */}
      <section className="py-24 px-6 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F] mb-4 block">PROGRAMMES</span>
          <h1 className="text-4xl md:text-7xl font-bold text-[#44ACFF] uppercase leading-[0.9] mb-8 max-w-4xl">
            Programmes for every stage: from first steps to PSLE.
          </h1>
          <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-3xl">
            Four programmes built around how children actually learn at each age. From toddler explorations to PSLE excellence, our four programmes meet children where they are and stretch them with care.
          </p>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          {programs.map((program, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                  <Image src={program.image} alt={program.title} fill className="object-cover" />
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/90 px-4 py-2 text-xs font-bold text-[#44ACFF] uppercase tracking-widest shadow-lg">
                      {program.age}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-[#44ACFF] uppercase">{program.title}</h2>
                  <h3 className="text-xl font-bold text-[#ECB65F] leading-tight">{program.subtitle}</h3>
                </div>
                <p className="text-neutral-600 font-medium leading-relaxed">{program.desc}</p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {program.points.map((point, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-[#ECB65F]" />
                      <span className="text-sm font-bold uppercase tracking-wide text-neutral-500">{point}</span>
                    </div>
                  ))}
                </div>

                {program.schedule && (
                  <div className="bg-white p-8 border border-neutral-200">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#44ACFF] mb-4 block">A typical schedule:</span>
                    <p className="text-xs font-bold text-neutral-400 leading-loose uppercase tracking-tighter">
                      {program.schedule}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Framework */}
      <section className="py-32 px-6 bg-[#44ACFF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F] mb-4 block">CURRICULUM FRAMEWORK</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase">National standards, international thinking, personal pace.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Aligned to NECTA and TIE',
                desc: 'Our programme follows the Tanzanian national curriculum and TIE syllabi end to end, with structured PSLE preparation built into the primary years. Children are assessed continuously, so nothing is left to chance when exams arrive.'
              },
              {
                title: 'International best practice',
                desc: 'We layer inquiry based learning and modern pedagogy on top of the national curriculum, drawing on leading international approaches so children learn to think, question, and apply knowledge, not just memorise it.'
              },
              {
                title: 'Personalised pace',
                desc: 'Small classes mean teachers know every child. Lessons stretch the confident and support the still growing, with extra practice and challenge offered per child so each learner moves at the right pace for them.'
              }
            ].map((f, i) => (
              <div key={i} className="flex flex-col gap-6">
                <div className="w-12 h-1 bg-[#ECB65F]" />
                <h3 className="text-2xl font-bold text-white">{f.title}</h3>
                <p className="text-blue-100/70 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}