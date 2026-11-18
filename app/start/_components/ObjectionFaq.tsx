import type { ReactNode } from "react";

/*
  These are the objections that survive to this point in the funnel. The
  visitor already cleared "who even are you" in the questionnaire, so nothing
  here re-litigates it.

  Pricing is deliberately not quoted on the page: one setup fee, one flat
  monthly fee, exact numbers given on the call once we've looked at the region.
*/
const QUESTIONS: { q: string; a: ReactNode }[] = [
  {
    q: "Will it cost more than I expect?",
    a: (
      <p>
        No surprises. One setup fee and one flat monthly fee. Ad spend is paid
        straight to Google and Meta on your own card, never through us. No
        commission on your jobs and no lock-in. We&rsquo;ll give you exact
        numbers on the call, once we&rsquo;ve looked at your region.
      </p>
    ),
  },
  {
    q: "How do I know you won't take the money and disappear?",
    a: (
      <p>
        You get dashboard access on day one. Every lead, every SMS, every
        follow-up, every missed call we answered — in there in real time, on
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
    q: "My area is too competitive / too small.",
    a: (
      <p>
        Either way, it&rsquo;s one electrician per region. We&rsquo;ll tell you
        which applies on the call, before you pay anything.
      </p>
    ),
  },
  {
    q: "I've tried an agency before and got nothing.",
    a: (
      <p>
        Most agencies send ads to a homepage and stop there. We build the whole
        loop: the ad, the page, a text back in 2 minutes, and every missed call
        answered. And we&rsquo;re measured on quote requests, not clicks.
      </p>
    ),
  },
  {
    q: "I'm not a tech guy.",
    a: (
      <p>
        You don&rsquo;t need to be. You never touch anything we build. You check
        one app on your phone for about 4 minutes a week.
      </p>
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
