'use client';

import React from 'react';
import { ProductWithRelations } from '@/@types/prisma';
import { Title, ProductCard } from '@/shared/components/common';
import { useCategoryStore } from '@/shared/store';
import { useSafeIntersection } from '@/shared/hooks';
import { cn } from '@/shared/lib/css';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const [threshold, setThreshold] = React.useState(0.4);
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef<HTMLDivElement>(null);
  const intersection = useSafeIntersection(
    intersectionRef,
    React.useMemo(() => ({ threshold }), [threshold])
  );

  React.useEffect(() => {
    const handleResize = () => {
      const newThreshold = window.innerWidth < 768 ? 0.1 : 0.4;
      setThreshold((prev) => (prev !== newThreshold ? newThreshold : prev));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection, categoryId]);

  return (
    <div
      id={title}
      className={cn("scroll-mt-40 sm:scroll-mt-28", className)}
      ref={intersectionRef}
    >
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3', listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            description={product.description}
            isPizza={Boolean(product.items[0].pizzaType)}
          />
        ))}
      </div>
    </div>
  );
};