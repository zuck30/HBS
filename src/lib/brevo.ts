// Simplified Brevo wrapper using transactional emails
// API Reference: https://developers.brevo.com/reference/sendtransacemail

export async function sendEmail({ to, subject, htmlContent }: { to: { email: string; name?: string }[]; subject: string; htmlContent: string }) {
  console.log('[Brevo] Sending email:', { to, subject });

  if (!process.env.BREVO_API_KEY) {
    console.warn('[Brevo] No API key found, skipping email send.');
    return { success: true, mock: true };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Nawwi Wellness', email: 'hello@nawwi.com' },
        to,
        subject,
        htmlContent
      })
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('[Brevo] Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendOrderConfirmation(email: string, name: string, orderId: string, total: number) {
  return sendEmail({
    to: [{ email, name }],
    subject: `Order Confirmation - ${orderId.slice(0, 8)}`,
    htmlContent: `<h1>Thank you for your order, ${name}!</h1><p>Your order ID is ${orderId}. Total: $${total}</p>`
  });
}

export async function sendTicketEmail(email: string, name: string, eventTitle: string, ticketUrl: string) {
  return sendEmail({
    to: [{ email, name }],
    subject: `Your Ticket for ${eventTitle}`,
    htmlContent: `<h1>Your ticket is ready!</h1><p>Event: ${eventTitle}</p><p><a href="${ticketUrl}">Download Ticket</a></p>`
  });
}
