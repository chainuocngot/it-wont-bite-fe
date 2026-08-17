'use client';

import { PanelLeftCloseIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export default function CloseAppSidebarButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button variant="ghost" size="icon-lg" onClick={toggleSidebar}>
      <PanelLeftCloseIcon />
    </Button>
  );
}
