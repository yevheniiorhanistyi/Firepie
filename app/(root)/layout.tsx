import { Header } from '@/shared/components/common';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { HeaderSkeleton } from '@/shared/components/common';

export const metadata: Metadata = {
  title: 'Firepie | Home',
  description: 'Order your favorite pizza online with Firepie. Fast delivery, delicious flavors, and easy ordering.',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
