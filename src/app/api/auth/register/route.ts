import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import authApiRequests from '@/api-requests/auth';
import { COOKIES_AT_INFO_KEY, COOKIES_AT_KEY, COOKIES_RT_KEY } from '@/constants/app';
import { RegisterBodyType, RegisterResType } from '@/schemas/auth';

export async function POST(request: Request): Promise<NextResponse<RegisterResType>> {
  const cookieStore = await cookies();
  const body: RegisterBodyType = await request.json();

  const { accessToken, refreshToken } = await authApiRequests.sRegister(body);

  const decodedAccessToken = jwt.decode(accessToken) as Required<JwtPayload>;
  const decodedRefreshToken = jwt.decode(refreshToken) as Required<JwtPayload>;

  cookieStore.set(COOKIES_AT_KEY, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(decodedAccessToken.exp * 1000),
  });
  cookieStore.set(COOKIES_RT_KEY, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(decodedRefreshToken.exp * 1000),
  });
  cookieStore.set(
    COOKIES_AT_INFO_KEY,
    JSON.stringify({
      exp: decodedAccessToken.exp,
      lifeTime: decodedAccessToken.exp - decodedAccessToken.iat,
    }),
    {
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: decodedAccessToken.exp * 1000,
    },
  );

  return NextResponse.json({
    accessToken,
    refreshToken,
  });
}
