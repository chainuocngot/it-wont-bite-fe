import { SunIcon } from 'lucide-react';

import todoApiRequests from '@/api-requests/todo';
import TodoList from '@/app/tasks/today/todo-list';
import PageContainer from '@/components/page-container';
import QuickTodoForm from '@/components/todo/quick-todo-form';
import { TodoIncludeLabelsType } from '@/schemas/models/todo';

export default async function Today() {
  let todos: TodoIncludeLabelsType[] = [];

  try {
    todos = await todoApiRequests.sListTodo();
  } catch (error) {
    console.log('>> Check | error:', error);
  }

  return (
    <PageContainer
      titleNode={
        <div className="flex items-center pb-5 gap-3">
          <SunIcon />
          <h2 className="text-xl">Hôm nay</h2>
        </div>
      }
    >
      <QuickTodoForm />
      <TodoList items={todos} />
    </PageContainer>
  );
}
