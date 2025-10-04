'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
import {
  Button,
  Dialog,
  DialogContent,
  Separator,
  ScrollArea,
  DialogDescription
} from '@/shared/components/ui';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');
  const [submitting, setSubmitting] = React.useState(false);
  const [loadingProvider, setLoadingProvider] = React.useState<'github' | 'google' | null>(null);

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
    setLoadingProvider(null);
    setSubmitting(false);
  };

  const handleProviderSignIn = (provider: 'github' | 'google') => {
    setSubmitting(true);
    setLoadingProvider(provider);
    signIn(provider, {
      callbackUrl: `/?provider=${provider}`,
      redirect: true,
    });
  };


  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="my-0 w-full h-full rounded-none sm:rounded-2xl sm:h-auto sm:max-w-[450px] p-0">
        <ScrollArea className="h-[100dvh] sm:h-auto sm:max-h-[90dvh]">
          <div className="flex flex-col gap-4 justify-center min-h-[100dvh] sm:min-h-0 p-8 md:p-10">
            {type === 'login' ? (
              <LoginForm onClose={handleClose} setSubmitting={setSubmitting} />
            ) : (
              <RegisterForm onClose={handleClose} setSubmitting={setSubmitting} />
            )}
            <Separator />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleProviderSignIn('github')}
                disabled={loadingProvider !== null}
                type="button"
                className="gap-2 h-12 p-2 flex-1"
              >
                {loadingProvider === 'github' ? (
                  <span className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                ) : (
                  <img
                    className="w-6 h-6"
                    src="https://github.githubassets.com/favicons/favicon.svg"
                    alt="GitHub"
                  />
                )}
                GitHub
              </Button>

              <Button
                variant="outline"
                onClick={() => handleProviderSignIn('google')}
                disabled={loadingProvider !== null}
                type="button"
                className="gap-2 h-12 p-2 flex-1"
              >
                {loadingProvider === 'google' ? (
                  <span className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                ) : (
                  <img
                    className="w-6 h-6"
                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                    alt="Google"
                  />
                )}
                Google
              </Button>
            </div>
            <DialogDescription className='w-full text-black'>
              <Button variant="outline" onClick={onSwitchType} type="button" className="w-full h-12">
                {type !== 'login' ? 'Sign In' : 'Sign Up'}
              </Button>
            </DialogDescription>
            {submitting && (
              <div className="absolute inset-0 bg-white/20 flex items-center justify-center z-50" />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};