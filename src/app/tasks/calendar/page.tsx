import { isSameDay, isWithinInterval } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import todoApiRequests from '@/api-requests/todo';
import TodoCalendar from '@/app/tasks/calendar/todo-calendar';
import PageContainer from '@/components/page-container';
import { getCalendarDays } from '@/lib/date';

export default async function Calendar() {
  const weeks = [];

  try {
    const todos = await todoApiRequests.sListTodo();

    const calendarDays = getCalendarDays();
    const calendarDaysIncludeTasks = calendarDays.map((calendarDay) => {
      const todosIncluded = todos.filter((todo) => {
        const isTaskIncluded = todo.dueAt
          ? isWithinInterval(calendarDay.date, {
              start: todo.createdAt,
              end: todo.dueAt,
            })
          : isSameDay(calendarDay.date, todo.createdAt);

        return isTaskIncluded;
      });

      return {
        ...calendarDay,
        todos: todosIncluded,
      };
    });

    for (let i = 0; i < calendarDaysIncludeTasks.length; i += 7) {
      weeks.push(calendarDaysIncludeTasks.slice(i, i + 7));
    }
  } catch (error) {
    console.log('>> Check | error:', error);
  }

  return (
    <PageContainer
      titleNode={
        <>
          <div className="flex items-center pb-5 gap-3">
            <CalendarIcon />
            <h2 className="text-xl">Lịch</h2>
          </div>
        </>
      }
    >
      <TodoCalendar weeks={weeks} />
    </PageContainer>
  );
}
