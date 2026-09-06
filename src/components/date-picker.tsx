import { format, isSameMonth, set } from 'date-fns';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTimeOptions } from '@/lib/date';

interface Props {
  value: Date | undefined | null;
  timeSelect?: boolean;
  onSelect: (date: Date) => void;
}

const timeOptions = getTimeOptions().map((date) => {
  const formattedDate = format(date, 'HH:mm');
  return {
    label: formattedDate,
    value: formattedDate,
  };
});

const now = new Date();

export default function DatePicker({ value, timeSelect, onSelect }: Props) {
  const [date, setDate] = useState<Date | undefined>(value || now);
  const [month, setMonth] = useState(value || now);
  const [time, setTime] = useState<string | null>(() =>
    value ? format(value, 'HH:mm') : timeOptions[0].value,
  );

  const onDayClick = (date: Date) => {
    if (!isSameMonth(date, month)) {
      setMonth(date);
    }
  };

  const handleSelect = () => {
    if (date) {
      let selectedDate = date;

      if (timeSelect && time) {
        const [hours, minutes] = time.split(':');
        selectedDate = set(selectedDate, {
          hours: Number(hours),
          minutes: Number(minutes),
          seconds: 0,
          milliseconds: 0,
        });
      }

      onSelect(selectedDate);
    }
  };

  return (
    <Calendar
      mode="single"
      className="rounded-lg border w-65"
      weekStartsOn={1}
      month={month}
      onMonthChange={setMonth}
      onDayClick={onDayClick}
      selected={date}
      onSelect={setDate}
      formatters={{
        formatWeekdayName: (day) => day.toLocaleDateString('vi-VN', { weekday: 'narrow' }),
      }}
      footer={
        <div className="mt-3 space-y-3">
          {timeSelect && (
            <Select items={timeOptions} value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn giờ" />
              </SelectTrigger>
              <SelectContent className="max-h-52">
                <SelectGroup>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.label} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <Button className="w-full" onClick={handleSelect}>
            Chọn
          </Button>
        </div>
      }
    />
  );
}
