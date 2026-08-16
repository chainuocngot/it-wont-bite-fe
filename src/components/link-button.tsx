import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = Pick<ButtonPrimitive.Props, 'className'> &
  VariantProps<typeof buttonVariants> & { children: React.ReactNode; href: string };

export default function LinkButton({ children, href, className, ...props }: Props) {
  return (
    <Link href={href} className={cn(buttonVariants(props), className)}>
      {children}
    </Link>
  );
}
