"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion";

/*
  MARKET DATA, NOT PROSPEX RESULTS. Prospex has no live campaign to cite yet,
  so every number here is framed as industry data and labelled as such on the
  page. Do not reword these into "our clients see…" without real, trackable
  numbers to back it.

  TODO: attach the source for each figure before this goes live — an unsourced
  stat in front of a sceptical tradie is worse than no stat.

  Three, not four. This visitor already saw stats inside the questionnaire; a
  fourth reads as padding.
*/
const STATS = [
  {
    value: 40,
    prefix: "",
    suffix: "%",
    label: "of tradie calls go unanswered during work hours",
  },
  {
    value: 20,
    prefix: "$",
    suffix: "k+",
    label: "average lost per year to missed calls",
  },
  {
    value: 78,
    prefix: "",
    suffix: "%",
    label: 'of "electrician near me" searches convert to a same-day call',
  },
] as const;

const DURATION_MS = 1100;

/** Counts 0 → target once, the first time the element scrolls into view. */
function useCountUp(target: number) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    // Reduced motion is handled by deriving the value below rather than
    // writing state here — no animation to set up, nothing to observe.
    if (!node || prefersReducedMotion) return;

    let frame = 0;
    let hasRun = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasRun) return;
        hasRun = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          // Ease-out: fast off the mark, settles onto the number.
          const eased = 1 - Math.pow(1 - progress, 3);
          setAnimatedValue(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    // Cancelling the frame has to happen out here — a value returned from the
    // observer callback is discarded, so cleanup can't live inside it.
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, prefersReducedMotion]);

  return {
    value: prefersReducedMotion ? target : animatedValue,
    nodeRef,
  };
}

function Stat({ stat }: { stat: (typeof STATS)[number] }) {
  const { value, nodeRef } = useCountUp(stat.value);

  return (
    <div ref={nodeRef} className="text-center sm:text-left">
      {/* Anton lives here and in the guarantee bar. Nowhere else on the page. */}
      <div className="font-stat text-5xl leading-none text-lime tabular-nums sm:text-6xl">
        {stat.prefix}
        {value}
        {stat.suffix}
      </div>
      <p className="mt-3 text-base leading-snug text-paper/80">{stat.label}</p>
    </div>
  );
}

export function ProofStrip() {
  return (
    <section className="border-y border-conduit/30 bg-panel py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="font-display text-sm font-bold tracking-widest text-paper/70 uppercase">
          What the trade data says
        </h2>

        <div className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat) => (
            <Stat key={stat.label} stat={stat} />
          ))}
        </div>

        <p className="mt-8 text-sm text-paper/70">
          Industry figures for the Australian trades, not Prospex client
          results.
        </p>
      </div>
    </section>
  );
}
