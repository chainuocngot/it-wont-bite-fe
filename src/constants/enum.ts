export const HttpMethod = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Patch: 'PATCH',
  Delete: 'DELETE',
} as const;

export type TypeOfHttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

export const TodoStatus = {
  Todo: 'Todo',
  InProgress: 'InProgress',
  Completed: 'Completed',
  Cancelled: 'Cancelled',
} as const;

export type TypeOfTodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus];
