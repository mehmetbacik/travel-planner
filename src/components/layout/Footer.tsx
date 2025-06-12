"use client";

import Link from "next/link";
import { Locale } from "@/app/i18n/settings";
import { Dictionary } from "@/types/dictionary";

interface FooterProps {
  currentLang: Locale;
  dict: Dictionary;
}

const Footer = ({ currentLang, dict }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">{dict.common.quickLinks}</h3>
            <ul className="footer__links">
              <li>
                <Link href={`/${currentLang}/planner`}>{dict.nav.planner}</Link>
              </li>
              <li>
                <Link href={`/${currentLang}/about`}>{dict.nav.about}</Link>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">{dict.common.aboutUs}</h3>
            <p className="footer__description">
              {dict.common.appName} - {dict.home.hero.description}
            </p>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">{dict.common.contact}</h3>
            <ul className="footer__links">
              <li>
                <a href="mailto:contact@travelplanner.com">contact@travelplanner.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} {dict.common.appName}. {dict.common.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
