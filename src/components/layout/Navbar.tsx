import Link from "next/link";

import LanguageSwitcher from "../ui/LanguageSwitcher";

interface NavbarProps {
  lang: string;
}

export default function Navbar({ lang }: NavbarProps) {
  const navLinks = [
    { href: `/${lang}`, label: lang === "en" ? "Home" : "首页" },
    { href: `/${lang}/foods`, label: lang === "en" ? "Foods" : "食品库" },
    { href: `/${lang}/guides`, label: lang === "en" ? "Guides" : "指南" },
    { href: `/${lang}/about`, label: lang === "en" ? "About" : "关于我们" },
  ];

  return (
    <header className="site-header">
      <nav className="site-shell site-nav" aria-label="Primary">
        <Link href={`/${lang}`} className="brand-link">
          <span className="brand-link__mark">G</span>
          <span>
            Guthu <span className="brand-link__accent">Health</span>
          </span>
        </Link>

        <div className="site-nav__links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="site-nav__actions">
          <LanguageSwitcher currentLang={lang} />
        </div>
      </nav>
    </header>
  );
}
