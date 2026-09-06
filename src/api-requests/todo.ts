import http from '@/lib/http';
import { TodoType } from '@/schemas/models/todo';
import {
  CreateTodoBodyType,
  CreateTodoResType,
  DeleteTodoResType,
  ListTodoResType,
  UpdateTodoBodyType,
  UpdateTodoResType,
} from '@/schemas/todo';

const todoApiRequests = {
  // List todo
  cListTodo: () =>
    http.get<ListTodoResType>('/api/proxy/todos', {
      toNextServer: true,
    }),
  sListTodo: () => http.get<ListTodoResType>('/todos'),

  // Create todo
  cCreateTodo: (body: CreateTodoBodyType) =>
    http.post<CreateTodoResType>('/api/proxy/todos', body, {
      toNextServer: true,
    }),

  // Update todo
  cUpdateTodo: (todoId: TodoType['id'], body: UpdateTodoBodyType) =>
    http.patch<UpdateTodoResType>(`/api/proxy/todos/${todoId}`, body, {
      toNextServer: true,
    }),

  // Delete todo
  cDeleteTodo: (todoId: TodoType['id']) =>
    http.delete<DeleteTodoResType>(`/api/proxy/todos/${todoId}`, {
      toNextServer: true,
    }),
};

export default todoApiRequests;
