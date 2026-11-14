import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="reveal mx-auto w-full max-w-4xl scroll-mt-20 px-6 py-20 sm:py-28"
    >
      <p aria-hidden className="font-mono text-sm text-primary">
        {`// ${id}`}
      </p>
      <div className="mt-2 flex items-center gap-4">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-primary/60 via-border to-transparent"
        />
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}
