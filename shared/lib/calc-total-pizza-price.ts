import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '@/shared/constants';

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice =
    Number(items.find((item) => item.pizzaType === type && item.size === size)?.price) || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return ((pizzaPrice + totalIngredientsPrice) / 100).toFixed(2);
};
