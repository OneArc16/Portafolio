export interface StackGroup {
  category: string;
  items: string[];
}

export const stack: StackGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Angular", "Vue", "TypeScript", "Vite"],
  },
  {
    category: "Estilos y UI",
    items: ["Tailwind CSS", "shadcn/ui"],
  },
  {
    category: "Backend y datos",
    items: ["NestJS", "Fastify", "Drizzle ORM"],
  },
  {
    category: "Herramientas",
    items: ["pnpm", "Turborepo", "Git"],
  },
];
