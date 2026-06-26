'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MapPin, Calendar as CalIcon, Clock, Edit, Trash2, ChevronLeft, MoreVertical } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminEvents() {
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

    if (!error && data) setEvents(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-2">
            <Link href="/admin" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#000080] transition-colors mb-4">
               <ChevronLeft size={12} /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-[#000080] uppercase">School Events</h1>
            <p className="text-neutral-500 font-medium">Schedule tours, festivals, and academic events.</p>
          </div>
          <button
            className="px-8 py-4 bg-[#000080] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#000060] transition-all shadow-lg flex items-center gap-3"
          >
            <Plus size={18} /> Schedule Event
          </button>
        </header>

        <div className="bg-white p-8 rounded-[40px] border border-neutral-100 shadow-sm overflow-hidden">
           <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50/50 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                   <th className="px-8 py-6">Event Details</th>
                   <th className="px-8 py-6">Date & Time</th>
                   <th className="px-8 py-6">Location</th>
                   <th className="px-8 py-6">Capacity</th>
                   <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                 {loading ? (
                    <tr><td colSpan={5} className="p-8 text-center animate-pulse text-neutral-300 font-bold uppercase tracking-widest">Loading Events...</td></tr>
                 ) : events.map(event => (
                    <tr key={event.id} className="group hover:bg-neutral-50/50 transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl overflow-hidden relative border border-neutral-100">
                                <Image src={event.image || '/HBSlogo.png'} alt={event.title} fill className="object-cover" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-sm font-bold text-neutral-900 uppercase tracking-tight">{event.title}</span>
                                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Upcoming</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                             <span className="text-xs font-bold text-[#000080] uppercase tracking-tight flex items-center gap-2"><CalIcon size={12} /> {new Date(event.date).toLocaleDateString()}</span>
                             <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2"><Clock size={12} /> {event.time}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className="text-xs font-medium text-neutral-500 flex items-center gap-2"><MapPin size={14} className="text-[#D4AF37]" /> {event.location}</span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                             <span className="text-xs font-bold text-neutral-900">{event.rsvp_count || 0} / {event.capacity || '∞'}</span>
                             <div className="h-1 w-20 bg-neutral-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#000080]" style={{ width: `${(event.rsvp_count || 0) / (event.capacity || 1) * 100}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-2 text-neutral-400 hover:text-[#000080] transition-colors"><Edit size={16} /></button>
                             <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}