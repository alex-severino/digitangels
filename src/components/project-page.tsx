import type { Project } from "@/data/projects";
import { ProjectBlocks, ProjectGallery } from "@/components/project-media";

function ProjectIntroCopy({ project }: { project: Project }) {
  return (
    <div>
      <p className="text-[19.95px] leading-[1.35] text-black md:text-[21.28px]">
        {project.description}
      </p>
      {project.link ? (
        <p className="mt-6">
          <a
            href={project.link.href}
            target="_blank"
            rel="noreferrer"
            className="text-[26px] font-bold tracking-[0.08em] text-[#6B21A8] underline-offset-4 hover:underline"
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
          className="text-[15.96px] font-medium leading-[1.35] tracking-[0.06em] text-black"
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
    <main id="top" className="min-h-screen bg-white text-black">
      {edgeBars ? (
        <div className="h-[50px] w-full bg-white" aria-hidden />
      ) : null}
      {introRow ? (
        <>
          <ProjectGallery rows={[introRow]} isLastSection={false} />

          <section className="bg-white px-5 py-8 md:px-[75px] md:py-10">
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
        <section className="bg-white px-5 py-24 md:px-[75px]">
          <ProjectIntroRow project={project} />
        </section>
      )}
      {edgeBars ? (
        <div className="h-[50px] w-full bg-white" aria-hidden />
      ) : null}
    </main>
  );
}
