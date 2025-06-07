import { toast } from 'react-hot-toast';

export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVER = 'SERVER',
  NETWORK = 'NETWORK'
}

export interface ErrorResponse {
  type: ErrorType;
  message: string;
  code?: ErrorType;
  details?: unknown;
}

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: ErrorType = ErrorType.INTERNAL_ERROR,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }

  static isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
  }

  static fromApiError(error: unknown): AppError {
    if (AppError.isAppError(error)) {
      return error;
    }

    if (error instanceof Error) {
      return new AppError(error.message, 500, ErrorType.INTERNAL_ERROR);
    }

    return new AppError('Beklenmeyen bir hata oluştu', 500, ErrorType.INTERNAL_ERROR);
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (AppError.isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, 500, ErrorType.INTERNAL_ERROR);
  }

  return new AppError('Beklenmeyen bir hata oluştu', 500, ErrorType.INTERNAL_ERROR);
};

export const handleError = (error: unknown): ErrorResponse => {
  if (error instanceof AppError) {
    return {
      type: error.code,
      message: error.message,
      code: error.code,
      details: error.details
    };
  }

  if (error instanceof Error) {
    return {
      type: ErrorType.INTERNAL_ERROR,
      message: error.message
    };
  }

  return {
    type: ErrorType.INTERNAL_ERROR,
    message: 'An unexpected error occurred'
  };
};

export const showErrorToast = (error: unknown) => {
  const errorResponse = handleError(error);
  toast.error(errorResponse.message);
};

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};
