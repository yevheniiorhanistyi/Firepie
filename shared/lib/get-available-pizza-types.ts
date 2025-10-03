import { ProductItem } from '@prisma/client';
import { pizzaTypes } from '@/shared/constants';
import { Variant } from '@/shared/components/common/group-variants';

export const getAvailablePizzaTypes = (items: ProductItem[]): Variant[] => {
  const availableTypes = Array.from(new Set(items.map((item) => item.pizzaType)));

  return pizzaTypes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availableTypes.includes(Number(item.value)),
  }));
};