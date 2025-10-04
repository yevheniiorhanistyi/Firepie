'use client';

import React from 'react';
import { useCategoryStore } from '@/shared/store';
import { Category } from '@prisma/client';
import { Skeleton } from '@/shared/components/ui';
import { cn } from '@/shared/lib/css';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <>
      {
        items.length === 0 ? (
          <Skeleton className='h-13 rounded-2xl' />
        ) : (
          <div className={cn('overflow-x-auto w-full max-w-[483px]', className)}>
            <div className='inline-flex gap-1 bg-transparent md:bg-gray-50 p-1 rounded-2xl mb-2 md:mb-0'>
              {
                items.map(({ name, id }) => (
                  <a className={cn('flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer hover:text-primary transition-colors bg-gray-50',
                    categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                  )} href={`#${name}`} key={id}>
                    {name}
                  </a>
                ))
              }
            </div>
          </div>
        )
      }
    </>
  );
};