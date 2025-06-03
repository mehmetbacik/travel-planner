'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Locale } from '@/app/i18n/settings';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  currentLang: Locale;
}

const languages = {
  en: 'English',
  tr: 'Türkçe',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch'
} as const;

const Navbar = ({ currentLang }: NavbarProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Locale) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLang}`, `/${lang}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${currentLang}`} className="text-xl font-bold">
            {t('common.appName')}
          </Link>
          <div className="flex items-center space-x-6">
            <Link href={`/${currentLang}/planner`} className="hover:text-primary">
              {t('nav.planner')}
            </Link>
            <Link href={`/${currentLang}/about`} className="hover:text-primary">
              {t('nav.about')}
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 hover:text-primary focus:outline-none"
              >
                <span>{languages[currentLang]}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code as Locale)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currentLang === code
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 