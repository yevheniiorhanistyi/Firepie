import { Metadata } from 'next';
import { Suspense } from 'react';
import { Container, Header } from '@/shared/components/common';

export const metadata: Metadata = {
  title: 'Firepie | Checkout',
  description: 'Order your favorite pizza online with Firepie. Fast delivery, delicious flavors, and easy ordering.',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense>
        <Header hasSearch={false} hasCart={false} className="border-b-gray-200" />
      </Suspense>
      <Container>
        {children}
      </Container>
    </main>
  );
}
