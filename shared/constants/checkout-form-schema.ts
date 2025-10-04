import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Name should contain at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name should contain at least 2 characters' }),
  email: z.email({ message: 'Enter a valid email' }),
  phone: z.string().min(9, { message: 'Enter a valid phone number' }),
  address: z.string().min(5, { message: 'Enter a valid address' }),
  notes: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
