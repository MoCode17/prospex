const FAILURES = [
  { tried: "HiPages", why: "Shared leads. Race to the bottom on price." },
  { tried: "SEO agency", why: "Six months. No movement." },
  {
    tried: "Google Ads",
    why: "Burned budget sending clicks to a homepage that couldn't convert.",
  },
  { tried: "Facebook boosts", why: "Reach without intent. Likes, not calls." },
  { tried: "A mate's website", why: "Nobody finds it." },
] as const;

/**
 * The "not your fault" reframe. This is the hinge of the page — the visitor
 * arrives assuming marketing doesn't work for sparkies, and it has to become
 * "the tools were disconnected" before the mechanism section means anything.
 */
export function RealProblem() {
  return (
    <section className="on-paper bg-dark py-16 sm:py-18">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-oswald text-center tracking-tight text-2xl font-bold text-lime sm:text-3xl">
          THE REAL PROBLEM
        </h2>
        <h2 className="font-display text-center uppercase text-2xl font-bold text-lime text-paper sm:text-3xl">
          If You&rsquo;ve Paid For Marketing And Got Nothing Back &mdash;
          <br />
          <span className="text-lime">It Wasn&rsquo;t Your Fault.</span>
        </h2>
        <h2 className="font-display text-3xl text-center leading-tight font-bold text-balance text-paper sm:text-4xl">
          It wasn&rsquo;t your fault.
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-paper/80">
          None of what you tried was connected to anything else. The ads pointed
          at a website that didn&rsquo;t ask for the job. The enquiries landed
          in an inbox you check at 7pm. The quotes went out and nobody chased
          them. Five separate tools, none of them talking, and you in the middle
          of it answering your phone off a ladder. That&rsquo;s not a you
          problem. That&rsquo;s five things doing a quarter of a job each.
        </p>

        <div className="mt-12 overflow-hidden rounded-lg border border-conduit/40">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] border-b border-conduit/40 bg-dark">
            <h3 className="px-4 py-3 font-display text-xs font-bold tracking-widest text-red-500/70 uppercase sm:text-sm">
              What you tried
            </h3>
            <h3 className="px-4 py-3 font-display text-xs font-bold tracking-widest text-red-500/70 uppercase sm:text-sm">
              Why it failed
            </h3>
          </div>

          {FAILURES.map((row, index) => (
            <div
              key={row.tried}
              className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] ${
                index < FAILURES.length - 1 ? "border-b border-conduit/30" : ""
              }`}
            >
              <p className="px-4 py-4 font-display text-base font-bold text-paper">
                {row.tried}
              </p>
              <p className="px-4 py-4 text-base leading-snug text-paper/80">
                {row.why}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
