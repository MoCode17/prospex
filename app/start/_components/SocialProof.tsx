/**
 * Deliberately empty of client proof.
 *
 * The live site currently shows Jesse and Michael as named clients with
 * results. Those are NOT reproduced here: if Prospera is still pre-first-client
 * they can't be used, and if they're real they still need written consent
 * before reuse. Carrying them over just because they're already live is how a
 * fabricated-testimonial problem starts.
 */
export function SocialProof() {
  return (
    <section className="on-paper bg-paper py-16 sm:py-16">
      <div className="mx-auto max-w-3xl px-5">
        {/* PLACEHOLDER — swap for a real named client testimonial once the first
            client delivers a trackable result. Do not fabricate a name, photo,
            or number here. Needs: full name, suburb, trade, the specific result
            with a date range, and written consent to publish. */}
        <div className="rounded-lg border-2 border-dashed border-conduit/60 px-6 py-10 text-center">
          <p className="font-display text-lg font-bold text-dark">
            Client results go here
          </p>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-dark/70">
            Placeholder. Replace with one real, named, consented client result —
            not a stock photo and not a made-up number.
          </p>
        </div>
      </div>
    </section>
  );
}
