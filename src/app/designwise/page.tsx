import type { Metadata } from "next";
import { DesignwisePage } from "@/components/designwise/designwise-page";
import "./designwise.css";

export const metadata: Metadata = {
  title: "Designwise",
  description:
    "Designwise is the educational wing of Digitangels. We help companies advance their Design Maturity and make it the guiding principle in crafting exceptional tech products.",
};

export default function DesignwiseRoute() {
  return <DesignwisePage />;
}
