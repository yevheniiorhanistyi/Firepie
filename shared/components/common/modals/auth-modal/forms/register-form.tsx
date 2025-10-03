import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '@/shared/components/common';
import { Button, DialogTitle } from '@/shared/components/ui';
import { registerUser } from '@/shared/actions/register-user';

interface Props {
  onClose: () => void;
  setSubmitting: (value: boolean) => void;
}

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

export const RegisterForm: React.FC<Props> = ({ onClose, setSubmitting }) => {
  const form = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TRegisterForm) => {
    setSubmitting(true);

    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Confirm your Email!');

      onClose();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <DialogTitle className='text-2xl font-bold'>Sign Up</DialogTitle>
            <p className="text-gray-400">Create your account</p>
          </div>
          <img src="/images/docs.png" alt="phone-icon" width={60} height={60} />
        </div>
        <FormInput name="email" label="Email" autoComplete="email" required />
        <FormInput name="fullName" label="Full name" autoComplete="name" required />
        <FormInput name="password" label="Password" type="password" autoComplete="new-password" required />
        <FormInput name="confirmPassword" label="Confirm password" autoComplete="new-password" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Sign Up
        </Button>
      </form>
    </FormProvider>
  );
};