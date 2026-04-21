import Link from "next/link";

import LanguageSwitcher from "../ui/LanguageSwitcher";

interface NavbarProps {
  lang: string;
}

export default function Navbar({ lang }: NavbarProps) {
  const navLinks = [
    {
      href: `/${lang}`,
      label: lang === "en" ? "Home" : "首页",
      analyticsLabel: "home",
    },
    {
      href: `/${lang}/foods`,
      label: lang === "en" ? "Foods" : "食品",
      analyticsLabel: "foods",
    },
    {
      href: `/${lang}/guides`,
      label: lang === "en" ? "Guides" : "指南",
      analyticsLabel: "guides",
    },
    {
      href: `/${lang}/about`,
      label: lang === "en" ? "About" : "关于我们",
      analyticsLabel: "about",
    },
  ];

  return (
    <header className="site-header">
      <nav className="site-shell site-nav" aria-label="Primary">
        <Link
          href={`/${lang}`}
          className="brand-link"
          data-analytics-event="nav_brand_click"
          data-analytics-category="navigation"
          data-analytics-label={lang}
          data-analytics-lang={lang}
          data-analytics-content-type="home"
          data-analytics-destination={`/${lang}`}
        >
          <span className="brand-link__mark">G</span>
          <span>{lang === "en" ? "Gut Health Foods" : "肠道健康食品"}</span>
        </Link>

        <div className="site-nav__links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-analytics-event="nav_click"
              data-analytics-category="navigation"
              data-analytics-label={`${lang}:${link.analyticsLabel}`}
              data-analytics-lang={lang}
              data-analytics-content-type={link.analyticsLabel}
              data-analytics-destination={link.href}
            >
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
