'use client';

import React from 'react';
import Link from 'next/link';
import { useClickAway, useDebounce } from 'react-use';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import { Api } from '@/shared/services/api-client';
import { cn } from '@/shared/lib/css';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState<Product[]>([]);
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    },
    250,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
  };

  return (
    <>
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}

      <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative h-10 z-30', className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-accent pl-11"
          type="text"
          placeholder="Search pizzas..."
          value={searchQuery}
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12',
            )}>
            {products.map((product) => (
              <Link
                key={product.id}
                onClick={onClickItem}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}>
                <img className="rounded-sm h-8 w-8" src={product.imageUrl} alt={product.name} />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};