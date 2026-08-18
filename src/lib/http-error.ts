import { HttpCode, TypeOfHttpCode } from '@/constants/http';

export type ApiErrorResponse = {
  statusCode: TypeOfHttpCode;
  message: string;
  error?: string;
};

type ValidationErrorItem = {
  field: string;
  message: string;
  code: string;
};

export type ApiValidationErrorResponse = Omit<ApiErrorResponse, 'error'> & {
  errors: ValidationErrorItem[];
};

export class HttpError extends Error {
  statusCode: TypeOfHttpCode;
  message: string;
  error?: string;

  constructor(errorResponse: ApiErrorResponse) {
    super(errorResponse.message);
    this.statusCode = errorResponse.statusCode;
    this.message = errorResponse.message;
    this.error = errorResponse.error;
  }
}

export class ValidationHttpError extends HttpError {
  errors: ValidationErrorItem[];

  constructor(validationErrorResponse: ApiValidationErrorResponse) {
    super(validationErrorResponse);
    this.statusCode = HttpCode.UnprocessableEntity;
    this.errors = validationErrorResponse.errors;
  }

  getFieldError(field: string): string | undefined {
    return this.errors.find((e) => e.field === field)?.message;
  }

  toFieldErrors(): Record<string, string> {
    return Object.fromEntries(this.errors.map((e) => [e.field, e.message]));
  }
}
