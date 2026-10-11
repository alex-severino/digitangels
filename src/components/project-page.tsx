import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectBlocks, ProjectGallery } from "@/components/project-media";
import { Split } from "@/components/chrome/split";
import { projectHref, workCards } from "@/data/work-index";

const HIDDEN_FROM_ROTATION = new Set(["designwise"]);

function nextProject(slug: string) {
  const pool = workCards.filter((card) => !HIDDEN_FROM_ROTATION.has(card.slug));
  const index = pool.findIndex((card) => card.slug === slug);
  return pool[(index + 1) % pool.length] ?? pool[0];
}

function ProjectHero({ project }: { project: Project }) {
  const index = workCards.findIndex((card) => card.slug === project.slug);
  const [lead, ...rest] = project.title.split(":");

  return (
    <section className="dt-hero relative bg-black px-4 pb-14 pt-[120px] text-white md:px-8 md:pb-20 md:pt-[150px]">
      <div className="mb-10 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 md:mb-16 md:text-[11px]">
        <span>
          ({String(index + 1).padStart(2, "0")}) — Case study
        </span>
        <span>{project.categories.slice(0, 2).join(" / ")}</span>
      </div>

      <h1 className="text-[clamp(3.4rem,12vw,13rem)] font-semibold uppercase leading-[0.82] tracking-[-0.065em]">
        <Split text={lead.trim()} />
        {rest.length ? (
          <span className="dt-italic dt-chrome-text block normal-case tracking-[-0.04em]">
            {rest.join(":").trim()}
          </span>
        ) : null}
      </h1>

      <div className="mt-14 grid gap-10 border-t border-white/15 pt-8 md:mt-20 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <ul className="space-y-1 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.18em] text-white/55">
          {project.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
        <div>
          <p className="text-[clamp(1.15rem,1.9vw,1.6rem)] font-normal leading-[1.4] text-white/85">
            {project.description}
          </p>
          {project.link ? (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              className="dt-chrome-pill mt-8 inline-flex items-center gap-3 px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-black"
            >
              {project.link.label} <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function NextProject({ slug }: { slug: string }) {
  const next = nextProject(slug);
  if (!next || next.slug === slug) return null;

  return (
    <Link
      href={projectHref(next.slug)}
      data-cursor="Next"
      className="group relative block overflow-hidden bg-black px-4 py-20 text-white md:px-8 md:py-32"
    >
      <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 md:text-[11px]">
        Next project →
      </p>
      <p className="text-[clamp(3rem,11vw,12rem)] font-semibold uppercase leading-[0.82] tracking-[-0.065em]">
        <span className="dt-swap">
          <span>{next.title}</span>
          <span className="dt-italic dt-chrome-text normal-case" aria-hidden>
            {next.title}
          </span>
        </span>
      </p>
    </Link>
  );
}

export function ProjectPageView({ project }: { project: Project }) {
  const hasBlocks = Boolean(project.blocks && project.blocks.length > 0);
  const introRow = project.rows[0];
  const restRows = project.rows.slice(1);
  const edgeBars = project.slug === "art-workers-united";

  return (
    <main id="top" className="min-h-screen bg-[#e9e9e6] text-black">
      <ProjectHero project={project} />
      {edgeBars ? <div className="h-[50px] w-full bg-white" aria-hidden /> : null}
      {introRow ? (
        <>
          <ProjectGallery rows={[introRow]} isLastSection={false} />
          {hasBlocks ? (
            <ProjectBlocks
              blocks={project.blocks!}
              flush={
                project.slug === "art-workers-united" ||
                project.slug === "designwise"
              }
            />
          ) : (
            <ProjectGallery rows={restRows} />
          )}
        </>
      ) : null}
      {edgeBars ? <div className="h-[50px] w-full bg-white" aria-hidden /> : null}
      <NextProject slug={project.slug} />
    </main>
  );
}
