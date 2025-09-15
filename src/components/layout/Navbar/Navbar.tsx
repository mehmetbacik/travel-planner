"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Locale } from "@/app/i18n/settings";
import { Dictionary } from "@/types/dictionary";

import NavbarLogo from "./components/NavbarLogo";
import NavbarLinks from "./components/NavbarLinks";
import NavbarLanguage from "./components/NavbarLanguage";
import NavbarToggle from "./components/NavbarToggle";
import NavbarMobileMenu from "./components/NavbarMobileMenu";

import enFlag from "@/assets/flags/en.png";
import trFlag from "@/assets/flags/tr.png";
import esFlag from "@/assets/flags/es.png";
import frFlag from "@/assets/flags/fr.png";
import deFlag from "@/assets/flags/de.png";

interface NavbarProps {
  currentLang: Locale;
  dict: Dictionary;
}

const languages = {
  en: { label: "English", flag: enFlag },
  tr: { label: "Türkçe", flag: trFlag },
  es: { label: "Español", flag: esFlag },
  fr: { label: "Français", flag: frFlag },
  de: { label: "Deutsch", flag: deFlag },
};

export default function Navbar({ currentLang, dict }: NavbarProps) {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const rawPathname = usePathname();
  const pathname =
    rawPathname.length > 1 && rawPathname.endsWith("/")
      ? rawPathname.slice(0, -1)
      : rawPathname;

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLanguageChange = (lang: Locale) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLang}`, `/${lang}`);
    router.push(newPath);
    setIsMobileOpen(false);
  };

  return (
    <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
      <div className="navbar__body container">
        <NavbarLogo currentLang={currentLang} />

        <div className="navbar__links">
          <NavbarLinks currentLang={currentLang} pathname={pathname} dict={dict} />
          <NavbarLanguage
            currentLang={currentLang}
            languages={languages}
            onChange={handleLanguageChange}
          />
        </div>

        <NavbarToggle onClick={() => setIsMobileOpen(!isMobileOpen)} />
      </div>

      <NavbarMobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        currentLang={currentLang}
        pathname={pathname}
        dict={dict}
        languages={languages}
        onLangChange={handleLanguageChange}
      />
    </nav>
  );
}
