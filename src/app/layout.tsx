import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Digitangels",
    template: "%s | Digitangels",
  },
  description:
    "Coming Soon",
  keywords: [
    "brand design",
    "UX design",
    "UI design",
    "design agency",
    "product design",
    "digital branding",
    "user experience",
  ],
  authors: [{ name: "Digitangels" }],
  creator: "Digitangels",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Digitangels",
    title: "Digitangels",
    description:
      "Coming Soon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitangels",
    description:
      "Coming Soon",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
