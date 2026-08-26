import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import authApiRequests from '@/api-requests/auth';
import { COOKIES_AT_INFO_KEY, COOKIES_AT_KEY, COOKIES_RT_KEY } from '@/constants/app';
import { HttpCode } from '@/constants/http';
import { HttpError } from '@/lib/http-error';

export async function POST(request: NextRequest): Promise<Response> {
  const cookieStore = await cookies();
  const refreshTokenInCookie = cookieStore.get(COOKIES_RT_KEY)?.value;

  if (!refreshTokenInCookie) {
    return Response.json(
      new HttpError({
        message: 'ErrorNext.RefreshTokenNotFound',
        statusCode: HttpCode.Unauthorized,
      }),
      {
        status: HttpCode.Unauthorized,
      },
    );
  }

  try {
    const { accessToken, refreshToken } = await authApiRequests.sRefreshToken({
      token: refreshTokenInCookie,
    });

    const decodedAccessToken = jwt.decode(accessToken) as Required<JwtPayload>;
    const decodedRefreshToken = jwt.decode(refreshToken) as Required<JwtPayload>;

    cookieStore.set(COOKIES_AT_KEY, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: decodedAccessToken.exp * 1000,
    });
    cookieStore.set(COOKIES_RT_KEY, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: decodedRefreshToken.exp * 1000,
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
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.statusCode === HttpCode.Unauthorized) {
        cookieStore.delete(COOKIES_RT_KEY);
        cookieStore.delete(COOKIES_AT_KEY);
        cookieStore.delete(COOKIES_AT_INFO_KEY);
      }

      return NextResponse.json(error, {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      new HttpError({
        message: 'Error.Unknown',
        statusCode: HttpCode.InternalServerError,
      }),
      {
        status: HttpCode.InternalServerError,
      },
    );
  }
}
