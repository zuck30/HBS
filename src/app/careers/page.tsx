'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, MapPin, Clock, DollarSign, Send, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import careersHeroImage from '@/assets/careers-hero.png';

export default function CareersPage() {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  }

  const toggleExpand = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile || !selectedJob) {
      alert('Please select a CV file');
      return;
    }

    // Validate file type
    if (cvFile.type !== 'application/pdf') {
      alert('Please upload a PDF file only');
      return;
    }

    // Validate file size (max 5MB)
    if (cvFile.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsApplying(true);
    
    try {
      const fileName = `${Date.now()}-${cvFile.name.replace(/\s/g, '_')}`;
      
      // Upload CV to Supabase Storage (private bucket)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(fileName, cvFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        alert(`Failed to upload CV: ${uploadError.message}`);
        setIsApplying(false);
        return;
      }

      // Submit application with the file path
      const { error: appError } = await supabase.from('job_applications').insert({
        job_id: selectedJob.id,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        cover_letter: formData.coverLetter,
        cv_path: fileName // Store the filename
      });

      if (appError) {
        console.error('Application error details:', appError);
        alert('Failed to submit application: ' + appError.message);
      } else {
        alert('Application submitted successfully!');
        setFormData({ fullName: '', email: '', phone: '', coverLetter: '' });
        setCvFile(null);
        setSelectedJob(null);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <main className="pt-16 bg-[#f6f5f1] min-h-screen font-sans">
      <section className="py-24 px-6 border-b border-neutral-200 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Image src={careersHeroImage} alt="Careers" fill className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ECB65F] mb-4 block">CAREERS</span>
          <h1 className="text-4xl md:text-7xl font-bold text-[#44ACFF] uppercase leading-[0.9] mb-8 max-w-4xl">
            Join our team: help us build a world-class school.
          </h1>
          <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-3xl">
            We are recruiting across multiple departments including teaching, finance, HR, ICT, transport, security, facilities, welfare, and more.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto bg-[#44ACFF] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex flex-col gap-4 max-w-2xl">
             <span className="bg-[#ECB65F] text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest self-start">AI POWERED JOB PORTAL</span>
             <h2 className="text-3xl font-bold uppercase">Our intelligent hiring system uses AI to match the right talent with the right opportunities.</h2>
             <p className="text-blue-100 font-medium opacity-80">From job creation to candidate ranking, we leverage cutting-edge technology to build the best team.</p>
           </div>
           <div className="relative w-32 h-32 flex-shrink-0">
              <div className="absolute inset-0 bg-[#ECB65F] animate-pulse opacity-20" />
              <div className="relative z-10 w-full h-full border-4 border-[#ECB65F] flex items-center justify-center">
                <Star className="text-[#ECB65F] w-12 h-12" />
              </div>
           </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-[#44ACFF] uppercase tracking-widest border-b border-neutral-200 pb-4">Current Openings</h2>
            
            {/* Scrollable openings container */}
            <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col gap-4 animate-pulse">
                  {[1,2,3].map(i => <div key={i} className="h-40 bg-neutral-200" />)}
                </div>
              ) : jobs.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-white p-8 border border-neutral-200 shadow-sm flex flex-col gap-4 group hover:border-[#ECB65F] transition-all">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#ECB65F]">{job.department}</span>
                          <h3 className="text-2xl font-bold text-[#44ACFF] group-hover:text-[#ECB65F] transition-colors">{job.title}</h3>
                        </div>
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="px-6 py-3 bg-[#44ACFF] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#ECB65F] transition-colors flex-shrink-0"
                        >
                          Apply Now
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-6">
                         <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wide">
                           <MapPin className="w-4 h-4 text-[#ECB65F]" /> {job.location}
                         </div>
                         <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wide">
                           <Clock className="w-4 h-4 text-[#ECB65F]" /> {job.type}
                         </div>
                         {job.salary_range && (
                           <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wide">
                             <DollarSign className="w-4 h-4 text-[#ECB65F]" /> {job.salary_range}
                           </div>
                         )}
                      </div>

                      {/* Job Description */}
                      {job.description && (
                        <div className="mt-2">
                          <button
                            onClick={() => toggleExpand(job.id)}
                            className="flex items-center gap-2 text-xs font-bold text-[#44ACFF] hover:text-[#ECB65F] transition-colors"
                          >
                            {expandedJob === job.id ? (
                              <>Hide Description <ChevronUp size={16} /></>
                            ) : (
                              <>View Description <ChevronDown size={16} /></>
                            )}
                          </button>
                          {expandedJob === job.id && (
                            <div className="mt-4 p-4 bg-neutral-50 border border-neutral-200 rounded-sm">
                              <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
                                {job.description}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 border border-neutral-200 text-center">
                  <p className="text-neutral-500 font-bold uppercase tracking-widest">No open positions at the moment.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-white p-10 border border-neutral-200 flex flex-col gap-8 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-[#44ACFF] uppercase tracking-widest">Application Process</h2>
              <div className="flex flex-col gap-8">
                {[
                  { step: '1', title: 'Find your role', desc: 'Browse our open positions and find the role that matches your skills and experience.' },
                  { step: '2', title: 'Submit your application', desc: 'Complete the application form and upload your CV (PDF only). Our AI will process your application.' },
                  { step: '3', title: 'AI Evaluation', desc: 'Our intelligent system analyzes your CV against the job requirements and ranks all candidates based on relevant criteria.' },
                  { step: '4', title: 'Get contacted', desc: 'Only shortlisted candidates will be contacted for interviews. We are an equal-opportunity employer.' }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="w-10 h-10 bg-[#44ACFF] text-white flex items-center justify-center flex-shrink-0 font-bold">{s.step}</span>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-[#44ACFF] uppercase">{s.title}</h4>
                      <p className="text-xs text-neutral-500 font-medium leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#44ACFF]/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl shadow-2xl relative my-8"
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-black font-bold uppercase text-[10px] tracking-widest z-10"
            >
              Close [X]
            </button>
            <div className="p-8 md:p-10 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ECB65F]">Apply for</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#44ACFF] uppercase">{selectedJob.title}</h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wide flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#ECB65F]" /> {selectedJob.location}
                  </span>
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wide flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#ECB65F]" /> {selectedJob.type}
                  </span>
                </div>
              </div>

              {/* Show full job description in modal */}
              {selectedJob.description && (
                <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-sm">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Job Description</h4>
                  <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
                    {selectedJob.description}
                  </div>
                </div>
              )}

              <form onSubmit={handleApply} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Anna Msia"
                      className="bg-neutral-50 border border-neutral-200 p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F] rounded-sm"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="anna@example.com"
                      className="bg-neutral-50 border border-neutral-200 p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F] rounded-sm"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="+255..."
                      className="bg-neutral-50 border border-neutral-200 p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F] rounded-sm"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Upload CV (PDF Only)</label>
                    <div className="relative group">
                      <input
                        required
                        type="file"
                        accept=".pdf"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={e => setCvFile(e.target.files ? e.target.files[0] : null)}
                      />
                      <div className="bg-neutral-50 border border-dashed border-neutral-300 p-3 text-sm font-medium flex items-center justify-center gap-2 group-hover:bg-[#ECB65F]/5 group-hover:border-[#ECB65F] transition-all rounded-sm">
                        <FileText className="w-4 h-4 text-[#ECB65F]" />
                        <span className="text-neutral-500">{cvFile ? cvFile.name : 'Choose File'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Cover Letter (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us why you are a great fit..."
                    className="bg-neutral-50 border border-neutral-200 p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ECB65F] rounded-sm resize-none"
                    value={formData.coverLetter}
                    onChange={e => setFormData({...formData, coverLetter: e.target.value})}
                  />
                </div>

                <p className="text-[9px] text-neutral-400 font-medium leading-relaxed italic">
                  By submitting your application, you agree to our AI processing your data for recruitment purposes. Your information is secure and never shared.
                </p>

                <button
                  disabled={isApplying}
                  type="submit"
                  className="w-full py-4 bg-[#44ACFF] text-white font-bold uppercase tracking-widest hover:bg-[#ECB65F] transition-all shadow-sm disabled:opacity-50 rounded-sm"
                >
                  {isApplying ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}