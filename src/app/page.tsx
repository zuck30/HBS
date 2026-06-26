'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Award, Trophy, CheckCircle2, BookOpen, Music, Laptop, Bus, Home as HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  const stats = [
    { label: 'NECTA · Dar es Salaam Region 2024', value: 'No.1', icon: Award },
    { label: 'Highest school average · PSLE 2024', value: '289.9', icon: Star },
    { label: 'Students · 100% Daraja A', value: '59', icon: Users },
    { label: 'Nation-wide · Category 40+', value: 'Top 10', icon: Trophy },
  ]

  const programs = [
    {
      title: 'Toddler Class',
      age: '18 MO – 3 YRS',
      desc: 'Purposeful activities that develop wonder, natural curiosity, motor and social skills, self-esteem, and the cognitive processes that prepare children for everything to come.',
      image: '/public/assets/toddler-class.png'
    },
    {
      title: 'Preschool',
      age: '3 – 6 YRS',
      desc: 'Through carefully prepared materials and activities, children grow in independence, concentration, self-motivation, and develop a genuine love of learning.',
      image: '/public/assets/pre-school.png'
    },
    {
      title: 'Primary School',
      age: '6 – 14 YRS',
      desc: 'Our graduates are prepared for higher education with the tools to succeed — while maintaining a passion for learning and the drive to explore, create, and collaborate.',
      image: '/public/assets/primary-school.png'
    },
    {
      title: 'Enrichment Activities',
      age: 'ALL AGES',
      desc: 'Music, fitness, art, performing arts, mindfulness, and many other programs that develop the whole child — woven into every school day.',
      image: '/public/assets/enrichment-activities.png'
    }
  ]

  const features = [
    { title: 'Classrooms designed for learning.', desc: 'Spacious, well-organized rooms with a limited number of students per class.', tags: ['Open layout', 'Low ratio'], image: '/public/assets/Classrooms-designed-for-learning.png' },
    { title: 'A library that invites you in.', desc: 'Soft carpets, cozy seating, and child-friendly tables. A diverse collection of storybooks for every age.', tags: ['Reading culture', 'All ages'], image: '/public/assets/kid-in-library.png' },
    { title: 'Technology, the right way.', desc: 'A computer room equipped with cutting-edge learning software designed for young learners.', tags: ['Digital skills', 'AI literacy'], image: '/public/assets/kids-in-class-with-computer.png' },
    { title: 'Cultural heritage & diversity.', desc: 'Through festivals, language programs, music, dance, and storytelling, we instill identity and global awareness.', tags: ['Festivals', 'Languages'], image: '/public/assets/cultural-heritage.png' },
    { title: 'Nutritious meals.', desc: 'Wholesome breakfasts, balanced lunches, light afternoon snacks, and hearty suppers for boarders.', tags: ['HACCP', 'Dietitian-planned'], image: '/public/assets/kids-with-meals.png' },
    { title: 'Practical, hands-on learning.', desc: 'Students learn through hands-on experiments — microscopes, beakers, and real apparatus.', tags: ['Small groups', 'Mentorship'], image: '/public/assets/practical-hands-on.png' },
    { title: 'Sports, clubs & arts.', desc: 'Basketball courts, football field, half-Olympic pool, and indoor game areas.', tags: ['Football', 'Swimming'], image: '/public/assets/sports-club.png' },
    { title: 'Safe school transport.', desc: 'Well-maintained vehicles and trained staff make every ride comfortable and secure.', tags: ['LATRA-compliant', 'Safe'], image: '/public/assets/school-bus.png' },
    { title: 'Comfortable boarding.', desc: 'Spacious dormitories with cozy bedding and a peaceful atmosphere for rest and study.', tags: ['24/7 supervision', 'Study spaces'], image: '/public/assets/dorms.png' },
  ]

  return (
    <div className="font-mono">
      {/* Breaking News Bar */}
      <div className="bg-neutral-950 text-white py-2 px-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
        <div className="flex items-center gap-4">
          <span className="bg-white text-black px-2 py-0.5">BREAKING</span>
          <span>We're hiring · NECTA No.1 · Term 2 admissions open</span>
        </div>
        <Link href="/careers" className="hidden sm:flex items-center gap-2 hover:opacity-80">
          Apply Now <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-neutral-200 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              <span className="w-2 h-2 bg-neutral-950 rounded-full" />
              Nursery & Primary · Established Dar es Salaam
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tighter uppercase italic">
              Ignite curiosity.<br />Grow potential.
            </h1>
            <p className="text-lg text-neutral-600 max-w-lg leading-relaxed font-sans normal-case">
              We enrich young minds and inspire children to be creative, mindful, and influential to their communities and the world.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/contact" className="px-8 py-4 bg-neutral-950 text-white font-bold flex items-center gap-3 hover:bg-neutral-800 transition-colors uppercase text-xs tracking-widest group">
                Book a visit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/programs" className="px-8 py-4 bg-white border border-neutral-200 text-black font-bold flex items-center gap-3 hover:bg-neutral-50 transition-colors uppercase text-xs tracking-widest">
                Explore programs
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="/public/assets/shot.png"
              alt="HBS Campus"
              className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-neutral-200"
            />
            <div className="absolute -bottom-8 -left-8 bg-white border border-neutral-200 p-8 hidden xl:block">
              <div className="text-4xl font-bold mb-1 italic tracking-tighter uppercase leading-none">2015</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Year Founded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
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

      {/* Campus Info */}
      <section className="px-6 py-32 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic">One Campus · Every Facility</div>
              <h2 className="text-4xl lg:text-5xl font-bold uppercase italic tracking-tighter leading-none">
                Where every child has room<br />to learn, play, and grow.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Football pitch</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Swimming pools</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Science labs</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Transport fleet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="px-6 py-32 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-20">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-4">Our Programs</div>
            <h2 className="text-4xl lg:text-5xl font-bold uppercase italic tracking-tighter leading-none mb-6">
              Carefully designed for every stage of early learning.
            </h2>
            <p className="text-neutral-600 font-sans normal-case text-lg leading-relaxed">
              From the first explorations of toddlerhood to the foundations of upper primary, our four programs grow with your child.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
            {programs.map((program, i) => (
              <div key={i} className="bg-white p-8 group flex flex-col min-h-[500px]">
                <div className="mb-8 overflow-hidden border border-neutral-100">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-48 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">{program.age}</div>
                <h3 className="text-xl font-bold uppercase italic tracking-tighter mb-4">{program.title}</h3>
                <p className="text-xs text-neutral-600 font-sans normal-case leading-relaxed mb-8 flex-grow">
                  {program.desc}
                </p>
                <Link href="/programs" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:gap-4 transition-all">
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at HBS Grid */}
      <section className="px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-20">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-4">Life at HBS</div>
            <h2 className="text-4xl lg:text-5xl font-bold uppercase italic tracking-tighter leading-none mb-6">
              What a day looks like.
            </h2>
            <p className="text-neutral-600 font-sans normal-case text-lg leading-relaxed">
              A close look at the spaces, programs, and routines that make HBS feel like a second home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-video border border-neutral-200 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold uppercase italic tracking-tighter leading-none">{feature.title}</h4>
                  <p className="text-xs text-neutral-600 font-sans normal-case leading-relaxed">
                    {feature.desc}
                  </p>
                  <div className="flex gap-4">
                    {feature.tags.map((tag, j) => (
                      <div key={j} className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 border border-neutral-100 px-2 py-1">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-32 bg-neutral-950 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-5xl lg:text-7xl font-bold uppercase italic tracking-tighter leading-none">
            Ready to give your child<br />a world-class start?
          </h2>
          <p className="text-neutral-400 font-sans normal-case text-xl leading-relaxed">
            Book a school visit, meet our teachers, and see our classrooms, library, and play spaces in person.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="px-10 py-5 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-neutral-200 transition-colors">
              Book a visit
            </Link>
            <Link href="/contact" className="px-10 py-5 border border-neutral-800 text-white font-bold uppercase text-xs tracking-widest hover:bg-neutral-900 transition-colors">
              See admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
