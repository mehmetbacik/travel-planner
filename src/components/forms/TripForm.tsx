import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { tripSchema, TripFormData } from '@/schemas/tripSchema';
import { showErrorToast, showSuccessToast, showLoadingToast, dismissToast } from '@/utils/errorHandler';
import { AppError, ErrorType } from '@/utils/errorHandler';
import { tripsApi } from '@/services/api/trips';

interface TripFormProps {
  initialData?: TripFormData;
  onSuccess?: (data: TripFormData) => void;
}

export const TripForm = ({ initialData, onSuccess }: TripFormProps) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: TripFormData) => {
    const loadingToast = showLoadingToast(t('common.savingTrip'));
    setIsSubmitting(true);

    try {
      const result = await tripsApi.create(data);
      dismissToast(loadingToast);
      showSuccessToast(t('common.tripSaved'));
      onSuccess?.(result);
    } catch (error) {
      dismissToast(loadingToast);
      if (error instanceof AppError) {
        showErrorToast(error);
      } else {
        showErrorToast(new AppError(
          t('common.tripSaveError'),
          ErrorType.SERVER
        ));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
          {t('common.destination')}
        </label>
        <input
          type="text"
          id="destination"
          {...register('destination')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.destination && (
          <p className="mt-1 text-sm text-red-600">{t(errors.destination.message as string)}</p>
        )}
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          {t('common.startDate')}
        </label>
        <input
          type="date"
          id="startDate"
          {...register('startDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.startDate && (
          <p className="mt-1 text-sm text-red-600">{t(errors.startDate.message as string)}</p>
        )}
      </div>

      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          {t('common.endDate')}
        </label>
        <input
          type="date"
          id="endDate"
          {...register('endDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.endDate && (
          <p className="mt-1 text-sm text-red-600">{t(errors.endDate.message as string)}</p>
        )}
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
          {t('common.budget')}
        </label>
        <input
          type="number"
          id="budget"
          {...register('budget', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.budget && (
          <p className="mt-1 text-sm text-red-600">{t(errors.budget.message as string)}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? t('common.saving') : t('common.save')}
      </button>
    </form>
  );
}; 