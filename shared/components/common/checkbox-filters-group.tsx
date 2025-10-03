'use client';

import React from 'react';
import { FilterChecboxProps, FilterCheckbox } from '@/shared/components/common/filter-checkbox';
import { Input, Skeleton } from '@/shared/components/ui';

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  className?: string;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = 'Search...',
  className,
  loading,
  onClickCheckbox,
  selected,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const list = React.useMemo(() => {
    const base = showAll
      ? items.filter((i) => i.text.toLowerCase().includes(searchValue.toLowerCase()))
      : items;

    if (base.length <= limit) {
      return base;
    }

    if (showAll) {
      return base;
    }

    const sorted = [...base].sort((a, b) => {
      const aSel = selected?.has(a.value) ? 1 : 0;
      const bSel = selected?.has(b.value) ? 1 : 0;
      return bSel - aSel;
    });

    return sorted.slice(0, limit);
  }, [items, selected, showAll, searchValue, limit]);


  if (loading) {
    return (
      <div className={className}>
        <Skeleton className="w-20 h-6 mb-5 rounded-lg" />
        {Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />)}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            value={searchValue}
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-2 lg:gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item) => (
          <FilterCheckbox
            key={item.value}
            name={name}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={!!selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3 hover:text-primary/80 cursor-pointer"
          >
            {showAll ? '- Show less' : '+ Show more'}
          </button>
        </div>
      )}
    </div>
  );
};
