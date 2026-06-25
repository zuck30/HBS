'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Grid, List, Star, ChevronRight, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Floral & Sweet', 'Woody & Earthy', 'Fresh & Crisp', 'Warm & Spicy', 'Diffusers', 'Gift Sets'];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let query = supabase.from('products').select('*');
      if (category !== 'All') query = query.eq('category', category);
      const { data } = await query.order('created_at', { ascending: false });
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f6f5f1] font-sans antialiased selection:bg-neutral-950 selection:text-white">
      
      {/* 1. Shop Header - Structured with the Clean Grid Layout System */}
      <div className="relative bg-[#f6f5f1] border-b border-neutral-200/80 pt-28 pb-16 px-6 overflow-hidden">
        {/* Alignment Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }} />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              The Scent Collection
            </h1>
          </div>
          <p className="text-neutral-500 text-sm md:text-base max-w-xs font-normal leading-relaxed">
            Handcrafted luxury sensory experiences designed to balance mind and space.
          </p>
        </div>
      </div>

      {/* 2. Control & Filtering Bar */}
      <div className="bg-[#f6f5f1]/80 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-30 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Minimalist Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search scents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white text-neutral-900 placeholder-neutral-400 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors text-xs"
            />
          </div>

          {/* Clean Category Selector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-medium tracking-wider uppercase whitespace-nowrap transition-all ${
                  category === cat 
                    ? 'bg-neutral-950 text-white shadow-sm' 
                    : 'bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Layout View Toggle Controls */}
          <div className="hidden lg:flex items-center gap-1 pl-4 border-l border-neutral-200">
            <button 
              onClick={() => setView('grid')} 
              className={`p-2 rounded-md transition-colors ${view === 'grid' ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-400 hover:text-neutral-900'}`}
            >
              <Grid size={15} />
            </button>
            <button 
              onClick={() => setView('list')} 
              className={`p-2 rounded-md transition-colors ${view === 'list' ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-400 hover:text-neutral-900'}`}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Products Render Section Area */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1.5">
            <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-neutral-300" />
            <span className="text-xs font-semibold text-neutral-800">Shop</span>
          </div>
          <div className="text-[10px] font-medium tracking-widest text-neutral-400 uppercase">
            {filteredProducts.length} Products Available
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="aspect-square bg-neutral-200/60 rounded-lg" />
                <div className="h-3 bg-neutral-200/60 w-2/3 rounded-md" />
                <div className="h-3 bg-neutral-200/60 w-1/3 rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-6"}
          >
            <AnimatePresence>
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} view={view} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty Search Vibe State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-24 bg-white rounded-xl border border-neutral-200 shadow-sm max-w-xl mx-auto">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <Search size={20} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-1">No products match</h3>
            <p className="text-sm text-neutral-500 mb-6 px-4">Try altering your structural categories or adjusting search criteria.</p>
            <button 
              onClick={() => { setCategory('All'); setSearch(''); }} 
              className="px-4 py-2 bg-neutral-950 hover:bg-neutral-900 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Mini Footer Invitation Concept Section */}
      <section className="bg-white border-t border-neutral-200/80 py-16 px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-4 block">
            AI Scent Agent
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-4">
            Find Your Signature Atmosphere
          </h2>
          <p className="text-sm text-neutral-600 max-w-md mb-8 leading-relaxed">
            Take our brief sensory diagnostic routine to locate custom pairings fitted perfectly for your living spaces.
          </p>
          <Link 
            href="/quiz" 
            className="group px-5 py-2.5 bg-neutral-950 hover:bg-neutral-900 text-white rounded-lg text-xs font-medium tracking-wide transition-all shadow-sm flex items-center gap-2"
          >
            Take Scent Quiz
            <ArrowRight size={14} className="opacity-80 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

function ProductCard({ product, view }: { product: any; view: 'grid' | 'list' }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-xl overflow-hidden border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all duration-300 group flex ${
        view === 'list' ? 'flex-row h-64' : 'flex-col'
      }`}
    >
      {/* Product Image Panel */}
      <Link href={`/shop/${product.id}`} className={`${view === 'list' ? 'w-64 h-full' : 'w-full aspect-square'} relative overflow-hidden bg-neutral-50 block shrink-0`}>
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-medium text-neutral-300 uppercase tracking-widest">
            No Image
          </div>
        )}
        
        {/* Status Tags */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {product.stock <= 5 && product.stock > 0 && (
            <div className="bg-neutral-900/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[8px] font-medium uppercase tracking-wider shadow-sm">
              Low Stock
            </div>
          )}
          {product.stock === 0 && (
            <div className="bg-neutral-300 text-neutral-700 px-2 py-0.5 rounded text-[8px] font-medium uppercase tracking-wider shadow-sm">
              Sold Out
            </div>
          )}
        </div>

        {/* Favorite Icon Interaction Button */}
        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm border border-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors shadow-sm md:opacity-0 group-hover:opacity-100 duration-200">
          <Heart size={14} />
        </button>
      </Link>

      {/* Metadata Detail Block */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-wider mb-1 block">
            {product.category || 'Collection Item'}
          </span>
          <Link href={`/shop/${product.id}`}>
            <h3 className="text-base font-bold text-neutral-900 group-hover:text-neutral-800 transition-colors mb-1.5 leading-snug">
              {product.name}
            </h3>
          </Link>
          
          {/* Flavor/Scent Notes Badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.scent_notes?.slice(0, 2).map((note: string, i: number) => (
              <span key={i} className="text-[9px] text-neutral-500 font-medium bg-neutral-50 border border-neutral-200/60 px-2 py-0.5 rounded">
                {note}
              </span>
            ))}
          </div>
          
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Price & Primary Call to Action Footer Area */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100">
          <div className="flex flex-col">
            <span className="text-base font-bold text-neutral-900">Tsh. {product.price}</span>
          </div>
          
          <button
            disabled={product.stock === 0}
            className="bg-neutral-950 hover:bg-neutral-900 disabled:bg-neutral-100 disabled:text-neutral-400 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
          >
            {product.stock === 0 ? 'Notify Me' : 'Quick Add'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}