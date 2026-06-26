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
    <div className="min-h-screen bg-[#f8f9fa] p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-2">
            <Link href="/admin" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#000080] transition-colors mb-4">
               <ChevronLeft size={12} /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-[#000080] uppercase">Blog Management</h1>
            <p className="text-neutral-500 font-medium">Create and manage HBS news and articles.</p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="px-8 py-4 bg-[#000080] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#000060] transition-all shadow-lg flex items-center gap-3"
          >
            <Plus size={18} /> New Article
          </Link>
        </header>

        <div className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm mb-8 flex items-center justify-between">
           <div className="flex items-center gap-6 flex-1">
             <div className="relative flex-1 max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
               <input type="text" placeholder="Search articles..." className="w-full bg-neutral-50 border border-neutral-100 py-3 pl-12 pr-4 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#000080]" />
             </div>
             <div className="h-8 w-px bg-neutral-100 mx-2" />
             <div className="flex bg-neutral-50 p-1 rounded-xl">
                <button className="p-2 bg-white rounded-lg shadow-sm text-[#000080]"><LayoutGrid size={16} /></button>
                <button className="p-2 text-neutral-400 hover:text-[#000080] transition-colors"><List size={16} /></button>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mr-4">{posts.length} Articles Total</span>
           </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
             {[1,2,3].map(i => <div key={i} className="h-80 bg-neutral-200 rounded-[40px]" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-[40px] overflow-hidden border border-neutral-100 shadow-sm flex flex-col group">
                 <div className="relative aspect-video overflow-hidden">
                    {post.featured_image ? (
                       <Image src={post.featured_image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                       <div className="w-full h-full bg-[#000080]/5 flex items-center justify-center">
                          <Image src="/HBSlogo.png" alt="HBS" width={60} height={60} className="opacity-20" />
                       </div>
                    )}
                    <div className="absolute top-6 left-6">
                       <span className={cn(
                         "px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full border shadow-sm backdrop-blur-md",
                         post.status === 'published' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                       )}>
                         {post.status}
                       </span>
                    </div>
                 </div>
                 <div className="p-8 flex flex-col gap-4 flex-1">
                    <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">{post.category || 'School News'}</span>
                    <h3 className="text-lg font-bold text-[#000080] uppercase tracking-tight line-clamp-2">{post.title}</h3>
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-neutral-50">
                       <div className="flex items-center gap-4">
                          <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5"><Eye size={12} /> {post.views} Views</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <button className="p-2 text-neutral-400 hover:text-[#000080] transition-colors"><Edit size={16} /></button>
                          <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}