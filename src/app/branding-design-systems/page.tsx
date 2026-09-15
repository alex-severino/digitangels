import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { WorkShell } from "@/components/work-shell";
import { getWorkCards } from "@/data/work-index";

export const metadata: Metadata = {
  title: "Branding & Design Systems",
};

export default function BrandingPage() {
  return (
    <WorkShell active="branding">
      <WorkGrid cards={getWorkCards("branding")} />
    </WorkShell>
  );
}
