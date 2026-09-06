/*
  Conduit-run background texture for the page's light sections.

  The motif is a conduit run on a wall — orthogonal traces, right-angle bends,
  junction nodes — which is the same reasoning the palette runs on: lime is
  hi-vis, dark is switchboard steel, and this is the conduit. A plain graph grid
  would have been easier and would have meant nothing. See BRAND.md.

  Drawn as an inline SVG <pattern> rather than a CSS repeating-linear-gradient
  or an image file. Gradients are out per BRAND.md and couldn't express a
  right-angle bend anyway; an image would cost a request, and design-tokens.css
  notes that mobile Lighthouse feeds our Google Ads Quality Score.
*/

// The tile is square and repeats in user-space pixels, so it keeps its size on
// a short section and a tall one alike — no stretching to fit the container.
const TILE = 160;

/*
  Traces are authored so every line leaving one edge re-enters at the matching
  coordinate on the opposite edge: the left and right edges both carry y=40 and
  y=120, the top and bottom both carry x=24 and x=96. That edge-matching is the
  whole trick — get one coordinate wrong and the tiling shows a seam every
  160px. Bends and crossings are placed to never lie on top of each other,
  which would double a stroke's opacity and read as a brighter line.
*/
const TRACES = [
  "M 0 40 H 56 V 120 H 160", // in left, down, out right
  "M 0 120 H 128 V 40 H 160", // in left, up, out right
  "M 24 0 V 72 H 96 V 160", // in top, across, out bottom
  "M 96 0 V 56 H 136 V 104 H 24 V 160", // the long dogleg
] as const;

/** Junction nodes, dropped on a few of the bends rather than all of them. */
const NODES = [
  [56, 40],
  [24, 72],
  [136, 56],
  [128, 120],
] as const;

/**
 * Absolutely positioned, so the parent needs `relative` and the parent's real
 * content needs to establish its own stacking context to sit above this.
 *
 * `id` is a required prop instead of a generated one because the page renders
 * this twice and two <pattern> elements sharing a DOM id is invalid markup.
 * useId() would solve it too, but only by turning a static decoration into a
 * client component and shipping JS for something that never changes.
 */
export function ConduitPattern({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const patternId = `conduit-${id}`;

  return (
    <div
      aria-hidden="true"
      // pointer-events-none matters: this covers the whole section, and without
      // it the layer would swallow clicks meant for the content on top.
      className={`pointer-events-none absolute inset-0 overflow-hidden text-conduit ${className}`}
    >
      <svg width="100%" height="100%" className="opacity-[0.07]">
        <defs>
          <pattern
            id={patternId}
            width={TILE}
            height={TILE}
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              // Square caps, not round — conduit terminates flat.
              strokeLinecap="square"
            >
              {TRACES.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            {NODES.map(([cx, cy]) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="2.5"
                fill="currentColor"
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
