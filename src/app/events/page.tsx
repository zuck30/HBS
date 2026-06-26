'use client';
import React from 'react'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'

export default function EventsPage() {
  const events = [
    { title: 'School Tour & Assessment Day', date: 'Saturday, June 12', time: '8:00 - 13:00', location: 'Main Campus' },
    { title: 'Parent-Teacher Conference', date: 'Wednesday, June 16', time: '14:00 - 17:00', location: 'Hall A' },
    { title: 'Sports Day 2026', date: 'Friday, July 02', time: '9:00 - 15:00', location: 'Football Pitch' }
  ]

  return (
    <div className="font-mono pt-20">
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-8">HBS Events</div>
            <h1 className="text-5xl lg:text-7xl font-bold uppercase italic tracking-tighter leading-none mb-10">
              Upcoming events on campus.
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto space-y-4">
          {events.map((event, i) => (
            <div key={i} className="bg-white border border-neutral-200 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-black transition-colors">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic">
                  <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {event.date}</span>
                  <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {event.location}</span>
                </div>
                <h4 className="text-2xl font-bold uppercase italic tracking-tighter leading-none">{event.title}</h4>
                <div className="text-[10px] font-bold uppercase tracking-widest text-black">{event.time}</div>
              </div>
              <button className="px-8 py-4 border border-neutral-200 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-950 hover:text-white transition-all flex items-center gap-2">
                Register <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
