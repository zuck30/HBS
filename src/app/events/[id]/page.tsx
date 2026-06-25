'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Calendar, MapPin, Users, Ticket, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState(1); // 1: Info, 2: Book, 3: Success
  const [ticketData, setTicketData] = useState<any>(null);

  useEffect(() => {
    async function fetchEvent() {
      const { data } = await supabase.from('events').select('*').eq('id', id).single();
      if (data) setEvent(data);
      setLoading(false);
    }
    fetchEvent();
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBooking(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: id,
          email,
          name,
          quantity,
          total: event.price * quantity,
          paymentMethod: 'test_payment'
        })
      });
      const data = await res.json();
      if (data.success) {
        setTicketData(data);
        setStep(3);
      }
    } catch (err) {
      alert('Booking failed');
    } finally {
      setBooking(false);
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [100, 150]
    });

    // Simple ticket layout
    doc.setFont('helvetica', 'bold');
    doc.text('NAWWI WELLNESS', 50, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text('OFFICIAL TICKET', 50, 20, { align: 'center' });

    doc.setDrawColor(0);
    doc.line(10, 25, 90, 25);

    doc.setFontSize(12);
    doc.text(event.title, 10, 35);
    doc.setFontSize(8);
    doc.text(new Date(event.date).toLocaleString(), 10, 42);
    doc.text(event.venue, 10, 47);

    doc.text(`Guest: ${name}`, 10, 60);
    doc.text(`Ticket ID: ${ticketData.ticketNumber}`, 10, 65);

    // QR Code
    const qrDataUrl = await QRCode.toDataURL(ticketData.ticketNumber);
    doc.addImage(qrDataUrl, 'PNG', 30, 80, 40, 40);

    doc.save(`Nawwi-Ticket-${ticketData.ticketNumber}.pdf`);
  };

  if (loading) return <div className="pt-40 text-center font-serif text-2xl">Preparing the venue...</div>;
  if (!event) return <div className="pt-40 text-center font-serif text-2xl">Event not found.</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
      <Link href="/events" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-12 hover:text-[#b47878] transition-colors">
        <ArrowLeft size={16} /> Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">{event.title}</h1>
            <div className="flex flex-wrap gap-8 text-neutral-500">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#b47878]" />
                <span className="text-sm font-bold uppercase tracking-wider">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#b47878]" />
                <span className="text-sm font-bold uppercase tracking-wider">{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-[#b47878]" />
                <span className="text-sm font-bold uppercase tracking-wider">{event.seats_remaining} seats left</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg"
          >
            <p className="text-xl leading-relaxed text-gray-600 italic">
              {event.description}
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-neutral-100 p-8 rounded-3xl shadow-xl sticky top-32"
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-neutral-100">
                  <span className="text-neutral-400 font-bold uppercase tracking-widest text-xs">Price per guest</span>
                  <span className="text-2xl font-serif">Tshs. {event.price}</span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={event.seats_remaining <= 0}
                  className="w-full bg-[#b47878] text-white py-5 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-colors"
                >
                  <Ticket size={20} />
                  Book Your Seat
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleBooking} className="space-y-6">
                <h3 className="text-xl font-serif">Guest Details</h3>
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-neutral-100 outline-none focus:border-[#b47878] transition-colors"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-neutral-100 outline-none focus:border-[#b47878] transition-colors"
                />
                <div className="flex justify-between items-center py-4 border-t border-neutral-100">
                  <span className="font-serif text-lg">Total</span>
                  <span className="font-serif text-2xl">Tshs. {event.price}</span>
                </div>
                <button
                  type="submit"
                  disabled={booking}
                  className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#b47878] transition-colors"
                >
                  {booking ? 'Processing...' : 'Confirm & Pay'}
                </button>
              </form>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-2">Booking Confirmed!</h3>
                  <p className="text-sm text-gray-500">Your ticket has been sent to {email}.</p>
                </div>
                <button
                  onClick={generatePDF}
                  className="w-full border-2 border-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Download PDF Ticket
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
