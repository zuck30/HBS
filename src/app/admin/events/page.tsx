'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MapPin, Calendar as CalIcon, Clock, Edit, Trash2, ChevronLeft, MoreVertical } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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
    <div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-[#44ACFF] selection:text-white pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <Link href="/admin" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#44ACFF] transition-colors">
               <ChevronLeft size={12} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#44ACFF] uppercase">School Events</h1>
            <p className="text-neutral-500 font-medium">Schedule tours, festivals, and academic events.</p>
          </div>
          <button
            className="px-6 py-3 bg-[#44ACFF] text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#3b9ae0] transition-all shadow-sm flex items-center gap-2"
          >
            <Plus size={16} /> Schedule Event
          </button>
        </header>

        <div className="bg-white rounded-sm border border-neutral-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-neutral-200 rounded w-1/2 mx-auto"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/3 mx-auto"></div>
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 text-center">
              <CalIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-400 font-medium">No events scheduled yet</p>
              <p className="text-xs text-neutral-400 mt-1">Click "Schedule Event" to create your first event</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-neutral-50/50 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                    <th className="px-6 py-4">Event Details</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Capacity</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {events.map(event => (
                    <tr key={event.id} className="group hover:bg-neutral-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-sm overflow-hidden relative border border-neutral-100 flex-shrink-0 bg-neutral-50">
                            <img src={event.image || '/HBSlogo.png'} alt={event.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-neutral-900 uppercase tracking-tight">{event.title}</span>
                            <span className="text-[9px] font-bold text-[#ECB65F] uppercase tracking-widest">Upcoming</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold text-[#44ACFF] uppercase tracking-tight flex items-center gap-2">
                            <CalIcon size={12} /> {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                            <Clock size={12} /> {event.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-neutral-500 flex items-center gap-2">
                          <MapPin size={14} className="text-[#ECB65F]" /> {event.location}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-neutral-900">{event.rsvp_count || 0} / {event.capacity || '∞'}</span>
                          <div className="h-1 w-16 bg-neutral-100 rounded-sm overflow-hidden">
                            <div className="h-full bg-[#44ACFF]" style={{ width: `${Math.min(((event.rsvp_count || 0) / (event.capacity || 1)) * 100, 100)}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-neutral-400 hover:text-[#44ACFF] transition-colors"><Edit size={15} /></button>
                          <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}