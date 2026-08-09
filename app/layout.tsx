import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Range Rover Dissection | Bell Automotive | Land Rover & 4x4 Specialists',
  description: 'Explore the engineering behind the Range Rover. Discover individual vehicle components, understand their function, and contact Bell Automotive garage in Queensferry to arrange your service.',
  keywords: ['Range Rover', 'Land Rover Specialist', 'Bell Automotive', 'Queensferry Garage', 'Deeside 4x4', 'Vehicle Dissection', 'Autologic Diagnostics'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <body className="bg-garage-dark text-white font-outfit antialiased selection:bg-garage-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
