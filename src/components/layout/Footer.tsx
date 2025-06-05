"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Locale } from "@/app/i18n/settings";

interface FooterProps {
  currentLang: Locale;
}

const Footer = ({ currentLang }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__section">
          <h3>{t("footer.about")}</h3>
          <p>{t("footer.description")}</p>
        </div>
        <div className="footer__section">
          <h3>{t("footer.links")}</h3>
          <ul>
            <li>
              <Link href={`/${currentLang}/planner`}>{t("nav.planner")}</Link>
            </li>
            <li>
              <Link href={`/${currentLang}/about`}>{t("nav.about")}</Link>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>{t("footer.contact")}</h3>
          <p>{t("footer.email")}</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} {t("common.appName")}.{" "}
          {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
