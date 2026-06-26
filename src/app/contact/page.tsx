'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How do I apply?',
      a: 'Start by sending an enquiry through the form above or by calling our office. We\'ll invite your child for a friendly assessment visit, then guide you through registration and the documents we need.'
    },
    {
      q: 'What is your fee structure?',
      a: 'Fees vary by programme and by day or boarding place. Our admissions team will share a current fee schedule and any available payment plans during your enquiry — just let us know which programme you\'re interested in.'
    },
    {
      q: 'Do you offer boarding?',
      a: 'Yes. We offer comfortable, supervised boarding with cosy dormitories, balanced meals, and structured study time — alongside our day options. Boarding helps build independence in a safe, home-like setting.'
    },
    {
      q: 'What ages do you accept?',
      a: 'We welcome children from 18 months in our Toddler Class through to 14 years in Primary School, across four programmes: Toddler Class, Pre-school, Primary School, and Enrichment activities.'
    },
    {
      q: 'Can I visit before applying?',
      a: 'Absolutely and we encourage it. Book a visit and you\'ll meet our teachers and walk through the classrooms, library, and play spaces. Seeing a school day in person is the best way to decide if HBS is right for your family.'
    }
  ];

  return (
    <main className="pt-16 bg-[#f6f5f1] min-h-screen font-sans">
      <section className="py-24 px-6 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F]">ADMISSIONS</span>
          <h1 className="text-4xl md:text-7xl font-bold text-[#44ACFF] uppercase leading-[0.9] max-w-4xl">
            Let's talk — we'd love to meet your family.
          </h1>
          <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-3xl">
            Book a visit, ask a question, or apply for admission.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#44ACFF] text-[#ECB65F] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-[#44ACFF] uppercase tracking-widest">Visit us</h4>
                  <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                    140 Kimbiji Road, 17106 Mji Mwema, Dar es Salaam, Tanzania.
                  </p>
                  <a href="https://maps.google.com/?q=Hannah+Bennie+Schools" target="_blank" className="text-xs font-bold text-[#ECB65F] uppercase tracking-widest underline underline-offset-4">View on Google Maps →</a>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#44ACFF] text-[#ECB65F] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-[#44ACFF] uppercase tracking-widest">Call us</h4>
                  <p className="text-sm text-neutral-500 font-medium flex flex-col">
                    <span>+255 762 224 224</span>
                    <span>+255 627 30 10 10</span>
                    <span>+255 765 001 001</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#44ACFF] text-[#ECB65F] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-[#44ACFF] uppercase tracking-widest">Email us</h4>
                  <p className="text-sm text-neutral-500 font-bold">
                    hbs.admin@hbs.ac.tz
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#44ACFF] text-[#ECB65F] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-[#44ACFF] uppercase tracking-widest">Office hours</h4>
                  <p className="text-sm text-neutral-500 font-medium">
                    Monday – Friday: 7:30 – 17:00<br />
                    Saturday: 8:00 – 13:00<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#44ACFF] p-10 rounded-[40px] text-white flex flex-col gap-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#ECB65F]/20 rounded-bl-[100px]" />
               <h3 className="text-2xl font-bold uppercase">Frequently asked questions</h3>
               <div className="flex flex-col gap-4">
                 {faqs.map((faq, i) => (
                   <div key={i} className="border-b border-white/10 pb-4">
                     <button
                       onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                       className="w-full flex items-center justify-between text-left gap-4"
                     >
                       <span className="text-sm font-bold uppercase tracking-tight">{faq.q}</span>
                       <ChevronDown className={`w-4 h-4 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                     </button>
                     {activeFaq === i && (
                       <p className="text-xs text-blue-100/70 mt-4 leading-relaxed font-medium">
                         {faq.a}
                       </p>
                     )}
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white p-12 rounded-[60px] shadow-sm border border-neutral-100 flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-[#44ACFF] uppercase">Send us an enquiry</h2>
                <p className="text-neutral-500 font-medium">We'll get back to you as soon as possible.</p>
              </div>

              <form className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">First Name</label>
                    <input type="text" className="bg-neutral-50 border border-neutral-100 p-5 rounded-3xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F]" placeholder="John" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Last Name</label>
                    <input type="text" className="bg-neutral-50 border border-neutral-100 p-5 rounded-3xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F]" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Email Address</label>
                    <input type="email" className="bg-neutral-50 border border-neutral-100 p-5 rounded-3xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F]" placeholder="john@example.com" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Phone Number</label>
                    <input type="tel" className="bg-neutral-50 border border-neutral-100 p-5 rounded-3xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F]" placeholder="+255..." />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Reason for enquiry</label>
                  <select className="bg-neutral-50 border border-neutral-100 p-5 rounded-3xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F] appearance-none">
                    <option>Admissions</option>
                    <option>Visit / Tour</option>
                    <option>Careers</option>
                    <option>General Question</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Message</label>
                  <textarea rows={6} className="bg-neutral-50 border border-neutral-100 p-5 rounded-3xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F] resize-none" placeholder="Tell us more about your enquiry..." />
                </div>

                <div className="flex flex-col gap-6">
                  <p className="text-[10px] text-neutral-400 font-medium leading-relaxed italic">
                    By sending this enquiry you agree that HBS may contact you about your request. We never share your details.
                  </p>
                  <button className="w-full py-6 bg-[#44ACFF] text-white rounded-3xl font-bold uppercase tracking-widest hover:bg-[#ECB65F] transition-all shadow-xl flex items-center justify-center gap-3 group">
                    Send Enquiry
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}