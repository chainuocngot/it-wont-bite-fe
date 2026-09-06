'use client';

import { useRouter } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';

import TodoItem from '@/components/todo/todo-item';
import { TypeOfTodoStatus } from '@/constants/enum';
import { getNextTodoStatus, handleApiError } from '@/lib/utils';
import { useUpdateTodoMutation } from '@/queries/todo';
import { TodoIncludeLabelsType, TodoType } from '@/schemas/models/todo';
import { useTodoStore } from '@/stores/todo';
import { useUiStore } from '@/stores/ui';

const updateOptimisticFn = (
  state: TodoIncludeLabelsType[],
  {
    todoId,
    nextStatus,
    nextFav,
  }: { todoId: number; nextStatus?: TypeOfTodoStatus; nextFav?: TodoIncludeLabelsType['isFav'] },
) =>
  state.map((todo) =>
    todo.id === todoId
      ? {
          ...todo,
          status: nextStatus ?? todo.status,
          isFav: nextFav ?? todo.isFav,
        }
      : todo,
  );

export default function TodoList({ items }: { items: TodoIncludeLabelsType[] }) {
  const router = useRouter();
  const { mutateAsync } = useUpdateTodoMutation();

  const [isPendingToggleStatus, startTransitionToggleStatus] = useTransition();
  const [isPendingToggleFav, startTransitionToggleFav] = useTransition();
  const [optimisticTodos, setOptimisticTodo] = useOptimistic(items, updateOptimisticFn);

  const toggleTodoDetailSidebar = useUiStore((store) => store.toggleTodoDetailSidebar);
  const todoInView = useTodoStore((store) => store.todoInView);
  const setTodoInView = useTodoStore((store) => store.setTodoInView);
  const patchTodoInView = useTodoStore((store) => store.patchTodoInView);

  const handleClickTodo = (todo: TodoIncludeLabelsType) => {
    setTodoInView(todo);
    toggleTodoDetailSidebar(true);
  };

  const toggleStatusTodo = (todo: TodoIncludeLabelsType) => {
    const prevStatus = todo.status;
    const nextStatus = getNextTodoStatus(prevStatus);

    startTransitionToggleStatus(async () => {
      setOptimisticTodo({ todoId: todo.id, nextStatus });
      if (todoInView && todoInView.id === todo.id) {
        patchTodoInView({ status: nextStatus });
      }

      try {
        await mutateAsync({
          todoId: todo.id,
          body: {
            status: nextStatus,
          },
        });

        router.refresh();
      } catch (error) {
        handleApiError(error);
        if (todoInView && todoInView.id === todo.id) {
          patchTodoInView({ status: prevStatus });
        }
      }
    });
  };

  const toggleFavTodo = (todo: TodoType) => {
    const prevFav = todo.isFav;
    const nextFav = !prevFav;

    startTransitionToggleFav(async () => {
      setOptimisticTodo({ todoId: todo.id, nextFav });
      if (todoInView && todoInView.id === todo.id) {
        patchTodoInView({ isFav: nextFav });
      }

      try {
        await mutateAsync({
          todoId: todo.id,
          body: {
            isFav: nextFav,
          },
        });

        router.refresh();
      } catch (error) {
        handleApiError(error);
        if (todoInView && todoInView.id === todo.id) {
          patchTodoInView({ isFav: prevFav });
        }
      }
    });
  };

  return optimisticTodos.map((item) => (
    <TodoItem
      key={item.id}
      data={item}
      isInView={todoInView?.id === item.id}
      isPendingToggleStatus={isPendingToggleStatus}
      isPendingToggleFav={isPendingToggleFav}
      onToggleStatus={toggleStatusTodo}
      onToggleFav={toggleFavTodo}
      onClick={handleClickTodo}
    />
  ));
}
