/*
  The $99-per-qualified-booked-assessment fee is deliberately absent from this
  section. It runs on a different, stricter bar than the 15-lead guarantee, and
  putting the two in the same breath sets an expectation we'd then have to walk
  back on the call. It appears once, in the FAQ cost answer, and nowhere else.

  TODO — CONFIRM BEFORE LAUNCH: the guarantee number. This page says 15 leads /
  30 days. The live site says 30, an earlier internal doc says 20. Three
  different promises in circulation is a refund argument waiting to happen.
*/
export function Guarantee() {
  return (
    <section className="bg-dark py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-display text-3xl leading-tight font-bold text-balance text-paper sm:text-4xl">
          The guarantee, in plain words.
        </h2>

        <div className="mt-10 rounded-lg bg-panel px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            {/* Anton's second and last appearance on the page. */}
            <span className="font-stat text-6xl leading-none text-lime sm:text-7xl">
              100+
            </span>
            <span className="font-display text-2xl font-bold text-paper sm:text-3xl">
              qualified leads in your first 30 days.
            </span>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-paper/80">
            Qualified means a real person, in your city, with the type of
            property you work on, who you can actually get on the phone. Not a
            form fill. Not a tyre-kicker in Geelong.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-paper/80">
            If we don&rsquo;t hit 100, we work for free until you do. You keep
            the funnel, the pipeline and the follow-up we built, and we keep
            working on it until you get there.
          </p>
        </div>
      </div>
    </section>
  );
}
