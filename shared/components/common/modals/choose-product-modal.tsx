'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/components/ui/dialog';
import { ProductForm } from '@/shared/components/common';
import { cn } from '@/shared/lib/css';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(Boolean(product));
  }, [product]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      router.push('/', { scroll: false });
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "w-full h-full min-h-screen rounded-none md:rounded-2xl md:min-h-0 md:h-auto md:max-w-[621px] lg:max-w-[924px] md:max-h-[95vh] bg-white overflow-y-auto overflow-x-hidden md:mx-auto p-0",
          className,
        )}
      >

        <DialogTitle className="sr-only">Choose Product Form</DialogTitle>
        <ProductForm product={product} onSubmit={() => handleOpenChange(false)} />
        <DialogDescription className="sr-only">Description</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};