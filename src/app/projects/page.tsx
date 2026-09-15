import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { WorkShell } from "@/components/work-shell";
import { workCards } from "@/data/work-index";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected Digitangels projects across product, branding, and web.",
};

export default function ProjectsPage() {
  return (
    <WorkShell>
      <WorkGrid cards={workCards} />
    </WorkShell>
  );
}
