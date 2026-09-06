import { ClipboardListIcon, StarIcon, SunIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import LinkButton from '@/components/link-button';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { PAGE_ROUTES } from '@/constants/app';
import { cn } from '@/lib/utils';

export function SidebarPages() {
  const pathname = usePathname();

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
