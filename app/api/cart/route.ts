import crypto from 'crypto';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: {
              include: { ingredient: true },
            }
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Failed to get cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) token = crypto.randomUUID();

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            ingredientId: { in: data.ingredients ?? [] },
          },
        },
      },
      include: { ingredients: true },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: { quantity: findCartItem.quantity + 1 },
      });
    } else {
      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
        },
      });

      if (data.ingredients?.length) {
        await prisma.cartItemIngredient.createMany({
          data: data.ingredients.map((ingredientId) => ({
            cartItemId: newCartItem.id,
            ingredientId,
          })),
        });
      }
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Failed to create cart' }, { status: 500 });
  }
}
