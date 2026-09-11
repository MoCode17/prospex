/*
  Real, named clients with results — published with their consent.

  This file replaces the deliberately-empty SocialProof placeholder that used to
  sit in _components. That placeholder withheld these two pending written
  consent; consent has since been given, so they run. Do not add a third
  testimonial here without the same.

  Quotes are verbatim. Don't tighten them, don't fix the grammar, don't swap the
  apostrophes for curly ones — the component adds the surrounding quote marks
  and renders the text untouched. A quote that reads like a copywriter wrote it
  stops working as proof.

  Every field except id/name/resultHeadline/quote is optional and absent on
  purpose: we don't have confirmed surnames, suburbs, trades or photos yet, and
  the card is built to look finished without them. Fill them in here as they're
  confirmed — no component change needed.

  photoUrl must be a path under public/ (e.g. "/images/testimonials/michael.jpg").
  A remote URL would need images.remotePatterns added to next.config.ts first.
*/

export interface Testimonial {
  id: string;
  /** First name only, unless a surname is confirmed and added. */
  name: string;
  /** e.g. "M." — add once confirmed. */
  surnameInitial?: string;
  /** e.g. "Preston" — add once confirmed. */
  suburb?: string;
  /** e.g. "Licensed electrician" — add once confirmed. */
  trade?: string;
  /** The bolded outcome line above the quote. */
  resultHeadline: string;
  /** Full testimonial text, verbatim. */
  quote: string;
  /** Optional; the card renders an initials avatar when it's absent. */
  photoUrl?: string;
}

/*
  Michael runs first, and the order is not cosmetic. His "burned by an agency
  before" line is the single highest-trust asset we have for the burned-buyer
  sparkie this funnel is aimed at, and it should be the first thing a sceptic
  reads in this section rather than the second.
*/
export const testimonials: Testimonial[] = [
  {
    id: "michael",
    name: "Michael",
    resultHeadline:
      "Went from feast-or-famine to his best three months ever — booked out 4 weeks in advance for the first time since starting his business.",
    quote:
      "I'd been burned by an agency before so I wasn't easy to convince. But the leads came in, the follow-up happened automatically, and I actually closed jobs I would've lost just by not calling back quick enough. Best decision I've made for the business.",
  },
  {
    id: "jesse",
    name: "Jesse",
    // NOTE: confirm this is "first year as a client," not "first year in
    // business" — the original phrasing was ambiguous. Ships as written until
    // someone checks it with Jesse.
    resultHeadline:
      "Went from inconsistent referrals to 47 booked jobs in his first year working with Prospex.",
    quote:
      "I can't be any happier, honestly. Started my business last year and I was struggling to get consistent work — tried doing it myself, wasted money, got nowhere. Mo built the whole thing, I didn't have to do a thing. Jobs started coming in week two. If you're sitting on the fence out there, don't waste your time, just do it.",
  },
];
