import { MechanismVideo } from "./MechanismVideo";
import type { LeadContext } from "../lib/lead-context";
import CalendarGHLEmbed from "./CalendarGHLEmbed";

/**
 * Two steps, not three. This visitor already filled in the questionnaire —
 * adding an "apply" step is the friction this page exists to remove.
 *
 * Step 2 holds the first of the page's two calendar instances, and owns the
 * #book anchor: the hero CTA should land on the nearest calendar, not scroll
 * the visitor past the whole page to reach one.
 */
export function StepFraming({ lead }: { lead: LeadContext }) {
  return (
    <section className="bg-dark pb-16 sm:pb-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="font-display text-sm font-bold tracking-widest text-lime uppercase">
          Step 1
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold text-paper sm:text-3xl">
          Watch this.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-paper/80">
          Mo walks through how the system works, start to finish. No slides.
        </p>

        <div className="mt-8">
          <MechanismVideo />
        </div>

        <div
          id="book"
          className="mt-12 scroll-mt-4 border-t border-conduit/40 pt-8"
        >
          <p className="font-display text-sm font-bold tracking-widest text-lime uppercase">
            Step 2
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-paper sm:text-3xl">
            Pick a time below.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-paper/80">
            Twenty minutes on the phone. We look at your suburb, your numbers,
            and whether this is worth doing. If it isn&rsquo;t, we&rsquo;ll tell
            you.
          </p>

          <div className="mt-8">
            {/* Note: this is GHL's own snippet, while FinalCta below still uses
                CalendarEmbed against the same calendar. Two implementations of
                one thing — see the note in CalendarEmbed.tsx. */}
            <CalendarGHLEmbed lead={lead} />
          </div>
        </div>
      </div>
    </section>
  );
}
