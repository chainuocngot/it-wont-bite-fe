import http from '@/lib/http';
import { ListTodoResType } from '@/schemas/todo';

const todoApiRequests = {
  cListTodo: () =>
    http.get<ListTodoResType>('/api/proxy/todos', {
      toNextServer: true,
    }),
  sListTodo: () => http.get<ListTodoResType>('/todos'),
};

export default todoApiRequests;
