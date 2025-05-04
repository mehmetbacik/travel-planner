import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { tripsApi } from '@/services/api/trips';
import { tripSchema, type TripFormData } from '@/schemas/tripSchema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useAsync } from '@/hooks/useAsync';
import { TripRecommendations } from '@/types/trip';

interface TripFormProps {
  initialData?: Partial<TripFormData>;
  onSuccess?: () => void;
}

export function TripForm({ initialData, onSuccess }: TripFormProps) {
  const { t } = useTranslation();
  const {
    data: recommendations,
    loading: isRecommendationsLoading,
    execute: getRecommendations,
  } = useAsync<TripRecommendations>();

  const {
    loading: isSaving,
    execute: saveTrip,
  } = useAsync();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TripFormData) => {
    try {
      // Create trip
      const trip = await saveTrip(tripsApi.create(data));

      // Get AI recommendations
      const recommendationsData = await getRecommendations(
        tripsApi.getRecommendations(data.destination, data.budget)
      );

      // Generate PDF
      const pdfBlob = await tripsApi.generatePDF(trip, recommendationsData);
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `travel-plan-${data.destination}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      onSuccess?.();
    } catch (error) {
      // Error is already handled by useAsync hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="trip-form">
      <div className="trip-form__field">
        <Label htmlFor="destination" required>
          {t('common.destination')}
        </Label>
        <Input
          id="destination"
          {...register('destination')}
          error={errors.destination?.message}
          className={errors.destination ? 'error' : ''}
        />
      </div>

      <div className="trip-form__field">
        <Label htmlFor="startDate" required>
          {t('common.startDate')}
        </Label>
        <Input
          id="startDate"
          type="date"
          {...register('startDate')}
          error={errors.startDate?.message}
          className={errors.startDate ? 'error' : ''}
        />
      </div>

      <div className="trip-form__field">
        <Label htmlFor="endDate" required>
          {t('common.endDate')}
        </Label>
        <Input
          id="endDate"
          type="date"
          {...register('endDate')}
          error={errors.endDate?.message}
          className={errors.endDate ? 'error' : ''}
        />
      </div>

      <div className="trip-form__field">
        <Label htmlFor="budget" required>
          {t('common.budget')}
        </Label>
        <Input
          id="budget"
          type="number"
          {...register('budget', { valueAsNumber: true })}
          error={errors.budget?.message}
          className={errors.budget ? 'error' : ''}
        />
      </div>

      <Button
        type="submit"
        loading={isSaving || isRecommendationsLoading}
        className="trip-form__button"
      >
        {t('common.save')}
      </Button>

      {recommendations && (
        <div className="trip-form__recommendations">
          <h3>{t('common.recommendations')}</h3>
          
          <div>
            <h4>{t('common.activities')}</h4>
            <ul>
              {recommendations.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t('common.localTips')}</h4>
            <ul>
              {recommendations.localTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t('common.budgetTips')}</h4>
            <ul>
              {recommendations.budgetTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t('common.weatherInfo')}</h4>
            <p>{recommendations.weatherInfo}</p>
          </div>
        </div>
      )}
    </form>
  );
} 