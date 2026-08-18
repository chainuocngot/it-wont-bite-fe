import z from 'zod';

import { idZod } from '@/constants/zod';

export const UserSchema = z.object({
  id: idZod,
  email: z.email(),
  pwd: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserType = z.infer<typeof UserSchema>;
