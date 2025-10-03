import { prisma } from '@/prisma/prisma-client';
import { CartDTO } from '@/shared/services/dto/cart.dto';
import { calcCartItemTotalPrice } from '@/shared/lib';

export const updateCartTotalAmount = async (token: string) => {
  const userCart: CartDTO | null = await prisma.cart.findFirst({
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

  if (!userCart) return;

  const totalAmount = userCart.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item);
  }, 0);


  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
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
          ingredients: { include: { ingredient: true } },
        },
      },
    },
  });
};
