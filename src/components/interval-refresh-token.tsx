'use client';

import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import React from 'react';

import authApiRequests from '@/api-requests/auth';
import { COOKIES_AT_INFO_KEY, PUBLIC_PATHS } from '@/constants/app';
import { isPathMatched } from '@/lib/utils';

const REFRESH_TOKEN_CHECK_INTERVAL = 10_000;
const NO_NEED_CHECK_PATHS = [...PUBLIC_PATHS];

export default function IntervalRefreshToken() {
  const pathname = usePathname();

  React.useEffect(() => {
    // Khi ở trang public thì không cần refresh token
    if (isPathMatched(NO_NEED_CHECK_PATHS, pathname) || pathname === '/') return;

    const handleRefreshToken = async () => {
      const accessTokenInfoFromCookie = Cookies.get(COOKIES_AT_INFO_KEY);

      // Trường hợp 1: Khi AT vẫn còn trong cookie
      // Cần có access token để biết thời gian sống để set interval
      if (accessTokenInfoFromCookie) {
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
      }
    };

    void handleRefreshToken();
    const timer = setInterval(handleRefreshToken, REFRESH_TOKEN_CHECK_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [pathname]);

  return null;
}
