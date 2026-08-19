/**
 * Ad-platform conversion tracking for the booking event.
 *
 * Every call is guarded on both the browser and the relevant env var, so with
 * no IDs configured this file is a no-op rather than a crash. Fill in the env
 * vars (see .env.example) and the events start firing with no code change.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? "";

/**
 * Fired once when the GHL calendar confirms a booking. Guarded against double
 * firing — GHL embeds have been known to emit their success message more than
 * once, and a duplicated conversion skews the ad platform's bidding.
 */
let hasTrackedBooking = false;

export function trackBooking(): void {
  if (typeof window === "undefined" || hasTrackedBooking) return;
  hasTrackedBooking = true;

  if (META_PIXEL_ID && typeof window.fbq === "function") {
    window.fbq("track", "Schedule");
  }

  if (
    GOOGLE_ADS_ID &&
    GOOGLE_ADS_CONVERSION_LABEL &&
    typeof window.gtag === "function"
  ) {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
    });
  }
}
