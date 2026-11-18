/*
  Founding-client scarcity, sitting directly above the closing CTA.

  TODO: add a small "Recent build: Grolec Electrical Group" card here once the
  project asset (screenshot) or live link exists in the repo — none does yet.
*/
export function FoundingSpots() {
  return (
    <section className="bg-dark pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl px-5">
        <div className="rounded-lg bg-panel px-6 py-8 sm:px-10">
          <p className="font-display text-xl leading-snug font-bold text-balance text-paper sm:text-2xl">
            We&rsquo;re taking on 5 founding electricians in Melbourne.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-paper/80">
            Founding clients get our full attention while we build our case
            studies.
          </p>
        </div>
      </div>
    </section>
  );
}
