import { useQuery } from '@tanstack/react-query';

import todoLabelApiRequests from '@/api-requests/todo-label';

export const useListTodoLabelQuery = () => {
  return useQuery({
    queryKey: ['getTodoLabels'],
    queryFn: () => todoLabelApiRequests.cListGetTodoLabel(),
  });
};
