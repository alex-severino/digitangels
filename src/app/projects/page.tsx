import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { WorkShell } from "@/components/work-shell";
import { getWorkCards } from "@/data/work-index";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected Digitangels projects across product, branding, and web.",
};

export default function ProjectsPage() {
  return (
    <WorkShell active="featured">
      <WorkGrid cards={getWorkCards("featured")} />
    </WorkShell>
  );
}
