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
      <div className="footer__newsletter">
        <div className="footer__newsletter-body container">
          <div className="footer__newsletter-section">
            <h3 className="footer__newsletter-title">
              {dict.footer.newsletterTitle}
            </h3>
            <p className="footer__newsletter-description">
              {dict.footer.newsletterDesc}
            </p>
            <form className="footer__newsletter-form">
              <input
                type="email"
                placeholder={dict.footer.emailPlaceholder}
                className="footer__newsletter-input"
              />
              <button type="submit" className="footer__newsletter-button">
                {dict.footer.subscribe}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer__content">
        <div className="footer__content-body container">
          <div className="footer__section appName">
            <h3 className="footer__appName-title">{dict.common.appName}.</h3>
            <p className="footer__appName-description">
              {dict.footer.description}
            </p>
          </div>
          <div className="footer__section">
            <h3 className="footer__title">{dict.footer.corporate}</h3>
            <ul className="footer__links">
              <li>
                <Link href={`/${currentLang}/about`}>{dict.footer.about}</Link>
              </li>
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.media}</Link>
              </li>
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.culture}</Link>
              </li>
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.career}</Link>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <h3 className="footer__title">{dict.footer.security}</h3>
            <ul className="footer__links">
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.rules}</Link>
              </li>
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.customer}</Link>
              </li>
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.cookies}</Link>
              </li>
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.privacy}</Link>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <h3 className="footer__title">{dict.footer.help}</h3>
            <ul className="footer__links">
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.write}</Link>
              </li>
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.faq}</Link>
              </li>
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.assistance}</Link>
              </li>
              <li>
                <Link href={`/${currentLang}/#`}>{dict.footer.contact}</Link>
              </li>
            </ul>
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
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} {dict.common.appName}.{" "}
          {dict.common.allRightsReserved}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
