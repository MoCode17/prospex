import Image from "next/image";
import type { Testimonial } from "../lib/testimonials";

const AVATAR_PX = 48;

/**
 * Photo when we have one, the client's initial when we don't.
 *
 * Both branches occupy the same box, so a card with a photo and a card without
 * still line up side by side — the mixed state is the one that actually ships
 * first, as photos arrive one client at a time.
 *
 * No stock silhouette and no broken-image frame: a placeholder that looks like
 * a missing asset undercuts the testimonial it sits under.
 */
function Avatar({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.photoUrl) {
    return (
      <Image
        src={testimonial.photoUrl}
        width={AVATAR_PX}
        height={AVATAR_PX}
        // Empty alt on purpose — the name sits immediately beside it, so alt
        // text would make a screen reader announce the person twice.
        alt=""
        className="size-12 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-panel font-display text-lg font-bold text-paper"
    >
      {testimonial.name.charAt(0).toUpperCase()}
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  // Only the fields we actually have. Joining a filtered list is what keeps a
  // missing suburb or trade from leaving a dangling separator behind.
  const details = [testimonial.trade, testimonial.suburb].filter(Boolean);

  return (
    // h-full + flex-col so two cards match height whatever the quote length,
    // with the byline pushed to the bottom of both by mt-auto.
    <figure className="flex h-full flex-col rounded-lg border border-conduit/40 px-6 py-7">
      {/* Display weight, not body weight — this is the proof, not a caption. */}
      <p className="font-display text-lg leading-snug font-bold text-balance text-dark sm:text-xl">
        {testimonial.resultHeadline}
      </p>

      {/* Rendered from the data expression, never as JSX literal text: the copy
          stays verbatim and the apostrophes inside it are left alone. */}
      <blockquote className="mt-4 text-base leading-relaxed text-dark/80">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar testimonial={testimonial} />
        {/* min-w-0 lets the text column shrink instead of shoving the avatar
            off the card at narrow widths. */}
        <div className="min-w-0">
          <p className="font-display font-semibold text-dark">
            {testimonial.name}
            {testimonial.surnameInitial ? ` ${testimonial.surnameInitial}` : ""}
          </p>
          {/* Conduit grey fails AA against paper, so muted text is the
              foreground at reduced opacity instead. See BRAND.md. */}
          {details.length > 0 && (
            <p className="text-sm text-dark/70">{details.join(" · ")}</p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
