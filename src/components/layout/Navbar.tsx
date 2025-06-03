'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Locale } from '@/app/i18n/settings';

interface NavbarProps {
  currentLang: Locale;
}

const Navbar = ({ currentLang }: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${currentLang}`} className="text-xl font-bold">
            {t('common.appName')}
          </Link>
          <div className="flex space-x-4">
            <Link href={`/${currentLang}/planner`} className="hover:text-primary">
              {t('nav.planner')}
            </Link>
            <Link href={`/${currentLang}/about`} className="hover:text-primary">
              {t('nav.about')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 