import React from 'react';
import { ProductWithRelations } from '@/@types/prisma';
import { Title } from '@/shared/components/common';
import { Button } from '@/shared/components/ui';
import { cn, formatPrice } from '@/shared/lib';

interface Props {
  product: ProductWithRelations;
  onSubmit: VoidFunction;
  loading?: boolean;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  product,
  onSubmit,
  className,
  loading,
}) => {
  const { name, imageUrl, description, items, weight, size, sauce } = product;
  const formattedPrice = formatPrice(items[0].price);

  return (
    <div
      className={cn(
        className,
        "flex flex-col md:flex-row flex-1 min-h-[500px]"
      )}
    >
      <div className="flex items-center justify-center flex-1 relative w-full bg-white">
        <img
          src={imageUrl}
          alt={name}
          className="transition-all z-10 duration-300 
            w-full max-w-[350px] h-auto max-h-[350px] object-contain"
        />
      </div>

      <div className="w-full md:w-[394px] bg-[#fcfcfc] p-5 md:p-7 flex flex-col justify-between">
        <div className='flex flex-col gap-1 pt-4'>
          <Title text={name} size="md" className="font-extrabold" />
          <p className="text-sm text-gray-400">
            {[size, sauce, weight].filter(Boolean).join(', ')}
          </p>
          <p className="text-sm">{description}</p>
        </div>

        <Button
          loading={loading}
          onClick={() => onSubmit()}
          className="h-[50px] md:h-[55px] px-6 md:px-10 text-base rounded-[14px] md:rounded-[18px] w-full mt-6 md:mt-10"
        >
          Add to Cart for ${formattedPrice}
        </Button>
      </div>
    </div>
  );
};

