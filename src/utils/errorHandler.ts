import { toast } from 'react-hot-toast';

export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN'
}

export interface ErrorResponse {
  type: ErrorType;
  message: string;
  code?: string;
  details?: unknown;
}

export class AppError extends Error {
  type: ErrorType;
  code?: string;
  details?: unknown;

  constructor(message: string, type: ErrorType = ErrorType.UNKNOWN, code?: string, details?: unknown) {
    super(message);
    this.type = type;
    this.code = code;
    this.details = details;
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): ErrorResponse => {
  if (error instanceof AppError) {
    return {
      type: error.type,
      message: error.message,
      code: error.code,
      details: error.details
    };
  }

  if (error instanceof Error) {
    return {
      type: ErrorType.UNKNOWN,
      message: error.message
    };
  }

  return {
    type: ErrorType.UNKNOWN,
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