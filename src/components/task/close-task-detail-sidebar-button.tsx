'use client';

import { ArrowRightToLineIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUiStore } from '@/stores/ui';

export default function CloseTaskDetailSidebarButton() {
  const toggleTaskDetailSidebar = useUiStore((store) => store.toggleTaskDetailSidebar);

  return (
    <Button variant="ghost" size="icon-lg" onClick={() => toggleTaskDetailSidebar(false)}>
      <ArrowRightToLineIcon />
    </Button>
  );
}
