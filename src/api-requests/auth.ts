import http from '@/lib/http';
import {
  LoginBodyType,
  LoginResType,
  RefreshTokenBodyType,
  RefreshTokenResType,
  RegisterBodyType,
  RegisterResType,
} from '@/schemas/auth';

const authApiRequests = {
  cRegister: (body: RegisterBodyType) =>
    http.post<RegisterResType>('/api/auth/register', body, {
      toNextServer: true,
    }),
  sRegister: (body: RegisterBodyType) => http.post<RegisterResType>('/auth/register', body),

  cLogin: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, {
      toNextServer: true,
    }),
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),

  cRefreshToken: () =>
    http.post<RefreshTokenResType>('/api/auth/refresh-token', undefined, {
      toNextServer: true,
    }),
  sRefreshToken: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>('/auth/refresh-token', body),
};

export default authApiRequests;
