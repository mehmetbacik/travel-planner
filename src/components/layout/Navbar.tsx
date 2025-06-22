"use client";

import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Locale } from "@/app/i18n/settings";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";
import { Dictionary } from "@/types/dictionary";
import ProjectLogo from "@/assets/img/logo.png";
import enFlag from "@/assets/flags/en.png";
import trFlag from "@/assets/flags/tr.png";
import esFlag from "@/assets/flags/es.png";
import frFlag from "@/assets/flags/fr.png";
import deFlag from "@/assets/flags/de.png";

interface NavbarProps {
  currentLang: Locale;
  dict: Dictionary;
}

const languages: Record<Locale, { label: string; flag: StaticImageData }> = {
  en: { label: "English", flag: enFlag },
  tr: { label: "Türkçe", flag: trFlag },
  es: { label: "Español", flag: esFlag },
  fr: { label: "Français", flag: frFlag },
  de: { label: "Deutsch", flag: deFlag },
};

const Navbar = ({ currentLang, dict }: NavbarProps) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const rawPathname = usePathname();
  const pathname =
    rawPathname.length > 1 && rawPathname.endsWith("/")
      ? rawPathname.slice(0, -1)
      : rawPathname;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        isMobileOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLanguageChange = (lang: Locale) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLang}`, `/${lang}`);
    router.push(newPath);
    setIsDropdownOpen(false);
    setIsMobileOpen(false);
  };

  return (
    <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
      <div className="navbar__body container">
        <Link href={`/${currentLang}`} className="navbar__logo">
          <Image
            src={ProjectLogo}
            alt="Travel Planner"
            width={90}
            height={50}
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="navbar__links">
          <Link
            href={`/${currentLang}`}
            className={pathname === `/${currentLang}` ? "active" : ""}
          >
            {dict.nav.home}
          </Link>

          <Link
            href={`/${currentLang}/planner`}
            className={
              pathname.startsWith(`/${currentLang}/planner`) ? "active" : ""
            }
          >
            {dict.nav.planner}
          </Link>

          <Link
            href={`/${currentLang}/about`}
            className={
              pathname.startsWith(`/${currentLang}/about`) ? "active" : ""
            }
          >
            {dict.nav.about}
          </Link>

          <Link
            href={`/${currentLang}/blog`}
            className={
              pathname.startsWith(`/${currentLang}/blog`) ? "active" : ""
            }
          >
            {dict.nav.blog}
          </Link>

          <Link
            href={`/${currentLang}/contact`}
            className={
              pathname.startsWith(`/${currentLang}/contact`) ? "active" : ""
            }
          >
            {dict.nav.contact}
          </Link>

          <div className="navbar__language" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="navbar__language-button"
            >
              <Image
                src={languages[currentLang].flag}
                alt={languages[currentLang].label}
                width={24}
                height={16}
              />
              <span>{languages[currentLang].label}</span>
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
                {Object.entries(languages).map(([code, { label, flag }]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code as Locale)}
                    className={currentLang === code ? "active" : ""}
                  >
                    <Image src={flag} alt={label} width={24} height={16} />
                    <span>{label}</span>
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
          <IoMenu />
        </button>
      </div>

      {/* Mobile */}
      <div
        className={`navbar__mobile-menu ${
          isMobileOpen ? "navbar__mobile-menu--open" : ""
        }`}
        ref={mobileMenuRef}
      >
        <button
          className="navbar__mobile-close"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close mobile menu"
        >
          <IoClose />
        </button>

        <Link
          href={`/${currentLang}`}
          className={pathname === `/${currentLang}` ? "active" : ""}
          onClick={() => setIsMobileOpen(false)}
        >
          {dict.nav.home}
        </Link>
        <Link
          href={`/${currentLang}/planner`}
          className={
            pathname.startsWith(`/${currentLang}/planner`) ? "active" : ""
          }
          onClick={() => setIsMobileOpen(false)}
        >
          {dict.nav.planner}
        </Link>
        <Link
          href={`/${currentLang}/about`}
          className={
            pathname.startsWith(`/${currentLang}/about`) ? "active" : ""
          }
          onClick={() => setIsMobileOpen(false)}
        >
          {dict.nav.about}
        </Link>
        <Link
          href={`/${currentLang}/blog`}
          className={
            pathname.startsWith(`/${currentLang}/blog`) ? "active" : ""
          }
          onClick={() => setIsMobileOpen(false)}
        >
          {dict.nav.blog}
        </Link>
        <Link
          href={`/${currentLang}/contact`}
          className={
            pathname.startsWith(`/${currentLang}/contact`) ? "active" : ""
          }
          onClick={() => setIsMobileOpen(false)}
        >
          {dict.nav.contact}
        </Link>
        <div className="navbar__language">
          <div className="navbar__language-menu">
            {Object.entries(languages).map(([code, { label, flag }]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code as Locale)}
                className={currentLang === code ? "active" : ""}
              >
                <Image src={flag} alt={label} width={24} height={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
