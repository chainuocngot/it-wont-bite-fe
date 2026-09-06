import z from 'zod';

import { UserSchema } from '@/schemas/models/user';
import { MessageResSchema } from '@/schemas/response';

// Register
export const RegisterBodySchema = UserSchema.pick({
  email: true,
  name: true,
  pwd: true,
})
  .extend({
    cf_pwd: z.string(),
  })
  .strict();

export const RegisterResSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
});

// Login
export const LoginBodySchema = UserSchema.pick({
  email: true,
  pwd: true,
}).strict();

export const LoginResSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
});

// Refresh Token
export const RefreshTokenBodySchema = z
  .object({
    token: z.jwt(),
  })
  .strict();

export const RefreshTokenResSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
});

// Logout
export const LogoutBodySchema = z
  .object({
    refreshToken: z.jwt(),
  })
  .strict();

export const LogoutResSchema = MessageResSchema;

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>;
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>;
export type LogoutBodyType = z.infer<typeof LogoutBodySchema>;
export type LogoutResType = z.infer<typeof LogoutResSchema>;
