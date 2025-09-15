"use client";

import { Dictionary } from "@/types/dictionary";

interface FooterBrandProps {
  dict: Dictionary;
}

const FooterBrand = ({ dict }: FooterBrandProps) => {
  return (
    <div className="footer__section appName">
      <h3 className="footer__appName-title">{dict.common.appName}.</h3>
      <p className="footer__appName-description">{dict.footer.description}</p>
    </div>
  );
};

export default FooterBrand;
