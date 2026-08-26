'use client';

import { ChevronLeftIcon } from 'lucide-react';
import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
  field: string;
  fieldName: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  form: UseFormReturn<FieldValues>;
}

export default function EditSingleFieldDialog({
  field,
  fieldName,
  trigger,
  children,
  form,
}: Props) {
  const { getValues, setValue } = form;
  const initialValue = React.useRef('');

  const handleOpen = () => {
    initialValue.current = getValues(fieldName);
  };

  const handleCancel = () => {
    setValue(fieldName, initialValue.current);
  };

  return (
    <Dialog>
      <DialogTrigger className="flex-1" onClick={handleOpen}>
        {trigger}
      </DialogTrigger>
      <DialogContent size="lg" className="min-h-50">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogClose
            render={
              <Button type="button" size="icon-sm" variant="ghost" onClick={handleCancel}>
                <ChevronLeftIcon />
              </Button>
            }
          />
          <DialogTitle>Chỉnh sửa {field}</DialogTitle>
          <DialogClose
            render={
              <Button type="button" size="sm" variant="ghost">
                Xong
              </Button>
            }
          />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
