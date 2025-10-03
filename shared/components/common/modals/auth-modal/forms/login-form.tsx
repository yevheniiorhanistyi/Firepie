import React from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/shared/components/common';
import { DialogTitle, Button } from '@/shared/components/ui';
import { signIn } from 'next-auth/react';

interface Props {
  onClose: () => void;
  setSubmitting: (value: boolean) => void;
}

const loginSchema = z.object({
  email: z.email({ message: 'Enter a valid email' }),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

type TLoginForm = z.infer<typeof loginSchema>;

export const LoginForm: React.FC<Props> = ({ onClose, setSubmitting }) => {
  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TLoginForm) => {
    setSubmitting(true);

    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (!res?.ok) {
        return toast.error("Invalid email or password");
      }

      toast.success('Successfully logged in!');

      onClose();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Failed to login! Please try again!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <DialogTitle className='text-2xl font-bold'>Sign in</DialogTitle>
            <p className="text-sm md:text-base text-gray-400">Enter your email and password</p>
          </div>
          <img src="/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="Email" autoComplete="email" required />
        <FormInput name="password" label="Password" type="password" autoComplete="current-password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
};