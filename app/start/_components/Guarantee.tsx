/*
  The guarantee: $30,000 in quote requests in the first 30 days, valued at the
  client's own prices agreed before they sign. Keep this wording identical to
  the hero and the metadata — two versions of a promise in circulation is a
  refund argument waiting to happen.
*/
export function Guarantee() {
  return (
    <section className="bg-dark py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-display text-3xl leading-tight font-bold text-balance text-paper sm:text-4xl">
          {/* Anton's second and last appearance on the page — a proof number. */}
          <span className="font-stat font-normal text-lime">$30,000</span> in
          quote requests in your first 30 days — or we keep working free until
          you get them.
        </h2>

        <div className="mt-10 rounded-lg bg-panel px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-lg leading-relaxed text-paper/80">
            A quote request is a genuine enquiry from a real local customer in
            your region, for a job you actually do, that you can reach by phone.
            We value each one at your own standard price for that job type,
            agreed with you before you sign.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-paper/80">
            Whatever happens, you keep the funnel and every lead in it.
          </p>
        </div>
      </div>
    </section>
  );
}
