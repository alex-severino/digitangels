import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPageView } from "@/components/project-page";
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "Digitangels",
  description:
    "Branding strategy and visual identity for Digitangels, a Design Transformation advisory.",
};

export default function DigitangelsProjectPage() {
  const project = getProject("digitangels");
  if (!project) notFound();
  return <ProjectPageView project={project} />;
}
