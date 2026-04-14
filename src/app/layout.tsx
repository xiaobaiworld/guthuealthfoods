import type { Metadata } from "next";

import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { googleConfig, siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  verification: googleConfig.siteVerification
    ? {
        google: googleConfig.siteVerification,
      }
    : undefined,
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const measurementId = googleConfig.measurementId;

  return (
    <html>
      <body suppressHydrationWarning>
        {children}
        {measurementId ? <GoogleAnalytics measurementId={measurementId} /> : null}
      </body>
    </html>
  );
}
