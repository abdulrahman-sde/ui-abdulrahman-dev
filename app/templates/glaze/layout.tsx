import { Inter } from "next/font/google";
import "@/components/templates/glaze/globals.css";
const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function GlazeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interFont.variable} min-h-screen`}>{children}</body>
    </html>
  );
}
