import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { WorkShell } from "@/components/work-shell";
import { getWorkCards } from "@/data/work-index";

export const metadata: Metadata = {
  title: "Web",
};

export default function WebPage() {
  return (
    <WorkShell active="web">
      <WorkGrid cards={getWorkCards("web")} />
    </WorkShell>
  );
}
