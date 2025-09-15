import Link from "next/link";
import { Dictionary } from "@/types/dictionary";
import { Locale } from "@/app/i18n/settings";

interface NavbarLinksProps {
  currentLang: Locale;
  pathname: string;
  dict: Dictionary;
}

export default function NavbarLinks({
  currentLang,
  pathname,
  dict,
}: NavbarLinksProps) {
  return (
    <>
      <Link
        href={`/${currentLang}`}
        className={pathname === `/${currentLang}` ? "active" : ""}
      >
        {dict.nav.home}
      </Link>
      <Link
        href={`/${currentLang}/planner`}
        className={
          pathname.startsWith(`/${currentLang}/planner`) ? "active" : ""
        }
      >
        {dict.nav.planner}
      </Link>
      <Link
        href={`/${currentLang}/about`}
        className={pathname.startsWith(`/${currentLang}/about`) ? "active" : ""}
      >
        {dict.nav.about}
      </Link>
      <Link
        href={`/${currentLang}/blog`}
        className={pathname.startsWith(`/${currentLang}/blog`) ? "active" : ""}
      >
        {dict.nav.blog}
      </Link>
      <Link
        href={`/${currentLang}/contact`}
        className={
          pathname.startsWith(`/${currentLang}/contact`) ? "active" : ""
        }
      >
        {dict.nav.contact}
      </Link>
    </>
  );
}
