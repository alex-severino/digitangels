import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-EM0PRR5HBE";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const ICON_VERSION = "3";

export const metadata: Metadata = {
  title: {
    default: "Digitangels",
    template: "%s | Digitangels",
  },
  description:
    "Design Transformation Advisory",
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
      "Design Transformation Advisory",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitangels",
    description:
      "Design Transformation Advisory",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: `/site.webmanifest?v=${ICON_VERSION}`,
  icons: {
    icon: [
      {
        url: `/favicon-32x32.png?v=${ICON_VERSION}`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: `/favicon-16x16.png?v=${ICON_VERSION}`,
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: `/icon.png?v=${ICON_VERSION}`,
        sizes: "192x192",
        type: "image/png",
      },
      { url: `/favicon.ico?v=${ICON_VERSION}`, sizes: "any" },
    ],
    apple: [
      {
        url: `/apple-touch-icon.png?v=${ICON_VERSION}`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground font-sans">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
