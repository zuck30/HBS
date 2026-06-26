'use client';
import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ChevronLeft, Users, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  async function fetchEvent() {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) setEvent(data);
    setLoading(false);
  }

  if (loading) return <div className="min-h-screen pt-32 px-6 flex justify-center">Loading...</div>;
  if (!event) return <div className="min-h-screen pt-32 px-6 flex justify-center">Event not found.</div>;

  return (
    <main className="pt-16 bg-[#f6f5f1] min-h-screen font-sans">
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/events" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#000080] transition-colors mb-12">
            <ChevronLeft size={12} /> Back to Calendar
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Image and Description */}
            <div className="lg:col-span-8 flex flex-col gap-12">
               <div className="relative aspect-video rounded-[60px] overflow-hidden shadow-2xl">
                 {event.image ? (
                   <Image src={event.image} alt={event.title} fill className="object-cover" />
                 ) : (
                   <div className="w-full h-full bg-[#000080] flex items-center justify-center">
                     <Image src="/HBSlogo.png" alt="HBS" width={120} height={120} className="opacity-20" />
                   </div>
                 )}
               </div>
               <div className="flex flex-col gap-8">
                  <h1 className="text-4xl md:text-6xl font-bold text-[#000080] uppercase leading-[1.1]">{event.title}</h1>
                  <div className="prose prose-lg max-w-none text-neutral-600 font-medium leading-relaxed">
                    {event.description}
                  </div>
               </div>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4">
               <div className="bg-white p-10 rounded-[40px] shadow-xl border border-neutral-100 flex flex-col gap-10 sticky top-32">
                  <div className="flex flex-col gap-6">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 flex items-center justify-center text-[#D4AF37]">
                           <Calendar size={24} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Date</span>
                           <span className="text-sm font-bold text-[#000080] uppercase">{new Date(event.date).toLocaleDateString('default', { dateStyle: 'full' })}</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 flex items-center justify-center text-[#D4AF37]">
                           <Clock size={24} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Time</span>
                           <span className="text-sm font-bold text-[#000080] uppercase">{event.time}</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 flex items-center justify-center text-[#D4AF37]">
                           <MapPin size={24} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Location</span>
                           <span className="text-sm font-bold text-[#000080] uppercase">{event.location}</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 flex items-center justify-center text-[#D4AF37]">
                           <Users size={24} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Capacity</span>
                           <span className="text-sm font-bold text-[#000080] uppercase">{event.rsvp_count || 0} / {event.capacity || 'Unlimited'}</span>
                        </div>
                     </div>
                  </div>

                  <button className="w-full py-6 bg-[#000080] text-white rounded-3xl font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all shadow-xl shadow-[#000080]/20 flex items-center justify-center gap-3">
                     RSVP For Event
                     <ArrowRight size={18} />
                  </button>
                  <p className="text-[10px] text-center text-neutral-400 font-bold uppercase tracking-widest">Limited spaces available</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}