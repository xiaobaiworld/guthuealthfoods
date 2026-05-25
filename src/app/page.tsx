import type { Metadata } from "next";
import Link from "next/link";

import { buildAbsoluteUrl, getBasePath, siteConfig } from "@/lib/site";

const englishPath = getBasePath("en");
const englishUrl = buildAbsoluteUrl(englishPath);

export const metadata: Metadata = {
  title: `Redirecting to ${siteConfig.name}`,
  description: `Continue to the English homepage for ${siteConfig.name}.`,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: englishUrl,
    languages: {
      en: englishUrl,
      zh: buildAbsoluteUrl(getBasePath("zh")),
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: englishUrl,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function IndexPage() {
  return (
    <main className="site-shell stack-xl" style={{ paddingBlock: "4rem" }}>
      <meta httpEquiv="refresh" content={`0; url=${englishPath}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(englishPath)});`,
        }}
      />
      <section className="page-intro">
        <p className="eyebrow">Redirect</p>
        <h1>{siteConfig.name}</h1>
        <p>Redirecting to the English homepage.</p>
        <p>
          <Link href={englishPath}>Continue to Gut Health Foods</Link>
        </p>
      </section>
    </main>
  );
}
