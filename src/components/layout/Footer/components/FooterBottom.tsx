"use client";

import { Dictionary } from "@/types/dictionary";

const FooterBottom = ({ dict }: { dict: Dictionary }) => {
  return (
    <div className="footer__bottom">
      <p className="footer__copyright">
        © {new Date().getFullYear()} {dict.common.appName}.{" "}
        {dict.common.allRightsReserved}
      </p>
    </div>
  );
};

export default FooterBottom;
