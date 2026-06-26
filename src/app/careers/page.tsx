'use client';
import React, { useState } from 'react'
import { ArrowRight, Send, Brain, Upload, CheckCircle2 } from 'lucide-react'

export default function CareersPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobTitle, setJobTitle] = useState('')

  const steps = [
    { title: 'Prepare documents', desc: 'Cover letter, CV, certified copies of certificates, contacts of three referees, and a valid Certificate of Good Conduct.' },
    { title: 'Indicate position', desc: 'In the email subject line, write the department code and position title — for example: "B6 — Senior Accountant".' },
    { title: 'Email application', desc: 'Send everything as PDF attachments to hr.hbs.tz@gmail.com. Applications are accepted by email only.' }
  ]

  return (
    <div className="font-mono pt-20">
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-8">Careers at HBS</div>
              <h1 className="text-5xl lg:text-7xl font-bold uppercase italic tracking-tighter leading-none mb-10">
                Join our team. Help us build a world-class school.
              </h1>
              <p className="text-lg text-neutral-600 font-sans leading-relaxed normal-case max-w-xl">
                We're recruiting across nine departments — teaching, finance, HR, ICT, transport, security, facilities and welfare. Open until filled.
              </p>
            </div>
            <div className="bg-neutral-50 p-12 border border-neutral-200 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Application contact</div>
                <div className="text-2xl font-bold italic tracking-tighter uppercase leading-none underline">hr.hbs.tz@gmail.com</div>
                <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest leading-relaxed">
                  Applications are accepted strictly by email. No paper applications. No in-person visits or phone calls regarding job enquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-32 bg-neutral-950 text-white border-y border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-20">Application Process</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
            {steps.map((step, i) => (
              <div key={i} className="bg-neutral-950 p-12 space-y-6">
                <div className="text-4xl font-bold italic tracking-tighter text-neutral-800">0{i+1}</div>
                <h4 className="text-xl font-bold uppercase italic tracking-tighter leading-none">{step.title}</h4>
                <p className="text-xs text-neutral-400 font-sans normal-case leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form / AI Integration Placeholder */}
      <section className="px-6 py-32 bg-white">
        <div className="max-w-3xl mx-auto border border-neutral-200 p-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold uppercase italic tracking-tighter leading-none">Submit your CV for future roles</h2>
            <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Our AI will match your profile with upcoming openings</p>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest">Full Name</label>
                <input type="text" className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest">Email Address</label>
                <input type="email" className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest">Department of interest</label>
              <select className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none">
                <option>Teaching</option>
                <option>Finance</option>
                <option>HR & Admin</option>
                <option>ICT</option>
                <option>Transport</option>
                <option>Security</option>
                <option>Facilities</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest">Upload CV (PDF Only)</label>
              <div className="border-2 border-dashed border-neutral-200 p-12 text-center space-y-4 hover:border-black transition-colors cursor-pointer group">
                <Upload className="w-8 h-8 mx-auto text-neutral-300 group-hover:text-black transition-colors" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors">Click to upload or drag and drop</p>
              </div>
            </div>

            <button className="w-full py-5 bg-neutral-950 text-white font-bold uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3">
              Submit Application <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
