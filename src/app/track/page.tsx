'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Package, Truck, Search } from 'lucide-react';

function TrackContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!orderId || !email) return;

    setLoading(true);
    setError('');

    const { data, error: err } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('customer_email', email)
      .single();

    if (err) {
      setError('Order not found. Please check your ID and email.');
      setOrder(null);
    } else {
      setOrder(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (orderId && email) handleTrack();
  }, []);

  const steps = [
    { key: 'pending', label: 'Confirmed', icon: CheckCircle2 },
    { key: 'processing', label: 'Processing', icon: Clock },
    { key: 'ready', label: 'Ready', icon: Package },
    { key: 'delivered', label: 'Delivered', icon: Truck },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === order?.status) || 0;

  return (
    <div className="pt-40 pb-24 px-6 max-w-3xl mx-auto min-h-screen font-sans antialiased text-neutral-900">
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
          Track Order
        </h1>
        <p className="text-neutral-500 text-xs tracking-wide">
          Enter your information to locate your parcel.
        </p>
      </motion.div>

      {/* Input Module Block */}
      <form 
        onSubmit={handleTrack} 
        className="bg-white border border-neutral-200/80 rounded-xl p-5 flex flex-col md:flex-row gap-3 shadow-sm mb-12"
      >
        <input
          required
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="flex-1 px-4 py-3 bg-neutral-50/50 border border-neutral-200/60 rounded-lg text-xs font-medium placeholder-neutral-400 focus:bg-white focus:border-neutral-900 outline-none transition-all"
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 bg-neutral-50/50 border border-neutral-200/60 rounded-lg text-xs font-medium placeholder-neutral-400 focus:bg-white focus:border-neutral-900 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-neutral-950 text-white px-6 py-3 rounded-lg text-xs font-medium tracking-wide hover:bg-neutral-900 active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <Search size={14} />
          {loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-red-600 text-xs font-medium p-4 bg-red-50 border border-red-100 rounded-lg mb-12"
        >
          {error}
        </motion.div>
      )}

      {order && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Status Monitor Grid Box */}
          <div className="bg-white border border-neutral-200/80 rounded-xl p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-4 border-b border-neutral-100 pb-8 mb-10">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Status</span>
                <p className="text-xl font-bold tracking-tight text-neutral-900 capitalize">{order.status}</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Last Updated</span>
                <p className="text-xs font-medium text-neutral-600">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Status Flow Indicators */}
            <div className="relative flex justify-between px-2">
              <div className="absolute top-5 left-0 w-full h-px bg-neutral-200/80 -translate-y-1/2 z-0" />
              <div
                className="absolute top-5 left-0 h-px bg-neutral-950 -translate-y-1/2 z-0 transition-all duration-1000 ease-out"
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = idx <= currentStepIndex;
                const isActive = idx === currentStepIndex;

                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
                        isCompleted 
                          ? 'bg-neutral-950 text-white border-neutral-950' 
                          : 'bg-white border-neutral-200/80 text-neutral-300'
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <span className={`absolute -bottom-7 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider ${
                      isActive ? 'text-neutral-900' : 'text-neutral-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Breakdown Ledger Area */}
          <div className="bg-white border border-neutral-200/80 rounded-xl p-6 shadow-sm">
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block mb-4">
              Order Content Details
            </span>
            <div className="space-y-3.5">
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between text-xs font-medium text-neutral-600">
                  <span>{item.name} <span className="text-neutral-400 font-normal ml-1">× {item.quantity}</span></span>
                  <span className="text-neutral-900">Tzs {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="border-t border-neutral-100 pt-3.5 flex justify-between items-center text-neutral-900">
                <span className="text-xs font-bold uppercase tracking-wider">Total Amount</span>
                <span className="text-base font-bold tracking-tight">Tzs {order.total}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center font-medium tracking-wide text-xs text-neutral-400 uppercase">Verifying tracking status...</div>}>
      <TrackContent />
    </Suspense>
  );
}