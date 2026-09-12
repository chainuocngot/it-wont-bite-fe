import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { addDays, addWeeks, startOfWeek } from 'date-fns';
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
import { formatDate, formatViDay } from '@/lib/date';

interface Props {
  selectedDate: Date | null | undefined;
  dropdownTriggerProps?: Omit<MenuPrimitive.Trigger.Props, 'render'>;
  render: ({
    label,
    selected,
  }: {
    label: string | undefined;
    selected: Date | null | undefined;
  }) => ReactElement;
  onChangeSuccess?: (value: Date | null | undefined) => void;
}

const today = new Date();
const dates = {
  today,
  tomorrow: addDays(today, 1),
  nextWeek: startOfWeek(addWeeks(today, 1), {
    weekStartsOn: 1,
  }),
};

export default function DueSetting({
  selectedDate,
  dropdownTriggerProps,
  render,
  onChangeSuccess,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(selectedDate);

  useEffect(() => {
    setSelected(selectedDate);
  }, [selectedDate]);

  const dueLabel = useMemo(() => {
    if (!selectedDate) return;

    return formatDate(selectedDate, { prefix: 'Đến hạn vào' });
  }, [selectedDate]);

  const onValueChange = (value: Date) => {
    setOpen(false);
    setSelected(value);
    onChangeSuccess?.(value);
  };

  const handleRemove = () => {
    setSelected(undefined);
    onChangeSuccess?.(undefined);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        {...dropdownTriggerProps}
        render={render({
          label: dueLabel,
          selected,
        })}
      />
      <DropdownMenuContent className="w-50">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-center">Đến hạn</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedDate ?? ''} onValueChange={onValueChange}>
            <DropdownMenuRadioItem value={dates.today}>
              Hôm nay
              <span className="text-muted-foreground ml-auto">{formatViDay(dates.today)}</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={dates.tomorrow}>
              Ngày mai
              <span className="text-muted-foreground ml-auto">{formatViDay(dates.tomorrow)}</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={dates.nextWeek}>
              Tuần tới
              <span className="text-muted-foreground ml-auto">{formatViDay(dates.nextWeek)}</span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <CalendarClockIcon />
              Chọn ngày
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DatePicker value={selectedDate} onSelect={onValueChange} />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {open && selected && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive" onClick={handleRemove}>
                  <TrashIcon />
                  Loại bỏ ngày đến hạn
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
