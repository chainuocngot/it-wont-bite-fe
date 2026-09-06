import { produce } from 'immer';
import { create } from 'zustand';

import { TodoIncludeLabelsType } from '@/schemas/models/todo';

interface TodoState {
  todoInView?: TodoIncludeLabelsType;

  setTodoInView: (todo: TodoIncludeLabelsType | undefined) => void;
  patchTodoInView: ({
    status,
    isFav,
  }: Partial<Pick<TodoIncludeLabelsType, 'status' | 'isFav'>>) => void;
}

export const useTodoStore = create<TodoState>()((set) => ({
  todoInView: undefined,

  setTodoInView: (todo?: TodoIncludeLabelsType) => set({ todoInView: todo }),
  patchTodoInView: ({ status, isFav }) =>
    set(
      produce<TodoState>((state) => {
        if (state.todoInView) {
          state.todoInView.status = status ?? state.todoInView.status;
          state.todoInView.isFav = isFav ?? state.todoInView.isFav;
        }
      }),
    ),
}));
