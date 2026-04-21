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
            <span>{lang === "en" ? "Gut Health Foods" : "肠道健康食品"}</span>
          </Link>
          <p>{dict.footer.aboutDesc}</p>
        </div>

        <div>
          <h3>{dict.footer.links}</h3>
          <ul className="footer-list">
            <li>
              <Link href={`/${lang}`}>{dict.footer.home}</Link>
            </li>
            <li>
              <Link href={`/${lang}/foods`}>{dict.footer.products}</Link>
            </li>
            <li>
              <Link href={`/${lang}/guides`}>{lang === "en" ? "Guides" : "指南"}</Link>
            </li>
            <li>
              <Link href={`/${lang}/about`}>{dict.footer.mission}</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>{dict.footer.legal}</h3>
          <ul className="footer-list">
            <li>
              <Link href={`/${lang}/mission`}>{lang === "en" ? "Mission" : "使命"}</Link>
            </li>
            <li>
              <Link href={`/${lang}/privacy`}>{dict.footer.privacy}</Link>
            </li>
            <li>
              <Link href={`/${lang}/terms`}>{dict.footer.terms}</Link>
            </li>
          </ul>
        </div>

        <div className="footer-explore">
          <h3>{lang === "en" ? "Useful Links" : "实用链接"}</h3>
          <ul className="footer-list">
            <li>
              <a
                className="footer-explore__link"
                href="https://www.antiinflammatorydiets.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="outbound_link_click"
                data-analytics-category="outbound"
                data-analytics-label="https://www.antiinflammatorydiets.com/"
                data-analytics-lang={lang}
                data-analytics-content-type="outbound_link"
                data-analytics-destination="https://www.antiinflammatorydiets.com/"
              >
                Anti-inflammatory diet
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-shell footer-meta">
        <p>
          &copy; {new Date().getFullYear()} {lang === "en" ? "Gut Health Foods" : "肠道健康食品"}.{" "}
          {dict.footer.rights}
        </p>
        <p>{lang === "en" ? "Static bilingual nutrition reference." : "双语静态营养知识站。"}</p>
      </div>
    </footer>
  );
}
