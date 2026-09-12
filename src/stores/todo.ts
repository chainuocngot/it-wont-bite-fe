import { produce } from 'immer';
import { create } from 'zustand';

import { TodoIncludeLabelsType } from '@/schemas/models/todo';

interface TodoState {
  todoInView?: TodoIncludeLabelsType;

  setTodoInView: (todo: TodoIncludeLabelsType | undefined) => void;
  patchTodoInView: (patchFields: Partial<TodoIncludeLabelsType>) => void;
}

export const useTodoStore = create<TodoState>()((set) => ({
  todoInView: undefined,

  setTodoInView: (todo?: TodoIncludeLabelsType) => set({ todoInView: todo }),
  patchTodoInView: ({ status, isFav, removeFromTodayAt, remindAt, dueAt }) =>
    set(
      produce<TodoState>((state) => {
        if (state.todoInView) {
          state.todoInView.status = status ?? state.todoInView.status;
          state.todoInView.isFav = isFav ?? state.todoInView.isFav;
          state.todoInView.removeFromTodayAt =
            removeFromTodayAt === undefined
              ? state.todoInView.removeFromTodayAt
              : removeFromTodayAt;
          state.todoInView.remindAt = remindAt === undefined ? state.todoInView.remindAt : remindAt;
          state.todoInView.dueAt = dueAt === undefined ? state.todoInView.dueAt : dueAt;
        }
      }),
    ),
}));
