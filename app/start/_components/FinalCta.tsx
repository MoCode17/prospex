import { CalendarEmbed } from "./CalendarEmbed";
import { exclusivityLine } from "../lib/lead-context";
import type { LeadContext } from "../lib/lead-context";

export function FinalCta({ lead }: { lead: LeadContext }) {
  return (
    <section className="bg-dark py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-display text-3xl leading-tight font-bold text-balance text-paper sm:text-4xl">
          15 qualified leads in 30 days, or you don&rsquo;t pay the second
          $1,500.
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-paper/80">
          {exclusivityLine(lead.suburb)} Once it&rsquo;s taken, it&rsquo;s taken
          — we can&rsquo;t run this for you and the bloke two streets over at
          the same time.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-paper/80">
          Pick a time. Twenty minutes.
        </p>

        <div className="mt-10">
          <CalendarEmbed lead={lead} />
        </div>
      </div>
    </section>
  );
}
