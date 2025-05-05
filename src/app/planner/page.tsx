import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { TripPlannerForm } from '@/components/planner/TripPlannerForm';

export default function PlannerPage() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('planner.title')}
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            {t('planner.subtitle')}
          </p>
          <TripPlannerForm />
        </div>
      </div>
    </Layout>
  );
} 