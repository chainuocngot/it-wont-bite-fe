import React from 'react';

import { TodoDetailSidebarContent } from '@/components/todo/todo-detail-sidebar-content';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function TodoDetailSidebar() {
  return (
    <SidebarProvider
      id="todo-detail-sidebar"
      className="w-fit overflow-hidden max-h-dvh"
      defaultOpen={false}
      style={
        {
          '--sidebar-width': '22.5rem',
          '--sidebar-width-mobile': '20rem',
        } as React.CSSProperties
      }
    >
      <TodoDetailSidebarContent />
    </SidebarProvider>
  );
}
