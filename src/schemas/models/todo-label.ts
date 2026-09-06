import z from 'zod';

import { idZod } from '@/constants/zod';

export const TodoLabelSchema = z.object({
  id: idZod,
  name: z.string(),
  color: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const ProjectedTodoLabelSchema = TodoLabelSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type TodoLabelType = z.infer<typeof TodoLabelSchema>;
export type ProjectedTodoLabelType = z.infer<typeof ProjectedTodoLabelSchema>;
