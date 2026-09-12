import z from 'zod';

import { TodoStatus } from '@/constants/enum';
import { idZod } from '@/constants/zod';
import { TodoIncludeLabelsSchema, TodoSchema } from '@/schemas/models/todo';
import { MessageResSchema } from '@/schemas/response';

// Create Todo
export const CreateTodoBodySchema = TodoSchema.pick({
  title: true,
  status: true,
  description: true,
  dueAt: true,
  remindAt: true,
  isFav: true,
  removeFromTodayAt: true,
})
  .extend({
    status: TodoSchema.shape.status.default(TodoStatus.Todo),
    description: TodoSchema.shape.description.optional(),
    dueAt: TodoSchema.shape.dueAt.optional(),
    remindAt: TodoSchema.shape.remindAt.optional(),
    isFav: TodoSchema.shape.isFav.default(false).optional(),
    removeFromTodayAt: TodoSchema.shape.removeFromTodayAt.optional(),
  })
  .strict();

export const CreateTodoResSchema = TodoSchema;

// List Todo
export const ListTodoFilterQuerySchema = TodoSchema.pick({
  isFav: true,
})
  .extend({
    status: z.array(z.enum(TodoStatus)),
    isToday: z.boolean(),
  })
  .partial()
  .strict();

export const ListTodoResSchema = z.array(TodoIncludeLabelsSchema);

// Update Todo
export const UpdateTodoBodySchema = TodoSchema.pick({
  title: true,
  status: true,
  description: true,
  dueAt: true,
  remindAt: true,
  isFav: true,
  removeFromTodayAt: true,
})
  .extend({
    labels: z.array(idZod),
  })
  .partial()
  .strict();

export const UpdateTodoResSchema = TodoSchema;

export const GetTodoIdParamSchema = z.object({
  todoId: z.coerce.number(),
});

// Get Todo Detail
export const GetTodoDetailResSchema = TodoSchema;

// Delete Todo
export const DeleteTodoResSchema = MessageResSchema;

export type CreateTodoBodyType = z.infer<typeof CreateTodoBodySchema>;
export type CreateTodoResType = z.infer<typeof CreateTodoResSchema>;
export type ListTodoFilterQueryType = z.infer<typeof ListTodoFilterQuerySchema>;
export type ListTodoResType = z.infer<typeof ListTodoResSchema>;
export type UpdateTodoBodyType = z.infer<typeof UpdateTodoBodySchema>;
export type UpdateTodoResType = z.infer<typeof UpdateTodoResSchema>;
export type GetTodoIdParamType = z.infer<typeof GetTodoIdParamSchema>;
export type GetTodoDetailResType = z.infer<typeof GetTodoDetailResSchema>;
export type DeleteTodoResType = z.infer<typeof DeleteTodoResSchema>;
