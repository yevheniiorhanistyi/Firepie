'use client';

import React from 'react';
import z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { updateUserInfo } from '@/shared/actions/update-user-info';
import { Container, FormInput, WhiteBlock } from '@/shared/components/common';
import { Button } from '@/shared/components/ui';

const registerSchema = z.object({
  email: z.email({ message: 'Enter a valid email' }),
  fullName: z.string().min(2, 'Full name is required'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().optional(),
})
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type TRegisterForm = z.infer<typeof registerSchema>;

export const ProfileForm = ({ data }: { data: User }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TRegisterForm) => {
    setIsSubmitting(true);

    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      form.reset({
        fullName: data.fullName,
        email: data.email,
        password: '',
        confirmPassword: '',
      });

      toast.success('Your profile has been updated!');
    } catch (error) {
      return toast.error('Failed to update! Please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClickSignOut = () => {
    setIsSubmitting(true);

    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='py-10 px-2'>
        <Container className='max-w-xl'>
          <WhiteBlock title="Personal data">
            <div className='flex flex-col gap-5'>
              <FormInput name="email" label="Email" required />
              <FormInput name="fullName" label="Full name" required />
              <FormInput type="password" name="password" label="Password" required />
              <FormInput type="password" name="confirmPassword" label="Confirm password" required />
              <div className="flex flex-col gap-2 mb-3">
                <Button size="lg" disabled={isSubmitting} className="text-base rounded-xl" type="submit">
                  Save
                </Button>

                <Button
                  onClick={onClickSignOut}
                  variant="outline"
                  size="lg"
                  disabled={isSubmitting}
                  className="text-base rounded-xl"
                  type="button">
                  Sign out
                </Button>
              </div>
            </div>
          </WhiteBlock>
        </Container>
      </form>
    </FormProvider>
  );
};
