import type { Metadata } from "next";
import { DesignwisePage } from "@/components/designwise/designwise-page";
import "./designwise.css";

export const metadata: Metadata = {
  title: "Designwise",
  description:
    "Designwise is the educational wing of Digitangels. We help companies advance their Design Maturity and make it the guiding principle in crafting exceptional tech products.",
  alternates: { canonical: "https://designwise.digitangels.com" },
};

export default function DesignwiseRoute() {
  return <DesignwisePage />;
}
