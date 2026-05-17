import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/components/templates/aurora/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.abdulrahmanasif.dev"),
  title: "Aurora — Build at the speed of light",
  description:
    "Aurora is the studio for teams that ship faster than the brief. Design, deploy, and operate your product from a single, calm surface.",
};

export default function AuroraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
