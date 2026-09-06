import type { ReactNode } from "react";

/*
  These are the objections that survive to this point in the funnel. The
  visitor already cleared "who even are you" in the questionnaire, so nothing
  here re-litigates it.

  The $99 per qualified booked assessment appears in the cost answer and NOWHERE
  else on the page — see the note in Guarantee.tsx.
*/
const QUESTIONS: { q: string; a: ReactNode }[] = [
  {
    q: "Will this end up costing me more than I think?",
    a: (
      <>
        <p>
          No surprises. The build is a flat, one-time cost - paid once, split in
          two so we&rsquo;ve got skin in the game too: half up front to build
          it, half at day 30, and we only see that second half if we've hit the
          lead guarantee. If we don&rsquo;t, you simply don&rsquo;t pay it. No
          refund chase, no fine print.
        </p>
        <p className="mt-4">
          Ad spend is separate and it&rsquo;s yours - it goes straight to Google
          and Meta on your card, never through us, so it can&rsquo;t quietly
          become our margin.
        </p>
      </>
    ),
  },
  {
    q: "How do I know you won't take the money and disappear?",
    a: (
      <p>
        You get dashboard access on day one. Every lead, every SMS, every
        follow-up, every call the dialler picked up — in there in real time, on
        your phone. You don&rsquo;t wait for a monthly report to find out
        whether anything happened. If we go quiet, you&rsquo;ll see it before we
        tell you.
      </p>
    ),
  },
  {
    q: "I already get enough work from referrals.",
    a: (
      <>
        <p>
          Good. Referrals are the best work there is and nothing here replaces
          them.
        </p>
        <p className="mt-4">
          The question is what happens the month your best two referral sources
          go quiet at the same time. A builder finishes a project. A mate
          retires. It&rsquo;s happened to every sparkie who&rsquo;s been out on
          his own more than a couple of years, and it always lands in a month
          you had wages to cover. This is a second engine so that month
          isn&rsquo;t a crisis.
        </p>
      </>
    ),
  },
  {
    q: "My suburb's too competitive. / My suburb's too small.",
    a: (
      <>
        <p>
          Both are the same answer: one electrician per area, and once
          it&rsquo;s taken it&rsquo;s taken.
        </p>
        <p className="mt-4">
          Competitive means the searches are there and we&rsquo;re fighting for
          position — winnable, because most of your competitors are still
          sending ads to a homepage. Small means fewer searches, so we widen to
          the suburbs you already drive through. Either way we tell you which
          one you are on the call, before you pay anything.
        </p>
      </>
    ),
  },
];

export function ObjectionFaq() {
  return (
    <section className="on-paper bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-display text-3xl leading-tight font-bold text-balance text-dark sm:text-4xl">
          The bits you&rsquo;re still chewing on.
        </h2>

        {/* Native <details> — keyboard-operable and screen-reader-correct with
            zero JavaScript, which also keeps it off the main thread. */}
        <div className="mt-10 divide-y divide-conduit/40 border-y border-conduit/40">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-bold text-dark">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-2xl leading-none text-dark/60 group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 hidden shrink-0 text-2xl leading-none text-dark/60 group-open:block"
                >
                  &minus;
                </span>
              </summary>
              <div className="mt-4 text-base leading-relaxed text-dark/80">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
