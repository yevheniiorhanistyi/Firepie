'use client';

import React from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const params: Record<string, string | number | string[] | number[]> = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.selectedTypes),
        sizes: Array.from(filters.selectedSizes),
        ingredients: Array.from(filters.selectedIngredients),
        sortBy: filters.sortBy,
      };

      if (filters.sortBy) {
        params.sortBy = filters.sortBy;
      }

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      router.push(`?${query}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [
    filters.selectedTypes,
    filters.selectedSizes,
    filters.selectedIngredients,
    filters.prices.priceFrom,
    filters.prices.priceTo,
    filters.prices,
    filters.sortBy,
    router,
  ]);

};
