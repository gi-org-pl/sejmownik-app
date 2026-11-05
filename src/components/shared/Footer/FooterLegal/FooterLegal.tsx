import { Link } from "react-router";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { LEGAL_LINKS } from "./FooterLegal.constants";

export const FooterLegal = () => {
  return (
    <nav
      aria-label="Nawigacja w stopce"
      className="order-1 flex flex-wrap justify-center gap-6 text-base leading-4.75 text-gi-primary md:order-2 md:justify-end"
    >
      {LEGAL_LINKS.map((link) => (
        <Link key={link.href} to={link.href} className={FOCUS_CLASS_NAME}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
