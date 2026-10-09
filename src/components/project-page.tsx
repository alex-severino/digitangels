import type { Project } from "@/data/projects";
import { ProjectBlocks, ProjectGallery } from "@/components/project-media";

function ProjectIntroCopy({ project }: { project: Project }) {
  return (
    <div>
      <p className="text-[clamp(1.15rem,2vw,1.55rem)] leading-[1.4] text-[#121713]">
        {project.description}
      </p>
      {project.link ? (
        <p className="mt-6">
          <a
            href={project.link.href}
            target="_blank"
            rel="noreferrer"
            className={`text-[26px] font-bold tracking-[0.08em] underline-offset-4 hover:underline ${
              project.slug === "hypernode" ? "text-[#004179]" : "text-[#6B21A8]"
            }`}
          >
            {project.link.label}
          </a>
        </p>
      ) : null}
    </div>
  );
}

function ProjectDisciplines({ roles }: { roles: string[] }) {
  if (roles.length === 0) return null;

  return (
    <ul className="shrink-0 space-y-1 whitespace-nowrap md:pt-1">
      {roles.map((role) => (
        <li
          key={role}
          className="text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-[#121713]/70"
        >
          {role}
        </li>
      ))}
    </ul>
  );
}

function ProjectIntroRow({ project }: { project: Project }) {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 md:flex-row md:items-start md:justify-center md:gap-20">
      <div className="w-full min-w-0 md:w-[57.5%]">
        <ProjectIntroCopy project={project} />
      </div>
      <ProjectDisciplines roles={project.roles} />
    </div>
  );
}

export function ProjectPageView({ project }: { project: Project }) {
  const hasBlocks = Boolean(project.blocks && project.blocks.length > 0);
  const introRow = project.rows[0];
  const restRows = project.rows.slice(1);
  const edgeBars = project.slug === "art-workers-united";

  return (
    <main id="top" className="min-h-screen bg-[#f3f3ee] text-[#121713]">
      {edgeBars ? (
        <div className="h-[50px] w-full bg-white" aria-hidden />
      ) : null}
      {introRow ? (
        <>
          <ProjectGallery rows={[introRow]} isLastSection={false} />

          <section className="bg-[#f3f3ee] px-5 py-12 md:px-10 md:py-16">
            <ProjectIntroRow project={project} />
          </section>

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
      ) : (
        <section className="bg-[#f3f3ee] px-5 py-24 md:px-10">
          <ProjectIntroRow project={project} />
        </section>
      )}
      {edgeBars ? (
        <div className="h-[50px] w-full bg-white" aria-hidden />
      ) : null}
    </main>
  );
}
