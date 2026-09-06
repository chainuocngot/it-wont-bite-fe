import { StarIcon } from 'lucide-react';

import todoApiRequests from '@/api-requests/todo';
import TodoList from '@/app/tasks/today/todo-list';
import PageContainer from '@/components/page-container';
import QuickTodoForm from '@/components/todo/quick-todo-form';
import { TodoIncludeLabelsType } from '@/schemas/models/todo';

export default async function Important() {
  let todos: TodoIncludeLabelsType[] = [];

  try {
    todos = await todoApiRequests.sListTodo({ isFav: true });
  } catch (error) {
    console.log('>> Check | error:', error);
  }

  return (
    <PageContainer
      titleNode={
        <div className="flex items-center pb-5 gap-3">
          <StarIcon />
          <h2 className="text-xl">Quan trọng</h2>
        </div>
      }
    >
      <QuickTodoForm favMode />
      <TodoList items={todos} />
    </PageContainer>
  );
}
