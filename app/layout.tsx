import type { Metadata } from "next";
import { Anybody, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

// Loud display face: variable width (wdth 50–150) + weight, used for big headlines.
const anybody = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VIBEUP — Bangalore Nightlife & Experiences",
  description: "Discover events, meet people, build your crew, and experience Bangalore differently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${anybody.variable} scroll-smooth`}
    >
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
