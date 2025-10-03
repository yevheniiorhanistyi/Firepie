'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface Filters {
  selectedSizes: Set<string>;
  selectedTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
  sortBy: string;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
  setSortBy: (value: string) => void;
  resetFilters: () => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();

  const useToggleSet = (initial: Set<string>) => {
    const [set, setSet] = React.useState<Set<string>>(initial);
    const toggle = (value: string) => {
      setSet(prev => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          next.add(value);
        }
        return next;
      });
    };
    return [set, toggle, setSet] as const;
  };

  const [selectedIngredients, toggleIngredients, setSelectedIngredients] = useToggleSet(
    new Set(searchParams.get('ingredients')?.split(',').filter(Boolean))
  );

  const [selectedSizes, toggleSizes, setSelectedSizes] = useToggleSet(
    new Set(searchParams.get('sizes')?.split(',').filter(Boolean))
  );

  const [selectedTypes, togglePizzaTypes, setSelectedTypes] = useToggleSet(
    new Set(searchParams.get('pizzaTypes')?.split(',').filter(Boolean))
  );


  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const [sortBy, setSortBy] = React.useState<string>(
    searchParams.get('sortBy') || 'name:asc'
  );

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setSelectedIngredients(new Set());
    setSelectedSizes(new Set());
    setSelectedTypes(new Set());
    setPrices({ priceFrom: undefined, priceTo: undefined });
  };

  return React.useMemo(
    () => ({
      selectedSizes,
      selectedTypes,
      selectedIngredients,
      prices,
      sortBy,
      setSortBy,
      resetFilters,
      setPrices: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [selectedSizes, selectedTypes, selectedIngredients, prices, sortBy],
  );
};
