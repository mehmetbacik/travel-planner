import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { tripSchema, TripFormData } from '@/schemas/tripSchema';
import { showErrorToast, showSuccessToast, showLoadingToast, dismissToast } from '@/utils/errorHandler';
import { AppError, ErrorType } from '@/utils/errorHandler';

export const TripForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema)
  });

  const onSubmit = async (data: TripFormData) => {
    const loadingToast = showLoadingToast(t('common.savingTrip'));
    setIsSubmitting(true);

    try {
      // API call will be implemented here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      dismissToast(loadingToast);
      showSuccessToast(t('common.tripSaved'));
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