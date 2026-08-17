'use client';

import {
  BellIcon,
  CalendarClockIcon,
  PaperclipIcon,
  PencilIcon,
  StarIcon,
  SunIcon,
  TagIcon,
  TrashIcon,
} from 'lucide-react';
import * as React from 'react';

import SurfaceCard from '@/components/surface-card';
import CloseTaskDetailSidebarButton from '@/components/task/close-task-detail-sidebar-button';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import { useUiStore } from '@/stores/ui';

export function TaskDetailSidebarContent({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, toggleSidebar } = useSidebar();

  const taskDetailSidebarOpen = useUiStore((store) => store.taskDetailSidebarOpen);

  React.useEffect(() => {
    if (!open && taskDetailSidebarOpen) {
      toggleSidebar();
    } else if (open && !taskDetailSidebarOpen) {
      toggleSidebar();
    }
  }, [open, taskDetailSidebarOpen, toggleSidebar]);

  return (
    <Sidebar collapsible="offcanvas" side="right" {...props}>
      <SidebarHeader className="pt-5 pb-0 px-6">
        <SurfaceCard className="border-b">
          <div className="flex items-center gap-3">
            <Checkbox />
            <p className="text-sm">Title</p>
            <Button variant="ghost" size="icon-sm" className="ml-auto">
              <StarIcon className="size-5" />
            </Button>
          </div>
        </SurfaceCard>
      </SidebarHeader>
      <SidebarContent className="px-6">
        <div className="space-y-2">
          <SurfaceCard className="py-2">
            <div className="flex items-center gap-2">
              <PencilIcon className="size-4" />
              <Input
                autoFocus
                placeholder="Thêm bước"
                className="focus-visible:ring-0 pl-3 border-none focus:outline-none bg-transparent! py-0"
              />
            </div>
          </SurfaceCard>

          <SurfaceCard className="py-3.5">
            <div className="flex items-center gap-2">
              <SunIcon className="size-4" />
              <p className="text-sm">Thêm vào Hôm nay</p>
            </div>
          </SurfaceCard>

          <div className="flex flex-col items-stretch">
            <SurfaceCard className="py-3.5 border-b">
              <div className="flex items-center gap-2">
                <BellIcon className="size-4" />
                <p className="text-sm">Nhắc tôi</p>
              </div>
            </SurfaceCard>
            <SurfaceCard className="py-3.5">
              <div className="flex items-center gap-2">
                <CalendarClockIcon className="size-4" />
                <p className="text-sm">Thêm ngày đến hạn</p>
              </div>
            </SurfaceCard>
          </div>

          <SurfaceCard className="py-3.5">
            <div className="flex items-center gap-2">
              <TagIcon className="size-4" />
              <p className="text-sm">Thêm nhãn</p>
            </div>
          </SurfaceCard>

          <SurfaceCard className="py-3.5">
            <div className="flex items-center gap-2">
              <PaperclipIcon className="size-4" />
              <p className="text-sm">Thêm tệp</p>
            </div>
          </SurfaceCard>

          <SurfaceCard className="py-2" contentClassName="px-2">
            <Textarea
              placeholder="Thêm ghi chú"
              className="focus-visible:ring-0 border-none focus:outline-none bg-transparent!"
            />
          </SurfaceCard>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-stretch">
          <CloseTaskDetailSidebarButton />
          <div className="flex items-center justify-center flex-1">
            <p className="text-xs text-muted-foreground">Đã tạo vào T7, 17 tháng 10</p>
          </div>
          <Button variant="ghost" size="icon-lg">
            <TrashIcon />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
