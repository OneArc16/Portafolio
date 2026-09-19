import { projects } from "@/config/projects";
import { ProjectCard } from "@/components/project-card";

export function Projects() {
  return (
    <section id="proyectos" className="mx-auto w-full max-w-2xl px-6 py-24">
      <h2 className="text-sm font-medium text-muted-foreground">Proyectos</h2>
      <div className="mt-6 grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
