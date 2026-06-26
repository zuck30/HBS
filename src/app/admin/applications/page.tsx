'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, Filter, ChevronLeft, ChevronRight, Download, Brain, Sparkles, User, Mail, Phone, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { deepseekRankCandidates } from '@/lib/deepseek';

export default function AdminApplications() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ranking, setRanking] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_applications')
      .select('*, jobs(title, description)')
      .order('created_at', { ascending: false });

    if (!error && data) setApps(data);
    setLoading(false);
  }

  const handleRank = async () => {
    if (apps.length === 0) return;
    setRanking(true);
    // In a real scenario, we'd group by job and rank
    // For this demo, we'll rank the selected job's candidates
    const jobApps = apps.filter(a => a.job_id === selectedApp?.job_id);
    const jobDesc = jobApps[0].jobs.description;

    try {
      const insights = await deepseekRankCandidates(jobDesc, jobApps);
      alert('Ranking complete! (Demo: AI insights would be saved to DB)');
    } catch (e) {
      alert('Ranking failed');
    }
    setRanking(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-2">
            <Link href="/admin" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#44ACFF] transition-colors mb-4">
               <ChevronLeft size={12} /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-[#44ACFF] uppercase">Job Applications</h1>
            <p className="text-neutral-500 font-medium">Review, parse, and rank candidates using DeepSeek AI.</p>
          </div>
          <button
            onClick={handleRank}
            disabled={ranking || !apps.length}
            className="px-8 py-4 bg-[#ECB65F] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#d4a04d] transition-all shadow-lg flex items-center gap-3 disabled:opacity-50"
          >
            <Brain size={18} className={ranking ? "animate-pulse" : ""} /> {ranking ? "Ranking..." : "Run AI Ranking"}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* List */}
           <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm flex items-center justify-between mb-2">
                 <div className="relative flex-1 max-w-sm">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                   <input type="text" placeholder="Search applicants..." className="w-full bg-neutral-50 border border-neutral-100 py-3 pl-12 pr-4 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#44ACFF]" />
                 </div>
                 <button className="p-3 text-neutral-400 hover:text-[#44ACFF] transition-all"><Filter size={18} /></button>
              </div>

              {loading ? (
                 <div className="space-y-4 animate-pulse">
                   {[1,2,3,4].map(i => <div key={i} className="h-24 bg-neutral-200 rounded-3xl" />)}
                 </div>
              ) : apps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={cn(
                    "bg-white p-6 rounded-[32px] border transition-all cursor-pointer flex items-center justify-between group",
                    selectedApp?.id === app.id ? "border-[#44ACFF] shadow-md shadow-[#44ACFF]/5" : "border-neutral-100 shadow-sm hover:border-neutral-300"
                  )}
                >
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-[#44ACFF] font-bold text-xs uppercase">
                        {app.full_name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-tight">{app.full_name}</h3>
                        <p className="text-[10px] font-bold text-[#44ACFF] uppercase tracking-widest">{app.jobs?.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                            <Calendar size={10} /> {new Date(app.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      {app.ai_score && (
                        <div className="flex flex-col items-end">
                          <span className={cn(
                            "text-lg font-bold",
                            app.ai_score >= 80 ? "text-emerald-500" : app.ai_score >= 60 ? "text-amber-500" : "text-red-500"
                          )}>{app.ai_score}%</span>
                          <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-tighter">AI Match</span>
                        </div>
                      )}
                      <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:text-[#44ACFF] transition-all">
                         <ChevronRight size={18} />
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Detail Panel */}
           <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                 {selectedApp ? (
                   <motion.div
                    key={selectedApp.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-[40px] border border-neutral-100 shadow-xl p-10 sticky top-12"
                   >
                      <div className="flex flex-col gap-8">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                               <div className="w-16 h-16 rounded-3xl bg-[#44ACFF] text-[#ECB65F] flex items-center justify-center text-xl font-bold uppercase">
                                 {selectedApp.full_name[0]}
                               </div>
                               <div className="flex flex-col">
                                 <h2 className="text-xl font-bold text-[#44ACFF] uppercase">{selectedApp.full_name}</h2>
                                 <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{selectedApp.jobs?.title}</span>
                               </div>
                            </div>
                            <button className="p-3 bg-neutral-50 text-neutral-400 rounded-2xl hover:text-[#44ACFF] transition-all">
                               <Download size={20} />
                            </button>
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div className="bg-neutral-50 p-4 rounded-2xl flex flex-col gap-1">
                               <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Email</span>
                               <span className="text-xs font-bold text-neutral-900 truncate">{selectedApp.email}</span>
                            </div>
                            <div className="bg-neutral-50 p-4 rounded-2xl flex flex-col gap-1">
                               <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Phone</span>
                               <span className="text-xs font-bold text-neutral-900">{selectedApp.phone}</span>
                            </div>
                         </div>

                         <div className="flex flex-col gap-4">
                            <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] border-b border-neutral-50 pb-2">Cover Letter</h4>
                            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                               {selectedApp.cover_letter || "No cover letter provided."}
                            </p>
                         </div>

                         {/* AI Insights Section */}
                         <div className="bg-[#44ACFF] p-8 rounded-[32px] text-white flex flex-col gap-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#ECB65F]/20 rounded-bl-3xl flex items-center justify-center">
                               <Sparkles size={20} className="text-[#ECB65F]" />
                            </div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ECB65F]">AI Candidate Analysis</h4>
                            {selectedApp.ai_score ? (
                              <div className="flex flex-col gap-4">
                                 <p className="text-xs text-blue-100/70 leading-relaxed font-medium">This candidate shows strong alignment with the pedagogical requirements. Previous experience in international schools is a key highlight.</p>
                                 <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                       <span>Pedagogy</span>
                                       <span>92%</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                       <div className="h-full bg-[#ECB65F]" style={{ width: '92%' }} />
                                    </div>
                                 </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-4 py-4 text-center">
                                 <p className="text-xs text-blue-100/70 font-medium">Run AI ranking to get detailed insights for this candidate.</p>
                                 <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all">Parse CV Now</button>
                              </div>
                            )}
                         </div>

                         <div className="flex gap-4">
                            <button className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">Shortlist</button>
                            <button className="flex-1 py-4 border border-neutral-100 text-red-400 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">Reject</button>
                         </div>
                      </div>
                   </motion.div>
                 ) : (
                   <div className="h-[600px] bg-white rounded-[40px] border border-dashed border-neutral-200 flex flex-col items-center justify-center p-12 text-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-300">
                         <User size={32} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-neutral-900 uppercase">No Applicant Selected</h3>
                        <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-[200px]">Select a candidate from the list to view their full application and AI insights.</p>
                      </div>
                   </div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}