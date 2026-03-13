import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.trollsonsolana.xyz"),
  title: "TROLLS — customise ur troll",
  description:
    "build ur own troll. pick the hair, drip, kicks & accessories. save it. flex it.",
  openGraph: {
    title: "TROLLS — customise ur troll",
    description: "build ur own troll. pick the drip. save the pfp. flex on everyone.",
    type: "website",
    images: [{ url: "/trolls/trolls-banner.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TROLLS",
    description: "build ur own troll. pick the hair, drip, kicks & accessories. save it. flex it.",
    images: ["/trolls/trolls-banner.png"],
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
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Covered+By+Your+Grace&family=Fredoka:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
