"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import GooglePlay from "@/assets/img/googleplay.svg";
import AppStore from "@/assets/img/appstore.svg";
import { Locale } from "@/app/i18n/settings";
import { Dictionary } from "@/types/dictionary";

interface FooterSocialsProps {
  currentLang: Locale;
  dict: Dictionary;
}

const FooterSocials = ({ currentLang, dict }: FooterSocialsProps) => {
  return (
    <div className="footer__section">
      <h3 className="footer__title">{dict.footer.followUs}</h3>
      <div className="footer__socials">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Icon icon="mdi:instagram" width="24" height="24" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <Icon icon="mdi:facebook" width="24" height="24" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <Icon icon="mdi:twitter" width="24" height="24" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <Icon icon="mdi:youtube" width="24" height="24" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Linkedin"
        >
          <Icon icon="mdi:linkedin" width="24" height="24" />
        </a>
      </div>

      <div className="footer__apps">
        <Link href={`/${currentLang}/#`} className="footer__apps-content">
          <Image src={GooglePlay} alt="Google Play" width={90} height={30} />
        </Link>
        <Link href={`/${currentLang}/#`} className="footer__apps-content">
          <Image src={AppStore} alt="App Store" width={90} height={30} />
        </Link>
      </div>
    </div>
  );
};

export default FooterSocials;
