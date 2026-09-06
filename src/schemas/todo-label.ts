import z from 'zod';

import { TodoLabelSchema } from '@/schemas/models/todo-label';

export const GetListTodoLabelResSchema = z.array(TodoLabelSchema);

export type GetListTodoLabelResType = z.infer<typeof GetListTodoLabelResSchema>;
