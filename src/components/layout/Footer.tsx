import Link from "next/link";

import { getDictionary } from "@/i18n/get-dictionary";

interface FooterProps {
  lang: "en" | "zh";
}

export default async function Footer({ lang }: FooterProps) {
  const dict = await getDictionary(lang);

  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div>
          <Link href={`/${lang}`} className="brand-link brand-link--footer">
            <span className="brand-link__mark">G</span>
            <span>
              Guthu <span className="brand-link__accent">Health</span>
            </span>
          </Link>
          <p>{dict.footer.aboutDesc}</p>
        </div>

        <div>
          <h3>{dict.footer.links}</h3>
          <ul className="footer-list">
            <li><Link href={`/${lang}`}>{dict.footer.home}</Link></li>
            <li><Link href={`/${lang}/foods`}>{dict.footer.products}</Link></li>
            <li><Link href={`/${lang}/guides`}>{lang === "en" ? "Guides" : "内容指南"}</Link></li>
            <li><Link href={`/${lang}/about`}>{dict.footer.mission}</Link></li>
          </ul>
        </div>

        <div>
          <h3>{dict.footer.legal}</h3>
          <ul className="footer-list">
            <li><Link href={`/${lang}/mission`}>{lang === "en" ? "Mission" : "使命"}</Link></li>
            <li><Link href={`/${lang}/privacy`}>{dict.footer.privacy}</Link></li>
            <li><Link href={`/${lang}/terms`}>{dict.footer.terms}</Link></li>
          </ul>
        </div>
      </div>

      <div className="site-shell footer-meta">
        <p>&copy; {new Date().getFullYear()} Guthu Health Foods. {dict.footer.rights}</p>
        <p>{lang === "en" ? "Static bilingual nutrition reference." : "静态双语营养知识站点。"}</p>
      </div>
    </footer>
  );
}
