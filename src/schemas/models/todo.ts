import z from 'zod';

import { TodoStatus } from '@/constants/enum';
import { idZod } from '@/constants/zod';
import { ProjectedTodoLabelSchema } from '@/schemas/models/todo-label';

export const TodoSchema = z.object({
  id: idZod,
  userId: idZod,
  title: z.string(),
  status: z.enum(TodoStatus),
  description: z.string().nullish(),
  dueAt: z.iso.datetime().nullish(),
  remindAt: z.iso.datetime().nullish(),
  isFav: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const TodoIncludeLabelsSchema = TodoSchema.extend({
  labels: z.array(ProjectedTodoLabelSchema),
});

export type TodoType = z.infer<typeof TodoSchema>;
export type TodoIncludeLabelsType = z.infer<typeof TodoIncludeLabelsSchema>;
