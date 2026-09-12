'use client';

import { useRouter } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';

import TodoItem from '@/components/todo/todo-item';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TodoStatus, TypeOfTodoStatus } from '@/constants/enum';
import { getNextTodoStatus, handleApiError } from '@/lib/utils';
import { useUpdateTodoMutation } from '@/queries/todo';
import { TodoIncludeLabelsType, TodoType } from '@/schemas/models/todo';
import { useTodoStore } from '@/stores/todo';
import { useUiStore } from '@/stores/ui';
import { GroupedTodos } from '@/types/todo';

interface Props {
  groupedItem: GroupedTodos;
  showCompleteItem?: boolean;
}

const updateOptimisticFn = (
  state: GroupedTodos,
  {
    todoId,
    nextStatus,
    nextFav,
  }: {
    todoId: number;
    nextStatus?: TypeOfTodoStatus;
    nextFav?: TodoIncludeLabelsType['isFav'];
  },
): GroupedTodos => {
  const updateTodo = (todo: TodoIncludeLabelsType) =>
    todo.id === todoId
      ? {
          ...todo,
          status: nextStatus ?? todo.status,
          isFav: nextFav ?? todo.isFav,
        }
      : todo;

  if (nextStatus === undefined) {
    return {
      ...state,
      all: state.all.map(updateTodo),
      completed: state.completed.map(updateTodo),
      inComplete: state.inComplete.map(updateTodo),
    };
  }

  // Khi status thay đổi, lấy todo từ `all`
  const todo = state.all.find((item) => item.id === todoId);

  if (!todo) {
    return state;
  }

  const updatedTodo = updateTodo(todo);

  return {
    all: state.all.map(updateTodo),

    completed:
      nextStatus === TodoStatus.Completed
        ? [...state.completed.filter((item) => item.id !== todoId), updatedTodo]
        : state.completed.filter((item) => item.id !== todoId),

    inComplete:
      nextStatus === TodoStatus.Todo
        ? [...state.inComplete.filter((item) => item.id !== todoId), updatedTodo]
        : state.inComplete.filter((item) => item.id !== todoId),
  };
};

export default function TodoList({ groupedItem, showCompleteItem }: Props) {
  const router = useRouter();
  const { mutateAsync } = useUpdateTodoMutation();

  const [isPendingToggleStatus, startTransitionToggleStatus] = useTransition();
  const [isPendingToggleFav, startTransitionToggleFav] = useTransition();
  const [optimisticTodos, setOptimisticTodo] = useOptimistic(groupedItem, updateOptimisticFn);

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

  return (
    <>
      {optimisticTodos.inComplete.map((item) => (
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
      ))}

      {showCompleteItem && (
        <Accordion className="mt-3">
          <AccordionItem>
            <AccordionTrigger>
              Đã hoàn thành
              <span className="text-muted-foreground ml-2">{optimisticTodos.completed.length}</span>
            </AccordionTrigger>
            <AccordionContent>
              {optimisticTodos.completed.map((item) => (
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
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}
