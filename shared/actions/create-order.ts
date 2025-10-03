'use server';

import Stripe from 'stripe';
import { prisma } from '@/prisma/prisma-client';
import { CheckoutFormValues } from '@/shared/constants';
import { OrderStatus } from '@prisma/client';
import { PayOrderTemplate } from '@/shared/components/common';
import { sendEmail } from '@/shared/lib';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;


    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        notes: data.notes,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Order #' + order.id },
            unit_amount: order.totalAmount,
          },
          quantity: 1,
        },
      ],
      metadata: { orderId: String(order.id) },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?paid`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: session.id },
    });

    const payOrderTemplate = await PayOrderTemplate({
      orderId: order.id,
      totalAmount: order.totalAmount,
      paymentUrl: session.url || '',
    });


    await sendEmail(
      data.email,
      'Firepie | Please pay for your order',
      payOrderTemplate,
    );


    return session.url;
  } catch (err) {
    console.log('[CreateOrder] Server error', err);
  }
}