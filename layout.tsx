import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APEX//26 — Formula 1 Drivers, Cars & Brand Ecosystems",
  description:
    "An editorial dossier on the 2026 Formula 1 grid: driver personal brands, constructor technical specs, and the sponsor matrix powering the new power-unit era.",
  keywords: [
    "Formula 1",
    "F1 2026",
    "F1 drivers",
    "F1 cars",
    "F1 constructors",
    "F1 sponsors",
    "power unit",
    "sustainable fuel",
  ],
  authors: [{ name: "APEX Editorial" }],
  openGraph: {
    title: "APEX//26 — Formula 1 Drivers, Cars & Brand Ecosystems",
    description:
      "Editorial dossier on the 2026 Formula 1 grid — drivers, constructors, sponsors.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX//26",
    description: "The 2026 Formula 1 grid, dissected.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
