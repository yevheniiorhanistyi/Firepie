import React from 'react';
import Link from 'next/link';
import { Card, Button, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/shared/components/ui';

interface Props {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  isPizza: boolean;
  description?: string | null;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  imageUrl,
  price,
  description,
  isPizza,
}) => {
  const formattedPrice = (price / 100).toFixed(2);
  return (
    <Card className={'w-full h-full max-w-[380px] mx-auto cursor-pointer py-2 border-none shadow-none'}>
      <Link className='flex flex-col h-full' href={`/product/${id}`} scroll={false}>
        <CardContent className="relative w-full h-[300px] overflow-hidden rounded-md">
          <div className="relative w-full h-full overflow-hidden">
            <img
              loading="lazy"
              className="object-contain absolute top-0 left-1/2 -translate-x-1/2 h-full transform transition-transform duration-300 hover:translate-y-1"
              src={imageUrl}
              alt={name}
            />
          </div>
        </CardContent>

        <CardHeader className="flex-grow flex flex-col mb-4">
          <CardTitle className="text-xl font-bold line-clamp-1">{name}</CardTitle>
          <CardDescription className='line-clamp-3'>{description}</CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-between gap-2 items-center">
          <span className="flex items-center gap-1  text-[18px]">
            <b>{isPizza ? 'from' : ''}</b>
            <b> ${formattedPrice}</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            {isPizza ? 'Select' : 'Add to cart'}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};