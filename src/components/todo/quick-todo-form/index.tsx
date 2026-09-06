'use client';

import { BellIcon, CalendarDaysIcon, PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, SubmitEvent, useCallback, useState } from 'react';

import DueSetting from '@/components/todo/quick-todo-form/due-setting';
import ReminderSetting from '@/components/todo/quick-todo-form/reminder-setting';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import { TodoStatus } from '@/constants/enum';
import { safeParseDate } from '@/lib/date';
import { cn, handleApiError } from '@/lib/utils';
import { useCreateTodoMutation } from '@/queries/todo';
import { CreateTodoBodyType } from '@/schemas/todo';

const CREATE_TODO_BODY_DEFAULT_VALUES: CreateTodoBodyType = {
  title: '',
  status: TodoStatus.Todo,
};

export default function QuickTodoForm() {
  const router = useRouter();
  const [createTodoBody, setCreateTodoBody] = useState<CreateTodoBodyType>(
    CREATE_TODO_BODY_DEFAULT_VALUES,
  );
  const { mutateAsync } = useCreateTodoMutation();

  const handleSetCreateTodoBodyByField = (field: keyof CreateTodoBodyType) => (value: unknown) => {
    setCreateTodoBody((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const setFieldFn = handleSetCreateTodoBodyByField('title');

    setFieldFn(e.target.value);
  }, []);

  const clearCreateTodoBody = () => {
    setCreateTodoBody(CREATE_TODO_BODY_DEFAULT_VALUES);
  };

  async function onCreate(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await toast.promise(mutateAsync(createTodoBody), {
        loading: 'Đang tạo...',
        success: 'Tạo thành công!',
        error: 'Tạo thất bại',
      });

      clearCreateTodoBody();
      router.refresh();
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <form onSubmit={onCreate}>
      <Card className="gap-0 pt-0">
        <CardContent className="py-2">
          <div className="flex items-center gap-2">
            <PencilIcon className="size-4" />
            <Input
              autoFocus
              placeholder="Thêm tác vụ"
              className="ghost-input pl-3"
              autoComplete="off"
              value={createTodoBody.title}
              onChange={handleChangeTitle}
            />
          </div>
        </CardContent>
        <CardFooter className="p-2 bg-accent">
          <div className="flex items-stretch gap-4 w-full">
            <DueSetting
              selectedDate={safeParseDate(createTodoBody.dueAt)}
              setFieldFn={handleSetCreateTodoBodyByField('dueAt')}
              render={({ label }) => (
                <Button variant="outline" size={label ? 'sm' : 'icon-sm'}>
                  <CalendarDaysIcon className={cn({ 'mr-1': label })} />
                  {label}
                </Button>
              )}
            />
            <ReminderSetting
              selectedDate={safeParseDate(createTodoBody.remindAt)}
              setFieldFn={handleSetCreateTodoBodyByField('remindAt')}
              render={({ label }) => (
                <Button variant="outline" size={label ? 'sm' : 'icon-sm'}>
                  <BellIcon className={cn({ 'mr-1': label })} />
                  {label}
                </Button>
              )}
            />
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              type="submit"
              disabled={!createTodoBody.title}
            >
              Tạo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
