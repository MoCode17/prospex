import { serviceLabel } from "../lib/lead-context";
import type { LeadContext } from "../lib/lead-context";

/*
  ⚠️ NICHE FLAG — UNRESOLVED. This copy assumes the broad "all Melbourne
  electricians" niche (Suburb Domination System™). If Prospera has since
  committed to the narrow switchboard-specialist niche (The Switchboard
  Pipeline), Layer 1's service list and the framing across all three layers
  need to shift to switchboard / electrification-upgrade language specifically
  — "switchboard upgrade Preston", "safety switch", "old ceramic fuses" rather
  than the general job types below. This has NOT been silently decided; it is
  waiting on Mo. Same flag applies to SERVICE_TYPES in lib/lead-context.ts.
*/

const LAYERS = [
  {
    number: "01",
    name: "Capture",
    body: "Google Ads targeted to your suburbs and your job types. They only show to someone typing the thing they need, right now, in the area you actually drive to. No boosted posts. No hoping.",
  },
  {
    number: "02",
    name: "Convert",
    body: "The click lands on a page built to ask for the job, not a homepage with your logo on it. Every enquiry gets an SMS back inside two minutes — while they're still holding the phone, before they try the next bloke on the list.",
  },
  {
    number: "03",
    name: "Close & Retain",
    body: "Every lead sits in one pipeline. Five to seven days of automated follow-up on anyone who goes quiet. An AI dialler picks up what you miss on the tools and after hours. Review requests go out on their own once the job's done.",
  },
] as const;

export function Mechanism({ lead }: { lead: LeadContext }) {
  const job = serviceLabel(lead.service);

  return (
    <section className="bg-paper py-16 sm:py-16">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-display text-3xl leading-tight font-bold text-balance text-dark sm:text-4xl">
          Three layers, one system.
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-dark/80">
          {job
            ? `Here's what we build for ${job}, and what it does once it's running.`
            : "Here's what we build, and what it does once it's running."}
        </p>

        {/* The one violet moment in this view: a single rule running the length
            of all three layers, not one per item — three would break the
            one-violet-element rule, and a continuous line says "one system"
            better than three separate marks. Violet as a mark, never as text:
            it wouldn't clear AA at this size. */}
        <ol className="mt-12 space-y-10">
          {LAYERS.map((layer) => (
            <li
              key={layer.number}
              className="bg-dark p-4 rounded-xl border-b-3 border-violet hover:-translate-y-3 transition-all ease-in-out duration-300"
            >
              <p className="font-display text-center text-sm font-bold tracking-widest text-paper/70 uppercase">
                Layer {layer.number}
              </p>
              <h3 className="mt-2 text-center font-display text-2xl font-bold text-lime">
                {layer.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-paper/80">
                {layer.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-12 border-b border-conduit/40 pb-8 text-base leading-relaxed text-dark/80">
          All of it reports into one dashboard. You check it once a week, on the
          couch, in about four minutes.
        </p>
      </div>
    </section>
  );
}
