'use client';
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BlogsPage() {
  const blogs = [
    { title: 'Welcome to Term 2', category: 'Admissions', date: 'May 2026', image: '/public/assets/school-1.png' },
    { title: 'Top 10 Nation-wide Achievement', category: 'Achievement', date: 'Jan 2024', image: '/public/assets/shot.png' },
    { title: 'Now Hiring: Senior Accountant', category: 'Careers', date: 'Recent', image: '/public/assets/practical-hands-on.png' }
  ]

  return (
    <div className="font-mono pt-20">
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-8">HBS Blog</div>
            <h1 className="text-5xl lg:text-7xl font-bold uppercase italic tracking-tighter leading-none mb-10">
              Latest news & stories from HBS.
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <div key={i} className="bg-white border border-neutral-200 group cursor-pointer overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img src={blog.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  <span>{blog.category}</span>
                  <span>{blog.date}</span>
                </div>
                <h4 className="text-xl font-bold uppercase italic tracking-tighter leading-tight group-hover:underline">{blog.title}</h4>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest pt-4">
                  Read story <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
