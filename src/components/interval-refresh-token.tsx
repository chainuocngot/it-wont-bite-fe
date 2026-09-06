'use client';

import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import authApiRequests from '@/api-requests/auth';
import { COOKIES_AT_INFO_KEY, COOKIES_AT_KEY, PUBLIC_PATHS } from '@/constants/app';
import { HttpCode } from '@/constants/http';
import { HttpError } from '@/lib/http-error';
import { isPathMatched } from '@/lib/utils';

const REFRESH_TOKEN_CHECK_INTERVAL = 10_000;
const NO_NEED_CHECK_PATHS = [...PUBLIC_PATHS];

export default function IntervalRefreshToken() {
  const router = useRouter();
  const hasInitializedRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    // Khi ở trang public thì không cần refresh token
    if (isPathMatched(NO_NEED_CHECK_PATHS, pathname) || pathname === '/') return;

    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const handleRefreshToken = async () => {
      try {
        const accessTokenFromCookie = Cookies.get(COOKIES_AT_KEY);
        const accessTokenInfoFromCookie = Cookies.get(COOKIES_AT_INFO_KEY);

        // Trường hợp 1: Khi AT vẫn còn trong cookie
        // Cần có access token để biết thời gian sống để set interval
        if (accessTokenInfoFromCookie && accessTokenFromCookie) {
          const accessTokenInfo = accessTokenInfoFromCookie
            ? (JSON.parse(accessTokenInfoFromCookie) as {
                exp: number;
                lifeTime: number;
              })
            : null;

          if (!accessTokenInfo?.exp || !accessTokenInfo?.lifeTime) return;

          const now = new Date().getTime() / 1000 - 1;
          const accessTokenRemainingLifetime = accessTokenInfo.exp - now;

          if (accessTokenRemainingLifetime <= accessTokenInfo.lifeTime / 3) {
            await authApiRequests.cRefreshToken();
          }
        } else {
          // Trường hợp 2: Khi user mở app sau 1 khoảng thời gian và AT đã hết hạn (biến mất khỏi cookie)
          await authApiRequests.cRefreshToken();
          router.refresh();
        }
      } catch (error) {
        if (error instanceof HttpError && error.statusCode === HttpCode.Unauthorized) {
          router.push('/login');
        }
      }
    };

    void handleRefreshToken();
    const timer = setInterval(handleRefreshToken, REFRESH_TOKEN_CHECK_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [pathname, router]);

  return null;
}
