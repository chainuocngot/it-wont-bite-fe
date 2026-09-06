import type { LucideIcon } from 'lucide-react';
import { Children, Fragment, type ReactNode } from 'react';

interface MetaIconItemProps {
  icon: LucideIcon;
  label: string;
}

export function MetaIconItem({ icon: Icon, label }: MetaIconItemProps) {
  return (
    <div className="flex items-center gap-1">
      <Icon className="size-3" />
      {label}
    </div>
  );
}

export function MetaList({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);

  return (
    <div className="flex items-center gap-2">
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <span>·</span>}
          {item}
        </Fragment>
      ))}
    </div>
  );
}
