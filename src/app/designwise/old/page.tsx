import type { Metadata } from "next";
import localFont from "next/font/local";
import { DesignwiseOldPage } from "@/components/designwise-old-page";

const mori = localFont({
  src: [
    {
      path: "../../../../public/designwise/fonts/pp-mori-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/designwise/fonts/pp-mori-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../../public/designwise/fonts/pp-mori-semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Designwise (classic)",
  description:
    "Designwise is the educational wing of Digitangels. We help companies advance their Design Maturity and make it the guiding principle in crafting exceptional tech products.",
  robots: { index: false, follow: false },
};

export default function DesignwiseOldRoute() {
  return (
    <div className={mori.className}>
      <DesignwiseOldPage />
    </div>
  );
}
