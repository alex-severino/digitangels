import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DvorCaseStudy } from "@/components/dvor-case-study";
import { GicleeCaseStudy } from "@/components/giclee-case-study";
import { ProjectPageView } from "@/components/project-page";
import { StudioBetonikaCaseStudy } from "@/components/studio-betonika-case-study";
import { getProject, projects } from "@/data/projects";

const SLUG_ALIASES: Record<string, string> = {
  "alex-de-alma": "velvet-horizon",
  "giclee-club-branding": "giclee-club",
  "giclee-club-ecommerce": "giclee-club",
};

const CASE_STUDIES: Partial<Record<string, ReactNode>> = {
  dvor: <DvorCaseStudy />,
  "giclee-club": <GicleeCaseStudy />,
  "studio-betonika": <StudioBetonikaCaseStudy />,
};

export function generateStaticParams() {
  return [
    ...projects.map((project) => ({ slug: project.slug })),
    ...Object.keys(SLUG_ALIASES).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonical = SLUG_ALIASES[slug];
  if (canonical) return {};
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description.slice(0, 160),
    ...(project.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "digitangels") permanentRedirect("/digitangels");
  const canonical = SLUG_ALIASES[slug];
  if (canonical) permanentRedirect(`/projects/${canonical}`);
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <ProjectPageView project={project}>
      {CASE_STUDIES[project.slug]}
    </ProjectPageView>
  );
}
