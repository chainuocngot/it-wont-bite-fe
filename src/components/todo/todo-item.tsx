'use client';

import { BellIcon, CalendarDaysIcon, StarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { TodoStatus } from '@/constants/enum';
import { formatDateLabel } from '@/lib/date';
import { cn, stopPropagation } from '@/lib/utils';
import { TodoIncludeLabelsType } from '@/schemas/models/todo';

interface Props {
  data: TodoIncludeLabelsType;
  isInView: boolean;
  isPendingToggleStatus: boolean;
  isPendingToggleFav: boolean;
  onToggleStatus: (todo: TodoIncludeLabelsType) => void;
  onToggleFav: (todo: TodoIncludeLabelsType) => void;
  onClick: (todo: TodoIncludeLabelsType) => void;
}

export default function TodoItem({
  data,
  isInView,
  isPendingToggleStatus,
  isPendingToggleFav,
  onToggleStatus,
  onToggleFav,
  onClick,
}: Props) {
  return (
    <Card
      className={cn('gap-0 py-2 mt-4 cursor-pointer', {
        'bg-muted': isInView,
      })}
      onClick={() => onClick(data)}
    >
      <CardContent>
        <div className="flex items-center gap-3">
          <Checkbox
            disabled={isPendingToggleStatus}
            checked={data.status === TodoStatus.Completed}
            onCheckedChange={() => onToggleStatus(data)}
            onClick={stopPropagation()}
          />
          <div className="flex flex-col">
            <p className="text-sm">{data.title}</p>
            <div className="flex items-center gap-2">
              <span>Tác vụ</span>
              {data.dueAt && (
                <>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <CalendarDaysIcon className="size-3" /> {formatDateLabel(new Date(data.dueAt))}
                  </div>
                </>
              )}
              {data.remindAt && (
                <>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <BellIcon className="size-3" /> {formatDateLabel(new Date(data.remindAt))}
                  </div>
                </>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="ml-auto"
            disabled={isPendingToggleFav}
            onClick={stopPropagation(() => onToggleFav(data))}
          >
            <StarIcon
              className={cn('size-5', {
                'fill-primary': data.isFav,
              })}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
