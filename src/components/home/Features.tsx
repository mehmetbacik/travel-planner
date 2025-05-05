import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Wallet, 
  Lightbulb 
} from 'lucide-react';

const features = [
  {
    icon: MapPin,
    key: 'destination'
  },
  {
    icon: Calendar,
    key: 'planning'
  },
  {
    icon: Wallet,
    key: 'budget'
  },
  {
    icon: Lightbulb,
    key: 'recommendations'
  }
];

export const Features = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">
            {t('home.features.title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('home.features.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">
                {t(`home.features.cards.${feature.key}.title`)}
              </h3>
              <p className="text-text-secondary">
                {t(`home.features.cards.${feature.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 