import { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Locale } from "@/app/i18n/settings";
import { Dictionary } from "@/types/dictionary";

interface LayoutProps {
  children: ReactNode;
  currentLang: Locale;
  dict: Dictionary;
}

export const Layout = ({ children, currentLang, dict }: LayoutProps) => {
  return (
    <div>
      <Navbar currentLang={currentLang}  dict={dict}/>
      <main>{children}</main>
      <Footer currentLang={currentLang}  dict={dict}/>
    </div>
  );
};