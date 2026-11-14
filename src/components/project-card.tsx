import { ArrowUpRight, Lock } from "lucide-react";
import { statusLabels, type Project } from "@/config/projects";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Spotlight } from "@/components/spotlight";
import { cn } from "cn";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Spotlight className="transition-transform duration-300 hover:-translate-y-1">
      <Card className="relative transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:ring-primary/40">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"
        />
        <CardHeader>
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <CardDescription>{project.role}</CardDescription>
          <CardAction>
            <Badge variant="secondary">{statusLabels[project.status]}</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground">{project.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm" }), "group/link")}
            >
              Ver sitio
              <ArrowUpRight className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span />
          )}
          {!project.repoUrl && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="size-3" />
              Repositorio privado
            </span>
          )}
        </CardFooter>
      </Card>
    </Spotlight>
  );
}
