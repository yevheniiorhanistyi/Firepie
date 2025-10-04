'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { PizzaType, PizzaSize } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails, formatPrice } from '@/shared/lib';
import { CartDrawerItem, Title } from '@/shared/components/common';
import {
  Button,
  Separator,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetClose,
} from '@/shared/components/ui';

import { cn } from '@/shared/lib';



export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
  const [redirecting, setRedirecting] = React.useState(false);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const formattedTotalAmount = formatPrice(totalAmount);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-0 bg-muted">
        <ScrollArea className="h-[100dvh]">
          <div className={cn(!totalAmount && 'justify-center', "flex flex-col min-h-dvh")}>
            <SheetHeader className={cn(totalAmount <= 0 && 'hidden', 'px-4')}>
              <SheetTitle className='tex-base sm:text-2xl'>
                You’ve got {items.length} {items.length === 1 ? 'item' : 'items'}
              </SheetTitle>
            </SheetHeader>

            {!totalAmount && (
              <div className="flex flex-col items-center justify-center w-72 mx-auto px-4">
                <img src="/images/empty-box.png" alt="Empty cart" width={120} height={120} />
                <Title size="sm" text="Cart is empty" className="text-center font-bold my-2" />
                <p className="text-center text-neutral-500 mb-5">
                  You probably haven't ordered pizza yet. To order pizza, go to the main page.
                </p>

                <SheetClose asChild>
                  <Button className="relative group w-56 h-12 text-base" size="lg">
                    <ArrowLeft className="absolute top-1/2 left-1/3 w-5 -translate-x-3 -translate-y-1/2 transition duration-300 group-hover:-translate-x-5" />
                    Go back
                  </Button>
                </SheetClose>
              </div>
            )}

            {totalAmount > 0 && (
              <div className="flex flex-col grow mb-4">
                {items.map((item) => (
                  <div key={item.id} className="mb-2">
                    <CartDrawerItem
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
                  </div>
                ))}
              </div>
            )}

            <SheetFooter className={cn(totalAmount <= 0 && 'hidden', "mt-auto p-0")}>
              <div className="w-full p-8 bg-white shadow-[0_-2px_3px_0px_rgba(0,0,0,0.1)]">
                <SheetDescription className="flex items-center justify-between text-sm font-bold text-black">
                  <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                  <span>${formattedTotalAmount}</span>
                </SheetDescription>
                <Separator className="my-4" />
                <div className="flex items-center justify-between text-lg font-bold mb-4">
                  <span>Total</span>
                  <span>${formattedTotalAmount}</span>
                </div>

                <Link href="/checkout">
                  <Button
                    onClick={() => setRedirecting(true)}
                    loading={redirecting}
                    disabled={loading}
                    type="submit"
                    className="relative group w-full h-12 text-base">
                    Checkout
                    <ArrowRight className="hidden sm:flex absolute top-1/2 right-1/3 w-5 translate-x-2 -translate-y-1/2 transition duration-300 group-hover:translate-x-4" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};