'use client';
import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Brain, CheckCircle, XCircle, BarChart2, Users, FileText, Calendar } from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blogs')

  return (
    <div className="font-mono min-h-screen bg-neutral-50 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold uppercase italic tracking-tighter">HBS Admin</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Management & Analytics Dashboard</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-neutral-950 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Entry
            </button>
          </div>
        </div>

        <div className="flex gap-8 mb-12 border-b border-neutral-200">
          {[
            { id: 'blogs', label: 'Blogs', icon: FileText },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'careers', label: 'Careers', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all border-b-2 ${
                activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'careers' && <CareersManager />}
        {activeTab === 'blogs' && <DefaultManager type="Blogs" />}
        {activeTab === 'events' && <DefaultManager type="Events" />}
        {activeTab === 'analytics' && <AnalyticsPlaceholder />}
      </div>
    </div>
  )
}

function CareersManager() {
  const jobs = [
    { title: 'Senior Accountant', applicants: 12, status: 'Active' },
    { title: 'Primary Teacher (Science)', applicants: 45, status: 'Active' },
    { title: 'School Nurse', applicants: 8, status: 'Draft' },
  ]

  const applicants = [
    { name: 'John Doe', job: 'Senior Accountant', score: 92, status: 'Top Match' },
    { name: 'Sarah Smith', job: 'Senior Accountant', score: 85, status: 'Strong' },
    { name: 'Michael Brown', job: 'Science Teacher', score: 78, status: 'Reviewed' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white border border-neutral-200">
          <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest">Active Job Postings</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-neutral-50 rounded"><Brain className="w-4 h-4 text-neutral-400" /></button>
            </div>
          </div>
          <div className="divide-y divide-neutral-100">
            {jobs.map((job, i) => (
              <div key={i} className="p-6 flex justify-between items-center group">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-tight mb-1">{job.title}</h4>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{job.applicants} Applicants · {job.status}</p>
                </div>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">Edit</button>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-neutral-200">
          <div className="p-6 border-b border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-widest">Recent Applications</h3>
          </div>
          <div className="divide-y divide-neutral-100">
            {applicants.map((app, i) => (
              <div key={i} className="p-6 flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 flex items-center justify-center font-bold italic tracking-tighter border ${
                    app.score >= 90 ? 'bg-black text-white' : 'bg-neutral-50 text-neutral-400'
                  }`}>
                    {app.score}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tight mb-1">{app.name}</h4>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{app.job}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-bold uppercase tracking-widest mb-2 px-2 py-1 border border-neutral-100 inline-block">
                    {app.status}
                  </div>
                  <div className="flex gap-4">
                    <button className="text-[10px] font-bold uppercase tracking-widest hover:underline">View CV</button>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:underline">Analyze</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-neutral-950 text-white p-8">
          <Brain className="w-8 h-8 mb-6 text-neutral-500" />
          <h3 className="text-xl font-bold uppercase italic tracking-tighter leading-none mb-4">AI Recruiter Insights</h3>
          <p className="text-xs text-neutral-400 font-sans normal-case leading-relaxed mb-8">
            The candidate "John Doe" ranks in the top 1% for the Senior Accountant role. Analysis shows 10+ years experience in TFRS compliant reporting and school finance management.
          </p>
          <button className="w-full py-4 border border-neutral-800 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Generate Interview Guide
          </button>
        </div>

        <div className="bg-white border border-neutral-200 p-8 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest">Moderators</h3>
          <div className="space-y-4">
            {['Admin Alice', 'Mod Mark', 'Recruiter Rose'].map((mod, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-[11px] font-bold uppercase tracking-widest">{mod}</span>
                <span className="text-[9px] text-neutral-400 border border-neutral-100 px-2 py-0.5 uppercase tracking-widest">Active</span>
              </div>
            ))}
            <button className="w-full py-3 mt-4 border border-dashed border-neutral-200 text-[9px] font-bold uppercase tracking-widest text-neutral-400 hover:border-black hover:text-black transition-colors">
              + Add Moderator
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DefaultManager({ type }: { type: string }) {
  return (
    <div className="bg-white border border-neutral-200 p-12 text-center space-y-6">
      <div className="w-16 h-16 bg-neutral-50 border border-neutral-100 flex items-center justify-center mx-auto">
        <FileText className="w-6 h-6 text-neutral-300" />
      </div>
      <div>
        <h3 className="text-xl font-bold uppercase italic tracking-tighter leading-none mb-2">{type} Management</h3>
        <p className="text-xs text-neutral-400 font-sans normal-case">Post new {type.toLowerCase()} entries, edit existing ones, and view engagement analytics.</p>
      </div>
      <button className="px-8 py-3 bg-neutral-950 text-white text-[10px] font-bold uppercase tracking-widest">Create First {type}</button>
    </div>
  )
}

function AnalyticsPlaceholder() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { label: 'Total Visits', value: '14.2k', change: '+12%' },
        { label: 'Job Applications', value: '156', change: '+24%' },
        { label: 'Inquiries', value: '89', change: '+5%' },
      ].map((stat, i) => (
        <div key={i} className="bg-white border border-neutral-200 p-8 space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{stat.label}</div>
          <div className="flex justify-between items-end">
            <div className="text-4xl font-bold italic tracking-tighter leading-none">{stat.value}</div>
            <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{stat.change}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
