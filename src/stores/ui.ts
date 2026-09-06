import { create } from 'zustand';

interface UiState {
  todoDetailSidebarOpen?: boolean;

  toggleTodoDetailSidebar: (open?: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  todoDetailSidebarOpen: false,

  toggleTodoDetailSidebar: (open?: boolean) =>
    set((state) => ({ todoDetailSidebarOpen: open ?? !state.todoDetailSidebarOpen })),
}));
