'use client';

import { ArrowRightToLineIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUiStore } from '@/stores/ui';

export default function CloseTodoDetailSidebarButton() {
  const toggleTodoDetailSidebar = useUiStore((store) => store.toggleTodoDetailSidebar);

  return (
    <Button variant="ghost" size="icon-lg" onClick={() => toggleTodoDetailSidebar(false)}>
      <ArrowRightToLineIcon />
    </Button>
  );
}
