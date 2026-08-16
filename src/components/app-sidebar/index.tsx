'use client';

import * as React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import Image from 'next/image';
import { SidebarPages } from '@/components/app-sidebar/sidebar-pages';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-5 px-6 border-b border-sidebar-border">
        <Image
          className="dark:invert h-10 w-30"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={40}
          priority
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarPages />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
