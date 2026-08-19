import z from 'zod';

import { TodoStatus } from '@/constants/enum';
import { TodoSchema } from '@/schemas/models/todo.model';
import { MessageResSchema } from '@/schemas/response';

// Create Todo
export const CreateTodoBodySchema = TodoSchema.pick({
  title: true,
  status: true,
  description: true,
  dueAt: true,
  remindAt: true,
})
  .extend({
    status: TodoSchema.shape.status.default(TodoStatus.Todo),
    description: TodoSchema.shape.description.optional(),
    dueAt: TodoSchema.shape.dueAt.optional(),
    remindAt: TodoSchema.shape.remindAt.optional(),
  })
  .strict();

export const CreateTodoResSchema = TodoSchema;

// List Todo
export const ListTodoResSchema = z.array(TodoSchema);

// Update Todo
export const UpdateTodoBodySchema = TodoSchema.pick({
  title: true,
  status: true,
  description: true,
  dueAt: true,
  remindAt: true,
}).strict();

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
export type ListTodoResType = z.infer<typeof ListTodoResSchema>;
export type UpdateTodoBodyType = z.infer<typeof UpdateTodoBodySchema>;
export type UpdateTodoResType = z.infer<typeof UpdateTodoResSchema>;
export type GetTodoIdParamType = z.infer<typeof GetTodoIdParamSchema>;
export type GetTodoDetailResType = z.infer<typeof GetTodoDetailResSchema>;
export type DeleteTodoResType = z.infer<typeof DeleteTodoResSchema>;
