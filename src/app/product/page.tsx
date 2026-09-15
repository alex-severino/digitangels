import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { WorkShell } from "@/components/work-shell";
import { getWorkCards } from "@/data/work-index";

export const metadata: Metadata = {
  title: "Product",
};

export default function ProductPage() {
  return (
    <WorkShell active="product">
      <WorkGrid cards={getWorkCards("product")} />
    </WorkShell>
  );
}
