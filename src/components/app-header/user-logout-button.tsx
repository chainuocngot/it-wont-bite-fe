'use client';

import { useRouter } from 'next/navigation';

import authApiRequests from '@/api-requests/auth';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/toast';

export default function UserLogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await toast.promise(authApiRequests.cLogout(), {
      loading: 'Đang đăng xuất...',
      success: 'Đăng xuất thành công!',
      error: 'Đăng xuất thất bại',
    });

    router.push('/');
  };

  return <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>;
}
