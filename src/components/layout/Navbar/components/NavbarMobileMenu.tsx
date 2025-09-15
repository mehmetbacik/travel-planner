"use client";

import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { Dictionary } from "@/types/dictionary";
import { Locale } from "@/app/i18n/settings";
import { StaticImageData } from "next/image";

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Locale;
  pathname: string;
  dict: Dictionary;
  languages: Record<Locale, { label: string; flag: StaticImageData }>;
  onLangChange: (lang: Locale) => void;
}

export default function NavbarMobileMenu({
  isOpen,
  onClose,
  currentLang,
  pathname,
  dict,
  languages,
  onLangChange,
}: NavbarMobileMenuProps) {
  return (
    <div
      className={`navbar__mobile-menu ${
        isOpen ? "navbar__mobile-menu--open" : ""
      }`}
    >
      <button
        className="navbar__mobile-close"
        onClick={onClose}
        aria-label="Close mobile menu"
      >
        <IoClose />
      </button>

      <Link
        href={`/${currentLang}`}
        className={pathname === `/${currentLang}` ? "active" : ""}
        onClick={onClose}
      >
        {dict.nav.home}
      </Link>
      <Link
        href={`/${currentLang}/planner`}
        className={
          pathname.startsWith(`/${currentLang}/planner`) ? "active" : ""
        }
        onClick={onClose}
      >
        {dict.nav.planner}
      </Link>
      <Link
        href={`/${currentLang}/about`}
        className={pathname.startsWith(`/${currentLang}/about`) ? "active" : ""}
        onClick={onClose}
      >
        {dict.nav.about}
      </Link>
      <Link
        href={`/${currentLang}/blog`}
        className={pathname.startsWith(`/${currentLang}/blog`) ? "active" : ""}
        onClick={onClose}
      >
        {dict.nav.blog}
      </Link>
      <Link
        href={`/${currentLang}/contact`}
        className={
          pathname.startsWith(`/${currentLang}/contact`) ? "active" : ""
        }
        onClick={onClose}
      >
        {dict.nav.contact}
      </Link>

      <div className="navbar__language">
        <div className="navbar__language-menu">
          {Object.entries(languages).map(([code, { label, flag }]) => (
            <button
              key={code}
              onClick={() => onLangChange(code as Locale)}
              className={currentLang === code ? "active" : ""}
            >
              <Image src={flag} alt={label} width={24} height={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
