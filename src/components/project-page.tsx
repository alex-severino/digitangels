import type { Project } from "@/data/projects";
import { ProjectBlocks, ProjectGallery } from "@/components/project-media";

export function ProjectPageView({ project }: { project: Project }) {
  const hasBlocks = Boolean(project.blocks && project.blocks.length > 0);

  return (
    <main id="top" className="min-h-screen bg-white text-black">
      {project.rows.length > 0 ? (
        <>
          <ProjectGallery
            rows={project.rows.slice(0, 1)}
            isLastSection={false}
          />

          <section className="grid gap-10 px-5 py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] md:gap-16 md:px-10 md:py-16">
            <div>
              <h1 className="mb-6 text-[28px] font-semibold tracking-tight md:text-[36px]">
                {project.title}
              </h1>
              <p className="max-w-3xl text-[15px] leading-7 text-black/80 md:text-[16px] md:leading-8">
                {project.description}
              </p>
              {project.link ? (
                <p className="mt-8">
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] font-semibold tracking-[0.08em] text-[#6B21A8] underline-offset-4 hover:underline"
                  >
                    {project.link.label}
                  </a>
                </p>
              ) : null}
            </div>

            <aside className="md:pt-2">
              {project.team ? (
                <>
                  <p className="mb-3 text-[13px] font-semibold">
                    {project.asideLabel ?? "Team"}
                  </p>
                  <p className="whitespace-pre-line text-[12px] font-medium leading-6 tracking-[0.04em] text-black/70">
                    {project.team}
                  </p>
                </>
              ) : project.roles.length > 0 ? (
                <>
                  <p className="mb-3 text-[13px] font-semibold">
                    {project.asideLabel ?? "My roles"}
                  </p>
                  <ul className="space-y-1">
                    {project.roles.map((role) => (
                      <li
                        key={role}
                        className="text-[12px] font-medium tracking-[0.06em] text-black/70"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {project.categories.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="text-[11px] font-semibold tracking-[0.08em] text-black/55"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              ) : null}
            </aside>
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
            <ProjectGallery rows={project.rows.slice(1)} />
          )}
        </>
      ) : (
        <section className="px-5 py-24 md:px-10">
          <h1 className="mb-6 text-[28px] font-semibold tracking-tight md:text-[36px]">
            {project.title}
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-black/70">
            {project.description}
          </p>
        </section>
      )}
    </main>
  );
}
