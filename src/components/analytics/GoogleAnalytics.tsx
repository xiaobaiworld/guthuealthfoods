"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { getAnalyticsPageContext } from "@/lib/analytics";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

interface AnalyticsEventParams {
  [key: string]: string | number | undefined;
}

function trackPageView(measurementId: string, url: string) {
  if (!window.gtag) return;

  window.gtag("config", measurementId, {
    page_location: url,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
}

function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (!window.gtag) return;

  window.gtag("event", eventName, params);
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId || !pathname) return;

    const query = window.location.search;
    const url = `${window.location.origin}${pathname}${query}`;
    const pageContext = getAnalyticsPageContext(pathname);

    trackPageView(measurementId, url);

    trackEvent("page_context", {
      language: pageContext.lang,
      page_type: pageContext.pageType,
      content_slug: pageContext.slug,
      page_path: `${window.location.pathname}${window.location.search}`,
    });

    if (pageContext.pageType === "food_detail" && pageContext.slug) {
      trackEvent("view_food_detail", {
        language: pageContext.lang,
        page_type: pageContext.pageType,
        content_slug: pageContext.slug,
      });
    }

    if (pageContext.pageType === "guide_detail" && pageContext.slug) {
      trackEvent("view_guide_detail", {
        language: pageContext.lang,
        page_type: pageContext.pageType,
        content_slug: pageContext.slug,
      });
    }

    if (pageContext.pageType === "food_category" && pageContext.slug) {
      trackEvent("view_food_category", {
        language: pageContext.lang,
        page_type: pageContext.pageType,
        content_slug: pageContext.slug,
      });
    }
  }, [measurementId, pathname]);

  useEffect(() => {
    if (!measurementId) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-analytics-event]");
      if (!trigger || !window.gtag) return;

      const eventName = trigger.dataset.analyticsEvent;
      if (!eventName) return;
      const link =
        trigger instanceof HTMLAnchorElement
          ? trigger
          : trigger.querySelector<HTMLAnchorElement>("a[href]");
      const pageContext = getAnalyticsPageContext(window.location.pathname);

      trackEvent(eventName, {
        event_category: trigger.dataset.analyticsCategory ?? "engagement",
        event_label: trigger.dataset.analyticsLabel ?? undefined,
        value: trigger.dataset.analyticsValue
          ? Number(trigger.dataset.analyticsValue)
          : undefined,
        language: trigger.dataset.analyticsLang ?? pageContext.lang,
        page_type: trigger.dataset.analyticsPageType ?? pageContext.pageType,
        content_type: trigger.dataset.analyticsContentType ?? undefined,
        content_slug: trigger.dataset.analyticsSlug ?? undefined,
        destination_url: trigger.dataset.analyticsDestination ?? link?.href ?? undefined,
        page_path: `${window.location.pathname}${window.location.search}`,
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
