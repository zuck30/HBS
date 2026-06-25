'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (data) setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    setAdding(true);
    // Simple local storage cart for now
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));

    setTimeout(() => {
      setAdding(false);
      // In a real app, we'd use a context or state manager
      alert('Added to cart!');
    }, 500);
  };

  if (loading) return <div className="pt-40 text-center font-serif text-2xl">Breathing in the scents...</div>;
  if (!product) return <div className="pt-40 text-center font-serif text-2xl">Candle not found.</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-12 hover:text-[#b47878] transition-colors">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-square bg-neutral-100 overflow-hidden"
        >
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">No Image</div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="text-sm font-bold text-[#b47878] uppercase tracking-[0.2em] mb-4">Handcrafted in Tanzania</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">{product.name}</h1>
          <p className="text-3xl font-serif mb-8 text-neutral-600">Tsh. {product.price}</p>

          <div className="space-y-6 mb-12">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Scent Notes</h4>
              <p className="text-lg">{product.scent_notes?.join(' • ')}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Description</h4>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-12">
            <button
              onClick={addToCart}
              disabled={adding || product.stock <= 0}
              className="w-full bg-[#b47878] text-white py-5 font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-3"
            >
              <ShoppingCart size={20} />
              {product.stock > 0 ? (adding ? 'Adding...' : 'Add to Cart') : 'Out of Stock'}
            </button>
            <p className="text-xs text-center text-gray-400">Guest checkout available. No account required.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-neutral-100 pt-8">
            <div className="flex items-start gap-3">
              <Truck size={20} className="text-[#b47878] shrink-0" />
              <div>
                <h5 className="font-bold text-sm">Fast Shipping</h5>
                <p className="text-xs text-gray-500">Local delivery in Dar es Salaam.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="text-[#b47878] shrink-0" />
              <div>
                <h5 className="font-bold text-sm">Secure Payment</h5>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
