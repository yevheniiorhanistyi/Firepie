import React from 'react';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import {
  WhiteBlock,
  CheckoutItemDetails,
} from '@/shared/components/common';
import { Button, Separator, Skeleton } from '@/shared/components/ui';
import { formatPrice } from '@/shared/lib';

const VAT = 0.1;
const DELIVERY = 299;

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
  const vatPrice = totalAmount * VAT;
  const totalPrice = totalAmount + vatPrice + DELIVERY;
  return (
    <div className={className}>
      <WhiteBlock className='static lg:sticky lg:top-4 lg:p-6'>
        <div className='flex flex-col gap-1'>
          <span className='text-xl'>Total</span>
          {loading ? (
            <Skeleton className='h-11 w-32 rounded-xl' />
          ) : (
            <span className='h-11 text-[34px] font-extrabold'>${formatPrice(totalPrice)}</span>
          )}
        </div>

        <Separator className='my-2' />

        <CheckoutItemDetails title={
          <div className='flex items-center'>
            <Package size={18} className='mr-2 text-gray-400' />
            Cart total:
          </div>
        } value={loading ? <Skeleton className='h-6 w-16 rounded-sm' /> : `$${formatPrice(totalAmount)}`} />
        <CheckoutItemDetails title={
          <div className='flex items-center'>
            <Percent size={18} className='mr-2 text-gray-400' />
            Taxes:
          </div>
        } value={loading ? <Skeleton className='h-6 w-16 rounded-sm' /> : `$${formatPrice(vatPrice)}`} />
        <CheckoutItemDetails title={
          <div className='flex items-center'>
            <Truck size={18} className='mr-2 text-gray-400' />
            Delivery:
          </div>
        } value={loading ? <Skeleton className='h-6 w-16 rounded-sm' /> : `$${formatPrice(DELIVERY)}`} />

        <Button
          type="submit"
          loading={loading}
          className="relative group w-full h-12 text-base">
          Proceed to Payment
          <ArrowRight className="absolute top-1/2 right-1/4 w-5 translate-x-2 -translate-y-1/2 transition duration-300 group-hover:translate-x-4" />
        </Button>
      </WhiteBlock>
    </div>
  );
};