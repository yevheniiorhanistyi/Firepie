import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { sendEmail } from '@/shared/lib';
import { OrderSuccessTemplate } from '@/shared/components/common';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Checkout Callback Error:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        const order = await prisma.order.findFirst({
          where: {
            id: Number(orderId),
          },
        });

        if (orderId && order && order.status !== OrderStatus.SUCCEEDED) {
          await prisma.order.update({
            where: { id: Number(orderId) },
            data: { status: OrderStatus.SUCCEEDED },
          });

          const cart = await prisma.cart.findFirst({
            where: { token: order.token },
          });

          if (cart) {
            await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
            await prisma.cart.update({
              where: { id: cart.id },
              data: { totalAmount: 0 },
            });
          }

          const items: CartItemDTO[] = typeof order.items === 'string'
            ? JSON.parse(order.items)
            : [];

          const emailTemplate = await OrderSuccessTemplate({
            orderId: Number(orderId),
            totalAmount: order.totalAmount,
            items,
          });

          await sendEmail(order.email, 'Firepie | Thanks for your order 🎉', emailTemplate);
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await prisma.order.update({
            where: { id: Number(orderId) },
            data: { status: OrderStatus.CANCELLED },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Checkout Callback Error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
