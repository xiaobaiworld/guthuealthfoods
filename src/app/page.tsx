import type { Metadata } from "next";

import Home from "./[lang]/page";
import { buildAbsoluteUrl, getBasePath, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: buildAbsoluteUrl(getBasePath("en")),
    languages: {
      en: buildAbsoluteUrl(getBasePath("en")),
      zh: buildAbsoluteUrl(getBasePath("zh")),
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: buildAbsoluteUrl(getBasePath("en")),
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
  return <Home params={Promise.resolve({ lang: "en" })} />;
}
