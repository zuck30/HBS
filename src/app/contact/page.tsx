'use client';
import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'

export default function ContactPage() {
  const faqs = [
    { q: 'How do I apply?', a: 'Start by sending an enquiry through the form above or by calling our office. We\'ll invite your child for a friendly assessment visit, then guide you through registration and the documents we need.' },
    { q: 'What is your fee structure?', a: 'Fees vary by programme and by day or boarding place. Our admissions team will share a current fee schedule and any available payment plans during your enquiry — just let us know which programme you\'re interested in.' },
    { q: 'Do you offer boarding?', a: 'Yes. We offer comfortable, supervised boarding with cosy dormitories, balanced meals, and structured study time — alongside our day options. Boarding helps build independence in a safe, home-like setting.' },
    { q: 'What ages do you accept?', a: 'We welcome children from 18 months in our Toddler Class through to 14 years in Primary School, across four programmes: Toddler Class, Pre-school, Primary School, and Enrichment activities.' },
    { q: 'Can I visit before applying?', a: 'Absolutely and we encourage it. Book a visit and you\'ll meet our teachers and walk through the classrooms, library, and play spaces. Seeing a school day in person is the best way to decide if HBS is right for your family.' }
  ]

  return (
    <div className="font-mono pt-20">
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic mb-8">Contact HBS</div>
            <h1 className="text-5xl lg:text-7xl font-bold uppercase italic tracking-tighter leading-none mb-10">
              Let's talk — we'd love to meet your family.
            </h1>
            <p className="text-lg text-neutral-600 font-sans leading-relaxed normal-case max-w-xl">
              Book a visit, ask a question, or apply for admission.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-32 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-black" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Visit us</h4>
                </div>
                <p className="text-sm text-neutral-600 font-sans normal-case leading-relaxed">
                  140 Kimbiji Road, 17106 Mji Mwema,<br />Dar es Salaam, Tanzania.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:gap-4 transition-all">
                  View on Google Maps <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-black" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Call us</h4>
                </div>
                <div className="text-sm text-neutral-600 font-sans normal-case leading-relaxed space-y-1">
                  <div>+255 762 224 224</div>
                  <div>+255 627 30 10 10</div>
                  <div>+255 765 001 001</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-black" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Email us</h4>
                </div>
                <div className="text-sm text-neutral-600 font-sans normal-case leading-relaxed">
                  hbs.admin@hbs.ac.tz
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-black" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Office hours</h4>
                </div>
                <div className="text-sm text-neutral-600 font-sans normal-case leading-relaxed space-y-1">
                  <div className="flex justify-between"><span>Mon – Fri</span> <span>7:30 – 17:00</span></div>
                  <div className="flex justify-between"><span>Sat</span> <span>8:00 – 13:00</span></div>
                  <div className="flex justify-between text-neutral-400"><span>Sun</span> <span>Closed</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 p-12 space-y-8">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Send us an enquiry</div>
            <form className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <input type="text" placeholder="First Name" className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="Last Name" className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
              <input type="email" placeholder="Email" className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
              <input type="tel" placeholder="Phone" className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
              <select className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none">
                <option>Reason for enquiry...</option>
                <option>Admissions</option>
                <option>Visit / Tour</option>
                <option>Careers</option>
                <option>General Question</option>
              </select>
              <textarea placeholder="Message" rows={4} className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"></textarea>
              <button className="w-full py-5 bg-neutral-950 text-white font-bold uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3">
                Send Enquiry <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[9px] text-neutral-400 uppercase tracking-wider text-center leading-relaxed">By sending this enquiry you agree that HBS may contact you about your request. We never share your details.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="px-6 py-32 bg-white">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic">FAQ</div>
            <h2 className="text-4xl font-bold uppercase italic tracking-tighter leading-none">Frequently asked questions.</h2>
          </div>
          <div className="space-y-12">
            {faqs.map((faq, i) => (
              <div key={i} className="space-y-4 border-l border-neutral-100 pl-8 group">
                <h4 className="text-xl font-bold uppercase italic tracking-tighter leading-none group-hover:text-black text-neutral-300 transition-colors">{faq.q}</h4>
                <p className="text-sm text-neutral-600 font-sans normal-case leading-relaxed max-w-2xl">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
