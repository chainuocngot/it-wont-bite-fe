import { create } from 'zustand';

interface UiState {
  taskDetailSidebarOpen?: boolean;

  toggleTaskDetailSidebar: (open?: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  taskDetailSidebarOpen: false,

  toggleTaskDetailSidebar: (open?: boolean) =>
    set((state) => ({ taskDetailSidebarOpen: open ?? !state.taskDetailSidebarOpen })),
}));
