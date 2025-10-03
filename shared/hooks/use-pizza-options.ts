import React from 'react';
import { useSet } from 'react-use';
import { ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Variant } from '@/shared/components/common/group-variants';
import { getAvailablePizzaSizes, getAvailablePizzaTypes } from '@/shared/lib';

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  availableTypes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (size: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const availableSizes = getAvailablePizzaSizes(type, items);
  const availableTypes = getAvailablePizzaTypes(items);

  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  React.useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  React.useEffect(() => {
    const isAvailableType = availableTypes?.find(
      (item) => Number(item.value) === type && !item.disabled,
    );
    const availableType = availableTypes?.find((item) => !item.disabled);

    if (!isAvailableType && availableType) {
      setType(Number(availableType.value) as PizzaType);
    }
  }, [size]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    availableTypes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
