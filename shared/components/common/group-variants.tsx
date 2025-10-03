'use client';

import React from 'react';
import { cn } from '@/shared/lib/css';

export type Variant<T extends string | number = string> = {
  name: string;
  value: T;
  disabled?: boolean;
};

interface Props<T extends string | number> {
  items: readonly Variant<T>[];
  onClick?: (value: T) => void;
  value?: T;
  className?: string;
}

export const GroupVariants = <T extends string | number>({ items, onClick, className, value }: Props<T>) => {
  return (
    <div className={cn(className, 'flex justify-between bg-[#F3F3F7] rounded-3xl select-none')}>
      {items.map((item) => (
        <button
          key={item.name}
          disabled={item.disabled}
          onClick={() => onClick?.(item.value)}
          className={cn(
            'flex items-center justify-center cursor-pointer h-[40px] lg:h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-base lg:text-sm font-bold',
            {
              'bg-white shadow': item.value === value,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            },
          )}>
          {item.name}
        </button>
      ))}
    </div>
  );
};
