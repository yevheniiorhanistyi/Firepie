import { calcTotalPizzaPrice } from '@/shared/lib';
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType, mapPizzaType } from '@/shared/constants';

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
  const textDetaills = `${size} cm, ${mapPizzaType[type].toLocaleLowerCase()} dough`;

  return { totalPrice, textDetaills };
};
