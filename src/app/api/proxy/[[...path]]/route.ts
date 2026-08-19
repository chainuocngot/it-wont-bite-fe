import { NextResponse } from 'next/server';

import { HttpMethod, TypeOfHttpMethod } from '@/constants/enum';
import { request } from '@/lib/http';

const NO_NEED_BODY_METHODS: Partial<TypeOfHttpMethod>[] = [HttpMethod.Get, HttpMethod.Delete];

async function proxy(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;

  const isThisMethodHasBody = !NO_NEED_BODY_METHODS.includes(req.method as TypeOfHttpMethod);

  const body: object | undefined = isThisMethodHasBody ? await req?.json() : undefined;

  const endpoint: `/${string}` = `/${path.join('/')}`;

  const resultJson = await request<Response>(req.method as TypeOfHttpMethod, endpoint, {
    body: NO_NEED_BODY_METHODS.includes(req.method as TypeOfHttpMethod) ? undefined : body,
  });

  return NextResponse.json(resultJson);
}

export { proxy as DELETE, proxy as GET, proxy as PATCH, proxy as POST, proxy as PUT };
