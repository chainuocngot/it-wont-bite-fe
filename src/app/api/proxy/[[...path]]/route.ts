import { NextResponse } from 'next/server';

import { HttpMethod, TypeOfHttpMethod } from '@/constants/enum';
import { HttpCode } from '@/constants/http';
import { request } from '@/lib/http';
import { HttpError } from '@/lib/http-error';

const NO_NEED_BODY_METHODS: Partial<TypeOfHttpMethod>[] = [HttpMethod.Get, HttpMethod.Delete];

async function proxy(
  req: Request,
  { params }: { params: Promise<{ path?: string[] | undefined }> },
) {
  const { path } = await params;

  const isThisMethodHasBody = !NO_NEED_BODY_METHODS.includes(req.method as TypeOfHttpMethod);

  const body: object | undefined = isThisMethodHasBody ? await req?.json() : undefined;

  const endpoint: `/${string}` = path ? `/${path.join('/')}` : '/';

  try {
    const resultJson = await request<Response>(req.method as TypeOfHttpMethod, endpoint, {
      body: NO_NEED_BODY_METHODS.includes(req.method as TypeOfHttpMethod) ? undefined : body,
    });

    return NextResponse.json(resultJson);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error, {
        status: error.statusCode,
      });
    } else {
      return NextResponse.json(
        {
          message: 'ErrorNext.Unknown',
        },
        {
          status: HttpCode.InternalServerError,
        },
      );
    }
  }
}

export { proxy as DELETE, proxy as GET, proxy as PATCH, proxy as POST, proxy as PUT };
