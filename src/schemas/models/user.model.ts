import z from 'zod';

import { idZod } from '@/constants/zod';

export const UserSchema = z.object({
  id: idZod,
  email: z.email(),
  pwd: z.string(),
  name: z.string(),
  username: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProjectedUserSchema = UserSchema.pick({
  id: true,
  email: true,
  name: true,
  username: true,
  createdAt: true,
});

export type UserType = z.infer<typeof UserSchema>;
export type ProjectedUserType = z.infer<typeof ProjectedUserSchema>;
