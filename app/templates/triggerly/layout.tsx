import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/components/templates/triggerly/globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.abdulrahmanasif.dev"),
  title: "Triggerly — Product Planning & Building Tool",
  description:
    "A Linear-inspired dark landing page with 3D dashboard mockup, AI agents integration, project timeline visualization, and workflow carousel.",
};

export default function TriggerlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning className={`${fontSans.variable}`}>
      <body className="antialiased bg-[#09090B] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
