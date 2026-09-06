import http from '@/lib/http';
import { GetListTodoLabelResType } from '@/schemas/todo-label';

const todoLabelApiRequests = {
  //Get Todo Labels
  cListGetTodoLabel: () =>
    http.get<GetListTodoLabelResType>('/api/proxy/todo-labels', {
      toNextServer: true,
    }),
};

export default todoLabelApiRequests;
