import { Cart, CartItem, Ingredient, Product, ProductItem } from '@prisma/client';

export type CartItemIngredientDTO = {
  cartItemId: number;
  ingredientId: number;
  ingredient: Ingredient;
};

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: CartItemIngredientDTO[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}
