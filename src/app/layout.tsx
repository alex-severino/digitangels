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
    default: "Digitangels | Brand & UX Design Agency",
    template: "%s | Digitangels",
  },
  description:
    "Digitangels is a premium brand and UX design agency crafting distinctive identities, digital products, and user experiences for ambitious teams.",
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
    title: "Digitangels | Brand & UX Design Agency",
    description:
      "Premium brand and UX design for teams building products people love.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitangels | Brand & UX Design Agency",
    description:
      "Premium brand and UX design for teams building products people love.",
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
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
