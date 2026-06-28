'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, ChevronLeft, Eye, LayoutGrid, List } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminBlogs() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setPosts(data);
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
            <h1 className="text-3xl md:text-4xl font-bold text-[#44ACFF] uppercase">Blog Management</h1>
            <p className="text-neutral-500 font-medium">Create and manage HBS news and articles.</p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="px-6 py-3 bg-[#44ACFF] text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#3b9ae0] transition-all shadow-sm flex items-center gap-2"
          >
            <Plus size={16} /> New Article
          </Link>
        </header>

        <div className="bg-white p-4 rounded-sm border border-neutral-100 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 w-full">
             <div className="relative flex-1 w-full sm:max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
               <input type="text" placeholder="Search articles..." className="w-full bg-neutral-50 border border-neutral-200 py-2.5 pl-10 pr-4 rounded-sm text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#44ACFF]" />
             </div>
             <div className="hidden sm:block h-8 w-px bg-neutral-200" />
             <div className="flex bg-neutral-50 p-1 rounded-sm">
                <button className="p-2 bg-white rounded-sm shadow-sm text-[#44ACFF]"><LayoutGrid size={14} /></button>
                <button className="p-2 text-neutral-400 hover:text-[#44ACFF] transition-colors"><List size={14} /></button>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{posts.length} Articles Total</span>
           </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
             {[1,2,3].map(i => <div key={i} className="h-80 bg-neutral-200 rounded-sm" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-sm overflow-hidden border border-neutral-100 shadow-sm flex flex-col group">
                 <div className="relative aspect-video overflow-hidden bg-neutral-50">
                    {post.featured_image ? (
                       <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center">
                          <img src="/HBSlogo.png" alt="HBS" className="w-16 h-16 opacity-20" />
                       </div>
                    )}
                    <div className="absolute top-4 left-4">
                       <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm border shadow-sm backdrop-blur-md ${
                         post.status === 'published' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                       }`}>
                         {post.status}
                       </span>
                    </div>
                 </div>
                 <div className="p-6 flex flex-col gap-3 flex-1">
                    <span className="text-[9px] font-bold text-[#ECB65F] uppercase tracking-widest">{post.category || 'School News'}</span>
                    <h3 className="text-base font-bold text-[#44ACFF] uppercase tracking-tight line-clamp-2">{post.title}</h3>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-neutral-50">
                       <div className="flex items-center gap-4">
                          <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5"><Eye size={12} /> {post.views || 0} Views</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-1">
                          <button className="p-2 text-neutral-400 hover:text-[#44ACFF] transition-colors"><Edit size={15} /></button>
                          <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}