import {
  addDays,
  addHours,
  eachMinuteOfInterval,
  format,
  getDay,
  isToday,
  isTomorrow,
  set,
  startOfDay,
} from 'date-fns';

import { DAY_NAMES, HOURS_A_DAY } from '@/constants/app';

export function safeParseDate(date: string): Date;
export function safeParseDate(date: string | null | undefined): Date | undefined;
export function safeParseDate(date: string | null | undefined): Date | undefined {
  return date ? new Date(date) : undefined;
}

export function formatFullDate(iso: string) {
  return format(new Date(iso), 'dd/MM/yyyy');
}

export function formatViDate(date: Date) {
  return `${DAY_NAMES[getDay(date)]}, ${format(date, "d 'tháng' M")}`;
}

export function formatViDay(date: Date) {
  return DAY_NAMES[date.getDay()];
}

export function formatDateLabel(date: Date) {
  if (isToday(date)) {
    return 'Hôm nay';
  }

  if (isTomorrow(date)) {
    return 'Ngày mai';
  }

  return formatViDate(date);
}

export function formatDate(
  date: Date,
  options?: {
    prefix?: string;
    withTime?: boolean;
  },
) {
  const { prefix, withTime } = options || { prefix: undefined, withTime: false };
  const dateLabel = formatDateLabel(date);
  const time = format(date, 'H:mm');

  let result = dateLabel;

  if (withTime) {
    result = `${time}, ${result}`;
  }

  if (prefix) {
    result = `${prefix} ${result}`;
  }

  return result;
}

export function getTimeOptions() {
  const now = new Date();
  const hours = now.getHours();

  const start = set(now, {
    hours: hours + 1,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const end = addHours(now, HOURS_A_DAY / 2);

  const times = eachMinuteOfInterval(
    {
      start,
      end,
    },
    {
      step: 30,
    },
  );

  return times;
}

export function getStartOfTomorrow() {
  const now = new Date();
  return startOfDay(addDays(now, 1));
}
