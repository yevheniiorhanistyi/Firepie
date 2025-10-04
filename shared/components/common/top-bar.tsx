import { Category } from '@prisma/client';
import { SlidersHorizontal } from 'lucide-react';
import {
  Container,
  Categories,
  SortPopup,
  Filters,
} from '@/shared/components/common';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle
} from '@/shared/components/ui';
import { cn } from '@/shared/lib/css';

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn(
      'sticky top-0 bg-white/70 backdrop-blur-lg px-4 py-3 shadow-lg shadow-black/3 z-10',
      className
    )}>
      <Container className="flex items-center justify-between gap-12">
        <Categories items={categories} />
        <div className='flex items-center ml-auto'>
          <div className='lg:hidden'>
            <Sheet>
              <SheetTrigger className='w-11 h-11 flex items-center justify-center cursor-pointer bg-gray-50 p-2 rounded-xl mb-2'>
                <SlidersHorizontal />
              </SheetTrigger>
              <SheetContent side='left' className='p-4 z-100 overflow-y-auto'>
                <SheetTitle className="sr-only">Filters</SheetTitle>
                <Filters />
                <SheetDescription className="sr-only">Description</SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
          <div className='hidden lg:block'>
            <SortPopup />
          </div>
        </div>
      </Container>
    </div>
  );
};