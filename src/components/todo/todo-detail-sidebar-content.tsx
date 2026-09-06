'use client';

import { format } from 'date-fns';
import {
  BellIcon,
  CalendarClockIcon,
  PaperclipIcon,
  StarIcon,
  SunIcon,
  TrashIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { BadgeInputValue } from '@/components/badge-input';
import { DebouncedInput, DebouncedTextarea } from '@/components/debounced-inputs';
import SurfaceCard from '@/components/surface-card';
import CloseTodoDetailSidebarButton from '@/components/todo/close-todo-detail-sidebar-button';
import DueSetting from '@/components/todo/quick-todo-form/due-setting';
import ReminderSetting from '@/components/todo/quick-todo-form/reminder-setting';
import TodoLabelsInput from '@/components/todo/todo-labels-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { TodoStatus } from '@/constants/enum';
import { useToggleFavTodo, useToggleStatusTodo } from '@/hooks/use-todo';
import { formatDateLabel, formatViDate, safeParseDate } from '@/lib/date';
import { cn, handleApiError, stopPropagation } from '@/lib/utils';
import { useConfirm } from '@/providers/confirm-dialog-provider';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '@/queries/todo';
import { TodoIncludeLabelsType } from '@/schemas/models/todo';
import { UpdateTodoBodyType } from '@/schemas/todo';
import { useTodoStore } from '@/stores/todo';
import { useUiStore } from '@/stores/ui';

export function TodoDetailSidebarContent({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const { mutateAsync: updateTodoMutateAsync } = useUpdateTodoMutation();
  const { mutateAsync: deleteTodoMutateAsync } = useDeleteTodoMutation();

  const { open, toggleSidebar } = useSidebar();
  const todoInView = useTodoStore((store) => store.todoInView);
  const setTodoInView = useTodoStore((store) => store.setTodoInView);
  const todoDetailSidebarOpen = useUiStore((store) => store.todoDetailSidebarOpen);

  const initialTodoInView = useRef<TodoIncludeLabelsType>(null);

  const confirm = useConfirm();

  useEffect(() => {
    if (open && todoInView) {
      initialTodoInView.current = todoInView;
    }
  }, [open, todoInView]);

  const { isPendingToggleStatus, toggleStatusTodo } = useToggleStatusTodo({
    todoInView,
    mutateFn: updateTodoMutateAsync,
  });

  const { isPendingToggleFav, toggleFavTodo } = useToggleFavTodo({
    todoInView,
    mutateFn: updateTodoMutateAsync,
  });

  useEffect(() => {
    if (!open && todoDetailSidebarOpen) {
      toggleSidebar();
    } else if (open && !todoDetailSidebarOpen) {
      toggleSidebar();
    }
  }, [open, todoDetailSidebarOpen, toggleSidebar]);

  if (!todoInView) return;

  const handleUpdateTodoByField = (field: keyof UpdateTodoBodyType) => async (value: unknown) => {
    try {
      await updateTodoMutateAsync({
        todoId: todoInView.id,
        body: {
          [field]: value,
        },
      });

      router.refresh();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUpdateTodoLabels = async (selectedTodoLabels: BadgeInputValue[]) => {
    const mutateFn = handleUpdateTodoByField('labels');
    await mutateFn(selectedTodoLabels.map((todoLabel) => todoLabel.id));
  };

  const handleUpdateTodoInputField = (field: keyof UpdateTodoBodyType) => async (value: string) => {
    if (
      (!value && !initialTodoInView.current?.[field]) ||
      initialTodoInView.current?.[field] === value
    ) {
      return;
    }

    const mutateFn = handleUpdateTodoByField(field);
    await mutateFn(value);
  };

  const handleDeleteTodo = async () => {
    try {
      const ok = await confirm({
        title: `${todoInView.title} sẽ bị xoá vĩnh viễn`,
        description: 'Bạn (và tôi) không thể hoàn tác hành động này',
      });

      if (!ok) return;

      await deleteTodoMutateAsync({
        todoId: todoInView.id,
      });

      toggleSidebar();
      setTodoInView(undefined);
      router.refresh();
    } catch (error) {
      handleApiError(error);
    }
  };

  const createdAt = safeParseDate(todoInView.createdAt);
  const dueAt = safeParseDate(todoInView.dueAt);
  const remindAt = safeParseDate(todoInView.remindAt);

  return (
    <Sidebar collapsible="offcanvas" side="right" {...props}>
      <SidebarHeader className="pt-5 pb-0 px-6">
        <SurfaceCard className="py-3.5">
          <div className="flex items-center gap-3">
            <Checkbox
              disabled={isPendingToggleStatus}
              checked={todoInView.status === TodoStatus.Completed}
              onCheckedChange={toggleStatusTodo}
              onClick={stopPropagation()}
            />

            <DebouncedInput
              defaultValue={todoInView.title}
              onChangeFinish={handleUpdateTodoInputField('title')}
              className="ghost-input pl-3 h-6 py-0 text-sm!"
            />

            <Button
              variant="ghost"
              size="icon-xs"
              className="ml-auto"
              disabled={isPendingToggleFav}
              onClick={stopPropagation(toggleFavTodo)}
            >
              <StarIcon
                className={cn('size-5', {
                  'fill-primary': todoInView.isFav,
                })}
              />
            </Button>
          </div>
        </SurfaceCard>
      </SidebarHeader>
      <SidebarContent className="px-6">
        <div className="space-y-2 py-2">
          <SurfaceCard className="py-4 text-muted-foreground cursor-pointer">
            <div className="flex items-center gap-2">
              <SunIcon className="size-4 text-current" />
              <p className="text-sm text-current">Thêm vào Hôm nay</p>
            </div>
          </SurfaceCard>

          <div className="flex flex-col items-stretch">
            <ReminderSetting
              selectedDate={remindAt}
              setFieldFn={handleUpdateTodoByField('remindAt')}
              dropdownTriggerProps={{
                nativeButton: false,
              }}
              render={({ selected }) => {
                const renderedDate = selected || remindAt;
                return (
                  <SurfaceCard
                    className={cn('py-4 border-b cursor-pointer', {
                      'py-2': renderedDate,
                    })}
                  >
                    <div className="flex items-center gap-2">
                      <BellIcon className="size-4" />
                      {renderedDate ? (
                        <div className="text-sm">
                          Nhắc tôi lúc {format(renderedDate, 'HH:mm')}
                          <div className="text-xs text-muted-foreground">
                            {formatViDate(renderedDate)}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm">Nhắc tôi</p>
                      )}
                    </div>
                  </SurfaceCard>
                );
              }}
            />

            <DueSetting
              selectedDate={dueAt}
              setFieldFn={handleUpdateTodoByField('dueAt')}
              dropdownTriggerProps={{
                nativeButton: false,
              }}
              render={({ selected }) => {
                const renderedDate = selected || dueAt;
                return (
                  <SurfaceCard className="py-4 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <CalendarClockIcon className="size-4" />
                      <p className="text-sm">
                        {renderedDate ? formatDateLabel(renderedDate) : 'Thêm ngày đến hạn'}
                      </p>
                    </div>
                  </SurfaceCard>
                );
              }}
            />
          </div>

          <TodoLabelsInput todo={todoInView} onChange={handleUpdateTodoLabels} />

          <SurfaceCard className="py-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <PaperclipIcon className="size-4 text-current" />
              <p className="text-sm text-current">Thêm tệp</p>
            </div>
          </SurfaceCard>

          <SurfaceCard className="py-2" contentClassName="px-2">
            <DebouncedTextarea
              placeholder="Thêm ghi chú"
              className="ghost-input"
              defaultValue={todoInView.description || ''}
              onChangeFinish={handleUpdateTodoInputField('description')}
            />
          </SurfaceCard>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-stretch">
          <CloseTodoDetailSidebarButton />
          <div className="flex items-center justify-center flex-1">
            <p className="text-xs text-muted-foreground">Đã tạo vào {formatViDate(createdAt)}</p>
          </div>
          <Button variant="ghost" size="icon-lg" onClick={handleDeleteTodo}>
            <TrashIcon />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
