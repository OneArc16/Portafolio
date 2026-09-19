export type ProjectStatus = "production" | "open-source" | "experiment";

export interface Project {
  title: string;
  status: ProjectStatus;
  summary: string;
  role: string;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
}

export const statusLabels: Record<ProjectStatus, string> = {
  production: "En producción",
  "open-source": "Código abierto",
  experiment: "Experimento",
};

export const projects: Project[] = [
  {
    title: "Cuidarte",
    status: "production",
    summary: "Software de gestión para un centro de cuidado de adultos mayores.",
    role: "Desarrollador fullstack (solo)",
    liveUrl: "https://cuidartecol.com",
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "NestJS",
      "Fastify",
      "Drizzle ORM",
      "shadcn/ui",
      "Tailwind CSS",
      "Turborepo",
    ],
  },
];
