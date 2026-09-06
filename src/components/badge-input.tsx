import omit from 'lodash/omit';
import { XIcon } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface BadgeInputValue {
  id: number;
  label: string;
  className?: string;
}

interface BadgeInputProps {
  values: BadgeInputValue[];
  onClickBadge?: (value: BadgeInputValue) => void;
  inputProps?: React.ComponentProps<typeof Input>;
}

export default function BadgeInput({ values, inputProps, onClickBadge }: BadgeInputProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <Badge
          data-dropdown-ignore
          key={value.label}
          variant="outline"
          onClick={() => onClickBadge?.(value)}
          className={cn('h-6 pl-2.5 cursor-pointer hover:bg-primary/20', value.className)}
        >
          {value.label}
          <XIcon data-icon="inline-end" />
        </Badge>
      ))}
      <Input
        className={cn('p-0 h-6 ghost-input flex-1 min-w-1/2', inputProps?.className)}
        {...omit(inputProps, 'className')}
      />
    </div>
  );
}
