"use client";

import Script from "next/script";
import { useMemo } from "react";
import type { LeadContext } from "../lib/lead-context";

const CALENDAR_URL =
  "https://api.leadconnectorhq.com/widget/booking/EaDw0MHmMUptFs4aUX2q";

/**
 * GHL booking calendar.
 *
 * form_embed.js listens for the widget's postMessage and resizes the iframe to
 * fit its content, so the height never has to be guessed. It loads through
 * next/script rather than a raw <script> tag: a synchronous third-party script
 * sitting in the markup blocks HTML parsing, which costs mobile Lighthouse
 * score, and that feeds Google Ads Quality Score.
 */
export default function CalendarGHLEmbed({ lead }: { lead: LeadContext }) {
  const src = useMemo(() => {
    const url = new URL(CALENDAR_URL);
    // GHL prefills from these where the calendar is configured for it, and
    // ignores them where it isn't — safe either way, and it saves the visitor
    // retyping details they already gave the questionnaire.
    if (lead.contactId) url.searchParams.set("contact_id", lead.contactId);
    if (lead.firstName) url.searchParams.set("first_name", lead.firstName);
    if (lead.suburb) url.searchParams.set("suburb", lead.suburb);
    return url.toString();
  }, [lead]);

  return (
    <div>
      <iframe
        src={src}
        title="Book your free strategy call"
        allow="payment"
        style={{ width: "100%", border: "none", overflow: "hidden" }}
        scrolling="no"
        id="EaDw0MHmMUptFs4aUX2q_1786611237388"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
