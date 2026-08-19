'use client';

import * as React from 'react';

import CloseAppSidebarButton from '@/components/app-sidebar/close-app-sidebar-button';
import { SidebarPages } from '@/components/app-sidebar/sidebar-pages';
import { Sidebar, SidebarContent, SidebarProvider, SidebarRail } from '@/components/ui/sidebar';

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
        <SidebarContent>
          <CloseAppSidebarButton />
          <SidebarPages />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
