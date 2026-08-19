"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { trackBooking } from "../lib/tracking";
import type { LeadContext } from "../lib/lead-context";

const CALENDAR_URL = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL ?? "";

/**
 * GHL calendar iframe, mounted only once it scrolls near the viewport.
 *
 * The lazy mount is the single biggest performance lever on this page: a
 * third-party iframe rendered eagerly competes with the hero for LCP, and this
 * page's speed feeds Google Ads Quality Score directly.
 *
 * ⚠️ UNRESOLVED: the page currently runs two implementations of the same
 * calendar. This one (used by FinalCta) has the conversion tracking, the lazy
 * mount, and env-var config. CalendarGHLEmbed (used by StepFraming) is GHL's
 * own snippet and adds form_embed.js, which auto-sizes the iframe instead of
 * relying on the fixed min-height below — but it fires no Meta/Google
 * conversion event, so a booking made in Step 2 is currently invisible to the
 * ad platforms. Pick one: fold form_embed.js in here, or add tracking there.
 */
export function CalendarEmbed({ lead }: { lead: LeadContext }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  const src = useMemo(() => {
    if (!CALENDAR_URL) return "";
    try {
      const url = new URL(CALENDAR_URL);
      // GHL prefills from these query params where the calendar is configured
      // for it. Harmless if it isn't — unknown params are ignored.
      if (lead.contactId) url.searchParams.set("contact_id", lead.contactId);
      if (lead.firstName) url.searchParams.set("first_name", lead.firstName);
      if (lead.suburb) url.searchParams.set("suburb", lead.suburb);
      return url.toString();
    } catch {
      // A malformed env var shouldn't take the page down.
      return "";
    }
  }, [lead]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldMount) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setShouldMount(true);
        observer.disconnect();
      },
      // Start loading before it's actually on screen so the widget is ready by
      // the time the visitor gets there.
      { rootMargin: "600px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldMount]);

  useEffect(() => {
    if (!src) return;

    const calendarOrigin = new URL(src).origin;

    function handleMessage(event: MessageEvent) {
      // Any page can postMessage at us — only listen to the calendar's origin.
      if (event.origin !== calendarOrigin) return;

      const data = event.data;
      const type =
        typeof data === "string"
          ? data
          : typeof data === "object" && data !== null && "type" in data
            ? String((data as { type: unknown }).type)
            : "";

      // TODO: verify against the live GHL calendar config. GHL embeds vary by
      // account — some post a message on success, others redirect to a
      // thank-you URL instead. The event names below are the common ones but
      // could not be confirmed from this repo. If this account redirects,
      // delete this listener and call trackBooking() on the thank-you page.
      if (/appointment|booking/i.test(type) && /book|success|confirm/i.test(type)) {
        trackBooking();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [src]);

  return (
    <div ref={containerRef} className="min-h-[600px]">
      {!src ? (
        // Loud on purpose: a misconfigured deploy should be obvious, not blank.
        <div className="flex min-h-[600px] items-center justify-center rounded-lg border-2 border-dashed border-conduit/60 px-6 text-center">
          <div>
            <p className="font-display text-lg font-bold text-paper">
              Calendar loads here
            </p>
            <p className="mt-3 text-base text-paper/70">
              Set NEXT_PUBLIC_GHL_CALENDAR_URL in .env.local — see .env.example.
            </p>
          </div>
        </div>
      ) : shouldMount ? (
        <iframe
          src={src}
          title="Book your free strategy call"
          className="min-h-[600px] w-full rounded-lg border-0 bg-paper"
          loading="lazy"
        />
      ) : (
        // Reserves the iframe's height so nothing jumps when it mounts.
        <div className="min-h-[600px] rounded-lg bg-panel" aria-hidden="true" />
      )}
    </div>
  );
}
