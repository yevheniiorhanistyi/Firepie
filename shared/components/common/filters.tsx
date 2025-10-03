'use client';

import { Input, Button } from '@/shared/components/ui';
import { Title, CheckboxFiltersGroup, RangeSlider } from '@/shared/components/common';
import { useQueryFilters, useIngredients, useFilters } from '@/shared/hooks';

const MIN_PRICE = 0;
const MAX_PRICE = 5000;

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-2 lg:mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Dough type"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.selectedTypes}
        items={[
          { text: 'Thin', value: '1' },
          { text: 'Traditional', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title="Sizes"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.selectedSizes}
        items={[
          { text: '20 cm', value: '20' },
          { text: '30 cm', value: '30' },
          { text: '40 cm', value: '40' },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price range:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0.00"
            min={MIN_PRICE}
            max={MAX_PRICE}
            className="bg-gray-50 border-none"
            value={filters.prices.priceFrom ? filters.prices.priceFrom / 100 : ''}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={MIN_PRICE}
            max={MAX_PRICE}
            placeholder="50.00"
            className="bg-gray-50 border-none"
            value={filters.prices.priceTo ? filters.prices.priceTo / 100 : ''}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={10}
          value={[filters.prices.priceFrom || MIN_PRICE, filters.prices.priceTo || MAX_PRICE]}
          onValueChange={updatePrices}
          formatLabel={(value) => `$${(value / 100).toFixed(2)}`}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ingredients"
        name="ingredients"
        className="mt-5"
        limit={6}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />

      <Button size="lg" onClick={filters.resetFilters} variant="outline" className="my-5 w-full rounded-2xl">Reset</Button>
    </div>
  );
};