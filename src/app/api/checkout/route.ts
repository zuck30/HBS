import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';
import { sendEmail } from '@/lib/brevo';

export async function POST(req: Request) {
  try {
    const { email, name, items, total, paymentMethod } = await req.json();

    // 1. Create order in Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_email: email,
        customer_name: name,
        items,
        total,
        status: paymentMethod === 'stripe' ? 'pending' : 'awaiting_payment',
        payment_method: paymentMethod,
      })
      .select()
      .single();

    if (error) throw error;

    // 2. Handle Stripe
    if (paymentMethod === 'stripe') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: item.images,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/track?id=${order.id}&email=${email}&success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/checkout?canceled=true`,
        customer_email: email,
        metadata: {
          orderId: order.id,
        },
      });

      return NextResponse.json({ url: session.url, orderId: order.id });
    }

    // 3. We will Handle Mix by yas (Placeholder for local payment)
    // typically initiate the Mix by yas API call

    // Send confirmation email via Brevo
    await sendEmail({
      to: [{ email, name }],
      subject: `Order Confirmation - ${order.id.slice(0, 8)}`,
      htmlContent: `<h1>Thank you for your order, ${name}!</h1><p>Your order ID is <strong>${order.id}</strong>. Status: ${order.status}</p>`
    });

    return NextResponse.json({ orderId: order.id });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
