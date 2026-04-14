"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

function trackPageView(measurementId: string, url: string) {
  if (!window.gtag) return;

  window.gtag("config", measurementId, {
    page_location: url,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId || !pathname) return;

    const query = window.location.search;
    const url = `${window.location.origin}${pathname}${query}`;
    trackPageView(measurementId, url);
  }, [measurementId, pathname]);

  useEffect(() => {
    if (!measurementId) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-analytics-event]");
      if (!trigger || !window.gtag) return;

      const eventName = trigger.dataset.analyticsEvent;
      if (!eventName) return;

      window.gtag("event", eventName, {
        event_category: trigger.dataset.analyticsCategory ?? "engagement",
        event_label: trigger.dataset.analyticsLabel ?? undefined,
        value: trigger.dataset.analyticsValue
          ? Number(trigger.dataset.analyticsValue)
          : undefined,
      });
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [measurementId]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
