import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Ian Luddy — Software Engineer",
  description:
    "Ian Luddy, Software Engineer based in Galway. Full-stack engineer building AI-first with Claude Code, Next.js, React, Python, and more.",
  authors: [{ name: "Ian Luddy" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
