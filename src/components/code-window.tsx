import type { CSSProperties, ReactNode } from "react";
import { siteConfig } from "@/config/site";

const keyword = "text-violet-700 dark:text-violet-300";
const property = "text-sky-700 dark:text-sky-300";
const string = "text-emerald-700 dark:text-emerald-300";
const punctuation = "text-muted-foreground";

function Str({ children }: { children: string }) {
  return <span className={string}>&quot;{children}&quot;</span>;
}

function List({ items }: { items: string[] }) {
  return (
    <>
      <span className={punctuation}>[</span>
      {items.map((item, index) => (
        <span key={item}>
          <Str>{item}</Str>
          {index < items.length - 1 && <span className={punctuation}>, </span>}
        </span>
      ))}
      <span className={punctuation}>]</span>
    </>
  );
}

function Field({ name, children }: { name: string; children: ReactNode }) {
  return (
    <>
      {"  "}
      <span className={property}>{name}</span>
      <span className={punctuation}>: </span>
      {children}
      <span className={punctuation}>,</span>
    </>
  );
}

const lines: ReactNode[] = [
  <>
    <span className={keyword}>const</span> developer{" "}
    <span className={punctuation}>= {"{"}</span>
  </>,
  <Field key="name" name="name">
    <Str>{siteConfig.name}</Str>
  </Field>,
  <Field key="role" name="role">
    <Str>{siteConfig.role}</Str>
  </Field>,
  <Field key="stack" name="stack">
    <List items={["React", "Next.js", "TypeScript"]} />
  </Field>,
  <Field key="focus" name="focus">
    <List items={["UI/UX", "Accesibilidad"]} />
  </Field>,
  <Field key="learning" name="alwaysLearning">
    <span className={keyword}>true</span>
  </Field>,
  <span key="close" className={punctuation}>
    {"};"}
  </span>,
];

// Decorative editor mock: the lines "type" themselves in with CSS only.
export function CodeWindow() {
  return (
    <div aria-hidden className="relative w-full max-w-md">
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/30 via-sky-400/10 to-violet-500/30 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-amber-400/80" />
          <span className="size-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
            developer.ts
          </span>
        </div>
        <pre className="overflow-hidden p-4 font-mono text-xs leading-6 whitespace-pre-wrap sm:text-sm">
          {lines.map((line, index) => (
            <div key={index} className="flex gap-4">
              <span className="w-4 shrink-0 text-right text-muted-foreground/60 select-none">
                {index + 1}
              </span>
              <code
                className="type-line block min-w-0"
                style={{ "--line": index } as CSSProperties}
              >
                {line}
                {index === lines.length - 1 && (
                  <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-primary motion-safe:animate-blink" />
                )}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
