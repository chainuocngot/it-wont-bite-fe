'use client';

import { BellIcon, CalendarClockIcon } from 'lucide-react';
import { useState } from 'react';

import { Tooltip } from '@/components/tooltip';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateLabel, safeParseDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import { TodoIncludeLabelsType } from '@/schemas/models/todo';

type CalendarDaysIncludeTasks = {
  todos: TodoIncludeLabelsType[];
  date: Date;
  isCurrentMonth: boolean;
};

interface Props {
  weeks: CalendarDaysIncludeTasks[][];
}

export default function TodoCalendar({ weeks }: Props) {
  const [hoveredTodo, setHoveredTodo] = useState<TodoIncludeLabelsType | null>(null);

  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow noHover>
          <TableHead className="text-center w-[calc(100%/7)]">Thứ Hai</TableHead>
          <TableHead className="text-center w-[calc(100%/7)]">Thứ Ba</TableHead>
          <TableHead className="text-center w-[calc(100%/7)]">Thứ Tư</TableHead>
          <TableHead className="text-center w-[calc(100%/7)]">Thứ Năm</TableHead>
          <TableHead className="text-center w-[calc(100%/7)]">Thứ Sáu</TableHead>
          <TableHead className="text-center w-[calc(100%/7)]">Thứ Bảy</TableHead>
          <TableHead className="text-center w-[calc(100%/7)]">Chủ Nhật</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {weeks.map((week, index) => {
          return (
            <TableRow noHover key={index}>
              {week.map((day) => {
                const isHoveredTodoIncluded =
                  hoveredTodo && day.todos.findIndex((todo) => todo.id === hoveredTodo.id) !== -1;

                return (
                  <TableCell
                    key={day.date.toISOString()}
                    className={cn('align-top overflow-hidden', {
                      'bg-muted/50': isHoveredTodoIncluded,
                      'bg-muted/25': !day.isCurrentMonth,
                    })}
                  >
                    <div className="min-h-30">
                      <div>{day.date.getDate()}</div>
                      <div className="flex flex-col gap-3 mt-2">
                        {day.todos.map((todo) => {
                          const dueAt = safeParseDate(todo.dueAt);
                          const remindAt = safeParseDate(todo.remindAt);

                          return (
                            <Tooltip
                              key={todo.id}
                              render={
                                <Badge
                                  className="cursor-pointer hover:bg-accent-foreground inline-flex max-w-full align-top gap-2"
                                  onMouseEnter={() => setHoveredTodo(todo)}
                                  onMouseLeave={() => setHoveredTodo(null)}
                                >
                                  <div className="truncate">{todo.title}</div>
                                  {remindAt && (
                                    <BellIcon data-icon="inline-end" className="shrink-0" />
                                  )}
                                </Badge>
                              }
                              content={
                                <div className="space-y-2">
                                  <div>{todo.title}</div>
                                  {dueAt && (
                                    <div className="flex items-center gap-2">
                                      <CalendarClockIcon className="size-4" />{' '}
                                      {formatDateLabel(dueAt)}
                                    </div>
                                  )}
                                  {remindAt && (
                                    <div className="flex items-center gap-2">
                                      <BellIcon className="size-4" /> {formatDateLabel(remindAt)}
                                    </div>
                                  )}
                                </div>
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
