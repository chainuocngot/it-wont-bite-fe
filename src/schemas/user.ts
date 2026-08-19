import z from 'zod';

import { ProjectedUserSchema } from '@/schemas/models/user.model';

// Get Me
export const GetMeResSchema = ProjectedUserSchema;

export type GetMeResType = z.infer<typeof GetMeResSchema>;
