import { useMutation, useQueryClient } from '@tanstack/react-query';

import todoApiRequests from '@/api-requests/todo';
import { TodoType } from '@/schemas/models/todo';
import { CreateTodoBodyType, UpdateTodoBodyType } from '@/schemas/todo';

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateTodoBodyType) => todoApiRequests.cCreateTodo(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['GetListTodo'] });
    },
  });
};

export const useUpdateTodoMutation = () => {
  return useMutation({
    mutationFn: ({ todoId, body }: { todoId: TodoType['id']; body: UpdateTodoBodyType }) =>
      todoApiRequests.cUpdateTodo(todoId, body),
  });
};

export const useDeleteTodoMutation = () => {
  return useMutation({
    mutationFn: ({ todoId }: { todoId: TodoType['id'] }) => todoApiRequests.cDeleteTodo(todoId),
  });
};
