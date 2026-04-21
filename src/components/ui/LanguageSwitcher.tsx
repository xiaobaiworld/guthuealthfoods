"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();

  const switchLang = (newLang: string) => {
    if (!pathname) return `/${newLang}`;
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = newLang;
    }
    return segments.join("/") || `/${newLang}`;
  };

  const enHref = switchLang("en");
  const zhHref = switchLang("zh");

  return (
    <div className="language-switcher">
      <Link
        href={enHref}
        className={currentLang === "en" ? "is-active" : undefined}
        data-analytics-event="language_switch"
        data-analytics-category="navigation"
        data-analytics-label={`${currentLang}:en`}
        data-analytics-lang={currentLang}
        data-analytics-content-type="language"
        data-analytics-destination={enHref}
      >
        EN
      </Link>
      <Link
        href={zhHref}
        className={currentLang === "zh" ? "is-active" : undefined}
        data-analytics-event="language_switch"
        data-analytics-category="navigation"
        data-analytics-label={`${currentLang}:zh`}
        data-analytics-lang={currentLang}
        data-analytics-content-type="language"
        data-analytics-destination={zhHref}
      >
        中文
      </Link>
    </div>
  );
}
