'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Save, Image as ImageIcon, Type, Layout, Tag } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewBlogPost() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'School News',
    tags: [] as string[],
    status: 'draft',
    featured_image: ''
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('blog_posts').insert({
      ...formData,
      published_at: formData.status === 'published' ? new Date().toISOString() : null
    });

    if (!error) {
      router.push('/admin/blogs');
    } else {
      alert('Error saving post');
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-2">
            <Link href="/admin/blogs" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#44ACFF] transition-colors mb-4">
               <ChevronLeft size={12} /> Back to Articles
            </Link>
            <h1 className="text-4xl font-bold text-[#44ACFF] uppercase">New Article</h1>
            <p className="text-neutral-500 font-medium">Share what's happening at Hannah Bennie Schools.</p>
          </div>
        </header>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-neutral-100 flex flex-col gap-8">
                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Article Title</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. HBS Ranks No.1 in NECTA 2024"
                      className="w-full bg-neutral-50 border border-neutral-100 p-5 rounded-2xl text-xl font-bold text-[#44ACFF] focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                 </div>
                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Content</label>
                    <textarea
                      required
                      rows={20}
                      placeholder="Write your article here..."
                      className="w-full bg-neutral-50 border border-neutral-100 p-8 rounded-3xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#44ACFF] resize-none leading-relaxed"
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                    />
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-neutral-100 flex flex-col gap-8">
                 <h3 className="text-sm font-bold text-[#44ACFF] uppercase tracking-widest border-b border-neutral-50 pb-4">Publishing Options</h3>

                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Status</label>
                    <select
                      className="bg-neutral-50 border border-neutral-100 p-4 rounded-2xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF] appearance-none"
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value})}
                    >
                       <option value="draft">Draft</option>
                       <option value="published">Published</option>
                    </select>
                 </div>

                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Category</label>
                    <select
                      className="bg-neutral-50 border border-neutral-100 p-4 rounded-2xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF] appearance-none"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                       <option>School News</option>
                       <option>Achievements</option>
                       <option>Events</option>
                       <option>Life at HBS</option>
                       <option>Academics</option>
                    </select>
                 </div>

                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Featured Image URL</label>
                    <div className="relative">
                       <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 w-4 h-4" />
                       <input
                         type="text"
                         placeholder="https://..."
                         className="w-full bg-neutral-50 border border-neutral-100 py-4 pl-12 pr-6 rounded-2xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                         value={formData.featured_image}
                         onChange={e => setFormData({...formData, featured_image: e.target.value})}
                       />
                    </div>
                 </div>

                 <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-5 bg-[#44ACFF] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#ECB65F] transition-all shadow-xl shadow-[#44ACFF]/20 flex items-center justify-center gap-3"
                 >
                   <Save size={18} /> {saving ? 'Saving...' : 'Save Article'}
                 </button>
              </div>
           </div>
        </form>
      </div>
    </div>
  );
}