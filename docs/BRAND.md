# Prospex brand

Reference for anyone (human or Claude) writing copy or building UI for Prospex. Pairs with `design-tokens.css` for exact values.

## Logic

Lime = hi-vis / electrical-hazard colouring — the world electricians already live in. Dark = powder-coated switchboard steel. Purple = an arc-flash spark, used once per section, never as a base color. This is not a generic "dark mode with an accent" choice — every color ties back to a physical thing in a sparkie's day.

## Palette

| Token | Hex | Use |
|---|---|---|
| `--prospex-lime` (Live wire) | `#c1ff72` | CTAs, headline highlights, stat numbers, "live" indicators. The one color that should grab the eye. |
| `--prospex-dark` (Breaker black) | `#14181A` | Primary dark background — hero sections, nav. |
| `--prospex-paper` (Site paper) | `#F0F0EA` | Primary light background, body sections. Not stark white. |
| `--prospex-violet` (Arc violet) | `#8c52ff` | Sparingly. One badge, one icon accent, one emphasis line per section — never a base color, never two uses in the same view. |
| `--prospex-panel` (Panel grey) | `#1E2426` | Cards/panels sitting on the dark background, for subtle depth without going flat black. |
| `--prospex-grey` (Conduit grey) | `#6B7280` | Secondary text on light backgrounds, borders, muted labels. |

Rule of thumb: if a screen has more than one violet element, cut one.

## Contrast rules (measured, not guessed)

These pages get read on a phone, outdoors, in daylight. Two token pairs miss WCAG AA (4.5:1) for body text, so they have size and role limits:

| Pair | Ratio | Rule |
|---|---|---|
| Lime on dark, dark on lime | 15.3:1 | Unrestricted. Use for CTAs and stat numbers. |
| Grey on paper | 4.18:1 | Fails AA. |
| Grey on dark | 3.81:1 | Fails AA. |
| Grey on panel | 3.25:1 | Fails AA — the worst pair in the system. |
| Violet on dark | 4.18:1 | Fails AA for small text. |
| Violet on paper | 3.80:1 | Fails AA for small text. |

So:

**Conduit grey is a borders-and-rules token, not a text token.** It misses AA against all three backgrounds, and worst against the panel grey it most often sits on. For secondary and muted text use the foreground color at reduced opacity instead — `text-dark/70` on paper (6.1:1), `text-paper/70` on dark or panel (7.4:1). Same visual hierarchy, legible in daylight.

**Violet is a mark, not a label.** Neither Breaker black nor Site paper clears 4.5:1 as small text on a violet fill, so there is no small-text-on-violet badge. It earns its one-per-section moment as a rule, a border, or an icon.

## Typography

**Display / headlines** — Space Grotesk, 700 weight. Slightly technical edge, earns the "AI dialler / CRM automation" side of the offer without reading as generic SaaS.

**Body / UI** — IBM Plex Sans, 400/500/600. Plain, utilitarian, reads like a work order rather than an agency pitch.

**Stat numbers (signature treatment)** — Anton, used *only* for hard proof numbers ($52k, 68 leads, 400% lift). This is the one distinctive typographic move on the page — don't extend it to eyebrows, nav, or body copy, and don't force a number into a section just to use the font.

Fallback stacks: `'Space Grotesk', sans-serif` / `'IBM Plex Sans', sans-serif` / `'Anton', sans-serif`.

## Voice

- Write like a sparkie talks — plain, direct, no marketing jargon.
- Lead with the wound, not the dream. Acknowledge what's already been tried and failed before pitching anything.
- Name their life exactly: Hilux, 6:30am starts, WhatsApp chaos, HiPages frustration.
- Specific numbers, specific suburbs, specific job types, specific time frames — always.
- Never say: dominate, leverage, synergy, full-service, transparent, results-driven, premium leads that convert, local experts, Australia's leading.
- Tone: confident but not arrogant, empathetic but not soft, straight-talking but not aggressive.

## Do / don't

**Do** — one accent color doing the work per section, hard numbers in Anton, generous whitespace around the dark hero.

**Don't** — gradients, drop shadows, glow/neon effects on the lime, more than one violet moment per view, stacking Anton anywhere besides proof numbers.
