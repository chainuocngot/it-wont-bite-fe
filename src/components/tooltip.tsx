import type { ReactElement, ReactNode } from 'react';

import { Tooltip as TooltipShadcn, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {
  render: ReactElement;
  content: ReactNode | string;
};

export function Tooltip({ render, content }: Props) {
  return (
    <TooltipShadcn>
      <TooltipTrigger render={render} />

      <TooltipContent>{content}</TooltipContent>
    </TooltipShadcn>
  );
}
