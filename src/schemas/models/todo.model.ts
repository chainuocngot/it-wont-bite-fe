import z from 'zod';

import { TodoStatus } from '@/constants/enum';
import { idZod } from '@/constants/zod';

export const TodoSchema = z.object({
  id: idZod,
  userId: idZod,
  title: z.string(),
  status: z.enum(TodoStatus),
  description: z.string().nullish(),
  dueAt: z.date().nullish(),
  remindAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TodoType = z.infer<typeof TodoSchema>;
