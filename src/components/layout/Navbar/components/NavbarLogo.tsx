import Link from "next/link";
import Image from "next/image";
import ProjectLogo from "@/assets/img/logo.png";
import { Locale } from "@/app/i18n/settings";

interface NavbarLogoProps {
  currentLang: Locale;
}

export default function NavbarLogo({ currentLang }: NavbarLogoProps) {
  return (
    <Link href={`/${currentLang}`} className="navbar__logo">
      <Image
        src={ProjectLogo}
        alt="Travel Planner"
        width={90}
        height={50}
        priority
      />
    </Link>
  );
}
