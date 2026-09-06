import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { addDays, addWeeks, format, isBefore, set, startOfWeek } from 'date-fns';
import { CalendarClockIcon, TrashIcon } from 'lucide-react';
import { ReactElement, useEffect, useMemo, useState } from 'react';

import DatePicker from '@/components/date-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { END_OF_THE_DAY_HOUR, START_OF_THE_DAY_HOUR } from '@/constants/app';
import { formatDate, formatViDay } from '@/lib/date';

interface Props {
  selectedDate: Date | null | undefined;
  setFieldFn: (value: Date | undefined) => void;
  dropdownTriggerProps?: Omit<MenuPrimitive.Trigger.Props, 'render'>;
  render: ({
    label,
    selected,
  }: {
    label: string | undefined;
    selected: Date | null | undefined;
  }) => ReactElement;
}

const now = new Date();
const dates = {
  endOfTheDay: set(now, {
    hours: END_OF_THE_DAY_HOUR,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }),

  tomorrow: set(addDays(now, 1), {
    hours: START_OF_THE_DAY_HOUR,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }),

  nextWeek: set(
    startOfWeek(addWeeks(now, 1), {
      weekStartsOn: 1,
    }),
    {
      hours: START_OF_THE_DAY_HOUR,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    },
  ),
};

export default function ReminderSetting({
  selectedDate,
  setFieldFn,
  dropdownTriggerProps,
  render,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(selectedDate);

  useEffect(() => {
    setSelected(selectedDate);
  }, [selectedDate]);

  const reminderLabel = useMemo(() => {
    if (!selectedDate) return;

    return formatDate(selectedDate, { withTime: true });
  }, [selectedDate]);

  const onValueChange = (value: Date) => {
    setOpen(false);
    setFieldFn(value);
    setSelected(value);
  };

  const isShowEndOfTheDay = isBefore(now, dates.endOfTheDay);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        {...dropdownTriggerProps}
        render={render({
          label: reminderLabel,
          selected,
        })}
      />
      <DropdownMenuContent className="w-50">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-center">Nhắc nhở</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedDate ?? ''} onValueChange={onValueChange}>
            <DropdownMenuRadioItem value={dates.endOfTheDay} disabled={!isShowEndOfTheDay}>
              Cuối ngày
              {isShowEndOfTheDay && (
                <span className="text-muted-foreground ml-auto">
                  {format(dates.endOfTheDay, 'H:mm')}
                </span>
              )}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={dates.tomorrow}>
              Ngày mai
              <span className="text-muted-foreground ml-auto">
                {`${formatViDay(dates.tomorrow)}, ${format(dates.tomorrow, 'H:mm')}`}
              </span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={dates.nextWeek}>
              Tuần tới
              <span className="text-muted-foreground ml-auto">
                {`${formatViDay(dates.nextWeek)}, ${format(dates.nextWeek, 'H:mm')}`}
              </span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <CalendarClockIcon />
              Chọn ngày & giờ
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DatePicker value={selectedDate} timeSelect onSelect={onValueChange} />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          {open && selectedDate && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive" onClick={() => setFieldFn(undefined)}>
                  <TrashIcon />
                  Loại bỏ lời nhắc
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
