import type { ReactNode } from "react";

/**
 * The page's only CTA. Every instance points at the calendar anchor — there is
 * no second action anywhere on the page. min-h-14 keeps it above the 44px tap
 * target floor on a phone.
 */
export function CtaButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#book"
      className={`inline-flex min-h-14 items-center justify-center rounded-md bg-lime px-8 py-4 text-center font-display text-lg font-bold text-dark transition-colors hover:bg-white ${className}`}
    >
      {children}
    </a>
  );
}
