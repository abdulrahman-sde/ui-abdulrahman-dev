import "@/components/templates/efferd/globals.css";

export const metadata = {
  title: "Efferd - Modern Landing Page",
  description: "A beautiful, modern landing page template.",
};

export default function EfferdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
