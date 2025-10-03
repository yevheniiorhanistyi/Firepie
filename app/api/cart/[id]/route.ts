import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: Number(id), cart: { token } },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.update({
      where: { id: Number(id) },
      data: { quantity: data.quantity },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: 'Failed to update cart' }, { status: 500 });
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const { id } = await params
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
        cart: { token },
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.delete({
      where: { id: Number(id) },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json(
      { message: 'Failed to remove item from cart' },
      { status: 500 },
    );
  }
}
