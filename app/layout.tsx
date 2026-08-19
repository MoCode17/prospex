import type { Metadata } from "next";
import { Anton, IBM_Plex_Sans, Space_Grotesk, Oswald } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Anton is only used for proof numbers, all of which sit below the fold.
// Skipping the preload keeps it out of the critical path.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Prospera — Melbourne electricians",
  description:
    "Prospera builds and runs the lead system for Melbourne electricians.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The next/font variable classes belong on <html>, not <body>. globals.css
    // maps them onto --font-display/body/stat/alt inside a :root block, and a
    // custom property is substituted on the element that declares it — from
    // :root the raw --font-* vars on <body> are invisible, so every token
    // resolved to nothing and all four families fell back to system-ui.
    <html
      lang="en-AU"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${anton.variable} ${oswald.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
