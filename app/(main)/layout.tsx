import type { Metadata } from "next";
import { Geist, Lora, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { HeroHeader } from "@/components/layout/header";
import "../globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "kairoui.online — Free landing page templates",
  description: "Free, MIT-licensed landing page templates. Browse and fork.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HeroHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
