'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Smartphone, CheckCircle2, Copy, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  const LIPA_NAMBA_NUMBER = '44201798';
  const LIPA_NAMBA_NAME = 'Mix by yas';

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length === 0) {
      router.push('/shop');
    }
    setCart(savedCart);
    const t = savedCart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    setTotal(t);
  }, [router]);

  const copyNumber = () => {
    navigator.clipboard.writeText(LIPA_NAMBA_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const createOrder = async () => {
    setLoading(true);
    
    try {
      const items = cart.map(item => ({
        type: 'candle',
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name
      }));

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          customer_email: email,
          customer_name: name,
          customer_phone: phone,
          items: items,
          total: total,
          status: 'pending',
          payment_method: 'mixbyyas',
          payment_number: LIPA_NAMBA_NUMBER
        }])
        .select()
        .single();

      if (error) throw error;

      setOrderId(data.id);
      setOrderCreated(true);
      
      // Clear cart
      localStorage.removeItem('cart');
      
    } catch (err) {
      console.error(err);
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      alert('Please enter your phone number for payment confirmation');
      return;
    }
    await createOrder();
  };

  if (cart.length === 0 && !orderCreated) {
    return (
      <div className="pt-40 text-center px-6">
        <h1 className="text-4xl font-serif mb-8">Your cart is empty</h1>
        <Link href="/shop" className="bg-[#b47878] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (orderCreated) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-neutral-200 p-12 text-center shadow-sm"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          
          <h1 className="text-3xl font-serif mb-3">Order Created!</h1>
          <p className="text-neutral-500 mb-6">
            Order ID: <span className="font-mono font-bold text-black">{orderId.slice(0, 12)}...</span>
          </p>
          
          <div className="bg-amber-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
              <Smartphone size={18} />
              Complete Your Payment
            </h3>
            
            <p className="text-sm text-amber-700 mb-4">
              Send payment to this Lipa Namba number using Mix by yas:
            </p>
            
            <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-amber-200">
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">Lipa Namba Number</p>
                <p className="text-2xl font-bold font-mono">{LIPA_NAMBA_NUMBER}</p>
                <p className="text-xs text-neutral-500 mt-1">{LIPA_NAMBA_NAME}</p>
              </div>
              <button
                onClick={copyNumber}
                className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-lg transition-colors"
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-amber-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-amber-700">Amount to Pay:</span>
                <span className="font-bold text-amber-900 text-lg">Tzs {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-amber-700">Reference:</span>
                <span className="font-mono text-xs text-amber-800">{orderId.slice(0, 8)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 mb-8 text-left">
            <div className="flex gap-3">
              <AlertCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-700">
                <p className="font-bold mb-1">After sending payment:</p>
                <p>Your order will be confirmed within 30 minutes. We will contact you via email or phone when ready.</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/shop" 
              className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link 
              href={`/track?id=${orderId}&email=${email}`}
              className="border border-neutral-300 text-neutral-700 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-neutral-50 transition-colors"
            >
              Track Order
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-12 hover:text-[#b47878] transition-colors">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-serif mb-8">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Contact Information</h3>
              <input
                required
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border border-neutral-200 focus:border-[#b47878] outline-none transition-colors"
              />
              <input
                required
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border border-neutral-200 focus:border-[#b47878] outline-none transition-colors"
              />
              <input
                required
                type="tel"
                placeholder="Phone Number (for payment confirmation)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border border-neutral-200 focus:border-[#b47878] outline-none transition-colors"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Payment Method</h3>
              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#b47878]/10 rounded-full flex items-center justify-center">
                    <Smartphone className="text-[#b47878]" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Mix by yas</div>
                    <div className="text-xs text-neutral-500">Lipa Namba - Tanzania</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-neutral-200">
                  <p className="text-sm font-medium mb-2">Pay using Lipa Namba:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">Number:</span>
                    <span className="font-mono font-bold text-lg">{LIPA_NAMBA_NUMBER}</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-3">
                    You will see this number after confirming your order. Send payment and we will confirm your order.
                  </p>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-[#b47878] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>Proceed to Payment - Tzs {total.toLocaleString()}</>
              )}
            </button>
          </form>
        </motion.div>

        {/* Right: Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-50 rounded-3xl p-8 h-fit sticky top-32"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Order Summary</h3>
          <div className="space-y-6 mb-8">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-neutral-200 rounded-lg overflow-hidden shrink-0">
                    {item.images?.[0] && <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{item.name}</div>
                    <div className="text-xs text-neutral-400">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="font-bold text-sm">Tzs {(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-200 pt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>Tzs {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery</span>
              <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Calculated later</span>
            </div>
            <div className="flex justify-between text-2xl font-serif pt-4 border-t border-neutral-200 mt-4">
              <span>Total</span>
              <span>Tzs {total.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-xl border border-neutral-200">
            <p className="text-xs text-neutral-500 text-center">
              After placing order, you will receive payment instructions via Lipa Namba.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}