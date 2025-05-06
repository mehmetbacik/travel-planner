'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">TravelPlanner</h3>
            <p className="text-gray-400 mb-4">
              {t('home.hero.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('common.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/planner" className="text-gray-400 hover:text-white transition-colors">
                  {t('common.planYourTrip')}
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
                  {t('features.title')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t('common.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {t('common.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('features.title')}</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">{t('features.weather')}</li>
              <li className="text-gray-400">{t('features.attractions')}</li>
              <li className="text-gray-400">{t('features.transportation')}</li>
              <li className="text-gray-400">{t('features.food')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('common.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>123 Travel Street, City, Country</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>info@travelplanner.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} TravelPlanner. {t('common.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}; 