"use client";

import { Dictionary } from "@/types/dictionary";

interface FooterNewsletterProps {
  dict: Dictionary;
}

const FooterNewsletter = ({ dict }: FooterNewsletterProps) => {
  return (
    <div className="footer__newsletter">
      <div className="footer__newsletter-body container">
        <div className="footer__newsletter-section">
          <div className="footer__newsletter-content">
            <h3 className="footer__newsletter-content-title">
              {dict.footer.newsletterTitle}
            </h3>
            <p className="footer__newsletter-content-description">
              {dict.footer.newsletterDesc}
            </p>
          </div>
          <div className="footer__newsletter-form">
            <form>
              <input
                type="email"
                placeholder={dict.footer.emailPlaceholder}
                className="footer__newsletter-form-input"
              />
              <button type="submit" className="footer__newsletter-form-button">
                {dict.footer.subscribe}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterNewsletter;
