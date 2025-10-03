import React from 'react';
import { cn } from '@/shared/lib';

interface Props {
  title?: React.ReactNode;
  value?: React.ReactNode;
  className?: string;
}

export const CheckoutItemDetails: React.FC<Props> = ({ title, value, className }) => {
  return (
    <div className={cn('flex my-4', className)}>
      <span className='flex flex-1 text-lg text-neutral-500'>{title}</span>
      <span className='text-lg font-bold'>{value}</span>
    </div>
  );
};