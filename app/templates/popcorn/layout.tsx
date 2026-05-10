import { Inter, Source_Serif_4 } from "next/font/google";
import "@/components/templates/popcorn/globals.css";
const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerifFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export default function PopcornLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${sourceSerifFont.variable} bg-surface font-sans text-primary antialiased selection:bg-primary/20`}
      >
        {children}
      </body>
    </html>
  );
}
