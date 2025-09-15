import { IoMenu } from "react-icons/io5";

interface NavbarToggleProps {
  onClick: () => void;
}

export default function NavbarToggle({ onClick }: NavbarToggleProps) {
  return (
    <button
      className="navbar__toggle"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <IoMenu />
    </button>
  );
}
