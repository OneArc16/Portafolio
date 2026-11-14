import type { CSSProperties } from "react";
import { Code2, Palette, Server, Wrench, type LucideIcon } from "lucide-react";
import { stack } from "@/config/stack";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/layout/section";

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Code2,
  "Estilos y UI": Palette,
  "Backend y datos": Server,
  Herramientas: Wrench,
};

// Brand colors. Monochrome brands follow the theme's foreground.
const toolColors: Record<string, string> = {
  React: "#61dafb",
  "Next.js": "var(--foreground)",
  Angular: "#dd0031",
  Vue: "#42b883",
  TypeScript: "#3178c6",
  Vite: "#646cff",
  "Tailwind CSS": "#06b6d4",
  "shadcn/ui": "var(--foreground)",
  NestJS: "#e0234e",
  Fastify: "var(--foreground)",
  "Drizzle ORM": "#c5f74f",
  pnpm: "#f69220",
  Turborepo: "#ff1e56",
  Git: "#f05032",
};

function toolStyle(tool: string) {
  return { "--tool": toolColors[tool] ?? "var(--primary)" } as CSSProperties;
}

const allTools = stack.flatMap(({ items }) => items);

// Decorative strip; the grouped list below carries the same content for
// assistive tech.
function Marquee() {
  return (
    <div
      aria-hidden
      className="group relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-3 pr-3">
            {allTools.map((tool) => (
              <li
                key={tool}
                style={toolStyle(tool)}
                className="flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--tool)_35%,var(--border))] bg-card/60 px-4 py-2 font-mono text-sm whitespace-nowrap backdrop-blur"
              >
                <span className="size-2 rounded-full bg-(--tool) shadow-[0_0_8px_var(--tool)]" />
                {tool}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  return (
    <Section id="stack" title="Stack y herramientas">
      <Marquee />
      <dl className="mt-10 grid gap-4 sm:grid-cols-2">
        {stack.map(({ category, items }) => {
          const Icon = categoryIcons[category] ?? Code2;
          return (
            <div
              key={category}
              className="group rounded-2xl border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <dt className="flex items-center gap-3 text-sm font-medium">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="size-4" />
                </span>
                {category}
              </dt>
              <dd className="mt-4 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    style={toolStyle(item)}
                    className="transition-colors hover:border-(--tool)"
                  >
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-(--tool)"
                    />
                    {item}
                  </Badge>
                ))}
              </dd>
            </div>
          );
        })}
      </dl>
    </Section>
  );
}
