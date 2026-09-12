'use client';

import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import isEqual from 'lodash/isEqual';
import { TagIcon, TriangleAlertIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import BadgeInput, { BadgeInputValue } from '@/components/badge-input';
import SurfaceCard from '@/components/surface-card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { COLOR_BY_LABEL_COLOR, OUTLINED_COLOR_BY_LABEL_COLOR } from '@/constants/todo';
import { useDebounce } from '@/hooks/use-debounce';
import { useDebounceEffect } from '@/hooks/use-debounce-effect';
import { cn } from '@/lib/utils';
import { useListTodoLabelQuery } from '@/queries/todo-label';
import { TodoIncludeLabelsType } from '@/schemas/models/todo';
import { TodoLabelType } from '@/schemas/models/todo-label';

interface Props {
  todo: TodoIncludeLabelsType;
  onChange: (selectedTodoLabels: BadgeInputValue[]) => void;
}

function transformLabelsToLabelsValues(todoLabels: TodoIncludeLabelsType['labels']) {
  return todoLabels.map<BadgeInputValue>((label) => ({
    id: label.id,
    label: label.name,
    className: OUTLINED_COLOR_BY_LABEL_COLOR[label.color],
  }));
}

export default function TodoLabelsInput({ todo, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const { data: availableTodoLabels = [] } = useListTodoLabelQuery();

  const [labelsValues, setLabelsValues] = useState(() =>
    transformLabelsToLabelsValues(todo.labels),
  );
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);

  const initialLabelsValues = useRef(transformLabelsToLabelsValues(todo.labels));
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tranformedLabels = transformLabelsToLabelsValues(todo.labels);

    setLabelsValues(tranformedLabels);
    initialLabelsValues.current = tranformedLabels;
  }, [todo.labels]);

  useDebounceEffect(
    () => {
      if (!isEqual(labelsValues, initialLabelsValues.current)) {
        onChange(labelsValues);
        initialLabelsValues.current = labelsValues;
      }
    },
    [labelsValues],
    500,
  );

  const visibleTodoLabels = availableTodoLabels.filter((availableTodoLabel) => {
    const lowerTodoLabelName = availableTodoLabel.name.toLowerCase();
    const lowerInputValue = debouncedInputValue.toLowerCase();

    return lowerTodoLabelName.includes(lowerInputValue);
  });

  const handleClickCard = () => {
    inputRef.current?.focus();
  };

  const handleClickBadgeTodoLabel = (todoLabelValue: BadgeInputValue) => {
    setLabelsValues((prev) => prev.filter((prev) => prev.id !== todoLabelValue.id));
  };

  const handleChangeTodoLabel = (todoLabel: TodoLabelType) => (value: boolean) => {
    setLabelsValues((prev) =>
      value
        ? [
            ...prev,
            {
              id: todoLabel.id,
              label: todoLabel.name,
              className: OUTLINED_COLOR_BY_LABEL_COLOR[todoLabel.color],
            },
          ]
        : prev.filter((prev) => prev.id !== todoLabel.id),
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} highlightItemOnHover={false}>
      <DropdownMenuTrigger
        nativeButton={false}
        render={
          <SurfaceCard
            ref={cardRef}
            className="py-4 text-muted-foreground cursor-pointer"
            onClick={handleClickCard}
          >
            <div className="flex items-center gap-2">
              <TagIcon className="size-4 shrink-0 text-current" />
              <BadgeInput
                values={labelsValues}
                onClickBadge={handleClickBadgeTodoLabel}
                inputProps={{
                  className: 'text-sm text-current',
                  placeholder: 'Thêm nhãn',
                  autoComplete: 'off',
                  ref: inputRef,
                  value: inputValue,
                  onKeyDown: (e) => e.stopPropagation(),
                  onChange: (e) => setInputValue(e.target.value),
                }}
              />
            </div>
          </SurfaceCard>
        }
      />

      <DropdownMenuContent
        anchor={cardRef}
        className="w-70"
        side="top"
        align="start"
        sideOffset={0}
      >
        <DropdownMenuGroup>
          {visibleTodoLabels.length > 0 ? (
            visibleTodoLabels.map((todoLabel) => {
              const isIncluded =
                labelsValues.findIndex((labelValue) => labelValue.id === todoLabel.id) !== -1;
              return (
                <DropdownMenuCheckboxItem
                  key={todoLabel.id}
                  checked={isIncluded}
                  onCheckedChange={handleChangeTodoLabel(todoLabel)}
                >
                  <div className={cn('size-2', COLOR_BY_LABEL_COLOR[todoLabel.color])} />
                  {todoLabel.name}
                </DropdownMenuCheckboxItem>
              );
            })
          ) : (
            <div className="text-xs py-4 flex justify-center items-center gap-2">
              <TriangleAlertIcon className="size-4" />
              Nah bro nice try
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
