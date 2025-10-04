'use client';

import React from 'react';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react"
import { Analytics } from "@vercel/analytics/next"

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster position="bottom-left" />
      <NextTopLoader
        color="#ff6900"
        showSpinner={false}
      />
      <Analytics />
    </>
  );
};
