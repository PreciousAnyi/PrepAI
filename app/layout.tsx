import type { Metadata } from "next";
import { Sora, Red_Hat_Text } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const redHat = Red_Hat_Text({
  variable: "--font-red-hat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PrepAI",
  description: "An AI powered platform for preparing for interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sora.variable} ${redHat.variable}`}>
      <body >
        {children}
      </body>
    </html>
  );
}
