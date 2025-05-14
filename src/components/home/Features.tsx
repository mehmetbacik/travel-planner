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
    <section className="features-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="features-section__header"
        >
          <h2 className="features-section__title">
            {t('home.features.title')}
          </h2>
          <p className="features-section__description">
            {t('home.features.description')}
          </p>
        </motion.div>

        <div className="features-section__grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="features-section__card"
            >
              <div className="features-section__card-icon">
                <feature.icon />
              </div>
              <h3 className="features-section__card-title">
                {t(`home.features.cards.${feature.key}.title`)}
              </h3>
              <p className="features-section__card-description">
                {t(`home.features.cards.${feature.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 