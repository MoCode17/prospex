import { contact } from "../lib/contact";

/** Contact only. No sitewide nav — there's nothing to navigate to from here. */
export function SiteFooter() {
  return (
    <footer className="bg-dark">
      <div className="mx-auto max-w-5xl border-t border-conduit/40 px-5 py-10">
        <p className="font-display text-lg font-bold text-paper">Prospex</p>

        <div className="mt-4 flex flex-col gap-3 text-base text-paper/80 sm:flex-row sm:gap-8">
          {contact.hasPhone ? (
            <>
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex min-h-11 items-center"
              >
                Call {contact.phoneDisplay}
              </a>
              <a
                href={`sms:${contact.phoneHref}`}
                className="inline-flex min-h-11 items-center"
              >
                Text {contact.phoneDisplay}
              </a>
            </>
          ) : (
            <span className="inline-flex min-h-11 items-center text-paper/70">
              {contact.phoneDisplay}
            </span>
          )}

          {contact.hasEmail && (
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-11 items-center"
            >
              {contact.email}
            </a>
          )}
        </div>

        <p className="mt-6 text-sm text-paper/70">
          Melbourne, Victoria. For licensed electricians.
        </p>
      </div>
    </footer>
  );
}
