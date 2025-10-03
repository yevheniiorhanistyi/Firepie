import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function createPaymentIntent(orderId: number, amount: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    metadata: { orderId: String(orderId) },
  });

  return paymentIntent;
}
