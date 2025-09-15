"use client";

import Link from "next/link";
import { Locale } from "@/app/i18n/settings";

interface FooterLinksGroupProps {
  title: string;
  links: { href: string; label: string }[];
  currentLang: Locale;
}

const FooterLinksGroup = ({
  title,
  links,
  currentLang,
}: FooterLinksGroupProps) => {
  return (
    <div className="footer__section">
      <h3 className="footer__title">{title}</h3>
      <ul className="footer__links">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link href={`/${currentLang}${link.href}`}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinksGroup;
