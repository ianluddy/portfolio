import type { Metadata } from "next";
import { Space_Grotesk, Bungee, Bungee_Shade } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const bungeeShade = Bungee_Shade({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading-shade",
});

export const metadata: Metadata = {
  title: "Ian Luddy - Software Developer",
  description:
    "Ian Luddy, Software Developer based in Galway. Full-stack engineer with expertise in NextJS, React, Python, and more.",
  authors: [{ name: "Ian Luddy" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${bungee.variable} ${bungeeShade.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
