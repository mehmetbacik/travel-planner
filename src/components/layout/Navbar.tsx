"use client";

import Link from "next/link";
import { Locale } from "@/app/i18n/settings";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";
import { Dictionary } from "@/types/dictionary";

interface NavbarProps {
  currentLang: Locale;
  dict: Dictionary;
}

const languages = {
  en: "English",
  tr: "Türkçe",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
} as const;

const Navbar = ({ currentLang, dict }: NavbarProps) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Locale) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLang}`, `/${lang}`);
    router.push(newPath);
    setIsDropdownOpen(false);
    setIsMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link href={`/${currentLang}`} className="navbar__logo">
          {dict.common.appName}
        </Link>

        {/* Desktop */}
        <div className="navbar__links">
          <Link href={`/${currentLang}/planner`}>{dict.nav.planner}</Link>
          <Link href={`/${currentLang}/about`}>{dict.nav.about}</Link>

          <div className="navbar__language" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="navbar__language-button"
            >
              <span>{languages[currentLang]}</span>
              <svg
                className={isDropdownOpen ? "rotate" : ""}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="navbar__language-menu">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code as Locale)}
                    className={currentLang === code ? "active" : ""}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Mobile */}
      <div
        className={`navbar__mobile-menu ${
          isMobileOpen ? "navbar__mobile-menu--open" : ""
        }`}
      >
        <Link
          href={`/${currentLang}/planner`}
          onClick={() => setIsMobileOpen(false)}
        >
          {dict.nav.planner}
        </Link>
        <Link
          href={`/${currentLang}/about`}
          onClick={() => setIsMobileOpen(false)}
        >
          {dict.nav.about}
        </Link>
        <div className="navbar__language">
          <div className="navbar__language-menu">
            {Object.entries(languages).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code as Locale)}
                className={currentLang === code ? "active" : ""}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
