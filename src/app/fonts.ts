import { Press_Start_2P, VT323 } from "next/font/google";

export const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-pixel",
});

export const terminalFont = VT323({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-body",
});
