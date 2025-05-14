'use client';

import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './Button';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (langCode: string) => {
    const currentPath = pathname;
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${langCode}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={i18n.language === lang.code ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleLanguageChange(lang.code)}
          className="min-w-[60px]"
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
}; 