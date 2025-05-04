import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { AppError } from '@/utils/errorHandler';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (promise: Promise<T>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await promise;
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const appError = AppError.fromApiError(error);
      setState({ data: null, loading: false, error: appError });
      toast.error(appError.message);
      throw appError;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
} 