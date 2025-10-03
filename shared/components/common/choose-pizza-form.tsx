'use client';

import React from 'react';
import { ProductItem, Ingredient } from '@prisma/client';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants';
import { usePizzaOptions } from '@/shared/hooks';
import { Title, PizzaImage, GroupVariants, IngredientItem } from '@/shared/components/common';
import { Button } from '@/shared/components/ui';
import { cn, getPizzaDetails } from '@/shared/lib';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {

  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    availableTypes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div
      className={cn(
        className,
        "flex flex-col lg:flex-row flex-1 min-h-[500px]"
      )}
    >
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-full lg:w-[394px] bg-[#f7f6f5] p-5 lg:p-7 flex flex-col">
        <Title text={name} size="md" className="font-extrabold" />

        <p className="text-gray-400 font-bold mb-2">{textDetaills}</p>

        <div className="flex flex-col gap-2">
          <GroupVariants
            items={availableSizes.map(s => ({ ...s, value: Number(s.value) as PizzaSize }))}
            value={size}
            onClick={setSize}
          />

          <GroupVariants
            items={availableTypes.map(t => ({ ...t, value: Number(t.value) as PizzaType }))}
            value={type}
            onClick={setType}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[316px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                priceCents={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[50px] md:h-[55px] px-6 md:px-10 text-base rounded-[14px] md:rounded-[18px] w-full mt-6 md:mt-10"
        >
          Add to Cart for ${totalPrice}
        </Button>
      </div>
    </div>
  );
};

