'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Save, User, Mail, Shield, Bell, Globe, Lock, Key, Palette, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminSettings() {
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    role: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          email: data.email || '',
          role: data.role || 'moderator'
        });
      }
    }
    setLoading(false);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: profile.full_name })
        .eq('id', user.id);
      
      if (!error) {
        alert('Settings saved successfully!');
      } else {
        alert('Error saving settings');
      }
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-[#44ACFF] selection:text-white pt-20">
      <div className="max-w-5xl mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <Link href="/admin" className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-[#44ACFF] transition-colors">
               <ChevronLeft size={12} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#44ACFF] uppercase">Settings</h1>
            <p className="text-neutral-500 font-medium">Manage your account and system preferences.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-sm border border-neutral-100 shadow-sm p-4">
            <nav className="flex flex-col gap-1">
              <button className="flex items-center gap-3 px-4 py-3 bg-[#44ACFF] text-white rounded-sm text-xs font-bold uppercase tracking-widest w-full text-left">
                <User size={14} /> Profile
              </button>
              <button className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:text-[#44ACFF] hover:bg-neutral-50 rounded-sm text-xs font-bold uppercase tracking-widest transition-all w-full text-left">
                <Bell size={14} /> Notifications
              </button>
              <button className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:text-[#44ACFF] hover:bg-neutral-50 rounded-sm text-xs font-bold uppercase tracking-widest transition-all w-full text-left">
                <Shield size={14} /> Security
              </button>
              <button className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:text-[#44ACFF] hover:bg-neutral-50 rounded-sm text-xs font-bold uppercase tracking-widest transition-all w-full text-left">
                <Palette size={14} /> Appearance
              </button>
            </nav>
          </div>

          {/* Main Settings */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSave} className="bg-white rounded-sm border border-neutral-100 shadow-sm p-6 flex flex-col gap-6">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-12 bg-neutral-200 rounded"></div>
                  <div className="h-12 bg-neutral-200 rounded"></div>
                  <div className="h-12 bg-neutral-200 rounded"></div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <input
                        type="text"
                        className="w-full bg-neutral-50 border border-neutral-200 p-3 pl-10 rounded-sm text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF]"
                        value={profile.full_name}
                        onChange={e => setProfile({...profile, full_name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <input
                        type="email"
                        className="w-full bg-neutral-50 border border-neutral-200 p-3 pl-10 rounded-sm text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF] opacity-60 cursor-not-allowed"
                        value={profile.email}
                        disabled
                      />
                    </div>
                    <p className="text-[9px] text-neutral-400">Email cannot be changed. Contact support for assistance.</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Role</label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <input
                        type="text"
                        className="w-full bg-neutral-50 border border-neutral-200 p-3 pl-10 rounded-sm text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#44ACFF] opacity-60 cursor-not-allowed uppercase"
                        value={profile.role}
                        disabled
                      />
                    </div>
                    <p className="text-[9px] text-neutral-400">Role permissions are managed by system administrators.</p>
                  </div>

                  <div className="border-t border-neutral-100 pt-6">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm">
                      <div className="flex items-start gap-3">
                        <Lock className="w-4 h-4 text-amber-600 mt-0.5" />
                        <div className="flex flex-col gap-1">
                          <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">Password & Security</p>
                          <p className="text-[10px] text-amber-700">To change your password, please use the "Forgot Password" option on the login page.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-3 bg-[#44ACFF] text-white rounded-sm font-bold uppercase tracking-widest hover:bg-[#ECB65F] transition-all shadow-sm flex items-center justify-center gap-3"
                  >
                    <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}