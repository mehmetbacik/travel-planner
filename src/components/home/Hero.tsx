'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="hero-section__content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-section__title"
        >
          {t('home.hero.title')}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-section__description"
        >
          {t('home.hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hero-section__cta"
        >
          <Link href="/planner">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {t('home.hero.cta.primary')}
            </Button>
          </Link>
          
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <Link href="/features">
              {t('home.hero.cta.secondary')}
            </Link>
          </Button>
        </motion.div>
      </div>

      <div className="hero-section__background">
        <div className="hero-section__background-element hero-section__background-element--top-left" />
        <div className="hero-section__background-element hero-section__background-element--bottom-right" />
      </div>
    </section>
  );
}; 