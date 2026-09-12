import { TodoIncludeLabelsType } from '@/schemas/models/todo';

export type GroupedTodos = {
  all: TodoIncludeLabelsType[];
  completed: TodoIncludeLabelsType[];
  inComplete: TodoIncludeLabelsType[];
};
