'use client';

import UserLogoutButton from '@/components/app-header/user-logout-button';
import LinkButton from '@/components/link-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetMeQuery } from '@/queries/user';

export default function UserDropdown() {
  const { data: user } = useGetMeQuery();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer"
        nativeButton={false}
        render={
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            render={
              <LinkButton variant="ghost" href={`/@${user.username}`}>
                Tài khoản
              </LinkButton>
            }
          />
          <DropdownMenuSeparator />
          <UserLogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
