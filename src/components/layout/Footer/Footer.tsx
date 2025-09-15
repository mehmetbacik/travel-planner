"use client";

import { Locale } from "@/app/i18n/settings";
import { Dictionary } from "@/types/dictionary";
import FooterNewsletter from "./components/FooterNewsletter";
import FooterBrand from "./components/FooterBrand";
import FooterLinksGroup from "./components/FooterLinksGroup";
import FooterSocials from "./components/FooterSocials";
import FooterBottom from "./components/FooterBottom";

interface FooterProps {
  currentLang: Locale;
  dict: Dictionary;
}

const Footer = ({ currentLang, dict }: FooterProps) => {
  return (
    <footer className="footer">
      <FooterNewsletter dict={dict} />

      <div className="footer__content">
        <div className="footer__content-body container">
          <FooterBrand dict={dict} />

          <FooterLinksGroup
            title={dict.footer.corporate}
            currentLang={currentLang}
            links={[
              { href: "/about", label: dict.footer.about },
              { href: "/#", label: dict.footer.media },
              { href: "/#", label: dict.footer.culture },
              { href: "/#", label: dict.footer.career },
            ]}
          />

          <FooterLinksGroup
            title={dict.footer.security}
            currentLang={currentLang}
            links={[
              { href: "/#", label: dict.footer.rules },
              { href: "/#", label: dict.footer.customer },
              { href: "/#", label: dict.footer.cookies },
              { href: "/#", label: dict.footer.privacy },
            ]}
          />

          <FooterLinksGroup
            title={dict.footer.help}
            currentLang={currentLang}
            links={[
              { href: "/#", label: dict.footer.write },
              { href: "/#", label: dict.footer.faq },
              { href: "/#", label: dict.footer.assistance },
              { href: "/#", label: dict.footer.contact },
            ]}
          />

          <FooterSocials currentLang={currentLang} dict={dict} />
        </div>
      </div>

      <FooterBottom dict={dict} />
    </footer>
  );
};

export default Footer;
