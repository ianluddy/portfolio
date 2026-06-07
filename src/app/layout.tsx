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
    "Ian Luddy, Software Builder based in Galway. Building AI-first with Claude Code, Next.js, React, Python, and more.",
  authors: [{ name: "Ian Luddy" }],
  alternates: {
    canonical: "https://www.ianluddy.com",
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
