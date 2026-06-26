'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  }

  const upcomingEvents = events.filter(e => e.is_upcoming);
  const pastEvents = events.filter(e => !e.is_upcoming);

  return (
    <main className="pt-16 bg-[#f6f5f1] min-h-screen font-sans">
      <section className="py-24 px-6 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">CALENDAR</span>
          <h1 className="text-4xl md:text-7xl font-bold text-[#000080] uppercase leading-[0.9]">
            Upcoming Events.
          </h1>
          <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-3xl">
            Join us for school tours, festivals, and academic workshops.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
               {[1,2].map(i => <div key={i} className="h-64 bg-neutral-200 rounded-[40px]" />)}
             </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {upcomingEvents.map((event) => (
                <Link
                  href={`/events/${event.id}`}
                  key={event.id}
                  className="bg-white flex flex-col md:flex-row rounded-[40px] overflow-hidden border border-neutral-200 shadow-sm group hover:border-[#D4AF37] transition-all"
                >
                  <div className="relative w-full md:w-2/5 aspect-video md:aspect-square overflow-hidden">
                    {event.image ? (
                      <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-[#000080]/5 flex items-center justify-center">
                        <Image src="/HBSlogo.png" alt="HBS" width={60} height={60} className="opacity-20" />
                      </div>
                    )}
                  </div>
                  <div className="p-10 flex flex-col justify-between flex-1">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center bg-[#000080]/5 px-4 py-2 rounded-2xl">
                          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                          <span className="text-2xl font-bold text-[#000080]">{new Date(event.date).getDate()}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-xl font-bold text-[#000080] uppercase group-hover:text-[#D4AF37] transition-colors">{event.title}</h3>
                          <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                            <MapPin className="w-3 h-3 text-[#D4AF37]" /> {event.location}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 font-medium leading-relaxed line-clamp-2">{event.description}</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-neutral-50 pt-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-[#000080] uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {event.time}
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#D4AF37] transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-24 rounded-[60px] border border-dashed border-neutral-200 text-center">
               <p className="text-neutral-500 font-bold uppercase tracking-widest">No upcoming events scheduled.</p>
               <Link href="/contact" className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mt-4 block underline">Enquire about admissions →</Link>
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-24 px-6 border-t border-neutral-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-[#000080] uppercase tracking-widest mb-12">Past Events</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              {pastEvents.map(event => (
                <div key={event.id} className="flex flex-col gap-4">
                  <div className="relative aspect-video rounded-3xl overflow-hidden grayscale">
                    <Image src={event.image || '/HBSlogo.png'} alt={event.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-[#000080] uppercase tracking-tight">{event.title}</h4>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}