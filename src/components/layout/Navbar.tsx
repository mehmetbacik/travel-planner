'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Globe } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            {t('common.appName')}
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/features">
              <Button variant="ghost">{t('nav.features')}</Button>
            </Link>
            <Link href="/planner">
              <Button variant="default">{t('nav.planner')}</Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}; 