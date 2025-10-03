import React from 'react';
import { WhiteBlock, FormInput } from '@/shared/components/common';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title='2. Personal info' className={className}>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <FormInput label='First name' name='firstName' className='text-base' placeholder='John' required />
        <FormInput label='Last name' name='lastName' className='text-base' placeholder='Doe' required />
        <FormInput label='Email' name='email' className='text-base' placeholder='john.doe@example.com' required />
        <FormInput label='Phone' name='phone' className='text-base' placeholder='+1 123 456 78' type='number' required />
      </div>
    </WhiteBlock>
  );
};