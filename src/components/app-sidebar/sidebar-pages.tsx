import { ClipboardListIcon, StarIcon, SunIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import LinkButton from '@/components/link-button';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { PAGE_ROUTES } from '@/constants/app';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/stores/ui';

export function SidebarPages() {
  const pathname = usePathname();

  const todoDetailSidebarOpen = useUiStore((store) => store.todoDetailSidebarOpen);
  const toggleTodoDetailSidebar = useUiStore((store) => store.toggleTodoDetailSidebar);

  const onClickChangePage = () => {
    if (todoDetailSidebarOpen) {
      toggleTodoDetailSidebar();
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupContent className="flex flex-col items-stretch">
        {PAGE_ROUTES.map((route) => {
          const Icon = route.Icon;

          return (
            <LinkButton
              key={route.href}
              href={route.href}
              variant="ghost"
              onClick={onClickChangePage}
              className={cn('h-11 gap-3 justify-start', {
                'bg-muted': route.href === pathname,
              })}
            >
              <Icon className="size-5" />
              {route.title}
            </LinkButton>
          );
        })}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
