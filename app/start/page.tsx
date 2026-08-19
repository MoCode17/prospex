import type { Metadata } from "next";
import { Guarantee } from "./_components/Guarantee";
import { Hero } from "./_components/Hero";
import { Mechanism } from "./_components/Mechanism";
import { ObjectionFaq } from "./_components/ObjectionFaq";
import { ProofStrip } from "./_components/ProofStrip";
import { RealProblem } from "./_components/RealProblem";
import { FinalCta } from "./_components/FinalCta";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import { StepFraming } from "./_components/StepFraming";
import { TestimonialSection } from "./_components/TestimonialSection";
import { TrackingScripts } from "./_components/TrackingScripts";
import { parseLeadContext } from "./lib/lead-context";

export const metadata: Metadata = {
  title: "Book your strategy call — Prospera",
  description:
    "30 qualified jobs in your first 30 days, or you don't pay. For licensed Aussie electricians.",
  // Paid-traffic funnel page reached only after the GHL questionnaire — it
  // shouldn't be findable out of sequence. Flip to true if that changes.
  robots: { index: false, follow: false },
};

/**
 * Reading searchParams makes this route dynamic, which is the point:
 * personalization renders server-side, so there's no hydration flash and no
 * layout shift from copy swapping in after paint.
 */
export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lead = parseLeadContext(await searchParams);

  return (
    <>
      <TrackingScripts />
      <SiteHeader />
      <main>
        <Hero lead={lead} />
        <StepFraming lead={lead} />
        <ProofStrip />
        <RealProblem />
        <Mechanism lead={lead} />
        <TestimonialSection />
        <Guarantee />
        <ObjectionFaq />
        <FinalCta lead={lead} />
      </main>
      <SiteFooter />
    </>
  );
}
