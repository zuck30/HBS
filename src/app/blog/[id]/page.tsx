'use client';
import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ChevronLeft, Share2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, profiles(full_name)')
      .eq('id', id)
      .single();

    if (!error && data) {
      setPost(data);
      // Increment views
      await supabase.from('blog_posts').update({ views: (data.views || 0) + 1 }).eq('id', id);
    }
    setLoading(false);
  }

  if (loading) return <div className="min-h-screen pt-32 px-6 flex justify-center">Loading...</div>;
  if (!post) return <div className="min-h-screen pt-32 px-6 flex justify-center">Post not found.</div>;

  return (
    <main className="pt-16 bg-white min-h-screen font-sans">
      <article className="max-w-4xl mx-auto py-24 px-6">
        <Link href="/blog" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#44ACFF] transition-colors mb-12">
          <ChevronLeft size={12} /> Back to Journal
        </Link>

        <header className="flex flex-col gap-8 mb-16">
          <div className="flex items-center gap-4">
            <span className="bg-[#ECB65F] text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
              {post.category || 'School Life'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#44ACFF] uppercase leading-[1.1]">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#44ACFF] text-[#ECB65F] flex items-center justify-center text-xs font-bold uppercase">
                {post.profiles?.full_name?.[0] || 'A'}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Author</span>
                <span className="text-xs font-bold text-[#44ACFF]">{post.profiles?.full_name || 'HBS Admin'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400">
                <Calendar size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Published</span>
                <span className="text-xs font-bold text-[#44ACFF]">{new Date(post.published_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400">
                <Clock size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Read Time</span>
                <span className="text-xs font-bold text-[#44ACFF]">5 min read</span>
              </div>
            </div>
          </div>
        </header>

        {post.featured_image && (
          <div className="relative aspect-video rounded-[60px] overflow-hidden mb-16 shadow-2xl">
            <Image src={post.featured_image} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:text-[#44ACFF] prose-headings:uppercase prose-p:text-neutral-600 prose-p:leading-relaxed font-medium">
           <div className="whitespace-pre-wrap">{post.content}</div>
        </div>

        <footer className="mt-24 pt-12 border-t border-neutral-100 flex justify-between items-center">
           <div className="flex gap-4">
             {post.tags?.map((tag: string) => (
               <span key={tag} className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">#{tag}</span>
             ))}
           </div>
           <button className="flex items-center gap-2 text-xs font-bold text-[#ECB65F] uppercase tracking-widest hover:text-[#44ACFF] transition-colors">
              <Share2 size={16} /> Share Article
           </button>
        </footer>
      </article>
    </main>
  );
}