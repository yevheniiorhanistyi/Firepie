import React from 'react';
import { CircleCheck } from 'lucide-react';
import { cn } from '@/shared/lib/css';

interface Props {
  imageUrl: string;
  name: string;
  priceCents: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  active,
  priceCents,
  name,
  imageUrl,
  onClick,
}) => {
  const price = (priceCents / 100).toFixed(2);
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md lg:w-24 text-center relative cursor-pointer shadow-md bg-white border border-transparent',
        { 'border-primary': active },
        className,
      )}
      onClick={onClick}>
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <img width={87} height={87} src={imageUrl} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">${price}</span>
    </div>
  );
};
