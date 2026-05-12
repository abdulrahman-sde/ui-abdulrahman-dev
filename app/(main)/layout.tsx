import type { Metadata } from "next";
import { Geist, Lora, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { HeroHeader } from "@/components/layout/header";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL("https://www.kairoui.online"),
  title: "Kairo UI — Modern, Next.js Landing Page Templates",
  description:
    "Explore a curated collection of professionally designed, open-source landing page templates for React and Next.js. Built with Tailwind CSS.",
  keywords: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Landing Page Templates",
    "UI Components",
    "Free Templates",
    "Kairo UI",
  ],
  authors: [{ name: "Abdul Rahman Asif" }],
  creator: "Abdul Rahman Asif",
  openGraph: {
    title: "Kairo UI — Modern, Next.js Landing Page Templates",
    description:
      "Explore a curated collection of professionally designed, Next.js landing page templates. Built with Tailwind CSS.",
    url: "https://www.kairoui.online",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kairo UI — Modern, Next.js Landing Page Templates",
      },
    ],
    siteName: "Kairo UI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairo UI — Modern, Next.js Landing Page Templates",
    description:
      "Explore a curated collection of professionally designed, Next.js landing page templates for React and Next.js. Built with Tailwind CSS.",
    images: ["/twitter-image"],
    creator: "@abdurahmanasif",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/logo.png",
  },
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
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
