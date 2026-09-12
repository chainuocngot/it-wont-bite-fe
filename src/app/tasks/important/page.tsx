import { StarIcon } from 'lucide-react';

import todoApiRequests from '@/api-requests/todo';
import PageContainer from '@/components/page-container';
import QuickTodoForm from '@/components/todo/quick-todo-form';
import TodoList from '@/components/todo/todo-list';
import { groupTodosByStatus } from '@/lib/utils';
import { GroupedTodos } from '@/types/todo';

export default async function Important() {
  let todos: GroupedTodos = {
    inComplete: [],
    completed: [],
    all: [],
  };

  try {
    const todosResponse = await todoApiRequests.sListTodo({ isFav: true });
    todos = groupTodosByStatus(todosResponse);
  } catch (error) {
    console.log('>> Check | error:', error);
  }

  return (
    <PageContainer
      titleNode={
        <>
          <div className="flex items-center pb-5 gap-3">
            <StarIcon />
            <h2 className="text-xl">Quan trọng</h2>
          </div>
          <QuickTodoForm favModeCreate />
        </>
      }
    >
      <TodoList groupedItem={todos} />
    </PageContainer>
  );
}
