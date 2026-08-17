import React from 'react';

import { TaskDetailSidebarContent } from '@/components/task/task-detail-sidebar-content';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function TaskDetailSidebar() {
  return (
    <SidebarProvider
      id="task-detail-sidebar"
      className="w-fit overflow-hidden max-h-dvh"
      style={
        {
          '--sidebar-width': '22.5rem',
          '--sidebar-width-mobile': '20rem',
        } as React.CSSProperties
      }
    >
      <TaskDetailSidebarContent />
    </SidebarProvider>
  );
}
