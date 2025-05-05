import './i18n';
import '@/styles/_globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Travel Planner - Plan Your Perfect Trip',
  description: 'AI-powered travel planner to help you create the perfect itinerary for your next adventure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
