import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { addDays, startOfDay } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { getNextTodoStatus, handleApiError } from '@/lib/utils';
import { TodoType } from '@/schemas/models/todo';
import { UpdateTodoBodyType, UpdateTodoResType } from '@/schemas/todo';
import { useTodoStore } from '@/stores/todo';

export function useToggleStatusTodo({
  todoInView,
  mutateFn,
}: {
  todoInView: TodoType | null | undefined;
  mutateFn: UseMutateAsyncFunction<
    UpdateTodoResType,
    Error,
    { todoId: TodoType['id']; body: UpdateTodoBodyType }
  >;
}) {
  const router = useRouter();
  const patchTodoInView = useTodoStore((store) => store.patchTodoInView);

  const [isPendingToggleStatus, startTransitionToggleStatus] = useTransition();

  const toggleStatusTodo = () => {
    if (!todoInView) return;

    const prevStatus = todoInView.status;
    const nextStatus = getNextTodoStatus(prevStatus);

    patchTodoInView({ status: nextStatus });

    startTransitionToggleStatus(async () => {
      try {
        await mutateFn({
          todoId: todoInView.id,
          body: {
            status: nextStatus,
          },
        });

        router.refresh();
      } catch (error) {
        handleApiError(error);
        patchTodoInView({ status: prevStatus });
      }
    });
  };

  return {
    isPendingToggleStatus,
    toggleStatusTodo,
  };
}

export function useToggleFavTodo({
  todoInView,
  mutateFn,
}: {
  todoInView: TodoType | null | undefined;
  mutateFn: UseMutateAsyncFunction<
    UpdateTodoResType,
    Error,
    { todoId: TodoType['id']; body: UpdateTodoBodyType }
  >;
}) {
  const router = useRouter();
  const patchTodoInView = useTodoStore((store) => store.patchTodoInView);

  const [isPendingToggleFav, startTransitionToggleFav] = useTransition();

  const toggleFavTodo = () => {
    if (!todoInView) return;

    const prevFav = todoInView.isFav;
    const nextFav = !prevFav;

    patchTodoInView({ isFav: nextFav });

    startTransitionToggleFav(async () => {
      try {
        await mutateFn({
          todoId: todoInView.id,
          body: {
            isFav: nextFav,
          },
        });

        router.refresh();
      } catch (error) {
        handleApiError(error);
        patchTodoInView({ isFav: prevFav });
      }
    });
  };

  return {
    isPendingToggleFav,
    toggleFavTodo,
  };
}

export function useToggleAddTodayTodo({
  todoInView,
  mutateFn,
}: {
  todoInView: TodoType | null | undefined;
  mutateFn: UseMutateAsyncFunction<
    UpdateTodoResType,
    Error,
    { todoId: TodoType['id']; body: UpdateTodoBodyType }
  >;
}) {
  const router = useRouter();
  const patchTodoInView = useTodoStore((store) => store.patchTodoInView);

  const [isPendingToggleAddToday, startTransitionToggleAddToday] = useTransition();

  const toggleAddTodayTodo = () => {
    if (!todoInView) return;

    const now = new Date();
    const tomorrowStart = startOfDay(addDays(now, 1));

    const prevRemoveFromTodayValue = todoInView.removeFromTodayAt;
    const nextRemoveFromTodayValue = prevRemoveFromTodayValue ? null : tomorrowStart;

    const parsedNextRemoveFromTodayValue = nextRemoveFromTodayValue
      ? nextRemoveFromTodayValue.toISOString()
      : null;

    patchTodoInView({ removeFromTodayAt: parsedNextRemoveFromTodayValue });

    startTransitionToggleAddToday(async () => {
      try {
        await mutateFn({
          todoId: todoInView.id,
          body: {
            removeFromTodayAt: parsedNextRemoveFromTodayValue,
          },
        });

        router.refresh();
      } catch (error) {
        handleApiError(error);
        patchTodoInView({ removeFromTodayAt: prevRemoveFromTodayValue });
      }
    });
  };

  return {
    isPendingToggleAddToday,
    toggleAddTodayTodo,
  };
}
