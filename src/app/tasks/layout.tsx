import React from 'react';

import { AppSidebar } from '@/components/app-sidebar';
import TodoDetailSidebar from '@/components/todo/todo-detail-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';

export default function TodosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex overflow-hidden max-h-dvh">
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
      <TodoDetailSidebar />
    </div>
  );
}
