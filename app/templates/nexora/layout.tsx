import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/components/templates/nexora/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nexora — AI-Powered Image Generation",
  description:
    "Create stunning visuals with AI-powered precision. From concept to creation in seconds.",
};

export default function NexoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-[#0f172a]`}
      >
        {children}
      </body>
    </html>
  );
}
