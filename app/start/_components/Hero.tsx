import { CtaButton } from "./CtaButton";
import type { LeadContext } from "../lib/lead-context";

/*
  H1 A/B variants — swap the <h1> body below to test. Keep one live at a time.

  SHIPPED (guarantee-led):
    "15 Qualified Jobs In Your First 30 Days — Or We Keep Working Free Until
     You Get Them."

  VARIANT B (wedge-led):
    "If Marketing Hasn't Worked For You Yet, It Wasn't Your Fault."

  Guarantee-led leads with the offer and suits a visitor who already trusts the
  category. Wedge-led leads with the wound and suits one who's been burned and
  is still sceptical. This audience is mostly the second, so B is the real test,
  not a throwaway.
*/

export function Hero({ lead }: { lead: LeadContext }) {
  return (
    <section className="bg-dark">
      <div className="mx-auto max-w-5xl px-5 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <p className="font-display text-sm font-medium tracking-widest text-lime uppercase">
          For licensed Aussie electricians only
        </p>

        <h1 className="mt-6 font-display text-4xl leading-tight font-bold text-balance text-paper sm:text-5xl lg:text-6xl">
          30+ Qualified Jobs In Your First 30 Days — Or We Keep Working Free
          Until You Get Them.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">
          {lead.firstName ? `${lead.firstName}, you` : "You"}&rsquo;ve told us
          about your business. Here&rsquo;s exactly how the Suburb Domination
          System fills your calendar, and how to lock your suburb in before
          another sparkie does.
        </p>

        <CtaButton className="mt-10 w-full sm:w-auto">
          Book Your Free Strategy Call
        </CtaButton>
      </div>
    </section>
  );
}
