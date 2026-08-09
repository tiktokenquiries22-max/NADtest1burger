import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "STACKHOUSE | The Ultimate Burger Experience",
  description: "Experience luxury smash burgers presented with cinematic scrollytelling. Double smash-seared Aged British beef, molten cheese, secret house sauce, toasted brioche.",
  keywords: ["burgers", "smash burger", "gourmet burger", "STACKHOUSE", "luxury burger", "food advertising", "scrollytelling"],
  authors: [{ name: "STACKHOUSE Culinary Studios" }],
  openGraph: {
    title: "STACKHOUSE | The Ultimate Burger Experience",
    description: "Big. Smashed. Unapologetic. Explore our flagship smash burgers with interactive 3D assembly scrollytelling.",
    type: "website",
    locale: "en_GB",
    siteName: "STACKHOUSE Burgers",
  },
  twitter: {
    card: "summary_large_image",
    title: "STACKHOUSE | Luxury Smash Burgers",
    description: "The Ultimate Burger Experience. Made to order. Flame-grilled to perfection.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} antialiased selection:bg-orange-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
