'use client';
import React from 'react'

export default function LifePage() {
  const facilities = [
    {
      title: 'Classrooms designed for learning.',
      desc: 'Spacious, well-organised rooms with a limited number of students per class. The open layout encourages movement, collaboration, and meaningful interactions — so every child is seen and every session counts.',
      tags: ['Open layout', 'Low ratio', 'Bright & airy'],
      image: '/public/assets/Classrooms-designed-for-learning.png'
    },
    {
      title: 'A library that loves curiosity.',
      desc: 'Soft carpets, cosy seating, and child-friendly tables surround a diverse collection of storybooks for every age. It\'s where a lifelong love of reading begins — quiet corners for one, story circles for many.',
      tags: ['Reading culture', 'All ages', 'Storytime'],
      image: '/public/assets/kid-in-library.png'
    },
    {
      title: 'Technology that opens doors.',
      desc: 'STEM labs, computer rooms, and smart boards bring learning to life. Kid-friendly hardware and interactive software prepare students for a digital future — introduced thoughtfully.',
      tags: ['Smart boards', 'Robotics lab', 'Digital skills'],
      image: '/public/assets/kids-in-class-with-computer.png'
    },
    {
      title: 'Sports, clubs & performing arts.',
      desc: 'Courts, a football field, a half-Olympic swimming pool, and indoor game areas keep bodies moving. Music, drama, and dance programmes help students discover talents.',
      tags: ['Football', 'Swimming', 'Music'],
      image: '/public/assets/sports-club.png'
    },
    {
      title: 'Cultural heritage & community.',
      desc: 'Through festivals, language programmes, music, dance, and storytelling, we instil identity and global awareness. Students celebrate their own heritage while learning to appreciate others.',
      tags: ['Festivals', 'Languages', 'Performing arts'],
      image: '/public/assets/cultural-heritage.png'
    },
    {
      title: 'Nutritious meals for growing minds.',
      desc: 'Wholesome breakfasts, balanced lunches, light afternoon snacks, and hearty suppers for boarders. Every dish is prepared with quality ingredients in a clean, welcoming dining area.',
      tags: ['HACCP', 'Dietitian-planned', 'Fresh daily'],
      image: '/public/assets/kids-with-meals.png'
    },
    {
      title: 'Safe school transport.',
      desc: 'Well-maintained vehicles and trained staff make every ride to and from school comfortable and secure — so parents have peace of mind and students arrive ready to learn.',
      tags: ['LATRA-compliant', 'Trained drivers', 'Door-to-door'],
      image: '/public/assets/school-bus.png'
    },
    {
      title: 'Comfortable boarding.',
      desc: 'Spacious dormitories with cosy bedding, personal storage, and a peaceful atmosphere for rest and study. Dedicated supervision fosters independence, discipline, and personal growth.',
      tags: ['24/7 supervision', 'Study spaces', 'Home-like'],
      image: '/public/assets/dorms.png'
    }
  ]

  const schedule = [
    { time: '7:00', event: 'Arrival & breakfast' },
    { time: '8:00', event: 'Morning assembly' },
    { time: '8:30', event: 'Lessons begin' },
    { time: '10:30', event: 'Snack & outdoor play' },
    { time: '11:00', event: 'Lessons continue' },
    { time: '13:00', event: 'Lunch in the dining area' },
    { time: '14:00', event: 'Lessons & enrichment' },
    { time: '15:00', event: 'Afternoon tea / snack' },
    { time: '16:00', event: 'Clubs & sports' },
    { time: '17:00', event: 'Pickup or boarders\' study time' },
    { time: '19:00', event: 'Dinner (boarders)' },
    { time: '20:30', event: 'Quiet time / read-aloud (boarders)' },
    { time: '21:00', event: 'Lights out' },
  ]

  return (
    <div className="font-mono pt-20">
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-8">HBS Life</div>
            <h1 className="text-5xl lg:text-7xl font-bold uppercase italic tracking-tighter leading-none mb-10">
              More than lessons — a whole world of learning.
            </h1>
            <p className="text-lg text-neutral-600 font-sans leading-relaxed normal-case max-w-xl">
              Boarding, dining, sports, clubs, technology, and the everyday rhythms that make HBS feel like home.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-32 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {facilities.map((item, i) => (
            <div key={i} className="space-y-6">
              <div className="aspect-[4/3] border border-neutral-200 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold uppercase italic tracking-tighter leading-none">{item.title}</h4>
                <p className="text-[11px] text-neutral-600 font-sans normal-case leading-relaxed">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, j) => (
                    <span key={j} className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 border border-neutral-200 px-2 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-32 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic">A Typical Day</div>
            <h2 className="text-4xl font-bold uppercase italic tracking-tighter leading-none">From breakfast to lights out.</h2>
          </div>

          <div className="divide-y divide-neutral-100 border-t border-neutral-100">
            {schedule.map((item, i) => (
              <div key={i} className="py-6 flex justify-between items-center group hover:bg-neutral-50 px-4 transition-colors">
                <span className="text-2xl font-bold italic tracking-tighter text-neutral-300 group-hover:text-black transition-colors">{item.time}</span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-600">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
