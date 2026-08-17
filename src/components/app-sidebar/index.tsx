'use client';

import Image from 'next/image';
import * as React from 'react';

import CloseAppSidebarButton from '@/components/app-sidebar/close-app-sidebar-button';
import { SidebarPages } from '@/components/app-sidebar/sidebar-pages';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider
      id="app-sidebar"
      className="w-fit overflow-hidden max-h-dvh"
      style={
        {
          '--sidebar-width': '18rem',
          '--sidebar-width-mobile': '15rem',
        } as React.CSSProperties
      }
    >
      <Sidebar collapsible="offcanvas" {...props}>
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
          <CloseAppSidebarButton />
          <SidebarPages />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
