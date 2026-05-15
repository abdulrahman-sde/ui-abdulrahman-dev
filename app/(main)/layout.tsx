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
  title: {
    default: "Free Next.js Landing Page Templates — Kairo UI",
    template: "%s | Kairo UI",
  },
  description:
    "A growing collection of free, MIT-licensed landing page templates for Next.js 16 and Tailwind CSS v4. Install any template in seconds with the shadcn CLI. No signup, no paywalls.",
  authors: [{ name: "Abdul Rahman Asif" }],
  creator: "Abdul Rahman Asif",
  openGraph: {
    title: "Free Next.js Landing Page Templates — Kairo UI",
    description:
      "Free, MIT-licensed Next.js 16 templates. Install any template with one command.",
    url: "https://www.kairoui.online",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kairo UI — Free Next.js Landing Page Templates",
      },
    ],
    siteName: "Kairo UI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Next.js Landing Page Templates — Kairo UI",
    description:
      "Free, MIT-licensed Next.js 16 templates. Install any template with one command.",
    images: ["/twitter-image"],
    creator: "@abdurahmanasif",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "https://www.kairoui.online",
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
