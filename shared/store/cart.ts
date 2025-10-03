import { create } from 'zustand';
import { Api } from '@/shared/services/api-client';
import { CartStateItem, getCartDetails } from '@/shared/lib';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      console.log(data);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));