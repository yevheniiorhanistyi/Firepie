import React from 'react';
import { CountIconButton } from '@/shared/components/common';
import { cn } from '@/shared/lib/css';

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  onClick: (type: 'plus' | 'minus') => void;
  className?: string;
  loading?: boolean;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
  loading,
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-2 sm:gap-3', className)}>
      <CountIconButton
        onClick={() => onClick('minus')}
        loading={loading}
        disabled={value <= 1}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton
        onClick={() => onClick('plus')}
        loading={loading}
        size={size}
        type="plus"
      />
    </div>
  );
};
