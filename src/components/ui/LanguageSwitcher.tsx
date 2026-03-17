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

  return (
    <div className="language-switcher">
      <Link href={switchLang("en")} className={currentLang === "en" ? "is-active" : undefined}>
        EN
      </Link>
      <Link href={switchLang("zh")} className={currentLang === "zh" ? "is-active" : undefined}>
        中文
      </Link>
    </div>
  );
}
