'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true });

      if (data) setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <div className="pt-40 pb-24 px-6 max-w-5xl mx-auto min-h-screen font-sans antialiased text-neutral-900">
      
      {/* Page Heading Section without background grid overlays */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
          Wellness Events
        </h1>
        <p className="text-sm text-neutral-500 max-w-2xl font-normal leading-relaxed tracking-wide">
          Immersive sensory experiences, scent-making workshops, and wellness retreats across Tanzania.
        </p>
      </motion.div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-44 bg-neutral-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-neutral-200/80 rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm group hover:border-neutral-900/40 transition-all"
            >
              {/* Event Meta Information */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="opacity-70" /> 
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="opacity-70" /> 
                    {event.venue}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
                  {event.title}
                </h3>
                
                <p className="text-neutral-500 text-xs leading-relaxed max-w-xl">
                  {event.description}
                </p>
                
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 pt-1">
                  <Users size={12} className="opacity-60" /> 
                  <span>{event.seats_remaining} slots remaining</span>
                </div>
              </div>

              {/* Pricing and Action Block */}
              <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-100">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block md:text-right mb-0.5">Admission</span>
                  <p className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900">Tshs. {event.price}</p>
                </div>
                
                <Link
                  href={`/events/${event.id}`}
                  className="group px-5 py-2.5 bg-neutral-950 hover:bg-neutral-900 text-white rounded-lg text-xs font-medium tracking-wide transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap"
                >
                  Book Tickets
                  <ChevronRight className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Empty Curator Placeholder State */}
          {events.length === 0 && (
            <div className="py-16 text-center border border-dashed border-neutral-200 rounded-xl bg-neutral-50/50">
              <p className="text-neutral-400 font-medium text-xs tracking-wide">
                We are curating new experiences. Check back soon for our next wellness session.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}