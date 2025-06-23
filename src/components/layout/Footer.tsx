"use client";

import Link from "next/link";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoLinkedin,
} from "react-icons/io5";
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
                <a href="mailto:contact@travelplanner.com">
                  contact@travelplanner.com
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">{dict.footer.newsletterTitle}</h3>
            <p className="footer__description">{dict.footer.newsletterDesc}</p>
            <form className="footer__form">
              <input
                type="email"
                placeholder={dict.footer.emailPlaceholder}
                className="footer__input"
              />
              <button type="submit" className="footer__button">
                {dict.footer.subscribe}
              </button>
            </form>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">{dict.footer.followUs}</h3>
            <div className="footer__socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <IoLogoInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <IoLogoFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <IoLogoTwitter />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <IoLogoYoutube />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin"
              >
                <IoLogoLinkedin />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} {dict.common.appName}.{" "}
            {dict.common.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
