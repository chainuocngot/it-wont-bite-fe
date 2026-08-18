import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { COOKIES_RT_KEY, PRIVATE_PATHS, PUBLIC_PATHS } from '@/constants/app';
import { isPathMatched } from '@/lib/utils';

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get(COOKIES_RT_KEY)?.value || null;

  // Trường hợp 1: Chưa login thì không cho vào private paths
  if (!refreshToken && isPathMatched(PRIVATE_PATHS, pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Trường hợp 2: Đã login thì không cho vào public paths
  if (refreshToken && isPathMatched(PUBLIC_PATHS, pathname)) {
    return NextResponse.redirect(new URL('/tasks/today', request.url));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};
