import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import authApiRequests from '@/api-requests/auth';
import { COOKIES_AT_INFO_KEY, COOKIES_AT_KEY, COOKIES_RT_KEY } from '@/constants/app';
import { LogoutResType } from '@/schemas/auth';

export async function POST(): Promise<NextResponse<LogoutResType>> {
  const cookieStore = await cookies();
  const refreshTokenInCookie = cookieStore.get(COOKIES_RT_KEY)?.value;

  let logoutRes: LogoutResType;

  try {
    if (!refreshTokenInCookie) {
      throw new Error('Error.RefreshTokenNotFound');
    }

    logoutRes = await authApiRequests.sLogout({
      refreshToken: refreshTokenInCookie,
    });
  } finally {
    cookieStore.delete(COOKIES_AT_KEY);
    cookieStore.delete(COOKIES_RT_KEY);
    cookieStore.delete(COOKIES_AT_INFO_KEY);
  }

  return NextResponse.json(
    logoutRes || {
      message: 'Success.Logout',
    },
  );
}
