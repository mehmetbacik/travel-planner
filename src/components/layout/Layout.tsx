import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Locale } from "@/app/i18n/settings";

interface LayoutProps {
  children: ReactNode;
  currentLang: Locale;
}

export const Layout = ({ children, currentLang }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentLang={currentLang} />
      <main className="flex-grow">{children}</main>
      <Footer currentLang={currentLang} />
    </div>
  );
};