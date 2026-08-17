import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
  titleNode: React.ReactNode;
  children: React.ReactNode;
}

export default function PageContainer({ titleNode, children }: Props) {
  return (
    <div className="px-6">
      <div className="sticky pt-10 top-0 z-10 bg-background">{titleNode}</div>
      <ScrollArea>{children}</ScrollArea>
    </div>
  );
}
