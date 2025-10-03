import React from 'react';
import { Skeleton, Separator } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

interface Props {
  className?: string;
}

export const CheckoutItemsSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <>
      {Array(3).fill(null).map((_, index, arr) => (
        <React.Fragment key={index}>
          <div className={cn('flex items-center justify-between gap-2 flex-wrap', className)}>
            <div className='flex items-center gap-5'>
              <Skeleton className="h-15 w-15 rounded-full" />
              <Skeleton className="h-10 w-50" />
            </div>
            <div className='flex items-center w-full sm:w-auto justify-between'>
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-38 ml-5" />
            </div>
          </div>
          {index !== arr.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </>
  );
};
