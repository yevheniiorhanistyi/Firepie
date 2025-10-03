import { CartItemDTO } from '@/shared/services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients?.reduce(
    (acc, ci) => acc + ci.ingredient.price,
    0
  ) ?? 0;

  return (ingredientsPrice + item.productItem.price) * item.quantity;
};
