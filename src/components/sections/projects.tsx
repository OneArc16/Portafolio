import { projects } from "@/config/projects";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/layout/section";

export function Projects() {
  return (
    <Section id="proyectos" title="Proyectos">
      <div className="mt-6 grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
