import { Card, CardContent, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function SurfaceCard({
  children,
  className,
  contentClassName,
  ...props
}: CardProps & { contentClassName?: string }) {
  return (
    <Card className={cn('bg-secondary ring-0', className)} {...props}>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
}
