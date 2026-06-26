'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Brain, ChevronLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { deepseekGenerateJobDescription } from '@/lib/deepseek';

export default function AdminJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: 'Teaching',
    type: 'Full-time',
    location: 'Dar es Salaam',
    salary_range: '',
    description: '',
    requirements: '',
    responsibilities: '',
    deadline: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setJobs(data);
    setLoading(false);
  }

  const handleGenerateDescription = async () => {
    if (!formData.title) return alert('Enter a job title first');
    setGenerating(true);
    try {
      const desc = await deepseekGenerateJobDescription(formData.title);
      setFormData({ ...formData, description: desc });
    } catch (e) {
      alert('Failed to generate description');
    }
    setGenerating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('jobs').insert({
      ...formData,
      is_active: true
    });

    if (!error) {
      setIsAdding(false);
      fetchJobs();
    } else {
      alert('Error saving job');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-2">
            <Link href="/admin" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#44ACFF] transition-colors mb-4">
               <ChevronLeft size={12} /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-[#44ACFF] uppercase">Job Postings</h1>
            <p className="text-neutral-500 font-medium">Manage and create AI-powered job listings for HBS.</p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="px-8 py-4 bg-[#44ACFF] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#3b9ae0] transition-all shadow-lg flex items-center gap-3"
          >
            <Plus size={18} /> Post New Job
          </button>
        </header>

        {/* Filters */}
        <div className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm mb-8 flex items-center justify-between">
           <div className="flex items-center gap-6 flex-1">
             <div className="relative flex-1 max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
               <input type="text" placeholder="Search postings..." className="w-full bg-neutral-50 border border-neutral-100 py-3 pl-12 pr-4 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#44ACFF]" />
             </div>
             <button className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest hover:text-[#44ACFF] transition-colors">
               <Filter size={16} /> Filters
             </button>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mr-4">Showing {jobs.length} Results</span>
           </div>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 gap-6">
           {loading ? (
             <div className="animate-pulse space-y-4">
                {[1,2,3].map(i => <div key={i} className="h-24 bg-neutral-200 rounded-3xl" />)}
             </div>
           ) : jobs.map((job) => (
             <div key={job.id} className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm flex items-center justify-between group hover:border-[#44ACFF] transition-all">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 rounded-2xl bg-[#44ACFF]/5 flex items-center justify-center text-[#44ACFF]">
                      <Briefcase size={24} />
                   </div>
                   <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">{job.title}</h3>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase tracking-widest border border-emerald-100">Active</span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        <span>{job.department}</span>
                        <span className="w-1 h-1 bg-neutral-200 rounded-full" />
                        <span>{job.type}</span>
                        <span className="w-1 h-1 bg-neutral-200 rounded-full" />
                        <span>{job.location}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="flex flex-col items-center gap-1">
                      <span className="text-xl font-bold text-[#44ACFF]">12</span>
                      <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Applications</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="p-3 text-neutral-400 hover:text-[#44ACFF] hover:bg-[#44ACFF]/5 rounded-xl transition-all"><Edit size={18} /></button>
                      <button className="p-3 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Modal Add Job */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#44ACFF]/20 backdrop-blur-sm overflow-y-auto">
           <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl relative my-auto"
           >
              <div className="p-10 border-b border-neutral-50 flex justify-between items-center">
                 <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-[#44ACFF] uppercase">Create Job Posting</h2>
                    <p className="text-xs font-medium text-neutral-400">Fill in the details or use AI to generate the description.</p>
                 </div>
                 <button onClick={() => setIsAdding(false)} className="text-neutral-400 hover:text-black font-bold uppercase text-[10px] tracking-widest">Cancel [X]</button>
              </div>

              <form onSubmit={handleSave} className="p-10 flex flex-col gap-8 max-h-[70vh] overflow-y-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Job Title</label>
                       <div className="relative">
                        <input
                          required
                          type="text"
                          placeholder="e.g. Senior ICT Teacher"
                          className="w-full bg-neutral-50 border border-neutral-100 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                          value={formData.title}
                          onChange={e => setFormData({...formData, title: e.target.value})}
                        />
                        <button
                          type="button"
                          onClick={handleGenerateDescription}
                          disabled={generating}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#44ACFF] text-white rounded-xl hover:bg-[#ECB65F] transition-all disabled:opacity-50"
                          title="Generate description with AI"
                        >
                          <Brain size={16} className={generating ? "animate-pulse" : ""} />
                        </button>
                       </div>
                    </div>
                    <div className="flex flex-col gap-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Department</label>
                       <select
                        className="bg-neutral-50 border border-neutral-100 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                        value={formData.department}
                        onChange={e => setFormData({...formData, department: e.target.value})}
                       >
                         <option>Teaching</option>
                         <option>Finance</option>
                         <option>HR</option>
                         <option>ICT</option>
                         <option>Transport</option>
                         <option>Security</option>
                         <option>Facilities</option>
                         <option>Welfare</option>
                         <option>Other</option>
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Type</label>
                       <select
                        className="bg-neutral-50 border border-neutral-100 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                       >
                         <option>Full-time</option>
                         <option>Part-time</option>
                         <option>Contract</option>
                       </select>
                    </div>
                    <div className="flex flex-col gap-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Location</label>
                       <input
                        type="text"
                        className="bg-neutral-50 border border-neutral-100 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                       />
                    </div>
                    <div className="flex flex-col gap-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Salary Range (Optional)</label>
                       <input
                        type="text"
                        placeholder="e.g. 1.2M - 1.8M TZS"
                        className="bg-neutral-50 border border-neutral-100 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                        value={formData.salary_range}
                        onChange={e => setFormData({...formData, salary_range: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Description</label>
                    <textarea
                      required
                      rows={8}
                      className="bg-neutral-50 border border-neutral-100 p-6 rounded-3xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#44ACFF] resize-none leading-relaxed"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                 </div>

                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Application Deadline</label>
                    <input
                      required
                      type="date"
                      className="bg-neutral-50 border border-neutral-100 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                      value={formData.deadline}
                      onChange={e => setFormData({...formData, deadline: e.target.value})}
                    />
                 </div>

                 <button
                  type="submit"
                  className="w-full py-6 bg-[#44ACFF] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#ECB65F] transition-all shadow-xl shadow-[#44ACFF]/20"
                 >
                   Publish Job Posting
                 </button>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
}

import Link from 'next/link';
import { Briefcase as BriefcaseIcon } from 'lucide-react';

function Briefcase({ size }: { size: number }) {
  return <BriefcaseIcon size={size} />;
}