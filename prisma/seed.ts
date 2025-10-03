import { categories, _ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcryptjs';

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Cheesy Inferno',
      imageUrl: '/images/pizzas/four-cheese.avif',
      description:
        'A fiery mix of mozzarella, cheddar, parmesan and blue cheese on creamy white sauce.',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 8),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Forest Ham Melt',
      imageUrl: '/images/pizzas/ham-mushrooms.avif',
      description:
        'Juicy ham, fresh mushrooms and extra mozzarella on a classic tomato base.',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(8, _ingredients.length),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Smoky Carbonara Fire',
      imageUrl: '/images/pizzas/carbonara.avif',
      description:
        'Creamy sauce with mozzarella, smoky bacon, garlic, cheddar, mushrooms, red onion and cherry tomatoes.',
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: 'Pepperoni Passion',
      imageUrl: '/images/pizzas/pepperoni.avif',
      description:
        'A classic favorite loaded with spicy pepperoni and extra mozzarella on a rich tomato sauce.',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(8, _ingredients.length),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: 'Hawaiian Heatwave',
      imageUrl: '/images/pizzas/hawaiian.avif',
      description:
        'A tropical twist with ham, pineapple chunks, jalapeños and mozzarella on a tangy tomato base.',
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: 'BBQ Chicken Supreme',
      imageUrl: '/images/pizzas/chicken-bbq.avif',
      description:
        'Tender chicken, smoky BBQ sauce, red onions, mozzarella, and peppers on a classic crust.',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 8),
      },
    },
  });


  await prisma.productItem.createMany({
    data: [
      // Four Cheese
      { productId: pizza1.id, pizzaType: 1, size: 30, price: 1499 },
      { productId: pizza1.id, pizzaType: 1, size: 40, price: 1899 },

      // Ham & Mushrooms
      { productId: pizza2.id, pizzaType: 1, size: 20, price: 999 },
      { productId: pizza2.id, pizzaType: 1, size: 30, price: 1399 },
      { productId: pizza2.id, pizzaType: 1, size: 40, price: 1799 },
      { productId: pizza2.id, pizzaType: 2, size: 20, price: 999 },
      { productId: pizza2.id, pizzaType: 2, size: 30, price: 1399 },
      { productId: pizza2.id, pizzaType: 2, size: 40, price: 1799 },

      // Carbonara
      { productId: pizza3.id, pizzaType: 1, size: 20, price: 1199 },
      { productId: pizza3.id, pizzaType: 1, size: 30, price: 1599 },
      { productId: pizza3.id, pizzaType: 1, size: 40, price: 1999 },
      { productId: pizza3.id, pizzaType: 2, size: 20, price: 1199 },
      { productId: pizza3.id, pizzaType: 2, size: 30, price: 1599 },
      { productId: pizza3.id, pizzaType: 2, size: 40, price: 1999 },

      // Pepperoni
      { productId: pizza4.id, pizzaType: 2, size: 20, price: 999 },
      { productId: pizza4.id, pizzaType: 2, size: 30, price: 1399 },
      { productId: pizza4.id, pizzaType: 2, size: 40, price: 1799 },

      // Hawaiian
      { productId: pizza5.id, pizzaType: 1, size: 20, price: 1099 },
      { productId: pizza5.id, pizzaType: 1, size: 30, price: 1499 },
      { productId: pizza5.id, pizzaType: 1, size: 40, price: 1899 },

      // Chicken BBQ
      { productId: pizza6.id, pizzaType: 1, size: 20, price: 1199 },
      { productId: pizza6.id, pizzaType: 1, size: 30, price: 1599 },
      { productId: pizza6.id, pizzaType: 2, size: 20, price: 1199 },
      { productId: pizza6.id, pizzaType: 2, size: 30, price: 1599 },

      // Snacks
      { productId: 1, price: 699 },
      { productId: 2, price: 649 },
      { productId: 3, price: 599 },
      { productId: 4, price: 799 },
      { productId: 5, price: 399 },
      { productId: 6, price: 749 },

      // Desserts
      { productId: 7, price: 549 },
      { productId: 8, price: 549 },
      { productId: 9, price: 599 },
      { productId: 10, price: 299 },
      { productId: 11, price: 299 },

      // Drinks
      { productId: 12, price: 249 },
      { productId: 13, price: 249 },
      { productId: 14, price: 249 },

      // Sauces
      { productId: 15, price: 99 },
      { productId: 16, price: 99 },
      { productId: 17, price: 99 },
      { productId: 18, price: 109 },
      { productId: 19, price: 99 },
      { productId: 20, price: 109 },
    ],
  });


  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        create: [
          { ingredientId: 1 },
          { ingredientId: 2 },
          { ingredientId: 3 },
        ],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
