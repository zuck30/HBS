import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/brevo';

export async function POST(req: Request) {
  try {
    const { eventId, email, name, quantity, total, paymentMethod } = await req.json();

    // 1. Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_email: email,
        customer_name: name,
        items: [{ type: 'event', event_id: eventId, quantity, price: total / quantity }],
        total,
        status: 'confirmed',
        payment_method: paymentMethod,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Create ticket
    const ticketNumber = `NW-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        order_id: order.id,
        event_id: eventId,
        ticket_number: ticketNumber,
        qr_code: ticketNumber, // Simple for now
      })
      .select()
      .single();

    if (ticketError) throw ticketError;

    // 3. Update seats remaining
    const { data: event } = await supabase.from('events').select('seats_remaining').eq('id', eventId).single();
    if (event) {
      await supabase
        .from('events')
        .update({ seats_remaining: event.seats_remaining - quantity })
        .eq('id', eventId);
    }

    // 4. Send email (stub for Brevo)
    await sendEmail({
      to: [{ email, name }],
      subject: `Your Ticket for Nawwi Event - ${ticketNumber}`,
      htmlContent: `<h1>You're going!</h1><p>Your ticket number is ${ticketNumber}.</p>`
    });

    return NextResponse.json({ success: true, orderId: order.id, ticketNumber });
  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
