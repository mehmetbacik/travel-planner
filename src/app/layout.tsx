import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/main.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TravelPlanner',
  description: 'Plan your perfect trip with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
