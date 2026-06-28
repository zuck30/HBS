'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Briefcase,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
    blogs: 0,
    events: 0
  });
  const [recentApps, setRecentApps] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentApplications();
  }, []);

  async function fetchStats() {
    const [jobs, apps, blogs, events] = await Promise.all([
      supabase.from('jobs').select('id', { count: 'exact' }),
      supabase.from('job_applications').select('id', { count: 'exact' }),
      supabase.from('blog_posts').select('id', { count: 'exact' }),
      supabase.from('events').select('id', { count: 'exact' })
    ]);

    setStats({
      jobs: jobs.count || 0,
      applications: apps.count || 0,
      blogs: blogs.count || 0,
      events: events.count || 0
    });
  }

  async function fetchRecentApplications() {
    const { data, error } = await supabase
      .from('job_applications')
      .select('id, full_name, email, ai_score, jobs(title)')
      .order('created_at', { ascending: false })
      .limit(5);

    if (!error && data) {
      setRecentApps(data);
    }
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin', active: true },
    { name: 'Blog Posts', icon: FileText, href: '/admin/blogs' },
    { name: 'Events', icon: Calendar, href: '/admin/events' },
    { name: 'Job Postings', icon: Briefcase, href: '/admin/jobs' },
    { name: 'Applications', icon: Users, href: '/admin/applications' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans selection:bg-[#44ACFF] selection:text-white pt-20">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-neutral-200 flex flex-col flex-shrink-0 h-[calc(100vh-5rem)] sticky top-20">
        <div className="p-8 border-b border-neutral-100 flex items-center gap-3">
          <img src="/HBSlogo.png" alt="HBS" className="w-10 h-10" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#44ACFF] uppercase tracking-widest">HBS Admin</span>
            <span className="text-[10px] text-neutral-400 font-bold uppercase">Control Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-6 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-sm text-sm font-bold transition-all ${
                item.active ? "bg-[#44ACFF] text-white shadow-sm" : "text-neutral-500 hover:bg-neutral-50 hover:text-[#44ACFF]"
              }`}
            >
              <item.icon size={18} />
              {item.name}
              {item.active && <ChevronRight size={14} className="ml-auto opacity-50" />}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-neutral-100">
          <button className="flex items-center gap-4 px-4 py-3 w-full rounded-sm text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-x-hidden">
        <header className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-[#44ACFF] uppercase">Dashboard Overview</h1>
            <p className="text-neutral-500 font-medium">Welcome back, Administrator. Here is what is happening today.</p>
          </div>
          <div className="flex gap-4">
             <Link href="/admin/blogs/new" className="px-6 py-3 bg-white border border-neutral-200 text-[#44ACFF] rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all flex items-center gap-2">
               <Plus size={16} /> New Post
             </Link>
             <Link href="/admin/jobs/new" className="px-6 py-3 bg-[#44ACFF] text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#3b9ae0] transition-all shadow-sm flex items-center gap-2">
               <Plus size={16} /> Create Job
             </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
           {[
             { label: 'Active Jobs', value: stats.jobs, icon: Briefcase, color: 'bg-blue-500' },
             { label: 'Total Applications', value: stats.applications, icon: Users, color: 'bg-emerald-500' },
             { label: 'Blog Posts', value: stats.blogs, icon: FileText, color: 'bg-amber-500' },
             { label: 'Events', value: stats.events, icon: Calendar, color: 'bg-purple-500' }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-sm border border-neutral-100 shadow-sm flex flex-col gap-4">
               <div className="flex justify-between items-start">
                 <div className={`w-12 h-12 rounded-sm flex items-center justify-center text-white ${stat.color}`}>
                   <stat.icon size={20} />
                 </div>
               </div>
               <div className="flex flex-col mt-2">
                 <span className="text-3xl font-bold text-[#44ACFF]">{stat.value}</span>
                 <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</span>
               </div>
             </div>
           ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-sm border border-neutral-100 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-neutral-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#44ACFF] uppercase tracking-widest">Recent Applications</h3>
              <Link href="/admin/applications" className="text-[10px] font-bold text-[#ECB65F] uppercase tracking-widest hover:underline">View All</Link>
           </div>
           <div className="p-0 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-neutral-50/50 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                    <th className="px-8 py-4">Applicant</th>
                    <th className="px-8 py-4">Position</th>
                    <th className="px-8 py-4">AI Score</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {recentApps.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-8 text-center text-sm text-neutral-400">
                        No recent applications found.
                      </td>
                    </tr>
                  ) : (
                    recentApps.map(app => (
                      <tr key={app.id} className="group hover:bg-neutral-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-sm bg-[#44ACFF]/5 flex items-center justify-center text-[10px] font-bold text-[#44ACFF]">
                              {app.full_name?.substring(0, 2).toUpperCase() || 'NA'}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-neutral-900">{app.full_name}</span>
                              <span className="text-[10px] text-neutral-400">{app.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs font-bold text-[#44ACFF] uppercase tracking-tight">
                            {app.jobs?.title || 'Unknown Position'}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                           <div className="flex items-center gap-2">
                             <div className="flex-1 h-1.5 w-16 bg-neutral-100 rounded-sm overflow-hidden">
                               <div className="h-full bg-emerald-500" style={{ width: `${app.ai_score || 0}%` }} />
                             </div>
                             <span className="text-[10px] font-bold text-emerald-500">{app.ai_score || 0}%</span>
                           </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="text-neutral-400 hover:text-[#44ACFF] transition-colors"><ArrowUpRight size={16} /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
           </div>
        </div>
      </main>
    </div>
  );
}