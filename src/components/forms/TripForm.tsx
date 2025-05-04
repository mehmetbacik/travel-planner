import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { tripsApi } from '@/services/api/trips';
import { tripSchema, type TripFormData } from '@/schemas/tripSchema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface TripFormProps {
  initialData?: Partial<TripFormData>;
  onSuccess?: () => void;
}

export function TripForm({ initialData, onSuccess }: TripFormProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

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
      setIsLoading(true);
      const loadingToast = toast.loading(t('common.savingTrip'));

      // Create trip
      const trip = await tripsApi.create(data);

      // Get AI recommendations
      const recommendationsResponse = await fetch('/api/services/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: data.destination,
          budget: data.budget,
        }),
      });

      if (!recommendationsResponse.ok) {
        throw new Error('Failed to get recommendations');
      }

      const recommendationsData = await recommendationsResponse.json();
      setRecommendations(recommendationsData);

      // Generate PDF
      const pdfResponse = await fetch('/api/services/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripData: data,
          recommendations: recommendationsData,
        }),
      });

      if (!pdfResponse.ok) {
        throw new Error('Failed to generate PDF');
      }

      const pdfBlob = await pdfResponse.blob();
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `travel-plan-${data.destination}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(t('common.tripSaved'), { id: loadingToast });
      onSuccess?.();
    } catch (error) {
      toast.error(t('common.tripSaveError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="trip-form">
      <div className="trip-form__field">
        <Label htmlFor="destination">{t('common.destination')}</Label>
        <Input
          id="destination"
          {...register('destination')}
          error={errors.destination?.message}
          className={errors.destination ? 'error' : ''}
        />
        {errors.destination && (
          <span className="error-message">{errors.destination.message}</span>
        )}
      </div>

      <div className="trip-form__field">
        <Label htmlFor="startDate">{t('common.startDate')}</Label>
        <Input
          id="startDate"
          type="date"
          {...register('startDate')}
          error={errors.startDate?.message}
          className={errors.startDate ? 'error' : ''}
        />
        {errors.startDate && (
          <span className="error-message">{errors.startDate.message}</span>
        )}
      </div>

      <div className="trip-form__field">
        <Label htmlFor="endDate">{t('common.endDate')}</Label>
        <Input
          id="endDate"
          type="date"
          {...register('endDate')}
          error={errors.endDate?.message}
          className={errors.endDate ? 'error' : ''}
        />
        {errors.endDate && (
          <span className="error-message">{errors.endDate.message}</span>
        )}
      </div>

      <div className="trip-form__field">
        <Label htmlFor="budget">{t('common.budget')}</Label>
        <Input
          id="budget"
          type="number"
          {...register('budget', { valueAsNumber: true })}
          error={errors.budget?.message}
          className={errors.budget ? 'error' : ''}
        />
        {errors.budget && (
          <span className="error-message">{errors.budget.message}</span>
        )}
      </div>

      <Button type="submit" loading={isLoading} className="trip-form__button">
        {t('common.save')}
      </Button>

      {recommendations && (
        <div className="trip-form__recommendations">
          <h3>{t('common.recommendations')}</h3>
          
          <div>
            <h4>{t('common.activities')}</h4>
            <ul>
              {recommendations.activities.map((activity: string, index: number) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t('common.localTips')}</h4>
            <ul>
              {recommendations.localTips.map((tip: string, index: number) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t('common.budgetTips')}</h4>
            <ul>
              {recommendations.budgetTips.map((tip: string, index: number) => (
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