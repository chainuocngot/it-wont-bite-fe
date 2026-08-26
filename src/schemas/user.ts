import z from 'zod';

import { ProjectedUserSchema, UserSchema } from '@/schemas/models/user.model';

// Get Me
export const GetMeResSchema = ProjectedUserSchema;

// Get User
export const GetUserByUsernameResSchema = ProjectedUserSchema;

export const GetUserIdParamSchema = z.object({
  userId: z.coerce.number(),
});

export const GetUsernameParamSchema = z.object({
  username: z.string(),
});

// Update Me
export const UpdateMeBodySchema = UserSchema.pick({
  name: true,
  username: true,
  bio: true,
}).partial();

export const UpdateMeResSchema = ProjectedUserSchema;

export type GetMeResType = z.infer<typeof GetMeResSchema>;
export type GetUserByUsernameResType = z.infer<typeof GetUserByUsernameResSchema>;
export type GetUserIdParamType = z.infer<typeof GetUserIdParamSchema>;
export type GetUsernameParamType = z.infer<typeof GetUsernameParamSchema>;
export type UpdateMeBodyType = z.infer<typeof UpdateMeBodySchema>;
export type UpdateMeResType = z.infer<typeof UpdateMeResSchema>;
