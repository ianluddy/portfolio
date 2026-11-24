import type { Metadata } from "next";
import "./globals.css";
import { pixelFont, terminalFont } from "./fonts";

export const metadata: Metadata = {
  title: "Ian Luddy — Software Builder",
  description:
    "Ian Luddy, Software Builder based in Galway. Shipping AI-first with Claude Code, Claude Design and Conductor.",
  authors: [{ name: "Ian Luddy" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
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
      className={`dark ${pixelFont.variable} ${terminalFont.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
