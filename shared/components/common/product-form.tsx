'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import { ChoosePizzaForm, ChooseProductForm, } from '@/shared/components/common';
import { ProductCartToast } from '@/shared/components/common/product-cart-toast';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);



  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.custom((t) => (
        <ProductCartToast
          name={product.name}
          imageUrl={product.imageUrl}
          visible={t.visible}
        />
      ), {
        duration: 2000,
      });

      _onSubmit?.();
    } catch (err) {
      toast.error('Failed to add to cart! Please try again!');
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      product={product}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};
