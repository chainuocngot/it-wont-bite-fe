import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Props {
  titleNode?: React.ReactNode;
  size?: 'sm' | 'lg';
  children: React.ReactNode;
}

export default function PageContainer({ titleNode, size = 'lg', children }: Props) {
  return (
    <div className="px-6">
      <div
        className={cn('mx-auto', {
          'max-w-7xl': size === 'lg',
          'max-w-240': size === 'sm',
        })}
      >
        {titleNode && <div className="sticky pt-10 top-0 z-10 bg-background">{titleNode}</div>}
        <ScrollArea>{children}</ScrollArea>
      </div>
    </div>
  );
}
