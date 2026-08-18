import React from 'react';

import { AppSidebar } from '@/components/app-sidebar';
import TaskDetailSidebar from '@/components/task/task-detail-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';

export default function TasksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex overflow-hidden max-h-dvh">
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
      <TaskDetailSidebar />
    </div>
  );
}
