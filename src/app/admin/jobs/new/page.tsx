'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Brain, ChevronLeft, Save, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { deepseekGenerateJobDescription } from '@/lib/deepseek';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewJob() {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
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
    setSaving(true);
    const { error } = await supabase.from('jobs').insert({
      ...formData,
      is_active: true
    });

    if (!error) {
      router.push('/admin/jobs');
    } else {
      alert('Error saving job');
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-[#44ACFF] selection:text-white pt-20">
      <div className="max-w-4xl mx-auto px-6">
        <header className="flex justify-between items-end mb-8">
          <div className="flex flex-col gap-2">
            <Link href="/admin/jobs" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#44ACFF] transition-colors">
               <ChevronLeft size={12} /> Back to Jobs
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#44ACFF] uppercase">New Job Posting</h1>
            <p className="text-neutral-500 font-medium">Create a new opportunity at Hannah Bennie Schools.</p>
          </div>
        </header>

        <form onSubmit={handleSave} className="bg-white p-8 rounded-sm border border-neutral-100 shadow-sm flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Job Title</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="e.g. Senior ICT Teacher"
                  className="w-full bg-neutral-50 border border-neutral-200 p-4 rounded-sm text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={generating}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#44ACFF] text-white rounded-sm hover:bg-[#ECB65F] transition-all"
                >
                  <Brain size={16} className={generating ? "animate-pulse" : ""} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Department</label>
              <select
                className="bg-neutral-50 border border-neutral-200 p-4 rounded-sm text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF] appearance-none"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Type</label>
              <select
                className="bg-neutral-50 border border-neutral-200 p-4 rounded-sm text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF] appearance-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Location</label>
              <input
                type="text"
                className="bg-neutral-50 border border-neutral-200 p-4 rounded-sm text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Salary Range</label>
              <input
                type="text"
                placeholder="e.g. 1.2M - 1.8M TZS"
                className="bg-neutral-50 border border-neutral-200 p-4 rounded-sm text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                value={formData.salary_range}
                onChange={e => setFormData({...formData, salary_range: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Full Job Description</label>
            <textarea
              required
              rows={10}
              className="bg-neutral-50 border border-neutral-200 p-6 rounded-sm text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#44ACFF] resize-none leading-relaxed"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Application Deadline</label>
            <input
              required
              type="date"
              className="bg-neutral-50 border border-neutral-200 p-4 rounded-sm text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
              value={formData.deadline}
              onChange={e => setFormData({...formData, deadline: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-[#44ACFF] text-white rounded-sm font-bold uppercase tracking-widest hover:bg-[#ECB65F] transition-all shadow-sm flex items-center justify-center gap-3"
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Publish Job Posting'}
          </button>
        </form>
      </div>
    </div>
  );
}