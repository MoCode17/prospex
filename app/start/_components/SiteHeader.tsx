import { contact } from "../lib/contact";
import Image from "next/image";

/**
 * Logo and a phone/SMS link. No nav — there is nowhere else to go from this
 * page, and every link out is a lead that doesn't book.
 */
export function SiteHeader() {
  return (
    <header className="bg-dark">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <Image
          src="/images/PROSPEX logo white.svg"
          alt="Prospex"
          width={180}
          height={40}
        />

        {contact.hasPhone ? (
          <a
            href={`tel:${contact.phoneHref}`}
            className="inline-flex min-h-11 items-center font-display text-base font-bold text-lime"
          >
            {contact.phoneDisplay}
          </a>
        ) : (
          <span className="font-display text-base font-bold text-paper/70">
            {contact.phoneDisplay}
          </span>
        )}
      </div>
    </header>
  );
}
