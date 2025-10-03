'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RequiredSymbol, ClearButton, ErrorText } from '@/shared/components/common';
import { Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ name, label, required, className, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const value = mounted ? watch(name) : '';
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className={cn("font-medium mb-1 ml-1", errorText ? "text-red-500" : "")}>
          {label} {required && <RequiredSymbol hasError={!!errorText} />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} aria-invalid={!!errorText} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-1 ml-1" />}
    </div>
  );
};