'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, Filter, ChevronLeft, ChevronRight, Download, Brain, User, Mail, Phone, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { deepseekRankCandidates } from '@/lib/deepseek';
import { parseCVAction } from '@/lib/cv-parser';
import Link from 'next/link';

export default function AdminApplications() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ranking, setRanking] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [parsing, setParsing] = useState(false);
  const [rankings, setRankings] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_applications')
      .select('*, jobs(title, description)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setApps(data);
      await fetchRankings(data);
    }
    setLoading(false);
  }

  async function fetchRankings(applications: any[]) {
    if (applications.length === 0) return;
    
    const ids = applications.map(a => a.id);
    const { data, error } = await supabase
      .from('candidate_rankings')
      .select('*')
      .in('application_id', ids);

    if (!error && data) {
      const rankMap: Record<string, any> = {};
      data.forEach(r => {
        rankMap[r.application_id] = r;
      });
      setRankings(rankMap);
    }
  }

  const handleRank = async () => {
    if (apps.length === 0) return;
    if (!selectedApp) {
      alert('Please select a candidate first');
      return;
    }
    
    setRanking(true);
    
    try {
      const jobApps = apps.filter(a => a.job_id === selectedApp.job_id);
      const jobDesc = jobApps[0]?.jobs?.description || '';

      const insights = await deepseekRankCandidates(jobDesc, jobApps);
      
      const { error } = await supabase
        .from('candidate_rankings')
        .insert({
          job_id: selectedApp.job_id,
          application_id: selectedApp.id,
          insights: insights,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving insights:', error);
        alert('Ranking complete but failed to save insights to database. Error: ' + error.message);
      } else {
        alert('Ranking complete! AI insights have been saved to the database.');
      }
      
      await fetchApplications();
      
    } catch (e) {
      alert('Ranking failed: ' + (e as Error).message);
    }
    
    setRanking(false);
  };

  const handleParseCV = async () => {
    if (!selectedApp) return;
    setParsing(true);
    
    try {
      const cvPath = selectedApp.cv_path;
      if (!cvPath) {
        alert('No CV file found for this applicant');
        setParsing(false);
        return;
      }

      const { data: fileData, error: fileError } = await supabase.storage
        .from('cvs')
        .download(cvPath);

      if (fileError) {
        console.error('Error downloading CV:', fileError);
        alert('Failed to download CV file');
        setParsing(false);
        return;
      }

      const arrayBuffer = await fileData.arrayBuffer();
      const { text, parsedData, wordCount } = await parseCVAction(arrayBuffer);
      
      const lines = text.split('\n').filter((line: string) => line.trim().length > 0);
      const uniqueWords = new Set(text.toLowerCase().split(/\s+/)).size;
      
      const score = Math.min(Math.round((wordCount / 100) + (uniqueWords / 50) + (lines.length / 10)), 100);

      const { error } = await supabase
        .from('job_applications')
        .update({ 
          ai_score: score,
          parsed_data: {
            ...parsedData,
            wordCount,
            uniqueWords,
            lines: lines.length
          }
        })
        .eq('id', selectedApp.id);

      if (error) {
        console.error('Error updating application:', error);
        alert('Failed to save parsed CV data');
      } else {
        alert('CV parsed successfully! AI score updated to ' + score + '%');
        await fetchApplications();
        const updatedApp = apps.find(a => a.id === selectedApp.id);
        if (updatedApp) setSelectedApp(updatedApp);
      }
    } catch (error) {
      console.error('Parse error:', error);
      alert('Failed to parse CV');
    }
    
    setParsing(false);
  };

  const handleDownloadCV = async () => {
    if (!selectedApp || !selectedApp.cv_path) {
      alert('No CV available to download');
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from('cvs')
        .createSignedUrl(selectedApp.cv_path, 60);

      if (error) {
        console.error('Signed URL error:', error);
        alert('Failed to generate download link');
        return;
      }

      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download CV');
    }
  };

  const handleShortlist = async () => {
    if (!selectedApp) return;
    if (confirm(`Shortlist ${selectedApp.full_name}?`)) {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: 'shortlisted' })
        .eq('id', selectedApp.id);

      if (error) {
        alert('Failed to shortlist candidate');
      } else {
        alert(`${selectedApp.full_name} has been shortlisted!`);
        await fetchApplications();
      }
    }
  };

  const handleReject = async () => {
    if (!selectedApp) return;
    if (confirm(`Reject ${selectedApp.full_name}?`)) {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: 'rejected' })
        .eq('id', selectedApp.id);

      if (error) {
        alert('Failed to reject candidate');
      } else {
        alert(`${selectedApp.full_name} has been rejected.`);
        await fetchApplications();
      }
    }
  };

  const getRankingInsights = () => {
    if (!selectedApp) return null;
    return rankings[selectedApp.id]?.insights || null;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-[#44ACFF] selection:text-white pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <Link href="/admin" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#44ACFF] transition-colors">
               <ChevronLeft size={12} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#44ACFF] uppercase">Job Applications</h1>
            <p className="text-neutral-500 font-medium">Review, parse, and rank candidates with Artificial Intelligence.</p>
          </div>
          <button
            onClick={handleRank}
            disabled={ranking || !apps.length || !selectedApp}
            className="px-6 py-3 bg-[#ECB65F] text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#d4a04d] transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            <Brain size={16} className={ranking ? "animate-pulse" : ""} /> {ranking ? "Ranking..." : "Run AI Ranking"}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-white p-4 rounded-sm border border-neutral-100 shadow-sm flex items-center justify-between">
                 <div className="relative flex-1 max-w-sm">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                   <input 
                     type="text" 
                     placeholder="Search applicants..." 
                     className="w-full bg-neutral-50 border border-neutral-200 py-2.5 pl-10 pr-4 rounded-sm text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#44ACFF]" 
                   />
                 </div>
                 <button className="p-2 text-neutral-400 hover:text-[#44ACFF] transition-all"><Filter size={16} /></button>
              </div>

              {loading ? (
                 <div className="space-y-3 animate-pulse">
                   {[1,2,3,4].map(i => <div key={i} className="h-20 bg-neutral-200 rounded-sm" />)}
                 </div>
              ) : apps.length === 0 ? (
                <div className="bg-white p-12 rounded-sm border border-neutral-100 shadow-sm text-center">
                  <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-400 font-medium">No applications yet</p>
                  <p className="text-xs text-neutral-400 mt-1">Applications will appear here once candidates apply</p>
                </div>
              ) : (
                apps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`bg-white p-4 rounded-sm border transition-all cursor-pointer flex items-center justify-between group ${
                      selectedApp?.id === app.id ? "border-[#44ACFF] shadow-sm shadow-[#44ACFF]/5" : "border-neutral-100 shadow-sm hover:border-neutral-300"
                    }`}
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-sm bg-neutral-50 flex items-center justify-center text-[#44ACFF] font-bold text-xs uppercase">
                          {app.full_name?.split(' ').map((n: string) => n[0]).join('') || 'NA'}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-tight">{app.full_name || 'Unknown'}</h3>
                          <p className="text-[10px] font-bold text-[#44ACFF] uppercase tracking-widest">{app.jobs?.title || 'No Position'}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                              <Calendar size={10} /> {new Date(app.created_at).toLocaleDateString()}
                            </span>
                            {app.status && (
                              <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                                app.status === 'shortlisted' ? 'bg-emerald-100 text-emerald-700' :
                                app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                'bg-neutral-100 text-neutral-500'
                              }`}>
                                {app.status}
                              </span>
                            )}
                          </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        {app.ai_score && (
                          <div className="flex flex-col items-end">
                            <span className={`text-base font-bold ${
                              app.ai_score >= 80 ? "text-emerald-500" : app.ai_score >= 60 ? "text-amber-500" : "text-red-500"
                            }`}>{app.ai_score}%</span>
                            <span className="text-[7px] font-bold text-neutral-400 uppercase tracking-tighter">AI Match</span>
                          </div>
                        )}
                        <div className="w-8 h-8 rounded-sm bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:text-[#44ACFF] transition-all">
                           <ChevronRight size={16} />
                        </div>
                     </div>
                  </div>
                ))
              )}
           </div>

           <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                 {selectedApp ? (
                   <motion.div
                    key={selectedApp.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-sm border border-neutral-100 shadow-sm p-6 sticky top-20"
                   >
                      <div className="flex flex-col gap-6">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-14 h-14 rounded-sm bg-[#44ACFF] text-white flex items-center justify-center text-xl font-bold uppercase">
                                 {selectedApp.full_name?.[0] || '?'}
                               </div>
                               <div className="flex flex-col">
                                 <h2 className="text-lg font-bold text-[#44ACFF] uppercase">{selectedApp.full_name || 'Unknown'}</h2>
                                 <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{selectedApp.jobs?.title || 'No Position'}</span>
                               </div>
                            </div>
                            <button 
                              onClick={handleDownloadCV}
                              className="p-2 bg-neutral-50 text-neutral-400 rounded-sm hover:text-[#44ACFF] transition-all"
                              title="Download CV"
                            >
                               <Download size={18} />
                            </button>
                         </div>

                         <div className="grid grid-cols-2 gap-3">
                            <div className="bg-neutral-50 p-3 rounded-sm flex flex-col gap-0.5">
                               <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Email</span>
                               <span className="text-xs font-bold text-neutral-900 truncate">{selectedApp.email || 'N/A'}</span>
                            </div>
                            <div className="bg-neutral-50 p-3 rounded-sm flex flex-col gap-0.5">
                               <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Phone</span>
                               <span className="text-xs font-bold text-neutral-900">{selectedApp.phone || 'N/A'}</span>
                            </div>
                         </div>

                         <div className="flex flex-col gap-3">
                            <h4 className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] border-b border-neutral-50 pb-2">Cover Letter</h4>
                            <div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                              <p className="text-sm text-neutral-600 leading-relaxed font-medium whitespace-pre-wrap">
                                {selectedApp.cover_letter || "No cover letter provided."}
                              </p>
                            </div>
                         </div>

                         <div className="bg-[#44ACFF] p-6 rounded-sm text-white flex flex-col gap-3 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#ECB65F]/20 rounded-bl-full flex items-center justify-center">
                               <Brain size={18} className="text-[#ECB65F]" />
                            </div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#ECB65F]">AI Candidate Analysis</h4>
                            
                            {selectedApp.ai_score ? (
                              <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                                    <span>Match Score</span>
                                    <span>{selectedApp.ai_score}%</span>
                                  </div>
                                  <div className="h-1 bg-white/10 rounded-sm overflow-hidden">
                                    <div className="h-full bg-[#ECB65F]" style={{ width: `${selectedApp.ai_score}%` }} />
                                  </div>
                                </div>
                                
                                {getRankingInsights() && (
                                  <div className="mt-2 p-3 bg-white/10 rounded-sm">
                                    <p className="text-xs text-blue-100/90 leading-relaxed font-medium whitespace-pre-wrap">
                                      {getRankingInsights()}
                                    </p>
                                  </div>
                                )}
                                
                                {selectedApp.parsed_data && (
                                  <div className="mt-2 p-3 bg-white/10 rounded-sm">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#ECB65F] mb-1">Parsed Data</p>
                                    <div className="text-xs text-blue-100/90 leading-relaxed">
                                      <p><strong>Word Count:</strong> {selectedApp.parsed_data.wordCount || 'N/A'}</p>
                                      <p><strong>Unique Words:</strong> {selectedApp.parsed_data.uniqueWords || 'N/A'}</p>
                                      <p><strong>Experience:</strong> {selectedApp.parsed_data.experience || 'N/A'}</p>
                                      <p><strong>Education:</strong> {selectedApp.parsed_data.education || 'N/A'}</p>
                                      {selectedApp.parsed_data.skills && (
                                        <p><strong>Skills:</strong> {Array.isArray(selectedApp.parsed_data.skills) ? selectedApp.parsed_data.skills.join(', ') : selectedApp.parsed_data.skills}</p>
                                      )}
                                      {selectedApp.parsed_data.summary && <p className="mt-1 italic">"{selectedApp.parsed_data.summary}"</p>}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-3 py-3 text-center">
                                 <p className="text-xs text-blue-100/70 font-medium">Run AI ranking or parse CV to get detailed insights for this candidate.</p>
                                 <button 
                                   onClick={handleParseCV}
                                   disabled={parsing}
                                   className="px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-[9px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all disabled:opacity-50"
                                 >
                                   {parsing ? 'Parsing...' : 'Parse CV Now'}
                                 </button>
                              </div>
                            )}
                         </div>

                         <div className="flex gap-3">
                            <button 
                              onClick={handleShortlist}
                              disabled={selectedApp.status === 'shortlisted'}
                              className="flex-1 py-3 bg-emerald-500 text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {selectedApp.status === 'shortlisted' ? 'Shortlisted ✓' : 'Shortlist'}
                            </button>
                            <button 
                              onClick={handleReject}
                              disabled={selectedApp.status === 'rejected'}
                              className="flex-1 py-3 border border-neutral-200 text-red-400 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {selectedApp.status === 'rejected' ? 'Rejected ✗' : 'Reject'}
                            </button>
                         </div>
                      </div>
                   </motion.div>
                 ) : (
                   <div className="h-[500px] bg-white rounded-sm border border-dashed border-neutral-200 flex flex-col items-center justify-center p-8 text-center gap-3">
                      <div className="w-14 h-14 rounded-sm bg-neutral-50 flex items-center justify-center text-neutral-300">
                         <User size={28} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-base font-bold text-neutral-900 uppercase">No Applicant Selected</h3>
                        <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-[200px]">Select a candidate from the list to view their full application and AI insights.</p>
                      </div>
                   </div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}