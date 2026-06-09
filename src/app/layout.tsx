import type { Metadata } from "next";
import { DM_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  variable: "--font-body",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Ian Luddy — Software Builder",
  description:
    "Ian Luddy, Software Builder based in Galway. Shipping AI-first with Claude Code, Claude Design and Conductor.",
  authors: [{ name: "Ian Luddy" }],
  icons: { icon: "/icon.svg" },
  metadataBase: new URL("https://ianluddy.com"),
  alternates: {
    canonical: "https://ianluddy.com",
  },
  openGraph: {
    title: "Ian Luddy — Software Builder",
    description: "Ian Luddy, Software Builder based in Galway. Shipping AI-first with Claude Code, Claude Design and Conductor.",
    url: "https://ianluddy.com",
    siteName: "Ian Luddy",
    locale: "en_IE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${dmSans.variable} ${ebGaramond.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
