'use client';

import React, { useEffect, useState } from 'react';
import { supabase, uploadImage } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Calendar, ShoppingBag, Plus, Edit, Trash2, X, Save, Upload, Search, ChevronRight, TrendingUp, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  // Stats
  const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0, lowStock: 0, upcomingEvents: 0 });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          if (profile?.role === 'admin') {
            fetchData();
          } else {
            router.push('/shop');
          }
        } else {
          router.push('/login');
        }
      }
    };
    checkUser();
  }, [activeTab]);

  async function fetchStats(productsData: any[], eventsData: any[]) {
    const { data: ordersData } = await supabase.from('orders').select('total, status');
    if (ordersData) {
      const delivered = ordersData.filter(o => o.status === 'delivered');
      const totalSales = delivered.reduce((sum, o) => sum + o.total, 0);
      setStats({
        totalSales,
        totalOrders: ordersData.length,
        lowStock: productsData.filter(p => p.stock > 0 && p.stock <= 5).length,
        upcomingEvents: eventsData.filter(e => new Date(e.date) > new Date()).length,
      });
    }
  }

  async function fetchData() {
    setLoading(true);
    if (activeTab === 'products') {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      setProducts(data || []);
      if (data) await fetchStats(data, events);
    } else if (activeTab === 'events') {
      const { data } = await supabase.from('events').select('*').order('date', { ascending: true });
      setEvents(data || []);
      if (data) await fetchStats(products, data);
    } else if (activeTab === 'orders') {
      const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      setOrders(data || []);
    }
    setLoading(false);
  }

  const handleOpenModal = (item: any = null) => {
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      setFormData(activeTab === 'products'
        ? { name: '', description: '', price: '', stock: 0, scent_notes: [], images: [], category: '' }
        : { title: '', description: '', date: '', venue: '', price: '', capacity: 0, seats_remaining: 0, image_url: '' }
      );
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }
    
    setUploading(true);
    setUploadProgress('Uploading...');
    
    try {
      const bucket = activeTab === 'products' ? 'products' : 'events';
      const uploadedUrl = await uploadImage(file, bucket);
      
      console.log('Uploaded URL:', uploadedUrl);
      
      if (!uploadedUrl || !uploadedUrl.startsWith('http')) {
        throw new Error('Invalid URL returned from upload');
      }
      
      setUploadProgress('Complete!');
      
      if (activeTab === 'products') {
        const currentImages = formData.images || [];
        setFormData({ ...formData, images: [...currentImages, uploadedUrl] });
      } else {
        setFormData({ ...formData, image_url: uploadedUrl });
      }
      
      setTimeout(() => setUploadProgress(''), 2000);
    } catch (err) {
      console.error('Upload error:', err);
      setUploadProgress('Upload failed!');
      alert('Upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setTimeout(() => setUploadProgress(''), 2000);
    } finally {
      setUploading(false);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, '');
    value = value.replace(/^0+/, '');
    setFormData({ ...formData, price: value });
  };

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const removeEventImage = () => {
    setFormData({ ...formData, image_url: '' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const saveData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : 0,
    };

    try {
      if (editingItem) {
        const { error } = await supabase
          .from(activeTab)
          .update(saveData)
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(activeTab)
          .insert([saveData]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to save.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    setLoading(true);
    try {
      const { error } = await supabase.from(activeTab).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Delete failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);
    if (!error) fetchData();
  };

  const getFilteredData = () => {
    if (activeTab === 'products') {
      return products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
    } else if (activeTab === 'events') {
      return events.filter(e => e.title?.toLowerCase().includes(search.toLowerCase()));
    } else {
      return orders.filter(o => o.customer_name?.toLowerCase().includes(search.toLowerCase()) || o.customer_email?.toLowerCase().includes(search.toLowerCase()));
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-[#f6f5f1] font-sans antialiased selection:bg-neutral-950 selection:text-white">
      
      {/* Admin Header */}
      <div className="relative bg-[#f6f5f1] border-b border-neutral-200/80 pt-28 pb-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-neutral-950 rounded-xl flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">Admin Dashboard</h1>
              <p className="text-neutral-500 text-sm mt-1">Manage your products, events, and orders</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 mt-4">
            <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-neutral-300" />
            <span className="text-xs font-semibold text-neutral-800">Admin</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-neutral-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Total Sales</span>
              <TrendingUp size={14} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">Tzs {stats.totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Total Orders</span>
              <ShoppingBag size={14} className="text-neutral-400" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stats.totalOrders}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Low Stock Items</span>
              <Package size={14} className="text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stats.lowStock}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Upcoming Events</span>
              <Calendar size={14} className="text-neutral-400" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stats.upcomingEvents}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 space-y-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === 'products' 
                  ? 'bg-neutral-950 text-white shadow-sm' 
                  : 'text-neutral-600 hover:bg-white hover:text-neutral-900'
              }`}
            >
              <Package size={18} /> Products
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === 'events' 
                  ? 'bg-neutral-950 text-white shadow-sm' 
                  : 'text-neutral-600 hover:bg-white hover:text-neutral-900'
              }`}
            >
              <Calendar size={18} /> Events
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === 'orders' 
                  ? 'bg-neutral-950 text-white shadow-sm' 
                  : 'text-neutral-600 hover:bg-white hover:text-neutral-900'
              }`}
            >
              <ShoppingBag size={18} /> Orders
            </button>
          </aside>

          {/* Content Panel */}
          <div className="flex-1 bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-sm">
            
            {/* Header with Search and Add Button */}
            <div className="p-6 border-b border-neutral-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 capitalize">{activeTab}</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {filteredData.length} {activeTab === 'products' ? 'products' : activeTab === 'events' ? 'events' : 'orders'} total
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-56 pl-9 pr-3 py-2 bg-[#f6f5f1] text-neutral-900 placeholder-neutral-400 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-400 transition-colors text-xs"
                    />
                  </div>
                  {(activeTab === 'products' || activeTab === 'events') && (
                    <button
                      onClick={() => handleOpenModal()}
                      className="flex items-center gap-2 bg-neutral-950 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-neutral-800 transition-colors"
                    >
                      <Plus size={14} /> Add New
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              {loading && !isModalOpen ? (
                <div className="p-8 space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-14 bg-neutral-50 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : filteredData.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package size={20} className="text-neutral-400" />
                  </div>
                  <h3 className="text-base font-medium text-neutral-900 mb-1">No {activeTab} found</h3>
                  <p className="text-xs text-neutral-400">Try adjusting your search or add a new item.</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="border-b border-neutral-200/80 bg-[#f6f5f1]">
                    {activeTab === 'products' && (
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Product</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Price</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Stock</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500 text-right">Actions</th>
                      </tr>
                    )}
                    {activeTab === 'events' && (
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Event</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Date</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Seats</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500 text-right">Actions</th>
                      </tr>
                    )}
                    {activeTab === 'orders' && (
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Order ID</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Customer</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Total</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-neutral-500 text-right">Update</th>
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {activeTab === 'products' && filteredData.map((p: any) => (
                      <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {p.images?.[0] && p.images[0].startsWith('http') ? (
                              <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-neutral-100" />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                                <Package size={16} className="text-neutral-400" />
                              </div>
                            )}
                            <span className="font-medium text-sm text-neutral-900">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">Tzs {p.price?.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium ${p.stock <= 5 && p.stock > 0 ? 'text-amber-600' : p.stock === 0 ? 'text-red-500' : 'text-neutral-600'}`}>
                            {p.stock} left
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => handleOpenModal(p)} className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors">
                            <Edit size={15} />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'events' && filteredData.map((e: any) => (
                      <tr key={e.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {e.image_url && e.image_url.startsWith('http') ? (
                              <img src={e.image_url} alt={e.title} className="w-10 h-10 rounded-lg object-cover bg-neutral-100" />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                                <Calendar size={16} className="text-neutral-400" />
                              </div>
                            )}
                            <span className="font-medium text-sm text-neutral-900">{e.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{new Date(e.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{e.seats_remaining} / {e.capacity}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => handleOpenModal(e)} className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors">
                            <Edit size={15} />
                          </button>
                          <button onClick={() => handleDelete(e.id)} className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'orders' && filteredData.map((o: any) => (
                      <tr key={o.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-neutral-500">{o.id.slice(0, 8)}...</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-neutral-900">{o.customer_name || 'Guest'}</div>
                          <div className="text-xs text-neutral-400">{o.customer_email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-neutral-900">Tzs {o.total?.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            o.status === 'delivered' ? 'bg-green-50 text-green-600' :
                            o.status === 'processing' ? 'bg-blue-50 text-blue-600' :
                            o.status === 'ready' ? 'bg-amber-50 text-amber-600' :
                            'bg-neutral-100 text-neutral-500'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <select
                            value={o.status}
                            onChange={(e) => handleStatusChange(o.id, e.target.value)}
                            className="text-[10px] font-medium uppercase tracking-wider border border-neutral-200 rounded-lg px-2 py-1.5 bg-white outline-none focus:border-neutral-400 cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="ready">Ready</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-200/80">
                <h2 className="text-xl font-bold text-neutral-900">
                  {editingItem ? 'Edit' : 'Add New'} {activeTab === 'products' ? 'Product' : 'Event'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSave} className="space-y-6">
                  {activeTab === 'products' ? (
                    <>
                      {/* Product Images */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Product Images</label>
                        <div className="flex flex-wrap gap-3">
                          {formData.images?.map((img: string, idx: number) => (
                            <div key={idx} className="relative w-20 h-20 border border-neutral-200 rounded-lg overflow-hidden group bg-neutral-50">
                              {img && img.startsWith('http') ? (
                                <img src={img} alt="Product" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package size={24} className="text-neutral-300" />
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={14} className="text-white" />
                              </button>
                            </div>
                          ))}
                          <label className={`w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-50 ${
                            uploading ? 'border-neutral-300 opacity-50 cursor-wait' : 'border-neutral-300 hover:border-neutral-500'
                          }`}>
                            {uploading ? (
                              <Loader2 size={18} className="text-neutral-400 animate-spin" />
                            ) : (
                              <Upload size={18} className="text-neutral-400" />
                            )}
                            <span className="text-[8px] font-medium mt-1 text-neutral-400">
                              {uploadProgress || 'Upload'}
                            </span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                          </label>
                        </div>
                        {uploadProgress && uploadProgress !== 'Complete!' && uploadProgress !== 'Upload failed!' && (
                          <p className="text-[10px] text-neutral-400 mt-1">{uploadProgress}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Product Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name || ''}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm"
                          placeholder="e.g., Lavender Dreams"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Price (TZS)</label>
                          <input
                            required
                            type="text"
                            inputMode="numeric"
                            value={formData.price || ''}
                            onChange={handlePriceChange}
                            placeholder="e.g., 45000"
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Stock</label>
                          <input
                            required
                            type="number"
                            value={formData.stock || 0}
                            onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Category</label>
                        <select
                          value={formData.category || ''}
                          onChange={e => setFormData({...formData, category: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm bg-white"
                        >
                          <option value="">Select Category</option>
                          <option value="Floral & Sweet">Floral & Sweet</option>
                          <option value="Woody & Earthy">Woody & Earthy</option>
                          <option value="Fresh & Crisp">Fresh & Crisp</option>
                          <option value="Warm & Spicy">Warm & Spicy</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Description</label>
                        <textarea
                          rows={3}
                          value={formData.description || ''}
                          onChange={e => setFormData({...formData, description: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm resize-none"
                          placeholder="Describe your product..."
                        />
                      </div>
                    </>
                  ) : (
                    // Event Form
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Event Image</label>
                        <div className="flex items-start gap-4">
                          {formData.image_url ? (
                            <div className="relative w-32 h-32 border border-neutral-200 rounded-lg overflow-hidden group bg-neutral-50">
                              {formData.image_url && formData.image_url.startsWith('http') ? (
                                <img src={formData.image_url} alt="Event" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Calendar size={32} className="text-neutral-300" />
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={removeEventImage}
                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={18} className="text-white" />
                              </button>
                            </div>
                          ) : (
                            <label className={`w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-50 ${
                              uploading ? 'border-neutral-300 opacity-50 cursor-wait' : 'border-neutral-300 hover:border-neutral-500'
                            }`}>
                              {uploading ? (
                                <Loader2 size={22} className="text-neutral-400 animate-spin" />
                              ) : (
                                <Upload size={22} className="text-neutral-400" />
                              )}
                              <span className="text-[9px] font-medium mt-2 text-neutral-400">
                                {uploadProgress || 'Upload'}
                              </span>
                              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                            </label>
                          )}
                        </div>
                        {uploadProgress && uploadProgress !== 'Complete!' && uploadProgress !== 'Upload failed!' && (
                          <p className="text-[10px] text-neutral-400">{uploadProgress}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Event Title</label>
                        <input
                          required
                          type="text"
                          value={formData.title || ''}
                          onChange={e => setFormData({...formData, title: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm"
                          placeholder="e.g., Candle Making Workshop"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Date & Time</label>
                          <input
                            required
                            type="datetime-local"
                            value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
                            onChange={e => setFormData({...formData, date: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Venue</label>
                          <input
                            required
                            type="text"
                            value={formData.venue || ''}
                            onChange={e => setFormData({...formData, venue: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm"
                            placeholder="e.g., Urban by CityBlue"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Price (TZS)</label>
                          <input
                            required
                            type="text"
                            inputMode="numeric"
                            value={formData.price || ''}
                            onChange={handlePriceChange}
                            placeholder="e.g., 25000"
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Total Capacity</label>
                          <input
                            required
                            type="number"
                            value={formData.capacity || 0}
                            onChange={e => {
                              const cap = parseInt(e.target.value) || 0;
                              setFormData({...formData, capacity: cap, seats_remaining: cap});
                            }}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Description</label>
                        <textarea
                          rows={3}
                          value={formData.description || ''}
                          onChange={e => setFormData({...formData, description: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors text-sm resize-none"
                          placeholder="Describe your event..."
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="w-full bg-neutral-950 text-white py-3.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}