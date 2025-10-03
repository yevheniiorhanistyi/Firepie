'use client';

import React from 'react';
import { Trash2Icon } from 'lucide-react';
import { CountButton } from '@/shared/components/common';
import { Button } from '@/shared/components/ui';
import { cn, formatPrice } from '@/shared/lib';

interface CartItemProps {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}

interface Props extends CartItemProps {
  onClickCountButton: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  onClickCountButton,
  onClickRemove,
  loading,
  className
}) => {
  return (
    <div className={cn('flex items-center justify-between flex-wrap gap-2', className)}>
      <div className="flex items-center gap-5 flex-1 min-w-[270px]">
        <img className={cn('w-[60px] h-[60px]', className)} src={imageUrl} />
        <div className='w-full max-w-[60%]' >
          <div className={cn('flex items-center justify-between', className)}>
            <h2 className="text-md xl:text-lg font-bold flex-1 leading-6">{name}</h2>
          </div>
          {details && <p className="text-xs text-gray-400">{details}</p>}
        </div>
      </div>

      <div className="flex items-center w-full justify-between sm:w-auto">
        <h2 className={cn('font-bold', className)}>${formatPrice(price)}</h2>

        <div className="flex items-center gap-5 ml-5">
          <CountButton loading={loading} onClick={onClickCountButton} value={quantity} />
          <Button
            type="button"
            disabled={loading}
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-transparent text-gray-400 hover:text-gray-600"
            onClick={onClickRemove}
          >
            <Trash2Icon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
