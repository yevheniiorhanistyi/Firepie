'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/shared/components/ui';
import { ClearButton, ErrorText, RequiredSymbol } from '@/shared/components/common';
import { cn } from '@/shared/lib';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<Props> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '');
  };

  return (
    <div className={className}>
      <p className={cn("font-medium mb-1 ml-1", errorText ? "text-red-500" : "")}>
        {label} {required && <RequiredSymbol hasError={!!errorText} />}
      </p>

      <div className="relative">
        <Textarea className="min-h-26 text-md" {...register(name)} {...props} aria-invalid={!!errorText} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
