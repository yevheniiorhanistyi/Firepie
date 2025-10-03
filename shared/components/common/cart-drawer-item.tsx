import React from 'react';
import { Trash2Icon } from 'lucide-react';
import { CountButton } from '@/shared/components/common';
import { Button, Separator } from '@/shared/components/ui';
import { cn, formatPrice } from '@/shared/lib';

interface CartItemProps {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
}

interface Props extends CartItemProps {
  onClickCountButton: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  loading?: boolean;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  onClickCountButton,
  onClickRemove,
  loading,
  className,
}) => {
  return (
    <div className={cn('flex bg-white p-5 gap-6', className)}>
      <img className={cn('w-[60px] h-[60px]', className)} src={imageUrl} />

      <div className="flex-1">
        <div>
          <div className={cn('flex items-center justify-between', className)}>
            <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
          </div>
          {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
        </div>

        <Separator className='my-3' />

        <div className="flex items-center justify-between">
          <CountButton loading={loading} onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-1 sm:gap-3">
            <h2 className={cn('text-sm sm:text-base ml-2 font-bold', className)}>${formatPrice(price)}</h2>
            <Button
              variant="ghost"
              size="icon"
              className="p-2 hover:bg-transparent text-gray-400 hover:text-gray-600"
              disabled={loading}
              onClick={onClickRemove}
            >
              <Trash2Icon size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
