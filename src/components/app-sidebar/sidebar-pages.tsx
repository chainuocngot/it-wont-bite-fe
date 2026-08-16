'use client';

import { ClipboardListIcon, StarIcon, SunIcon } from 'lucide-react';

import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import LinkButton from '@/components/link-button';

export function SidebarPages() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupContent className="flex flex-col items-stretch">
        <LinkButton href="/tasks/today" variant="ghost" className="h-11 gap-3 justify-start">
          <SunIcon className="size-5" />
          Hôm nay
        </LinkButton>
        <LinkButton href="#" variant="ghost" className="h-11 gap-3 justify-start">
          <StarIcon className="size-5" />
          Quan trọng
        </LinkButton>
        <LinkButton href="#" variant="ghost" className="h-11 gap-3 justify-start">
          <ClipboardListIcon className="size-5" />
          Tasks
        </LinkButton>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
