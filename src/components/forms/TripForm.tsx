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
      const recommendationsResponse = await fetch('/api/ai/recommendations', {
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
      const pdfResponse = await fetch('/api/pdf/generate', {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="destination">{t('common.destination')}</Label>
        <Input
          id="destination"
          {...register('destination')}
          error={errors.destination?.message}
        />
      </div>

      <div>
        <Label htmlFor="startDate">{t('common.startDate')}</Label>
        <Input
          id="startDate"
          type="date"
          {...register('startDate')}
          error={errors.startDate?.message}
        />
      </div>

      <div>
        <Label htmlFor="endDate">{t('common.endDate')}</Label>
        <Input
          id="endDate"
          type="date"
          {...register('endDate')}
          error={errors.endDate?.message}
        />
      </div>

      <div>
        <Label htmlFor="budget">{t('common.budget')}</Label>
        <Input
          id="budget"
          type="number"
          {...register('budget', { valueAsNumber: true })}
          error={errors.budget?.message}
        />
      </div>

      <Button type="submit" loading={isLoading}>
        {t('common.save')}
      </Button>

      {recommendations && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{t('common.recommendations')}</h3>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">{t('common.activities')}</h4>
            <ul className="list-disc list-inside">
              {recommendations.activities.map((activity: string, index: number) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">{t('common.localTips')}</h4>
            <ul className="list-disc list-inside">
              {recommendations.localTips.map((tip: string, index: number) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">{t('common.budgetTips')}</h4>
            <ul className="list-disc list-inside">
              {recommendations.budgetTips.map((tip: string, index: number) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">{t('common.weatherInfo')}</h4>
            <p>{recommendations.weatherInfo}</p>
          </div>
        </div>
      )}
    </form>
  );
} 