"use client";

import Image, { StaticImageData } from "next/image";
import { Locale } from "@/app/i18n/settings";
import { useState, useRef, useEffect } from "react";

interface NavbarLanguageProps {
  currentLang: Locale;
  languages: Record<Locale, { label: string; flag: StaticImageData }>;
  onChange: (lang: Locale) => void;
}

export default function NavbarLanguage({
  currentLang,
  languages,
  onChange,
}: NavbarLanguageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar__language" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
          className={isOpen ? "rotate" : ""}
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

      {isOpen && (
        <div className="navbar__language-menu">
          {Object.entries(languages).map(([code, { label, flag }]) => (
            <button
              key={code}
              onClick={() => onChange(code as Locale)}
              className={currentLang === code ? "active" : ""}
            >
              <Image src={flag} alt={label} width={24} height={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
