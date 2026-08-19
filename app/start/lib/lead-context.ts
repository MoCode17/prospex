/**
 * Contact details forwarded from the GHL questionnaire redirect, e.g.
 * /book?contact_id=abc123&first_name=Dave&suburb=Reservoir&service=switchboard
 *
 * Every field is optional. These values are attacker-controllable and land in
 * the DOM, so each one is whitelisted rather than merely escaped — React stops
 * script injection on its own, but it will happily render whatever junk string
 * arrives into the middle of a sentence. Anything that fails validation becomes
 * null, and every consumer has a generic fallback branch.
 */
export type LeadContext = {
  /** Never rendered. Forwarded to the calendar embed for prefill only. */
  contactId: string | null;
  firstName: string | null;
  suburb: string | null;
  service: ServiceType | null;
};

export const SERVICE_TYPES = [
  "switchboard",
  "rewire",
  "lighting",
  "ev-charger",
  "solar",
  "emergency",
  "commercial",
  "general",
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

/** Human-readable job description, used mid-sentence in body copy. */
const SERVICE_LABELS: Record<ServiceType, string> = {
  switchboard: "switchboard upgrades",
  rewire: "rewires",
  lighting: "lighting work",
  "ev-charger": "EV charger installs",
  solar: "solar hook-ups",
  emergency: "emergency callouts",
  commercial: "commercial work",
  general: "general electrical work",
};

/**
 * Names and Melbourne suburb names: letters, spaces, and the punctuation that
 * legitimately shows up in both (O'Brien, Sunshine West, St. Albans, Keilor
 * East). Capped at 40 characters so nothing can blow out a headline.
 */
const NAME_PATTERN = /^[A-Za-z'’\-. ]{1,40}$/;

/** GHL contact ids are opaque; accept only characters safe in a query string. */
const CONTACT_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

type RawParams = Record<string, string | string[] | undefined>;

/** Repeated params (?first_name=a&first_name=b) arrive as arrays — reject those. */
function single(value: string | string[] | undefined): string | null {
  return typeof value === "string" ? value : null;
}

function cleanName(value: string | string[] | undefined): string | null {
  const raw = single(value);
  if (raw === null) return null;

  const trimmed = raw.trim().replace(/\s+/g, " ");
  if (!NAME_PATTERN.test(trimmed)) return null;

  // GHL fields are free text, so casing is whatever the punter typed —
  // "DAVE", "dave", "dAve" all show up. Normalise before it hits a headline.
  return trimmed
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function parseLeadContext(params: RawParams): LeadContext {
  const contactId = single(params.contact_id);
  const service = single(params.service)?.trim().toLowerCase();

  return {
    contactId:
      contactId && CONTACT_ID_PATTERN.test(contactId) ? contactId : null,
    firstName: cleanName(params.first_name),
    suburb: cleanName(params.suburb),
    service: SERVICE_TYPES.includes(service as ServiceType)
      ? (service as ServiceType)
      : null,
  };
}

export function serviceLabel(service: ServiceType | null): string | null {
  return service ? SERVICE_LABELS[service] : null;
}

/**
 * Suburb-exclusivity line for the two CTA blocks. Named rather than inlined so
 * both instances stay identical and the fallback can't drift.
 */
export function exclusivityLine(suburb: string | null): string {
  return suburb
    ? `We only take one sparkie in ${suburb}.`
    : "We only take one sparkie per suburb.";
}
