import { COOKIES_AT_KEY, isClient } from '@/constants/app';
import { HttpMethod, TypeOfHttpMethod } from '@/constants/enum';
import { HttpCode } from '@/constants/http';
import {
  ApiErrorResponse,
  ApiValidationErrorResponse,
  HttpError,
  ValidationHttpError,
} from '@/lib/http-error';

type ApiEndpoint = `/${string}`;
type HttpRequestOptions = Omit<RequestInit, 'body'> & {
  toNextServer?: boolean;
  query?: object;
};

export async function request<Response>(
  method: TypeOfHttpMethod,
  endpoint: ApiEndpoint,
  options?: HttpRequestOptions & { body?: object },
): Promise<Response> {
  const baseHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  let baseUrl = '';
  if (!options?.toNextServer) {
    const { default: envConfig } = await import('@/config');
    baseUrl = envConfig.API_URL;
  }

  let fullUrl = `${baseUrl}${endpoint}`;
  if (options?.query) {
    const queryString = new URLSearchParams(options.query as URLSearchParams).toString();
    fullUrl = `${fullUrl}?${queryString}`;
  }

  const body = options?.body ? JSON.stringify(options.body) : undefined;

  let accessToken: string | null = null;
  if (!isClient) {
    const { cookies } = await import('next/headers');
    accessToken = (await cookies()).get(COOKIES_AT_KEY)?.value || null;
  }

  if (accessToken) {
    baseHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(fullUrl.toString(), {
    method,
    body,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
  });
  const json: Response = await res.json();

  if (!res.ok) {
    if (res.status === HttpCode.UnprocessableEntity) {
      throw new ValidationHttpError(json as ApiValidationErrorResponse);
    }

    throw new HttpError(json as ApiErrorResponse);
  }

  return json;
}

const http = {
  get: <Response>(endpoint: ApiEndpoint, options?: HttpRequestOptions) =>
    request<Response>(HttpMethod.Get, endpoint, options),
  post: <Response>(endpoint: ApiEndpoint, body?: object, options?: HttpRequestOptions) =>
    request<Response>(HttpMethod.Post, endpoint, { body, ...options }),
  put: <Response>(endpoint: ApiEndpoint, body?: object, options?: HttpRequestOptions) =>
    request<Response>(HttpMethod.Put, endpoint, { body, ...options }),
  patch: <Response>(endpoint: ApiEndpoint, body?: object, options?: HttpRequestOptions) =>
    request<Response>(HttpMethod.Patch, endpoint, { body, ...options }),
  delete: <Response>(endpoint: ApiEndpoint, options?: HttpRequestOptions) =>
    request<Response>(HttpMethod.Delete, endpoint, options),
};

export default http;
