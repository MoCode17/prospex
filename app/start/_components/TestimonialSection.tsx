import { TestimonialCard } from "./TestimonialCard";
import { testimonials } from "../lib/testimonials";

/*
  Both testimonials are visible at once, on purpose. No carousel: a skimming
  visitor only ever sees the first slide, which throws away half the proof in
  exchange for a swipe animation nobody asked for.

  No star ratings and no "verified client" badge either. We have no linked
  public review to point at, and an unverifiable trust badge reads worse to a
  sceptic than no badge at all.
*/
export function TestimonialSection() {
  // A heading sitting above nothing reads as broken, so the section drops out
  // entirely rather than rendering an empty shell.
  if (testimonials.length === 0) return null;

  const isMultiple = testimonials.length > 1;

  return (
    // on-paper switches the focus ring to dark — lime on paper is 1.04:1 and
    // effectively invisible. See globals.css.
    <section className="on-paper bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="font-display text-3xl leading-tight font-bold text-balance text-dark sm:text-4xl">
          Is this working for other sparkies?
        </h2>
        {/* The section's one violet moment. Nothing else here is violet. */}
        <div aria-hidden="true" className="mt-5 h-1 w-12 bg-violet" />

        {/* Two columns only when there's something to put in the second one —
            a lone card stranded at half width looks like a load failure. */}
        <div
          className={`mt-10 grid gap-6 ${
            isMultiple ? "md:grid-cols-2" : "max-w-2xl"
          }`}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
