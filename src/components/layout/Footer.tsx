'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Locale } from '@/app/i18n/settings';

interface FooterProps {
  currentLang: Locale;
}

export const Footer = ({ currentLang }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.about')}</h3>
            <p className="text-gray-600">{t('footer.description')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${currentLang}/planner`} className="text-gray-600 hover:text-primary">
                  {t('nav.planner')}
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/about`} className="text-gray-600 hover:text-primary">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <p className="text-gray-600">{t('footer.email')}</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} {t('common.appName')}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}; 