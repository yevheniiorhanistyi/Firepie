import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number).filter(Boolean);
  const pizzaTypes = params.pizzaTypes?.split(',').map(Number).filter(Boolean);
  const ingredientsIdArr = params.ingredients?.split(',').map(Number).filter(Boolean);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        where: {
          ingredients: ingredientsIdArr?.length
            ? { some: { id: { in: ingredientsIdArr } } }
            : undefined,
          items: {
            some: {
              ...(sizes?.length ? { size: { in: sizes } } : {}),
              ...(pizzaTypes?.length ? { pizzaType: { in: pizzaTypes } } : {}),
              price: { gte: minPrice, lte: maxPrice },
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            where: { price: { gte: minPrice, lte: maxPrice } },
            orderBy: { price: 'asc' },
          },
        },
      },
    },
  });

  if (params.sortBy) {
    const [field, direction] = params.sortBy.split(':') as [string, 'asc' | 'desc'];

    for (const category of categories) {
      category.products.sort((a, b) => {
        if (field === 'price') {
          const minA = Math.min(...a.items.map(i => i.price));
          const minB = Math.min(...b.items.map(i => i.price));
          return direction === 'asc' ? minA - minB : minB - minA;
        }

        if (field === 'name') {
          return direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }

        return 0;
      });
    }
  }

  return categories;
};
