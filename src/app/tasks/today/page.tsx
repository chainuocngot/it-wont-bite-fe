import { SunIcon } from 'lucide-react';

import todoApiRequests from '@/api-requests/todo';
import PageContainer from '@/components/page-container';
import QuickTodoForm from '@/components/todo/quick-todo-form';
import TodoList from '@/components/todo/todo-list';
import { groupTodosByStatus } from '@/lib/utils';
import { GroupedTodos } from '@/types/todo';

export default async function Today() {
  let todos: GroupedTodos = {
    inComplete: [],
    completed: [],
    all: [],
  };

  try {
    const todosResponse = await todoApiRequests.sListTodo({
      isToday: true,
    });
    todos = groupTodosByStatus(todosResponse);
  } catch (error) {
    console.log('>> Check | error:', error);
  }

  return (
    <PageContainer
      titleNode={
        <>
          <div className="flex items-center pb-5 gap-3">
            <SunIcon />
            <h2 className="text-xl">Hôm nay</h2>
          </div>
          <QuickTodoForm todayModeCreate />
        </>
      }
    >
      <TodoList groupedItem={todos} showCompleteItem />
    </PageContainer>
  );
}
