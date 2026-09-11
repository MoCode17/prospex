// TODO: Prospex's real phone/email aren't in the repo. Set them in .env.local
// (see .env.example). Until then the header and footer show an obvious
// placeholder rather than a dead tel: link.
const PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "";
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

export const contact = {
  phone: PHONE,
  phoneDisplay: PHONE || "Add phone number",
  /** tel:/sms: hrefs need the spaces stripped. */
  phoneHref: PHONE.replace(/\s+/g, ""),
  hasPhone: PHONE.length > 0,
  email: EMAIL,
  hasEmail: EMAIL.length > 0,
};
