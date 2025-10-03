'use client';

import React from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/shared/store';
import { CartDrawer } from '@/shared/components/common';
import { Button, Separator, Badge } from '@/shared/components/ui';
import { cn, formatPrice } from '@/shared/lib';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const loading = useCartStore((state) => state.loading);

  const formattedTotal = formatPrice(totalAmount);

  return (
    <CartDrawer>
      {
        items.length > 0 ? (
          <Button
            loading={loading}
            size="lg"
            className={cn('group fixed bottom-6 right-6 md:relative md:bottom-auto md:right-auto rounded-full md:rounded-xl py-2 w-[50px] h-[50px] md:w-[126px] md:h-[40px] bg-white md:bg-primary  border md:border-0 z-50 md:z-0', className)}
          >
            <b className="hidden md:inline">$ {formattedTotal}</b>
            <Separator orientation="vertical" className="hidden md:inline h-6" />
            <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
              <ShoppingCart className='size-6 md:size-4 relative stroke-black md:stroke-white' strokeWidth={1.6} />
              <span className='hidden md:inline'>{items.length}</span>
            </div>
            <ArrowRight
              size={20}
              className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
            {
              items.length > 0 && (
                <Badge className="flex md:hidden h-6 w-6 rounded-full absolute top-1 right-1 translate-x-1/2 -translate-y-1/2 items-center justify-center text-xs">
                  {items.length}
                </Badge>
              )
            }
          </Button>
        ) : (
          <Button
            loading={loading}
            size="lg"
            className="hidden md:flex font-bold rounded-xl w-[126px]"
          >
            My order
          </Button>
        )
      }
    </CartDrawer>
  );
};