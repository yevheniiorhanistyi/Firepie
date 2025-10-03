import React from 'react';
import { WhiteBlock, FormInput, FormTextarea } from '@/shared/components/common';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title='3. Delivery info' className={className}>
      <div className='flex flex-col gap-2'>
        <FormInput label='Address' name='address' className='text-base' placeholder='123 Main St, Apt 4B' required />
        <FormTextarea label='Notes' name='notes' className='text-base' placeholder='E.g. call upon arrival, leave at the door' />
      </div>
    </WhiteBlock>
  );
};