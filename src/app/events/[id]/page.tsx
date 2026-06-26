'use client';
import React from 'react';
import { jsPDF } from 'jspdf';
import { QrCode, MapPin, Calendar, Clock, Download, ArrowRight } from 'lucide-react';

export default function TicketPage() {
  const ticketData = {
    eventName: "HBS School Tour & Assessment Day",
    date: "June 12, 2026",
    time: "08:00 AM",
    location: "Main Campus, Kigamboni",
    ticketNumber: "HBS-2026-001",
    attendee: "Parent User"
  };

  const downloadTicket = () => {
    const doc = new jsPDF();
    doc.setFont("courier", "bold");
    doc.setFontSize(22);
    doc.text('HANNAH BENNIE SCHOOLS', 105, 30, { align: 'center' });

    doc.setFontSize(12);
    doc.text('OFFICIAL EVENT TICKET', 105, 40, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    doc.setFontSize(10);
    doc.text(`EVENT: ${ticketData.eventName}`, 20, 60);
    doc.text(`DATE: ${ticketData.date}`, 20, 70);
    doc.text(`TIME: ${ticketData.time}`, 20, 80);
    doc.text(`LOCATION: ${ticketData.location}`, 20, 90);
    doc.text(`TICKET #: ${ticketData.ticketNumber}`, 20, 100);
    doc.text(`ATTENDEE: ${ticketData.attendee}`, 20, 110);

    doc.line(20, 120, 190, 120);
    doc.setFontSize(8);
    doc.text('Please present this ticket at the entrance.', 105, 130, { align: 'center' });
    doc.text('hbs.admin@hbs.ac.tz | +255 762 224 224', 105, 135, { align: 'center' });

    doc.save(`HBS-Ticket-${ticketData.ticketNumber}.pdf`);
  };

  return (
    <div className="font-mono pt-32 pb-20 px-6 bg-neutral-50 min-h-screen">
      <div className="max-w-xl mx-auto bg-white border border-neutral-200 overflow-hidden">
        <div className="bg-neutral-950 text-white p-8 text-center space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em]">Official Entry</div>
          <h1 className="text-3xl font-bold uppercase italic tracking-tighter">HBS Events</h1>
        </div>

        <div className="p-12 space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase italic tracking-tighter leading-none">{ticketData.eventName}</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Date</div>
                <div className="text-xs font-bold uppercase">{ticketData.date}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Time</div>
                <div className="text-xs font-bold uppercase">{ticketData.time}</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Location</div>
              <div className="text-xs font-bold uppercase">{ticketData.location}</div>
            </div>
          </div>

          <div className="flex justify-center p-8 bg-neutral-50 border border-neutral-100">
            <QrCode className="w-32 h-32 text-neutral-300" />
          </div>

          <div className="space-y-4 pt-8 border-t border-neutral-100">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
              <span className="text-neutral-400">Ticket Number</span>
              <span>{ticketData.ticketNumber}</span>
            </div>
            <button
              onClick={downloadTicket}
              className="w-full py-5 bg-neutral-950 text-white font-bold uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3"
            >
              Download PDF <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
