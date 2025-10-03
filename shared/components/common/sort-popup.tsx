'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/shared/components/ui/';
import { cn } from '@/shared/lib';

interface Props {
  className?: string;
}

const sortOptions = [
  { value: 'name:asc', label: 'Name (A-Z)' },
  { value: 'name:desc', label: 'Name (Z-A)' },
  { value: 'price:asc', label: 'Price: Low to High' },
  { value: 'price:desc', label: 'Price: High to Low' },
];

export const SortPopup: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('sortBy') || 'name:asc';

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', value);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const currentLabel = sortOptions.find((o) => o.value === current)?.label || 'Name (A-Z)';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
            className,
          )}
        >
          <ArrowUpDown size={16} />
          <b>Sort by:</b>
          <b className="text-primary">{currentLabel}</b>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortOptions.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            className="pl-4 pr-10 cursor-pointer"
            onClick={() => handleSelect(opt.value)}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
