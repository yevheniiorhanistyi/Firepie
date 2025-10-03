import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Title } from './title';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/';

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
  return (
    <div className={cn(className, 'flex items-center justify-between flex-wrap w-full max-w-[840px] gap-12 ')}>
      <div className="flex flex-col mx-auto">
        <div className="w-[350px] mb-4">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg">{text}</p>
        </div>

        <Button size="lg" variant="outline" className="rounded-xl gap-2" asChild>
          <Link href="/">
            <ArrowLeft />
            Back to home
          </Link>
        </Button>

      </div>

      <img className="mx-auto" src={imageUrl} alt={title} width={300} />
    </div>
  );
};
