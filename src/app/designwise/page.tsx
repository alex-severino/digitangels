import type { Metadata } from "next";
import localFont from "next/font/local";
import { DesignwisePage } from "@/components/designwise-page";

const mori = localFont({
  src: [
    {
      path: "../../../public/designwise/fonts/pp-mori-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/designwise/fonts/pp-mori-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/designwise/fonts/pp-mori-semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Designwise",
  description:
    "Designwise is the educational wing of Digitangels. We help companies advance their Design Maturity and make it the guiding principle in crafting exceptional tech products.",
};

export default function DesignwiseRoute() {
  return (
    <div className={mori.className}>
      <DesignwisePage />
    </div>
  );
}
