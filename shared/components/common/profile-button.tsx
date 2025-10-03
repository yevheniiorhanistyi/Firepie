import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CircleUser, User } from 'lucide-react';
import { Button } from '@/shared/components/ui';

interface Props {
  onClickSignIn: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session, status } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button
          variant="outline"
          size="lg"
          disabled={status === 'loading'}
          onClick={onClickSignIn}
          className="flex items-center gap-2 rounded-xl"
        >
          <CircleUser className="size-4" strokeWidth={1.6} />
          <span>Sign In</span>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-2 rounded-xl"
          asChild
        >
          <Link href="/profile">
            <CircleUser className="size-4" strokeWidth={1.6} />
            <span>Profile</span>
          </Link>
        </Button>
      )}
    </div>
  );
};
