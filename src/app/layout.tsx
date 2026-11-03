import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Cursor } from "@/components/chrome/cursor";
import { Preloader } from "@/components/chrome/preloader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-EM0PRR5HBE";

const mori = localFont({
  variable: "--font-mori",
  display: "swap",
  src: [
    {
      path: "../../public/designwise/fonts/pp-mori-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/designwise/fonts/pp-mori-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/designwise/fonts/pp-mori-semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
});

const geistMono = localFont({
  src: "../assets/fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  style: "normal",
  display: "swap",
});


// Runs before paint: enables JS-only styles and skips the intro for visitors
// who have already seen it this session. The timeout is a safety net so the
// page can never stay hidden if the preloader fails to hydrate.
const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('dt-seen'))d.dataset.seen='1'}catch(e){}if(d.dataset.seen||location.pathname!=='/'){d.dataset.seen='1';d.dataset.ready='1'}setTimeout(function(){d.dataset.ready='1'},6000)})();`;

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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${mori.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
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
      <body className="flex min-h-screen flex-col bg-black text-foreground font-sans">
        <Preloader />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Cursor />
        <div className="dt-grain" aria-hidden />
      </body>
    </html>
  );
}
