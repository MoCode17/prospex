import type { LeadContext } from "../lib/lead-context";
import CalendarGHLEmbed from "./CalendarGHLEmbed";

export function FinalCta({ lead }: { lead: LeadContext }) {
  return (
    <section className="bg-dark py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-display text-3xl leading-tight font-bold text-balance text-paper sm:text-4xl">
          One electrician per region. Once yours is taken, it&rsquo;s gone.
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-paper/80">
          Pick a time.
        </p>

        <div className="mt-10">
          <CalendarGHLEmbed lead={lead} />
        </div>
      </div>
    </section>
  );
}
