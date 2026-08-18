import { type ClassValue, clsx } from 'clsx';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { toast } from '@/components/ui/toast';
import { HttpCode } from '@/constants/http';
import { HttpError, ValidationHttpError } from '@/lib/http-error';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPathMatched(needCheckPaths: string[], currentPath: string): boolean {
  return needCheckPaths.some((path) => currentPath.startsWith(path));
}

export function handleApiError<T extends FieldValues>(
  error: unknown,
  setError?: UseFormSetError<T>,
) {
  if (error instanceof ValidationHttpError && setError) {
    const errorObj = error.toFieldErrors();
    for (const field in errorObj) {
      setError(field as Path<T>, {
        message: errorObj[field],
      });
    }
  } else if (error instanceof HttpError) {
    if (error.statusCode === HttpCode.Unauthorized) {
      toast.add({
        description: 'Phiên đã hết hạn, vui lòng đăng nhập lại',
      });
    }
  }
}
