'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, profiles(full_name)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="pt-16 bg-[#f6f5f1] min-h-screen font-sans">
      <section className="py-24 px-6 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl flex flex-col gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F]">JOURNAL</span>
            <h1 className="text-4xl md:text-7xl font-bold text-[#44ACFF] uppercase leading-[0.9]">
              What is happening at HBS.
            </h1>
          </div>
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-neutral-50 border border-neutral-200 py-4 pl-14 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-pulse">
               {[1,2,3].map(i => <div key={i} className="h-96 bg-neutral-200" />)}
             </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {filteredPosts.map((post) => (
                <Link
                  href={`/blog/${post.id}`}
                  key={post.id}
                  className="flex flex-col bg-white border border-neutral-200 shadow-sm group hover:border-[#ECB65F] transition-all"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {post.featured_image ? (
                      <Image src={post.featured_image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-[#44ACFF]/5 flex items-center justify-center">
                        <Image src="/HBSlogo.png" alt="HBS" width={80} height={80} className="opacity-20" />
                      </div>
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="bg-[#ECB65F] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                        {post.category || 'School Life'}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col gap-6 flex-1">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(post.published_at).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 5 min read</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#44ACFF] group-hover:text-[#ECB65F] transition-colors line-clamp-2 uppercase">
                        {post.title}
                      </h3>
                    </div>
                    <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#44ACFF]/10 flex items-center justify-center">
                          <User className="w-3 h-3 text-[#44ACFF]" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#44ACFF]">{post.profiles?.full_name || 'HBS Admin'}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#ECB65F] transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
               <p className="text-neutral-500 font-bold uppercase tracking-widest">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}