import React from 'react';
import { PizzaSize, PizzaType } from '@/shared/constants';
import { WhiteBlock, CheckoutItem, CheckoutItemsSkeleton } from '@/shared/components/common';
import { Separator, Skeleton } from '@/shared/components/ui';
import { getCartItemDetails, CartStateItem } from '@/shared/lib';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Cart" className={className}>
      <div className="flex flex-col gap-5 sm:min-w-[500px]">
        {loading
          ? <CheckoutItemsSkeleton />
          : items.map((item, index) => (
            <React.Fragment key={item.id}>
              <CheckoutItem
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize,
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                loading={loading}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
              {index !== items.length - 1 && <Separator />}
            </React.Fragment>
          ))}
      </div>
    </WhiteBlock>
  );
};
