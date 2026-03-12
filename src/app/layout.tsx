import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TROLLS — find ur inner troll",
  description:
    "type ur handle. get a troll. big hair energy only.",
  openGraph: {
    title: "TROLLS — find ur inner troll",
    description: "every @ gets a troll. big hair. tiny chaos.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TROLLS",
    description: "type ur handle. get a troll. its that simple.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
