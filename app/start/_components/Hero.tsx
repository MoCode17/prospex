import { CtaButton } from "./CtaButton";

/*
  H1 A/B variants — swap the <h1> body below to test. Keep one live at a time.

  SHIPPED (guarantee-led):
    "$30,000 in Quote Requests in Your First 30 Days — Or We Keep Working Free
     Until You Get Them."

  VARIANT B (wedge-led):
    "If Marketing Hasn't Worked For You Yet, It Wasn't Your Fault."

  Guarantee-led leads with the offer and suits a visitor who already trusts the
  category. Wedge-led leads with the wound and suits one who's been burned and
  is still sceptical. This audience is mostly the second, so B is the real test,
  not a throwaway.
*/

export function Hero() {
  return (
    <section className="bg-dark">
      <div className="mx-auto max-w-5xl px-5 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <p className="font-display text-sm font-medium tracking-widest text-lime uppercase">
          For licensed Aussie electricians only
        </p>

        <h1 className="mt-6 font-display text-4xl leading-tight font-bold text-balance text-paper sm:text-5xl lg:text-6xl">
          $30,000 in Quote Requests in Your First 30 Days — Or We Keep Working
          Free Until You Get Them.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">
          The Local Domination System puts you at the top of Google in your
          local area, texts back every enquiry within 2 minutes, and answers the
          calls you miss on the tools. One electrician per region.
        </p>

        <CtaButton className="mt-10 w-full sm:w-auto">
          Check If My Region&rsquo;s Still Open
        </CtaButton>
      </div>
    </section>
  );
}
