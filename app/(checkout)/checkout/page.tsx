'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';

import { Api } from '@/shared/services/api-client';
import { CheckoutFormValues, checkoutFormSchema } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import { createOrder } from '@/shared/actions/create-order';
import { Container, Title, CheckoutSidebar } from '@/shared/components/common';
import { toast } from 'react-hot-toast';
import {
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutAddressForm
} from '@/shared/components/common/checkout';

import { cn } from '@/shared/lib';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      notes: '',
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      if (url) {
        location.href = url;
      }

    } catch (error) {
      console.error('Checkout Submit Error:', error);
      toast.error('Something went wrong. Please try again!');
    } finally {
      setSubmitting(false);
    }
  };

  const onClickCountButton = React.useCallback(
    (id: number, quantity: number, type: 'plus' | 'minus') => {
      const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
    },
    [updateItemQuantity]
  );

  return (
    <Container className='mt-10 px-4'>
      <Title text='Checkout' className='font-extrabold mb-8 text-[36px]' />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-10 flex-wrap'>
            <div className='flex flex-col flex-1 gap-8 mb-0 lg:mb-20'>
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />
              <CheckoutPersonalForm className={cn({ 'opacity-50 pointer-events-none': loading })} />
              <CheckoutAddressForm className={cn({ 'opacity-50 pointer-events-none': loading })} />
            </div>
            <CheckoutSidebar
              totalAmount={totalAmount}
              loading={loading || submitting}
              className='w-full lg:w-[450px] mb-10 lg:mb-0'
            />
          </div>
        </form>
      </FormProvider>

    </Container>
  );
}