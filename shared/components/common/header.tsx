'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  CartButton,
  Container,
  SearchInput,
  ProfileButton,
  AuthModal,
} from '@/shared/components/common';
import { cn } from '@/shared/lib/css';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    const provider = searchParams.get('provider');

    if (provider) {
      const providerName = provider === 'github' ? 'GitHub' : 'Google';
      setTimeout(() => {
        router.replace('/');
        toast.success(`Signed in with ${providerName}`, { duration: 3000 });
      }, 500);
    }

    if (searchParams.has('paid')) {
      setTimeout(() => {
        router.replace('/');
        toast.success('Your order has been paid!', { duration: 3000 });
      }, 500);
    }

    if (searchParams.has('verified')) {
      setTimeout(() => {
        router.replace('/');
        toast.success('Your email has been verified!', { duration: 3000 });
      }, 500);
    }
  }, []);


  return (
    <header className={cn('border-b px-4 md:px-2', className)}>
      <Container className='flex items-center justify-between py-8'>

        <Link className='flex items-center gap-1' href="/">
          <img src="/images/logo.png" alt="Logo" width={38} height={40} />
          <h1 className="text-3xl uppercase font-extrabold text-primary pt-1">Firepie</h1>
        </Link>

        {hasSearch && (
          <div className="hidden sm:flex flex-1 mx-5 md:mx-10">
            <SearchInput />
          </div>
        )}

        <div className='flex items-center gap-2'>
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          <ProfileButton className='' onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>

      </Container>
    </header>
  );
};