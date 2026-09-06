import { ClipboardListIcon, StarIcon, SunIcon } from 'lucide-react';

export const isClient = typeof window !== 'undefined';

export const COOKIES_AT_INFO_KEY = 'at_info';
export const COOKIES_AT_KEY = 'access_token';
export const COOKIES_RT_KEY = 'refresh_token';

export const PRIVATE_PATHS = ['/tasks'];
export const PUBLIC_PATHS = ['/login', '/register'];

export const DAY_NAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
export const START_OF_THE_DAY_HOUR = 9; //9 AM
export const END_OF_THE_DAY_HOUR = 17; //5 PM
export const HOURS_A_DAY = 24;

export const PAGE_ROUTES = [
  {
    href: '/tasks/today',
    Icon: SunIcon,
    title: 'Hôm nay',
  },
  {
    href: '/tasks/important',
    Icon: StarIcon,
    title: 'Quan trọng',
  },
  {
    href: '/tasks/inbox',
    Icon: ClipboardListIcon,
    title: 'Tác vụ',
  },
];
