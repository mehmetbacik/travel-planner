import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/Calendar';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

const interests = [
  'culture',
  'nature',
  'adventure',
  'food',
  'history',
  'shopping',
  'relaxation',
  'nightlife',
] as const;

const formSchema = z.object({
  destination: z.string().min(2, {
    message: 'Destination must be at least 2 characters.',
  }),
  startDate: z.date({
    required_error: 'Start date is required.',
  }),
  endDate: z.date({
    required_error: 'End date is required.',
  }),
  budget: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Budget must be a positive number.',
  }),
  interests: z.array(z.enum(interests)).min(1, {
    message: 'Select at least one interest.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const TripPlannerForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: '',
      budget: '',
      interests: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // API çağrısı burada yapılacak
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simüle edilmiş API çağrısı
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('common.destination')}</FormLabel>
              <FormControl>
                <Input placeholder={t('planner.destinationPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('common.startDate')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>{t('common.startDate')}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date('2025-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('common.endDate')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>{t('common.endDate')}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < form.getValues('startDate') ||
                        date > new Date('2025-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('common.budget')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1000"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('common.interests')}</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {interests.map((interest) => (
                  <Button
                    key={interest}
                    type="button"
                    variant={field.value?.includes(interest) ? 'default' : 'outline'}
                    className="capitalize"
                    onClick={() => {
                      const currentValue = field.value || [];
                      const newValue = currentValue.includes(interest)
                        ? currentValue.filter((i) => i !== interest)
                        : [...currentValue, interest];
                      field.onChange(newValue);
                    }}
                  >
                    {t(`interests.${interest}`)}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t('planner.loading') : t('common.generateItinerary')}
        </Button>
      </form>
    </Form>
  );
}; 